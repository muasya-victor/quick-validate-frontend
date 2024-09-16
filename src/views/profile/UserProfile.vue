<script setup>

import RegisterForm from "@/views/auth/forms/RegisterForm.vue";
import QuickBookAuthenticationForm from "@/views/auth/QuickBookAuthenticationForm.vue";
</script>

<template>
  <div class="w-full h-full bg-transparent p-4 flex flex-col gap-6 pb-4">
    <h1 class="text-lg font-semibold">Personal Profile</h1>

    <RegisterForm/>

    <div class="w-full border-b"/>

    <h1 class="text-lg font-semibold">Quick Books Credentials</h1>


    <QuickBookAuthenticationForm/>
  </div>

</template>

<style scoped>

</style>