import axios from "axios";
import { BASE_URL } from "./constants";


const Axios = axios.create({
    baseURL: BASE_URL
})


export default Axios
