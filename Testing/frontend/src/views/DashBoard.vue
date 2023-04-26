<template>
  <h1>This is DashBoard that show all object in DB</h1>
  <div class="row">
    <div class="container">
      <form @submit.prevent="handleSubmit()">
        <label for="csvtitle"></label>
        <input
          type="text"
          name="csvtitle"
          id="csvtitle"
          placeholder="Title of your csv"
          v-model="state.csvTitle"
        />
        <span>Title: {{ state.csvTitle }}</span>
        <br />
        <input type="file" ref="csvFileInput" @change="handleFileChange" />
        <button
          type="submit"
          @click="$forceUpdate()"
          :disabled="!state.csvTitle"
        >
          Upload</button
        ><br />
        <div style="background-color: darkolivegreen">
          {{ state.newCsv }}
        </div>
      </form>
    </div>
    <div v-for="csv in state.csvs" :key="csv._id" class="container">
      <router-link :to="`/dashboard/${csv._id}`">
        <h3>Title: {{ csv.Title }}</h3>
        <h3>{{ csv.fileName }}</h3>
        <p>{{ csv.uploadDate }}</p>
        <h4>{{ csv.names }}</h4>
        <h4>{{ csv.numbers }}</h4>
        <button @click="editCsv(csv._id)">Edit Csv {{ csv._id }}</button>
      </router-link>
      <button
        @click="
          deleteCsv(csv._id);
          $forceUpdate();
        "
      >
        Delete Csv
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import csvcrud from "../modules/csvcrud.js";
// import { json } from "express/lib/response";

export default {
  setup() {
    const {
      state,
      GetAllCsvs,
      handleFileChange,
      handleSubmit,
      deleteCsv,
      editCsv,
    } = csvcrud();

    onMounted(() => {
      GetAllCsvs();
    });
    return {
      state,
      GetAllCsvs,
      handleFileChange,
      handleSubmit,
      deleteCsv,
      editCsv,
    };
  },
};
</script>

<style>
body {
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
}
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.container {
  border: 2px solid green;
  width: 500px;
  height: 300px;
}
</style>