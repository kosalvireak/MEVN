import { ref } from 'vue'
import Papa from "papaparse";

const getCsvs = () => {
    const state = ref({
        csvTitle: '',
        newCsv: {},
        csvs: {}
    })
    const GetAllCsvs = async () => {
        try {
            await fetch("http://localhost:3000/csv")
                .then((res) => res.json())
                .then((data) => {
                    state.value.csvs = data;
                })
            console.log("state", state);
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
                // this.getLineChartData(this.csvData);
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
        fetch("http://localhost:3000/csv/new", requestOptions)
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
            .then(res => { console.log(res) })
    }

    return {
        state,
        GetAllCsvs,
        handleFileChange,
        handleSubmit,
        deleteCsv,
        editCsv,
    }
}
export default getCsvs