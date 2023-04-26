    <template>
  <h1>Edit a CSV</h1>

  <div v-for="item in csv" :key="item._id">
    <h3>Title: {{ item.Title }}</h3>
    <h3>{{ item.fileName }}</h3>
    <p>{{ item.uploadDate }}</p>
    <h4>{{ item.names }}</h4>
    <h4>{{ item.numbers }}</h4>
  </div>
</template>

<script>
import csvcrud from "../modules/csvcrud.js";
export default {
  setup() {
    const {
      csv,
      csvId,
      GetSpecificCsv,
      state,
      handleFileChange,
      handleSubmit,
      deleteCsv,
      editCsv,
    } = csvcrud();

    GetSpecificCsv();

    return {
      csv,
      csvId,
      GetSpecificCsv,
      state,
      handleFileChange,
      handleSubmit,
      deleteCsv,
      editCsv,
    };
  },
};
</script>

<style>
</style>