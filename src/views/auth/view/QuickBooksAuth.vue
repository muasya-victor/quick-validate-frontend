<script setup>
  import {baseUrl} from "@/utility/api.js";

  const routeToBackend = ()=>{
    window.location.href = `${baseUrl}/login/`
  }
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <el-button @click="routeToBackend">Authorise Quick Books</el-button>
  </div>
</template>

<style scoped>

</style>