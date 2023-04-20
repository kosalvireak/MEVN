
<script>
import Papa from "papaparse";
import axios from "axios";
import { ref } from "vue";
const dataFromDB = ref("");
export default {
  data() {
    return {
      csvData: {},
      dataFromDB,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          // console.log("results.data", results.data);
          const names = results.data.map((item) => item.name);
          const numbers = results.data.map((item) => parseInt(item.number));
          this.csvData = {
            identify: "data2",
            names,
            numbers,
          };
          console.log(this.csvData);
        },
      });
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
      } catch (error) {
        console.error(error);
      }
    },
    async GetCsv() {
      try {
        await fetch("http://localhost:3000/gets")
          .then((res) => res.json())
          .then((data) => {
            this.dataFromDB = data;
            // debugger
          });
        console.log(this.dataFromDB);
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
  <button @click="GetCsv">GetCsv</button>
  <div style="background-color: aquamarine; width: 700px; height: fit-content">
    <p>{{ dataFromDB }}</p>
    <div
      v-for="data in dataFromDB"
      :key="data._id"
      style="background-color: bisque"
    >
      <h1>{{ data.identify }}</h1>
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
