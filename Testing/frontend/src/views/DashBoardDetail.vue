    <template>
  <h3>ID: {{ csv._id }}</h3>
  <h3>Title: {{ csv.Title }}</h3>
  <h3>{{ csv.fileName }}</h3>
  <p>{{ csv.uploadDate }}</p>
  <h4>{{ csv.names }}</h4>
  <h4>{{ csv.numbers }}</h4>
  <div>{{ csv }}</div>
  <div>
    <div style="background-color: aliceblue">
      <BarChart :data="lineChartData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import BarChart from "./BarChart.vue";
import csvcrud from "../modules/csvcrud.js";

export default {
  components: {
    BarChart,
  },
  setup() {
    const { csv, GetSpecificCsvById, lineChartData } = csvcrud();
    const data = {
      labels: ["F", "G", "E", "R", "T", "Y", "A", "W", "C", "H", "J"],
      datasets: [
        {
          label: " Dummy Name",
          backgroundColor: "#f87979",
          data: [5, 6, 2, 4, 9, 4, 1, 4, 8, 3, 2],
        },
      ],
    };

    const route =
      getCurrentInstance().appContext.config.globalProperties.$route;
    onMounted(async () => {
      const csvId = route.params.id;
      await GetSpecificCsvById(csvId);
    });

    return {
      csv,
      GetSpecificCsvById,
      lineChartData,
      data,
    };
  },
};
</script>


<style>
</style>
