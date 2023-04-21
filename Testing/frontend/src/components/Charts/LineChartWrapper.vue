<template>
  <Line :data="data" :options="options" style="myStyles" />
</template>
    
    <script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Line,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: { responsive: true },
    },
  },
  computed: {
    myStyles() {
      return {
        height: `300px`,
        position: "relative",
      };
    },
  },
};
</script>
    