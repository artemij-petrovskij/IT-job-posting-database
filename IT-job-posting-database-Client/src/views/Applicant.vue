<template>
  <v-container class="fill-height" style="max-width: 1200px;">
    <v-responsive class="fill-height">
      <v-breadcrumbs :items="breadcrumbs" class="mb-4">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-card border class="mx-auto ml-4 mr-4" rounded="lg">
        <v-card-item>
          <div class="d-flex align-start justify-space-between">
            <div>
              <v-chip color="primary" variant="flat" class="mb-2">
                Резюме
              </v-chip>
              <v-card-title class="text-h3 font-weight-bold pa-0 mb-2">
                {{ current_advert.title }}
              </v-card-title>
              <v-card-subtitle class="pa-0">
                <div class="d-flex align-center mt-2">
                  <v-icon color="success" class="mr-1">mdi-cash</v-icon>
                  <span class="text-h5 font-weight-bold text-success">
                    {{ current_advert.salary }}
                  </span>
                  <v-chip variant="outlined" color="info" size="small" class="ml-3">
                    <v-icon start size="small">mdi-briefcase</v-icon>
                    {{ current_advert.skills }}
                  </v-chip>
                </div>
              </v-card-subtitle>
            </div>
            <v-avatar
              size="120"
              :image="`https://randomuser.me/api/portraits/men/${Math.round(
                Math.random() * 100
              )}.jpg`"
              class="elevation-4"
            >
              <template v-slot:placeholder>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                ></v-img>
              </template>
            </v-avatar>
          </div>
        </v-card-item>

        <v-divider class="my-4"></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-card variant="outlined" rounded="lg" class="mb-4">
                <v-card-item>
                  <v-card-title class="text-h6">
                    <v-icon class="mr-2">mdi-contacts</v-icon>
                    Контактная информация
                  </v-card-title>
                  <div class="mt-4">
                    <v-list density="compact">
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-phone</v-icon>
                        </template>
                        <v-list-item-title>{{ current_advert.contacts }}</v-list-item-title>
                        <v-list-item-subtitle>Телефон</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-content-copy</v-icon>
                        </template>
                        <v-list-item-title class="text-truncate" style="max-width: 200px;">
                          {{ pageUrl }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-btn
                            @click="copyToClipboard"
                            size="x-small"
                            variant="text"
                            color="primary"
                            :loading="copyLoading"
                            :disabled="copyLoading"
                          >
                            Скопировать ссылку
                          </v-btn>
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card-item>
              </v-card>

              <v-card variant="outlined" rounded="lg">
                <v-card-item>
                  <v-card-title class="text-h6">
                    <v-icon class="mr-2">mdi-clock-outline</v-icon>
                    Статус
                  </v-card-title>
                  <div class="mt-4">
                    <v-timeline density="compact" side="end" align="start">
                      <v-timeline-item
                        dot-color="primary"
                        size="small"
                      >
                        <div class="text-caption">
                          Опубликовано
                        </div>
                        <div class="text-body-2">
                          {{ formatDate(current_advert.createdAt) }}
                        </div>
                      </v-timeline-item>
                      <v-timeline-item
                        dot-color="green"
                        size="small"
                      >
                        <div class="text-caption">
                          Обновлено
                        </div>
                        <div class="text-body-2">
                          {{ formatDate(current_advert.updatedAt) }}
                        </div>
                      </v-timeline-item>
                    </v-timeline>
                  </div>
                </v-card-item>
              </v-card>

         
            </v-col>

            <v-col cols="12" md="8">
              <v-card variant="outlined" rounded="lg" class="mb-4">
                <v-card-item>
                  <v-card-title class="text-h6">
                    <v-icon class="mr-2" color="primary">mdi-account-circle</v-icon>
                    О себе
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <div class="text-body-1">
                      {{ current_advert.description }}
                    </div>
                  </v-card-text>
                </v-card-item>
              </v-card>

             

              <v-card variant="outlined" rounded="lg">
                <v-card-item>
                  <v-card-title class="text-h6">
                    <v-icon class="mr-2" color="info">mdi-information</v-icon>
                    Дополнительная информация
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6" sm="4">
                        <div class="text-center">
                          <v-icon size="40" color="primary" class="mb-2">mdi-android</v-icon>
                          <div class="text-body-2">Android Developer</div>
                          <div class="text-caption text-medium-emphasis">Специализация</div>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="4">
                        <div class="text-center">
                          <v-icon size="40" color="green" class="mb-2">mdi-calendar</v-icon>
                          <div class="text-body-2">{{ current_advert.skills }}</div>
                          <div class="text-caption text-medium-emphasis">Опыт работы</div>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="4">
                        <div class="text-center">
                          <v-icon size="40" color="orange" class="mb-2">mdi-briefcase-check</v-icon>
                          <div class="text-body-2">Доступен</div>
                          <div class="text-caption text-medium-emphasis">Статус</div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

      
        <!-- <v-card-actions class="px-6 py-4">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-email"
            size="large"
            class="mr-2"
          >
          
            Связаться
          </v-btn>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-download"
            size="large"
            class="mr-2"
          >
            Сохранить
          </v-btn>
          <v-btn
            variant="tonal"
            prepend-icon="mdi-share-variant"
            size="large"
            @click="copyToClipboard"
            :loading="copyLoading"
            :disabled="copyLoading"
          >
            {{ copySuccess ? 'Скопировано!' : 'Поделиться' }}
          </v-btn>
        </v-card-actions> -->
      </v-card>

      <!-- Снекбар для уведомлений -->
          <v-snackbar v-model="showSnackbar" vertical>
      <div class="text-subtitle-1 pb-2">{{ snackbar_title_text }}</div>

      <p>Ссылка скопирована в буфер обмена</p>

      <template v-slot:actions>
        <v-btn color="indigo" variant="text" @click="snackbar = false"> </v-btn>
      </template>
    </v-snackbar>

      <v-btn
        color="grey"
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="mt-4"
        @click="$router.back()"
      >
        Назад к списку
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script>
import { Advert } from "../services/advert.service.js";

export default {
  data: () => ({
    current_advert: "",
    breadcrumbs: [
      {
        title: 'Главная',
        disabled: false,
        href: '/',
      },
      {
        title: 'Мои резюме',
        disabled: false,
        href: '/resumes',
      },
      {
        title: 'Детали резюме',
        disabled: true,
      },
    ],
    copyLoading: false,
    copySuccess: false,
    showSnackbar: false,
    pageUrl: ''
  }),
  
  computed: {
    currentPageUrl() {
      // Получаем текущий URL страницы
      return window.location.href;
    }
  },

  methods: {
    async loadAdvert() {
      const id = this.$route.query.id;
      let response = await Advert.getOneAdvert(id);
      this.current_advert = response;
      // Обновляем заголовок в breadcrumbs
      this.breadcrumbs[2].title = response.title;
      // Устанавливаем URL страницы
      this.pageUrl = window.location.href;
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    async copyToClipboard() {
      this.copyLoading = true;
      
      try {
        // Используем современный Clipboard API
        await navigator.clipboard.writeText(this.pageUrl);
        
        // Успешное копирование
        this.copySuccess = true;
        this.showSnackbar = true;
        
        // Сбрасываем состояние через 2 секунды
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
        
      } catch (err) {
        console.error('Ошибка копирования в буфер обмена:', err);
        
        // Fallback для старых браузеров или если Clipboard API не доступен
        try {
          const textArea = document.createElement('textarea');
          textArea.value = this.pageUrl;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          
          if (successful) {
            this.copySuccess = true;
            this.showSnackbar = true;
            setTimeout(() => {
              this.copySuccess = false;
            }, 2000);
          } else {
            this.showErrorMessage('Не удалось скопировать ссылку');
          }
        } catch (fallbackErr) {
          console.error('Fallback копирование тоже не удалось:', fallbackErr);
          this.showErrorMessage('Ошибка при копировании');
        }
      } finally {
        this.copyLoading = false;
      }
    },
    
    showErrorMessage(message) {
      // Можно добавить отдельный снекбар для ошибок
      alert(message); // временное решение
    }
  },

  async created() {
    await this.loadAdvert();
  },
  
  mounted() {
    // Устанавливаем URL страницы после монтирования компонента
    this.pageUrl = window.location.href;
  }
};
</script>

<style scoped>
.v-card-title {
  word-break: break-word;
}

.v-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.v-timeline-item::before {
  height: 100%;
}

.text-success {
  color: rgb(var(--v-theme-success)) !important;
}

/* Стили для снекбара */
.v-snackbar {
  z-index: 1000;
}

/* Анимация для кнопки при успешном копировании */
.v-btn--success {
  transition: all 0.3s ease;
}

/* Стиль для текстового поля с ссылкой */
.v-text-field--outlined {
  background-color: rgba(var(--v-theme-primary), 0.03);
}
</style>