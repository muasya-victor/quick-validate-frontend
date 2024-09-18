<script setup>

import {ref} from "vue"
import TheSideNav from "@/components/TheSideNav.vue";
import { UserFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {deleteLocalStorageInformation} from "@/utility/functions.js";
import {useRouter, useRoute} from "vue-router";
const store = useStore()
const router = useRouter()
import {watch, computed} from "vue"

const breadcrumbStyle = computed(() => {
  return {
    'separator-color': store.getters.getLightMode ? '#ffd04b' : '#ffd04b'
  };
});

const routerViewStyle = computed(() => {
  return {
    // Add dynamic styles based on the theme
    color: store.getters.getLightMode ? 'gray' : 'white',
    backgroundColor: store.getters.getLightMode ? 'white' : 'gray',
    // Add any other styles you want to apply
  };
});

const logout = ()=>{
  deleteLocalStorageInformation()
  router.replace({name:'login'})
}
const authData = JSON.parse(localStorage.getItem("authData"));

const route = useRoute();
const breadcrumbs = ref([]);

const updateBreadcrumbs = () => {
  breadcrumbs.value = route.matched.map(route => ({
    path: route.path,
    label: route.meta.slug || route.name
  }));
};

watch(route, updateBreadcrumbs, { immediate: true });

</script>

<template>
  <div class=" flex flex-col  min-w-full  h-screen items-center">
    <div class="w-full flex border-b items-center justify-between gap-4 py-2 px-4">

      <div class="hidden h-[60px] w-[200px]  flex items-center  text-center text-2xl font-bold text-blue-500">
        Quick Validate
      </div>

      <div class=" py-2 md:flex items-center  hidden ">
        <div class="w-[40px]"
             @click="store.state.sideNavCollapse = !store.state.sideNavCollapse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </div>
      </div>

      <div class="w-full flex items-center justify-end md:justify-between h-fit p-0">
        <el-breadcrumb :style="breadcrumbStyle" separator="/" class="hidden md:block">
          <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            <span v-if="breadcrumb?.label === 'Dashboard' || breadcrumb?.label === 'dashboard'">Dashboard </span>
            <router-link v-else :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>


        <el-popover
            placement="bottom"
            title="Profile"
            :width="200"
            trigger="click"
            content="this is content, this is content, this is content"
        >
          <template #reference>
            <!--            <div size="default" class="cursor-pointer font-extrabold flex gap-2 h-12 px-2  w-fit rounded text-white items-center justify-center"  >-->
            <!--              <span>{{authData?.user?.first_name[0]}}</span> <span>{{authData?.user?.last_name[0]}}</span>-->
            <!--            </div>-->
            <div class=" font-bold  rounded-md border border-gray-200 shadow-sm hover:shadow-lg
              h-[30px] w-[30px] md:w-fit md:h-fit p-0 md:p-2 flex items-center
              justify-center cursor-pointer">
              <div class="flex p-0 items-center w-full h-fit
                 text-center justify-center">
                {{authData?.user?.first_name[0]}} {{authData?.user?.last_name[0]}}
              </div>

            </div>
          </template>

          <template #default>
            <div class="w-full border-t flex flex-col gap-2 py-2">
              <div class="flex flex-col p-2 bg-gray-100 capitalize items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md">
                <p class="w-full">
                  {{authData?.user?.first_name}} {{authData?.user?.last_name}}

                </p>
                <p class="w-full" >
                  {{authData?.user?.phone_country_code}}
                  {{authData?.user?.phone_local_number}}
                </p>
              </div>
              <button
                  @click="logout"
                  class="w-full p-3 h-10 rounded-md flex items-center justify-center gap-2 hover:text-lg bg-red-500 text-white">
                logout

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </template>
        </el-popover>
      </div>


      <div class="sm:flex items-center border-b md:hidden ">
        <el-button class="w-[40px] bg-amber-600" size="large"
                   @click="store.state.ShowMobileMenu = !store.state.ShowMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </el-button>
      </div>

    </div>
    <!--    end top nav-->

    <div class="flex flex-1 w-full pr-2 overflow-y-auto">
      <div class="hidden md:block z-50">
        <TheSideNav/>
      </div>

      <div :style="routerViewStyle" class="flex-1 p-2 md:pt-0 bg-gray-50
        overflow-x-hidden ">
        <el-breadcrumb separator="/"
                       :style="breadcrumbStyle"
                       class="md:hidden" >
          <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index">
            <span v-if="breadcrumb?.label === 'Dashboard' || breadcrumb?.label === 'dashboard'">Dashboard </span>
            <router-link v-else :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="bg-gray-50 h-full w-full">
          <router-view :style="routerViewStyle"/>
        </div>

      </div>

    </div>

    <div class="py-2 border w-full text-center text-xs bg-gray-200 text-gray-500">
      system by <a href="mailto:vicmwe184@gmail.com">Muasya</a>
    </div>
  </div>
  <TheSideNav v-if="store.state.ShowMobileMenu"/>

</template>

<style scoped>

</style>