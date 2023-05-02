
<script>
import Papa from "papaparse";
// import LineChartWrapper from "./components/Charts/LineChartWrapper.vue";
import { ref } from "vue";
const AllCsv = ref("");
const OneCsv = ref("");
const OneCsvId = ref("");
let lineChartData = ref("");
export default {
  data() {
    return {
      csvData: {},
      AllCsv,
      OneCsv,
      OneCsvId,
      lineChartData,
    };
  },
  components: {
    LineChartWrapper,
  },
  methods: {
    getLineChartData(OneCsv) {
      const tempLabel = OneCsv.names;
      const tempData = OneCsv.numbers;
      lineChartData.value = {
        labels: tempLabel,
        datasets: [
          {
            label: "Monthly Progress",
            backgroundColor: "#f87979",
            data: tempData,
          },
        ],
      };
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const fileName = event.target.files[0].name;
      const uploadDate = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const names = results.data.map((item) => item.name);
          const numbers = results.data.map((item) => parseInt(item.number));
          names.pop();
          numbers.pop();
          this.csvData = {
            fileName,
            uploadDate,
            names,
            numbers,
          };
          this.getLineChartData(this.csvData);
        },
      });
    },
    async GetOneCsv(id) {
      try {
        await fetch("http://localhost:3000/gets/" + id)
          .then((res) => res.json())
          .then((data) => {
            this.OneCsv = data;
          });
      } catch (error) {
        console.log(error); // do different error to showcase - line 15 wrong name + line13 with incorrect path
      }
    },
    async handleSubmit() {
      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: this.csvData,
          }),
        });
        const data = await response.json();
        this.OneCsvId = data.csvId;
        this.GetOneCsv(this.OneCsvId);
      } catch (error) {
        console.error(error);
      }
    },
    async GetAllCsvs() {
      try {
        await fetch("http://localhost:3000/gets")
          .then((res) => res.json())
          .then((data) => {
            this.AllCsv = data;
            // debugger
          });
        console.log(this.AllCsv);
      } catch (error) {
        console.log(error); // do different error to showcase - line 15 wrong name + line13 with incorrect path
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <input type="file" ref="csvFileInput" @change="handleFileChange" />
    <button type="submit">Upload</button>
  </form>

  <div
    v-if="OneCsv"
    style="
      background-color: aquamarine;
      width: fit-content;
      height: fit-content;
    "
  >
    <h1>{{ OneCsv.fileName }}</h1>
    <h3>{{ OneCsv.uploadDate }}</h3>
    <p>{{ OneCsv.names }}</p>
    <p>{{ OneCsv.numbers }}</p>
    <div>
      <LineChartWrapper :data="lineChartData" />
    </div>
  </div>

  <button @click="GetAllCsvs">GetAllCsvs</button>
  <div style="background-color: aquamarine; width: 700px; height: fit-content">
    <div
      v-for="data in AllCsv"
      :key="data._id"
      style="background-color: bisque"
    >
      <h1>{{ data.fileName }}</h1>
      <h3>{{ data.uploadDate }}</h3>
      <p>{{ data.names }}</p>
      <p>{{ data.numbers }}</p>
    </div>
  </div>
</template >

