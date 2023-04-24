import { ref } from 'vue'
const getCsvs = () => {
    const state = ref({
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
    return {
        state,
        GetAllCsvs,
    }
}
export default getCsvs