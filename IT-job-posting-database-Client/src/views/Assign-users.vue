<template>
    <v-container>
        <v-fade-transition>
            <div v-if="show" class="my-box">
                <v-responsive class="align-center">
                    <!-- Таблица пользователей -->
                    <v-card title="Пользователи" class="mx-auto mt-4" max-width="1400">
                        <v-card-text>
                            <!-- Поиск по всей таблице -->
                            <v-text-field
                                v-model="search"
                                label="Поиск пользователей"
                                prepend-inner-icon="mdi-magnify"
                                variant="outlined"
                                density="comfortable"
                                clearable
                                class="mb-4"
                            ></v-text-field>
                        </v-card-text>
                        
                        <v-data-table
                            :headers="userHeaders"
                            :items="filteredUsers"
                            :items-per-page="10"
                            :loading="isLoading"
                            :search="search"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            class="elevation-1"
                        >
                            <!-- ID пользователя -->
                            <template v-slot:item.id="{ item }">
                                <v-chip size="small" color="primary">
                                    {{ item.id }}
                                </v-chip>
                            </template>

                            <!-- Полное имя -->
                            <template v-slot:item.fullName="{ item }">
                                <div class="d-flex align-center">
                                    <v-avatar size="32" color="primary" class="mr-2">
                                        <span class="white--text text-caption">
                                            {{ getInitials(item.firstName, item.lastName) }}
                                        </span>
                                    </v-avatar>
                                    <div>
                                        <strong>{{ item.firstName }} {{ item.lastName }}</strong>
                                        <div class="text-caption text-grey">{{ item.email }}</div>
                                    </div>
                                </div>
                            </template>

                          

                            <!-- Компания (редактируемое поле с поиском) -->
                            <template v-slot:item.company="{ item }">
                                <v-autocomplete
                                    v-model="item.companyId"
                                    :items="companies"
                                    item-title="title"
                                    item-value="id"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                    clearable
                                    placeholder="Выберите компанию"
                                    :search-input.sync="companySearch"
                                    @update:model-value="updateUserCompany(item)"
                                >
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props">
                                            <template v-slot:title>
                                                <strong>{{ item.raw.title }}</strong>
                                            </template>
                                            <template v-slot:subtitle>
                                                <small class="text-caption">{{ item.raw.desc || 'Нет описания' }}</small>
                                            </template>
                                            <template v-slot:append v-if="item.raw.id">
                                                <v-chip size="x-small" color="primary">
                                                    ID: {{ item.raw.id }}
                                                </v-chip>
                                            </template>
                                        </v-list-item>
                                    </template>
                                    <template v-slot:append-item>
                                        <v-divider class="mt-2"></v-divider>
                                        <v-list-item>
                                            <v-list-item-title class="text-caption text-grey">
                                                Найдено компаний: {{ companies.length }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </template>
                                </v-autocomplete>
                            </template>

                            <!-- Роль -->
                            <template v-slot:item.role="{ item }">
                                <v-chip 
                                    :color="getRoleColor(item.roleId)" 
                                    size="small"
                                    :variant="item.roleId === 1 ? 'flat' : 'outlined'"
                                >
                                    <v-icon start size="small">
                                        {{ getRoleIcon(item.roleId) }}
                                    </v-icon>
                                    {{ getRoleName(item.roleId) }}
                                </v-chip>
                            </template>

                            <!-- Статус компании -->
                            <template v-slot:item.companyStatus="{ item }">
                                <v-chip 
                                    :color="getCompanyStatusColor(item.companyId)" 
                                    size="small"
                                    :variant="item.companyId ? 'elevated' : 'outlined'"
                                >
                                    <v-icon start size="x-small">
                                        {{ item.companyId ? 'mdi-check-circle' : 'mdi-alert-circle' }}
                                    </v-icon>
                                    {{ item.companyId ? 'В компании' : 'Без компании' }}
                                </v-chip>
                            </template>

                            <!-- Дата создания -->
                            <template v-slot:item.createdAt="{ item }">
                                <div class="text-no-wrap">
                                    {{ formatDate(item.createdAt) }}
                                    <div class="text-caption text-grey">
                                        {{ formatTime(item.createdAt) }}
                                    </div>
                                </div>
                            </template>

                            <!-- Действия -->
                            <template v-slot:item.actions="{ item }">
                                <div class="d-flex">
                                    <v-tooltip text="Редактировать" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn 
                                                v-bind="props"
                                                icon 
                                                size="small" 
                                                color="primary" 
                                                variant="text"
                                                @click="editUser(item)"
                                            >
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                    
                                    <v-tooltip text="Удалить" location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-btn 
                                                v-bind="props"
                                                icon 
                                                size="small" 
                                                color="error" 
                                                variant="text"
                                                @click="confirmDeleteUser(item)" 
                                                class="ml-1"
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </div>
                            </template>

                            <!-- Пустое состояние -->
                            <template v-slot:no-data>
                                <div class="py-8 text-center">
                                    <v-icon size="64" color="grey-lighten-1">mdi-account-multiple-remove</v-icon>
                                    <p class="text-h6 mt-2">Пользователи не найдены</p>
                                    <p class="text-body-1">Попробуйте изменить параметры поиска</p>
                                </div>
                            </template>

                            <!-- Заголовки с иконками -->
                            <template v-slot:header.id>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-identifier</v-icon>
                                    <span>ID</span>
                                </div>
                            </template>
                            
                            <template v-slot:header.fullName>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-account</v-icon>
                                    <span>ФИО</span>
                                </div>
                            </template>
                            
                           
                            
                            <template v-slot:header.company>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-office-building</v-icon>
                                    <span>Компания</span>
                                </div>
                            </template>
                            
                            <template v-slot:header.role>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-account-key</v-icon>
                                    <span>Роль</span>
                                </div>
                            </template>
                            
                            <template v-slot:header.companyStatus>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-badge-account</v-icon>
                                    <span>Статус</span>
                                </div>
                            </template>
                            
                            <template v-slot:header.createdAt>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                                    <span>Дата регистрации</span>
                                </div>
                            </template>
                            
                            <template v-slot:header.actions>
                                <div class="d-flex align-center">
                                    <v-icon size="small" class="mr-1">mdi-cog</v-icon>
                                    <span>Действия</span>
                                </div>
                            </template>
                        </v-data-table>
                        
                        <!-- Статистика -->
                        <v-card-actions class="px-4">
                            <v-chip size="small" class="mr-2">
                                <v-icon start size="small">mdi-account-group</v-icon>
                                Всего: {{ users.length }}
                            </v-chip>
                            <v-chip size="small" color="success" class="mr-2">
                                <v-icon start size="small">mdi-check-circle</v-icon>
                                В компаниях: {{ usersWithCompany }}
                            </v-chip>
                            <v-chip size="small" color="warning" class="mr-2">
                                <v-icon start size="small">mdi-alert-circle</v-icon>
                                Без компании: {{ usersWithoutCompany }}
                            </v-chip>
                            <v-spacer></v-spacer>
                            <v-btn 
                                size="small" 
                                variant="text" 
                                color="primary"
                                @click="loadData"
                                :loading="isLoading"
                            >
                                <v-icon start>mdi-refresh</v-icon>
                                Обновить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-responsive>
            </div>
        </v-fade-transition>
        
        <v-snackbar v-model="snackbar" :timeout="3000">
            {{ snackbarMessage }}
            <template v-slot:actions>
                <v-btn color="primary" variant="text" @click="snackbar = false">
                    Закрыть
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";
import { User } from "../services/user.service.js";

export default {
    data: () => ({
        // Данные
        companies: [],
        users: [],
        
        // Поиск и сортировка
        search: '',
        companySearch: '',
        sortBy: [{ key: 'id', order: 'asc' }],
        sortDesc: false,
        
        // Состояние UI
        show: false,
        isLoading: false,
        
        // Заголовки таблицы
        userHeaders: [
            { 
                text: 'ID', 
                value: 'id', 
                width: '80px',
                sortable: true 
            },
            { 
                text: 'ФИО', 
                value: 'fullName', 
                sortable: true 
            },
            { 
                text: 'Email', 
                value: 'email', 
                sortable: true 
            },
            { 
                text: 'Компания', 
                value: 'company', 
                sortable: false,
                width: '250px'
            },
            { 
                text: 'Роль', 
                value: 'role', 
                sortable: true,
                width: '150px'
            },
            { 
                text: 'Статус', 
                value: 'companyStatus', 
                sortable: true,
                width: '140px'
            },
            { 
                text: 'Дата регистрации', 
                value: 'createdAt', 
                sortable: true,
                width: '150px'
            },
            { 
                text: 'Действия', 
                value: 'actions', 
                sortable: false, 
                width: '100px',
                align: 'center'
            }
        ],
        
        // Роли пользователей
        roles: [
            { 
                id: 1, 
                name: 'Администратор', 
                color: 'error',
                icon: 'mdi-shield-account'
            },
            { 
                id: 2, 
                name: 'Менеджер', 
                color: 'warning',
                icon: 'mdi-account-tie'
            },
            { 
                id: 3, 
                name: 'Пользователь', 
                color: 'success',
                icon: 'mdi-account'
            }
        ],
        
        // Уведомления
        snackbar: false,
        snackbarMessage: "",
    }),
    
    computed: {
        // Фильтрация пользователей
        filteredUsers() {
            if (!this.search) return this.users;
            
            const searchLower = this.search.toLowerCase();
            return this.users.filter(user => {
                return (
                    (user.firstName && user.firstName.toLowerCase().includes(searchLower)) ||
                    (user.lastName && user.lastName.toLowerCase().includes(searchLower)) ||
                    (user.email && user.email.toLowerCase().includes(searchLower)) ||
                    (user.companyId && this.getCompanyName(user.companyId).toLowerCase().includes(searchLower)) ||
                    this.getRoleName(user.roleId).toLowerCase().includes(searchLower)
                );
            });
        },
        
        // Статистика
        usersWithCompany() {
            return this.users.filter(user => user.companyId).length;
        },
        
        usersWithoutCompany() {
            return this.users.filter(user => !user.companyId).length;
        }
    },
    
    methods: {
        // Получить инициалы для аватара
        getInitials(firstName, lastName) {
            const first = firstName ? firstName.charAt(0).toUpperCase() : '';
            const last = lastName ? lastName.charAt(0).toUpperCase() : '';
            return first + last;
        },
        
        // Получить название компании по ID
        getCompanyName(companyId) {
            if (!companyId) return 'Без компании';
            const company = this.companies.find(c => c.id === companyId);
            return company ? company.title : `Компания #${companyId}`;
        },
        
        async updateUserCompany(user) {
            try {
                const data = {
                    userId: user.id,
                    companyId: user.companyId,
                    jwt: localStorage.getItem("jwt"),
                    email: localStorage.getItem("email"),
                };
                
                const response = await User.updateCompany(data);
                
                if (response.err) {
                    this.showSnackbar(`Ошибка: ${response.err}`);
                    await this.loadData(); // Перезагружаем данные при ошибке
                } else {
                    this.showSnackbar("Компания пользователя обновлена");
                }
            } catch (error) {
                console.error("Ошибка при обновлении компании:", error);
                this.showSnackbar("Ошибка при обновлении компании");
                await this.loadData();
            }
        },
        
        editUser(user) {
            console.log("Редактировать пользователя:", user);
            this.showSnackbar(`Редактирование пользователя ${user.firstName} ${user.lastName}`);
            // Здесь можно открыть модальное окно редактирования
        },
        
        confirmDeleteUser(user) {
            if (confirm(`Вы уверены, что хотите удалить пользователя ${user.firstName} ${user.lastName}?`)) {
                this.deleteUser(user.id);
            }
        },
        
        async deleteUser(userId) {
            try {
                const data = {
                    id: userId,
                    jwt: localStorage.getItem("jwt"),
                    email: localStorage.getItem("email"),
                };
                
                const response = await User.delete(data);
                
                if (response.err) {
                    this.showSnackbar(`Ошибка: ${response.err}`);
                } else {
                    this.showSnackbar("Пользователь успешно удален");
                    await this.loadData();
                }
            } catch (error) {
                console.error("Ошибка при удалении пользователя:", error);
                this.showSnackbar("Ошибка при удалении пользователя");
            }
        },
        
        getRoleColor(roleId) {
            const role = this.roles.find(r => r.id === roleId);
            return role ? role.color : 'grey';
        },
        
        getRoleIcon(roleId) {
            const role = this.roles.find(r => r.id === roleId);
            return role ? role.icon : 'mdi-account-question';
        },
        
        getRoleName(roleId) {
            const role = this.roles.find(r => r.id === roleId);
            return role ? role.name : `Роль ${roleId}`;
        },
        
        getCompanyStatusColor(companyId) {
            return companyId ? 'success' : 'warning';
        },
        
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU');
        },
        
        formatTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        },
        
        showSnackbar(message) {
            this.snackbarMessage = message;
            this.snackbar = true;
        },
        
        async loadData() {
            this.isLoading = true;
            try {
                const data = {
                    email: localStorage.getItem("email"),
                    jwt: localStorage.getItem("jwt")
                };
                
                // Загружаем пользователей
                const usersResponse = await User.allUsers(data);
                console.log(usersResponse)
                this.users = Array.isArray(usersResponse) ? usersResponse : [];
                
                // Загружаем компании
                const vacanciesResponse = await Vacancy.allVacancies(data);
                if (vacanciesResponse.companies) {
                    this.companies = vacanciesResponse.companies.map(company => ({
                        title: company.name,
                        id: company.id,
                        desc: company.description
                    }));
                }
                
                // Добавляем пустой вариант для компаний
                this.companies.unshift({
                    title: 'Без компании',
                    id: null,
                    desc: 'Пользователь не привязан к компании'
                });
                
                this.show = true;
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
                this.showSnackbar("Ошибка при загрузке данных");
                this.users = [];
                this.companies = [];
            } finally {
                this.isLoading = false;
            }
        },
    },
    
    beforeCreate() {
        if (!localStorage.getItem("jwt")) {
            this.$router.push('/');
        }
    },
    
    async created() {
        await this.loadData();
    },
};
</script>

<style scoped>
.my-box {
    margin-top: 20px;
}
.d-flex {
    display: flex;
}
.align-center {
    align-items: center;
}
.ml-1 {
    margin-left: 4px;
}
.ml-2 {
    margin-left: 8px;
}
.mr-1 {
    margin-right: 4px;
}
.mr-2 {
    margin-right: 8px;
}
.text-no-wrap {
    white-space: nowrap;
}
</style>