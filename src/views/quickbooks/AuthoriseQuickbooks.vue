<script setup>


import store from "@/store/index.js";
import {onMounted} from "vue";
import BaseLoader from "@/components/base/BaseLoader.vue";

onMounted(()=>{
  store.dispatch('fetchList', {url:'get-token'})
      .then((resp)=>{
        console.log('resp', resp.data)
      })
})

</script>

<template>
  <div class="h-full w-full bg-red-700 p-4 flex flex-col gap-4 items-center justify-center">
    <div class="text-blue-500">
      Authorising Quickbooks
    </div>

    <base-loader/>
  </div>
</template>

<style scoped>

</style>