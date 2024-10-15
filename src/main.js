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
import {ElNotification} from "element-plus";

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
        const response = err.response;

        if (response.status === 400) {
            store.state.submitLoading = false
            // Check if it's a QuickBooks specific error
            const quickbooksErrorTitle = response.data?.['Quickbooks Response error'];
            const fault = quickbooksErrorTitle?.fault;

            const quickbooksErrorMessage = fault?.error?.[0]?.message;
            const quickbooksErrorCode = fault?.error?.[0]?.code;
            const extractedMessage = quickbooksErrorMessage?.match(/message=([^;]*)/)?.[1];

            // console.log('fault', response.data);

            if (quickbooksErrorMessage ) {
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: `Quick Book - ${extractedMessage}`,
                });
                return
            }

            const kraInvoiceExisistsError = response.data?.error;

            if (kraInvoiceExisistsError?.resultMsg) {
                console.log(kraInvoiceExisistsError)
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: `KRA - ${kraInvoiceExisistsError?.resultMsg}` || 'An error occurred',
                });
                return;
            }

            if (kraInvoiceExisistsError) {
                console.log(kraInvoiceExisistsError)
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: `QuickBooks - ${kraInvoiceExisistsError}` || 'An error occurred',
                });
                return;
            }

            const invoiceDataNotFound = response.data
            if (invoiceDataNotFound) {
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: `KRA- ${invoiceDataNotFound?.error}` || 'An error occurred',
                });
            }
        }

        if (response.status === 401) {
            // Check if it's a QuickBooks specific error
            const quickbooksError = response.data?.fault?.error?.[0]?.message;
            if (quickbooksError && quickbooksError.includes('AuthenticationFailed')) {
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: 'QuickBooks Authentication Failed. Token Expired.',
                });
            } else {
                return;
            }
            deleteLocalStorageInformation();
            router.push({ name: "auth" });

        }

        else if (err.response.status === 403) {
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

