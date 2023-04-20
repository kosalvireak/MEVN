
<script>
import Papa from "papaparse";

import { ref } from "vue";
const AllCsv = ref("");
const OneCsv = ref("");
const OneCsvId = ref("");
export default {
  data() {
    return {
      csvData: {},
      AllCsv,
      OneCsv,
      OneCsvId,
    };
  },
  methods: {
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
      console.log(uploadDate);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          // console.log("results.data", results.data);
          const names = results.data.map((item) => item.name);
          const numbers = results.data.map((item) => parseInt(item.number));
          this.csvData = {
            fileName,
            uploadDate,
            names,
            numbers,
          };
          // console.log(this.csvData);
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
        console.log(data.message);
        console.log(data.csvId);
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
</template>

<style scoped>
body {
  display: flex;
  text-align: center;
}
h1 {
  background-color: aquamarine;
}
</style>
