<template>
  <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      class="flex flex-col gap-4 w-full h-fit"
      label-position="top"
  >

    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
      <el-form-item label="Pin" prop="pin">
        <el-input
            v-model="form.pin"
            :prefix-icon="UserIcon"
            placeholder="client pin"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Company Id" prop="quickbooks_company_id">
        <el-input
            v-model="form.quickbooks_company_id"
            :prefix-icon="UserIcon"
            placeholder="company Id"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Minor Version" prop="quickbooks_minorversion">
        <el-input
            v-model="form.quickbooks_minorversion"
            :prefix-icon="UserIcon"
            placeholder="Minor Version"
            size="large"
            type="text"
        />
      </el-form-item>

      <el-form-item label="Branch Id" prop="branch_id">
        <el-input
            v-model="form.branch_id"
            :prefix-icon="UserIcon"
            placeholder="Minor Version"
            size="large"
            type="text"
        />
      </el-form-item>

      <el-form-item label="Cmckey" prop="cmckey">
        <el-input
            v-model="form.cmckey"
            :prefix-icon="UserIcon"
            placeholder="Minor Version"
            size="large"
            type="text"
        />
      </el-form-item>
    </div>


    <div class="flex w-full ">
      <el-button
          :loading="submitLoading"
          class="w-fit "
          size="large"
          style="border-radius: 4px"
          type="primary"
          html-type="submit"
          @click="submitForm(ruleForm)"
      >
        Submit Quick Book Credentials
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted , inject} from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/router";
import { FolderOpened } from '@element-plus/icons-vue'
import BaseLoader from "@/components/base/BaseLoader.vue";
import {useRoute} from "vue-router"

const route = useRoute()

console.log(route?.params?.id);


const loading = ref(false);

const form = ref({
  first_name: '',
  last_name: '',
  email:''
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});

const authData = JSON.parse(localStorage.getItem("authData"))?.user;

const setData = () => {
  form.value = authData
}

const submitLoading = ref(false);

const fetchQuickBookDetails = ()=>{
  store.dispatch('fetchList', {url:`quickbook-authentication?user=${route?.params?.id}`})
      .then((res)=>{
        form.value = res.data?.results[0]
      })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("patchData", {url: 'quickbook-authentication',
        data:form.value,
        id:form.value?.id}).then((response) => {
        submitLoading.value = false

      })
    } else {
      submitLoading.value = false;
    }
    loading.value = false;
  });
};

const fetchOnMount = ()=>{
  fetchQuickBookDetails()
}

onMounted(()=>{
  fetchOnMount()
})

</script>

<style scoped></style>