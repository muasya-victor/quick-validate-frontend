<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="w-full flex flex-col gap-4"
    label-position="top"
  >
    <div class="flex gap-2 items-center">
      <h1 class="font-bold text-2xl text-[#0b1e17]">{{projectName}}</h1>
    </div>

    <h2 class="font-bold text-gray-400">Sign In</h2>

    <el-form-item label="Email" prop="email"
         :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: 'blur',
            },
         ]"
    >
      <el-input
        v-model="form.email"
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
        class="w-fit "
        size="large"
        style="border-radius: 4px"
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        <!--                @click="submitForm(loginFormRef)"-->

        Login
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
          url: "users/token",
          data: form
        })
        .then((resp) => {
          localStorage.setItem("authData", JSON.stringify(resp.data));
          loginLoading.value = false;

          /**
           * Redirect based on user type
           *
           */
          const user = resp.data?.user;


          if (user.role == 'sales_person' ||
              user.role == 'marketing_person'  && user.branch_id !== null) {
                console.log("user", user)
                router.push({name: 'moves'});
          }else if (user.role == 'sales_person' ||
              user.role == 'marketing_person' && user.branch_id == null) {

            ElNotification({
              title: 'Error',
              type: "error",
              position: "top-right",
              message: 'No Branch Associated.'
            })
          }

          if (user.role == 'admin' || user.user_type == 'organization_manager') {
            if (user.role == 'organization_manager' && user.organization == null) {
              ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'No Firm Associated'
              })

              return;
            }

            router.push({name: 'welcome'});
          }

          if (user.role == 'branch_manager' && user.branch_id !== null) {
            router.push({name: 'branch-view', params: {
              id: user?.branch_id}});
          }
          else if (user.role == 'branch_manager' && user.branch_id == null){
            ElNotification({
              title: 'Error',
              type: "error",
              position: "top-right",
              message: 'No Branch Associated'
            })
          }

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