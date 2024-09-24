import axios from "axios"
// import { baseUrl } from "constants";
// export const baseUrl = "http://localhost:8000/api/"
// export const baseUrl = "https://ab53-102-0-4-206.ngrok-free.app/api/"
export const baseUrl = "https://smartinvoice.up.railway.app/api/"
// export const baseUrl = "https://crm-node-api-38131eb86996.herokuapp.com/api/"


export default axios.create({
    baseUrl: baseUrl,
});
