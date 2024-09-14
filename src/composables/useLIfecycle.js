import { ref } from 'vue';
import store from '@/store';
import router from '@/router';

const submitLoading = ref(false);

export function useLifecycle() {
    const pushDataToDatabase = async (dispatchAction, dispatchUrl, form, dispatchId = null) => {
        try {
            submitLoading.value = true;

            let postObject = {
                url: dispatchUrl,
                data: form.value
            };


            if (dispatchId !== null) {
                postObject['id'] = dispatchId;
            }

            const resp = await store.dispatch(dispatchAction, postObject);

            router.go(-1);

            submitLoading.value = false;
            return resp; // Optionally return response
        } catch (error) {
            submitLoading.value = false;
            throw error; // Handle error or rethrow
        }
    };

    return {
        pushDataToDatabase,
        submitLoading
    };
}

export default {
    install: (app) => {
        const lifecycle = useLifecycle();
        app.provide('useLifecycle', lifecycle);
    }
};
