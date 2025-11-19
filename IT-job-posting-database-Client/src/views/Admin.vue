<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-left fill-height">
      <v-btn class="btn" @click="changer()">XXX</v-btn>
      {{ this.companies }}
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              {{ this.categories }}
            </th>
            <th class="text-left">Значение:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Количетсво категорий:</td>
            <td>{{ this.category_count }}</td>
          </tr>
          <tr>
            <td>Количетсво вакансий:</td>
            <td>{{ this.vacancies_count }}</td>
          </tr>
          <tr>
            <td>Лучшая компания среди отзывов пользователей:</td>
            <td>BioGenix</td>
          </tr>
          <tr>
            <td>Количество объявлений:</td>
            <td>9</td>
          </tr>

          <tr>
            <td>Популярные компании:</td>
            <td>Aston</td>
          </tr>
        </tbody>
      </v-table>

      <v-btn class="btn" @click="toPDF">Создать отчет</v-btn>
      <!-- // -->
      <v-card class="mt-8 mx-auto overflow-visible" max-width="400">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="gray"
          elevation="12"
          max-width="calc(100% - 30px)"
          rounded="lg"
        >
          <v-sparkline
            :labels="labels"
            :model-value="value"
            type="bar"
            color="black"
            height="200"
            line-width="2"
            padding="12"
            show-labels="false"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">User Registrations</div>
          <div class="subheading font-weight-light text-grey">
            Last Campaign Performance
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small"> mdi-clock </v-icon>
          <span class="text-caption text-grey font-weight-light"
            >last registration 26 minutes ago</span
          >
        </v-card-text>
      </v-card>
      <!-- // -->
    </v-responsive>
  </v-container>
</template>

<script>
import { Vacancy } from "../services/vacancy.service.js";

import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { Report } from "../services/report.service.js";

//import ReportController from '../services/report.service'
export default {
  data: () => ({
    current_advert: "фыв",
    test: "ПРОВЕРКА",
    report: {
      user_count: 4,
      advert_count: 8,
    },

    companies: "",

    labels: [],

    category_count: null,
    vacancies_count: null,
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
  }),
  methods: {
    getCategoryCounts() {
      return this.categories.map((category) => ({
        category: category.name,
        count: this.vacancies.filter((vacancy) => vacancy.categoryId === category.id)
          .length,
      }));
    },

    async changer() {
      this.labels = this.companies;
    },
    async getData() {
      let response = await Report.getReportData();
      if (response.err) {
        console.log("Empty report data");
      } else {
        console.log(response);
        const categories = response.categories;

        this.category_count = categories.length;

        const vacancies = response.vacancies;

        this.vacancies_count = vacancies.length;
      }
    },
    toPDF() {
      const pdf = new jsPDFInvoiceTemplate({
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Отчет",
        orientationLandscape: false,
        compress: true,
        logo: {
          src:
            "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: "PNG", //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
            top: 0, //negative or positive num, from the current position
            left: 0, //negative or positive num, from the current position
          },
        },
        stamp: {
          inAllPages: true, //by default = false, just in the last page
          src:
            "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: "JPG", //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
            top: 0, //negative or positive num, from the current position
            left: 0, //negative or positive num, from the current position
          },
        },
        business: {
          name: this.test,
          address: "Minsk",
          phone: "(+375)29 151 3761",
          email: "artemij@example.com",
          email_1: "info@example.al",
          website: "www.example.al",
        },
        contact: {
          label: "Invoice issued for:",
          name: "Admin report",
          address: "Minsk,",
          phone: "(+355) 069 22 22 222",
          email: "vacancy bank",
          otherInfo: "www.website.al",
        },
        invoice: {
          label: "Invoice #: ",
          num: 19,
          invDate: "Report Date: 08/01/2025 18:12",
          invGenDate: "Invoice Date: 02/02/2021 10:17",
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 10,
              },
            },
            {
              title: "Title",
              style: {
                width: 30,
              },
            },
          ],

          table: [
            [1, "test"],
            [2, this.category_count],
            [3, this.test],
          ],
          additionalRows: [
            {
              col1: "Total:",
              col2: "15",
              col3: "ALL",
              style: {
                fontSize: 14, //optional, default 12
              },
            },
            {
              col1: "Best",
              col2: "20",
              col3: "",
              style: {
                fontSize: 10, //optional, default 12
              },
            },
            {
              col1: "SubTotal:",
              col2: "116,199.90",
              col3: "ALL",
              style: {
                fontSize: 10, //optional, default 12
              },
            },
          ],
          invDescLabel: "Invoice Note",
          invDesc:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
          text:
            "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      });

      // Сохранение PDF
      pdf.create().save();
    },
    //
  },

  async mounted() {
    this.getData();
  },

  async created() {
    await this.getData();
  },
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
