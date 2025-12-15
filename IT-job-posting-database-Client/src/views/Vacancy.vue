<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!-- <v-card title="Тайтл" class="mx-auto" max-width="700" variant="outlined">

            </v-card> -->

      <v-card class="mx-auto my-8" variant="outlined">
        <v-card-item>
          <v-card-title>
            <div class="text-h4 text-left">{{ current_advert.title }}</div>
          </v-card-title>
          <v-card-subtitle>
            <p class="text-h5 text-left">Заработная плата: {{ current_advert.salary }}</p>

            <p class="text-caption text-left">Опубликовано: {{ current_advert.date }}</p>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <p class="text-h6 text-left">
            Требуемый опыт: {{ current_advert.requirements }}
          </p>

          <p class="text-body-1 text-left">
            Местанахождение: {{ current_advert.location }}
          </p>
        </v-card-text>
        <v-card-item>
          <p class="text-body-1 text-left">Описание: {{ current_advert.description }}</p>
          <!-- <v-img
            :gradient="`to top right, rgba(255, 255, 255, .1), rgba(14, 151, 210, .15)`"
            :src="current_advert.image"
            cover
          ></v-img> -->
        </v-card-item>

        <v-card-title> Характеристики </v-card-title>
        <v-table>
          <tbody>
            <tr>
              <td class="text-left">Бренд</td>
              <td class="text-left">{{ current_advert.brand }}</td>
            </tr>
            <tr>
              <td class="text-left">Марка</td>
              <td class="text-left">{{ current_advert.model }}</td>
            </tr>
            <tr>
              <td class="text-left">Пробег, км</td>
              <td class="text-left">{{ current_advert.mile_age }}</td>
            </tr>
            <tr>
              <td class="text-left">Тип кузова</td>
              <td class="text-left">{{ current_advert.body_type }}</td>
            </tr>
            <tr>
              <td class="text-left">Год</td>
              <td class="text-left">{{ current_advert.age }}</td>
            </tr>
            <tr>
              <td class="text-left">Цвет</td>
              <td class="text-left">{{ current_advert.color }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";

export default {
  data: () => ({
    current_advert: "",
  }),
  methods: {
    async loadAdvert() {
      const id = this.$route.query.id;
      console.log(id);
      let response = await Vacancy.getOneVacancy(id);
      this.current_advert = response;
      console.log(response)
    },
    //async loadMyAdverts() {
    //   let data = {
    //     email: localStorage.getItem("email"),
    //   };
    //   let response = await Vacancy.allVacancies(data);
    //   console.log(response);
    //   if (response.err) {
    //     console.log("Empty my_adverts list");
    //   } else {
    //     this.roleId = response.roleId;
    //     this.companyId = response.companyId;
    //     this.companyName = response.companyName;
    //     const data = response.vacancies;
    //     //console.log(response.vacancies)

    //     const vacancies = response.vacancies;
    //     const applications = response.applications;
    //     const vacanciesWithCheck = vacancies.map((vacancy) => {
    //       const isMatched = applications.some((app) => app.vacancyId === vacancy.id);
    //       return {
    //         ...vacancy,
    //         check: isMatched,
    //       };
    //     });
    //     this.items = vacanciesWithCheck.reverse();
    //   }

    //   if (localStorage.getItem("roleId") == null) {
    //     location.reload();
    //   }
    //   {
    //     localStorage.setItem("roleId", response.roleId);
    //     localStorage.setItem("companyId", response.companyId);
    //     if (response.companyName) {
    //       localStorage.setItem("companyName", response.companyName.name);
    //     }
    //   }
    // },
    // },
  },
  async created() {
    await this.loadAdvert();
  },
};
</script>
