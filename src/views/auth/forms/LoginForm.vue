<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="w-full flex flex-col gap-4"
    label-position="top"
  >
    <div class="flex gap-2 items-start">
<!--      <h1 class="font-bold text-2xl text-blue-500">{{projectName}}</h1>-->
      <img src="/logo.png" alt="quick validate logo" class="w-20">
    </div>

    <el-form-item label="Username" prop="username"
         :rules="[
            {
              required: true,
              message: 'Please input username',
              trigger: 'blur',
            }
         ]"
    >
      <el-input
        v-model="form.username"
        :prefix-icon="UserIcon"
        placeholder="email"
        size="large"
      />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="form.password"
        :prefix-icon="LockClosedIcon"
        placeholder="password"
        show-password
        size="large"
        type="password"
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
        <!--                @click="submitForm(loginFormRef)"-->

        Sign In to Quick Validate
      </el-button>
    </div>
    <div class="text-sm hidden">
      <span class="text-gray-400"> Don't have an Account ? </span>
      <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>
    </div>

  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
import router from "@/router/index"
import Swal from "sweetalert2";
import {projectName} from "@/utility/constants.js"
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
  },
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  }
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
        .dispatch("postData", {
          url: "token/request",
          data: form
        })
        .then((resp) => {
          localStorage.setItem("authData", JSON.stringify(resp.data));
          loginLoading.value = false;

          router.push({name:'invoice-list'})
        })
          .catch((err)=>{
            loginLoading.value = false;
          })
      ;
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

</script>

<style scoped></style>