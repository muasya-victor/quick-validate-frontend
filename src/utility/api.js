import axios from "axios"
// import { baseUrl } from "constants";
export const baseUrl = "https://advatech.up.railway.app/api/"
// export const baseUrl = "https://crm-node-api-38131eb86996.herokuapp.com/api/"


export default axios.create({
    baseUrl: baseUrl,
});
