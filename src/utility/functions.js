import {ElNotification} from "element-plus";
import Swal from 'sweetalert2';

export function showSuccess (text)
{
    ElNotification({
        title: 'Success',
        type: "success",
        position: "top-right",
        message: text
    })
}
export function raiseError (text)
{
    ElNotification({
        title: 'Error',
        type: "error",
        position: "top-right",
        message: text
    })
}
export function raiseServerError(err) {
    if (err && err.response && err.response.data) {
        if (err.response.data.errors) {
            // Handle the specific error structure you provided
            const errors = err.response.data.errors;
            if (Array.isArray(errors)) {
                errors.forEach((error, index) => {
                    setTimeout(() => {
                        ElNotification({
                            title: 'Error',
                            type: "error",
                            position: "top-right",
                            message: error.detail || 'An unexpected error occurred',
                        });
                    }, index * 100); // Stagger notifications slightly
                });
            } else {
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: 'An unexpected error occurred',
                });
            }
        } else if (err.response.data.message) {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: err.response.data.message,
            });
        } else {
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'An unexpected error occurred',
            });
        }
    } else {
        ElNotification({
            title: 'Error',
            type: "error",
            position: "top-right",
            message: err.message || 'An unexpected error occurred',
        });
    }
}

export function formatDate(dateString) {
    if (!dateString) return '';

    // Convert the date string to a Date object
    const date = new Date(dateString);

    // Check if the date conversion is valid
    if (isNaN(date)) return '';

    // Options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Return the formatted date
    return date.toLocaleDateString(undefined, options);
}

export function deleteLocalStorageInformation(){
    localStorage.removeItem("authData")
    localStorage.removeItem("userDetails")
}






export default {}