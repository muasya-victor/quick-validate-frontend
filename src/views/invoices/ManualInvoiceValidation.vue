<script setup lang="ts">
import {reactive, ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});


const form = ref({
  invoice_number:1016
})
const postManually = ref(false)
const submitLoading = ref(false);

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  console.log(form.value, 'form')
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("postData", {url: 'invoice',
        data:form.value}).then((response) => {
        submitLoading.value = false

      })
    } else {
      submitLoading.value = false;
    }
    submitLoading.value = false;
  });
};



</script>

<template>
  <div class=" h-full w-full">
    <router-view/>

    <div class="py-4">

      <el-form
               label-position="top"
               :model="form"
               ref="ruleForm"
               label-width="100px">
        <el-form-item label="Invoice Number"
                      prop="invoice_number"
                      class="w-full md:w-[200px]">
          <el-input-number
              style="width: 100%"
              v-model="form.invoice_number"/>
        </el-form-item>

        <el-button
            class="w-full md:w-[200px]"
            :loading="submitLoading"
            @click="submitForm(ruleForm)"
            type="primary"
        >Validate Invoice
        </el-button>
      </el-form>
    </div>

  </div>

</template>

<style scoped>

</style>