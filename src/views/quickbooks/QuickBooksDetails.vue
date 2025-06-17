<script setup>


import store from "@/store/index.js";
import {onMounted} from "vue";
import BaseLoader from "@/components/base/BaseLoader.vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import QuickBookAuthenticationForm from "@/views/auth/QuickBookAuthenticationForm.vue";

</script>

<template>
  <div>
    <BaseDialog>
        <template #content>
            <QuickBookAuthenticationForm/>
        </template>
    </BaseDialog>
  </div>
</template>

<style scoped>

</style>