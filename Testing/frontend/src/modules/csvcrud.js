import { ref, computed, reactive } from 'vue'
import Papa from "papaparse";
import { useRoute } from 'vue-router'
const getCsvs = () => {

    const route = useRoute();
    // const router = useRoute();

    const csvId = computed(() => route.params.id)
    // console.log("csvId", csvId)
    const csv = ref({})
    const lineChartData = reactive({
        labels: [],
        datasets: [
            {
                label: "",
                backgroundColor: "#f87979",
                data: [],
            },
        ],
    })
    const state = ref({
        csvTitle: ' ',
        newCsv: {},
        csvs: {},
    })


    const GetAllCsvs = async () => {
        try {
            await fetch("http://localhost:3000/csv")
                .then((res) => res.json())
                .then((data) => {
                    state.value.csvs = data;
                })
            // console.log("state", state);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (event) => {
        //get file, fileName, and uploadDate from event
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
                state.value.newCsv = {
                    Title: state.value.csvTitle,
                    fileName,
                    uploadDate,
                    names,
                    numbers,
                };
                console.log(state.value.newCsv);
            },
        });
    }

    const handleSubmit = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: state.value.newCsv
            })
        }
        const response = await fetch("http://localhost:3000/csv/new", requestOptions)
        const data = await response.json();
        console.log(data.message);
        GetAllCsvs();
    }
    const deleteCsv = (_id) => {
        fetch("http://localhost:3000/csv/delete/" + _id, { method: "DELETE" })
            .then(GetAllCsvs())
    }
    const editCsv = (_id) => {
        const requestOptions = {
            method: "PUT"
        }
        fetch("http://localhost:3000/csv/update/" + _id, requestOptions)
            .then(res => res.body)
            .then(res => {
                GetAllCsvs();
                console.log(res)
            })
    }

    const GetSpecificCsv = async () => {
        try {
            fetch("http://localhost:3000/csv")
                .then(res => res.json())
                .then(data => {
                    csv.value = data.filter(t => t._id === csvId.value)
                    // console.log("csv", csv)
                    // getLineChartData();
                })
        } catch (error) { console.log(error) }
    }
    const getLineChartData = async (OneCsv) => {
        const labels = OneCsv.names;
        const data = OneCsv.numbers;
        const title = OneCsv.Title;
        lineChartData.datasets[0].label = title;
        lineChartData.labels = labels;
        lineChartData.datasets[0].data = data;
        // console.log("lineChartData", lineChartData);
    }
    const GetSpecificCsvById = async (id) => {
        try {
            const response = await fetch("http://localhost:3000/csv/get/" + id);
            if (!response.ok) {
                throw new Error('CSV not found');
            }
            csv.value = await response.json();
            console.log("csv", csv.value);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return {
        csv,
        csvId,
        GetSpecificCsv,
        GetSpecificCsvById,
        lineChartData,
        state,
        GetAllCsvs,
        handleFileChange,
        handleSubmit,
        deleteCsv,
        editCsv,
    }
}
export default getCsvs