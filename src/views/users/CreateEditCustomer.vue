<template>
  <BaseDialog>
    <template #title>
      Customer
    </template>

    <template #content>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >
        <el-form-item label="Name" prop="name"
                      :rules="[
            {
              required: true,
              message: 'Please input name',
              trigger: 'blur',
            }
         ]"
        >
          <el-input
              v-model="form.name"
              :prefix-icon="UserIcon"
              placeholder="name"
              size="large"
          />
        </el-form-item>
        <el-form-item label="Email" prop="email"
                      :rules="[
            {
              required: true,
              message: 'Please input email',
              trigger: 'blur',
              type: 'email',
            }
         ]"
        >
          <el-input
              v-model="form.email"
              :prefix-icon="UserIcon"
              placeholder="email"
              size="large"
          />
        </el-form-item>
        <el-form-item label="Kra Pin" prop="pin">
          <el-input
              v-model="form.pin"
              :prefix-icon="UserIcon"
              placeholder="pin"
              size="large"
          />
        </el-form-item>
        <!--            <el-input-->
        <div class="flex w-full ">
          <el-button
              :loading="loginLoading"
              class="w-full "
              size="large"
              style="border-radius: 4px"
              type="primary"
              @click="submitForm(ruleFormRef)"
          >
            Submit
          </el-button>
        </div>
        <div class="text-sm hidden">
          <span class="text-gray-400"> Don't have an Account ? </span>
          <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>
        </div>

      </el-form>
    </template>

  </BaseDialog>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
import router from "@/router/index"
import Swal from "sweetalert2";
import BaseDialog from "@/components/base/BaseDialog.vue";
import {useRoute} from "vue-router";
const loading = ref(false);
const form = reactive({
});


const loginLoading = ref(false);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  email:{
    required: true,
    trigger: "blur",
    message: "Please enter email",
    type:"email"
  }
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (route?.name === "edit-customer"){
        delete form.user
        delete form.created_time
        delete form.updated_time
        store
            .dispatch("patchData", {
              url: "get/customers/list",
              data: form,
              id:route.params.id
            })
            .then((resp) => {
              loginLoading.value = false;
              router.push({name:'customers-list'})
            })
            .catch((err)=>{
              loginLoading.value = false;
            })
        ;
      }
      else {
        store
            .dispatch("postData", {
              url: "get/customers/list",
              data: form
            })
            .then((resp) => {
              loginLoading.value = false;
              router.push({name:'customers-list'})
            })
            .catch((err)=>{
              loginLoading.value = false;
            })
        ;
      }
    } else {
      loginLoading.value = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: '<p class="text-red-400">Fill All required Fields</p>',
        timer: 4000,
      });
    }
    loading.value = false;
  });
};

const route = useRoute()

const getOnMount = ()=>{
  console.log(route?.name)
  if (route?.name === "edit-customer") {
    store.dispatch('fetchSingleItem', {url:'get/customers/list', id:route.params.id}).then((res)=>{
      Object.assign(form, res?.data);
      console.log(res?.data)
    })
  }
}


onMounted(()=>{
  getOnMount()
})

</script>

<style scoped></style>