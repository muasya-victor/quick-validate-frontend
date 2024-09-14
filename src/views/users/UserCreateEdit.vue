<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import RegisterForm from "@/views/auth/forms/RegisterForm.vue";
</script>

<template>
  <BaseDialog title="User Registration">
    <template #title>
      <p>User Registration</p>
    </template>
    <template #content>
      <RegisterForm/>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>