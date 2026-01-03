<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <v-card class="mx-auto my-8" max-width="900" variant="outlined">
        <v-card-item>
          <v-card-title class="d-flex align-center justify-space-between">
            <div class="text-h4">{{ current_advert.title }}</div>
            <!-- <v-chip color="primary" variant="outlined" size="large">
              {{ current_advert.categoryId }}
            </v-chip> -->
          </v-card-title>
          
          <v-card-subtitle class="mt-2">
            <div class="d-flex flex-column">
              <div class="d-flex align-center mb-1">
                <v-icon icon="mdi-office-building" size="small" class="mr-2"></v-icon>
                <span class="text-h6">{{ current_advert.company?.name }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon icon="mdi-map-marker" size="small" class="mr-2"></v-icon>
                <span class="text-body-1">{{ current_advert.location }}</span>
              </div>
            </div>
          </v-card-subtitle>
        </v-card-item>

        <v-divider class="mx-4"></v-divider>

 
        <v-card-text>
          <v-row class="mb-4">
            <v-col cols="12" md="6">
              <v-card variant="flat" class="pa-3 bg-grey-lighten-4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-cash" color="green-darken-2" class="mr-3"></v-icon>
                  <div>
                    <div class="text-caption text-medium-emphasis">Заработная плата</div>
                    <div class="text-h5 text-green-darken-2">{{ current_advert.salary }} $</div>
                  </div>
                </div>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card variant="flat" class="pa-3 bg-grey-lighten-4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-briefcase-clock" color="blue-darken-2" class="mr-3"></v-icon>
                  <div>
                    <div class="text-caption text-medium-emphasis">Требуемый опыт</div>
                    <div class="text-h6">{{ current_advert.requirements }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

         
          <v-card class="mb-6" variant="outlined">
            <v-card-title class="text-h6 bg-grey-lighten-4">
              <v-icon icon="mdi-text" class="mr-2"></v-icon>
              Описание вакансии
            </v-card-title>
            <v-card-text>
              <p class="text-body-1" style="white-space: pre-line;">{{ current_advert.description }}</p>
            </v-card-text>
          </v-card>

       
          <v-expansion-panels variant="accordion">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon icon="mdi-information" class="mr-2"></v-icon>
                Детали вакансии
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list lines="two" density="comfortable">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-calendar"></v-icon>
                    </template>
                    <v-list-item-title>Опубликовано</v-list-item-title>
                    <v-list-item-subtitle>{{ current_advert.date }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-update"></v-icon>
                    </template>
                    <v-list-item-title>Последнее обновление</v-list-item-title>
                    <v-list-item-subtitle>{{ formatDate(current_advert.updatedAt) }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-identifier"></v-icon>
                    </template>
                    <v-list-item-title>ID вакансии</v-list-item-title>
                    <v-list-item-subtitle>#{{ current_advert.id }}</v-list-item-subtitle>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-domain"></v-icon>
                    </template>
                    <v-list-item-title>ID компании</v-list-item-title>
                    <v-list-item-subtitle>{{ current_advert.companyId }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

<!--      
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            variant="outlined"
            @click="$router.back()"
            prepend-icon="mdi-arrow-left"
          >
            Назад
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="applyForJob"
            prepend-icon="mdi-send"
          >
            Откликнуться
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    current_advert: {
      id: null,
      title: "",
      description: "",
      salary: "",
      requirements: "",
      location: "",
      date: "",
      categoryId: null,
      companyId: null,
      createdAt: "",
      updatedAt: "",
      company: {
        name: ""
      }
    }
  }),
  
  methods: {
    async loadAdvert() {
      try {
        const id = this.$route.query.id;
        console.log("Загрузка вакансии ID:", id);
        
        if (!id) {
          console.error("ID вакансии не указан");
          return;
        }
        
        const response = await Vacancy.getOneVacancy(id);
        
        if (response && typeof response === 'object') {
          this.current_advert = response;
          console.log("Данные вакансии загружены:", response);
        } else {
          console.error("Некорректный ответ от сервера:", response);
        }
      } catch (error) {
        console.error("Ошибка при загрузке вакансии:", error);

      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    applyForJob() {
      console.log("Отклик на вакансию:", this.current_advert.id);
    
      alert(`Отклик отправлен на вакансию: ${this.current_advert.title}`);
    }
  },
  
  async created() {
    await this.loadAdvert();
  },
  
  watch: {
    '$route.query.id': {
      handler(newId) {
        if (newId) {
          this.loadAdvert();
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.text-h4 {
  font-weight: 600;
  line-height: 1.2;
}

.v-card {
  border-radius: 12px;
}

.v-card-text {
  line-height: 1.6;
}

.bg-grey-lighten-4 {
  border-radius: 8px;
}

.v-list-item {
  padding-left: 0;
}
</style>