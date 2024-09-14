import store from "@/store/index.js";
import router from "@/router/index.js";
import api from "@/utility/api.js";

let loadingState = false;

const returnLoadingState = ()=>{
    return loadingState
}

const pushDataToDatabase = (dispatchAction, dispatchUrl, dispatchId=null, dispatchData )=>{
    let postObject = {
        url: dispatchUrl,
        data: dispatchData
    }

    let loadingState = true
    returnLoadingState()

    if (dispatchId !== null) {
        postObject['id'] = dispatchUrl
    }

    store
        .dispatch(dispatchAction,postObject)
        .then((resp) => {
            // registerLoading.value = false;
            loadingState = false
            // router.go(-1)
            return loadingState;
        })
        .catch((err)=>{
            registerLoading.value = false;
        })
}