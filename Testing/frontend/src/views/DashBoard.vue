<template>
  <h1>This is DashBoard that show all object in DB</h1>
  <div>
    <div
      v-for="csv in state.csvs"
      :key="csv._id"
      style="
        background-color: darkslategrey;
        border: 2px solid white;
        padding: 7px;
      "
    >
      <h3>{{ csv.fileName }}</h3>
      <p>{{ csv.uploadDate }}</p>
      <h4>{{ csv.names }}</h4>
      <h4>{{ csv.numbers }}</h4>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import csvcrud from "../modules/csvcrud.js";

export default {
  setup() {
    const { state, GetAllCsvs } = csvcrud();

    onMounted(() => {
      GetAllCsvs();
    });
    return { state, GetAllCsvs };
  },
};
</script>

<style>
</style>