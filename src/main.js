import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import store from "./store/index.js";
import {deleteLocalStorageInformation} from "@/utility/functions.js";
import api from "@/utility/api.js";
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css';
import useLifecycle from '@/composables/useLIfecycle.js';

api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (authData?.access) {
        config.headers.Authorization = authData?.access
            ? "Bearer " + authData?.access
            : "";//else
    }
    return config;

});
api.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        console.log('status', err.response.status)
        if (err.response.status === 401) {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'Session Expired',
            })
            deleteLocalStorageInformation()

            router.push({name : "login"});

        } else if (err.response.status === 403) {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'Permission Denied',
            })
        }
        throw err;
    });
})


const app = createApp(App);
app.use(router)
app.use(useLifecycle);
app.use(store)
app.mount('#app')

