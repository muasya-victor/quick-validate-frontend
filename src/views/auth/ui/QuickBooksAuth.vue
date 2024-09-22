<script setup>
  import {baseUrl} from "@/utility/api.js";
  import AlternativeAuthWraper from "@/views/auth/ui/AlternativeAuthWraper.vue";
  import AuthWrapper from "@/views/auth/ui/AuthWrapper.vue";

  const routeToBackend = ()=>{
    window.location.href = `${baseUrl}login`
  }
</script>

<template>
  <AuthWrapper>
    <div class="w-full h-full flex flex-col justify-center ">
      <el-button type="primary" size="large" @click="routeToBackend">Authorise Quick Books</el-button>
    </div>
  </AuthWrapper>

</template>

<style scoped>

</style>