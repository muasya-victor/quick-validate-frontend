<script lang="ts" setup>
import { computed } from 'vue'
import {useStore} from "vuex";
import AdminLinks from "@/components/routerLinks/AdminLinks.vue";
import StoreOwnerLinks from "@/components/routerLinks/StoreOwnerLinks.vue";
import TheMobileMenu from "@/components/TheMobileMenu.vue";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const authData = JSON.parse(localStorage.getItem("authData"));

const navigateToSelectedPage = (index)=>{
  let selectedParams;

  try {
    /**
     * Where data has been json parsed , then there a parameter is required
     */
    selectedParams = JSON.parse(index);
    router.push({name: selectedParams.name, params: {id: selectedParams.id}});
  } catch {
    router.push({name: index})
  }
}

const themeStyle = computed(() => {
  const lightMode = store.getters.getLightMode;
  return lightMode
      ? {
        '--background-color': '#545c64',
        '--text-color': '#fff',
        '--hover-background-color': '#666',
        '--active-background-color': '#666',
        '--active-text-color': '#ffd04b'
      }
      : {
        '--background-color': 'white',
        '--text-color': 'black',
        '--hover-background-color': '#f5f5f5',
        '--active-background-color': '#e0e0e0',
        '--active-text-color': '#ffd04b'
      };
});


</script>

<template>

  <div class="hidden md:flex flex-col gap-4 w-fit h-full border-r" >

<!--
        v-if="authData?.user?.user_type === 'admin'"
-->
    <el-menu
        default-active="1"
        :class="{'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode}"
        class="el-menu-vertical-demo "
        style="border: none;"
        :active-text-color="store.getters.getLightMode ? 'blue' : '#ffd04b'"
        :background-color="store.getters.getLightMode ? 'white' : 'gray'"
        :text-color="store.getters.getLightMode ? 'black' : 'black'"
        :style="themeStyle"
        :collapse="store.state.sideNavCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="navigateToSelectedPage"
    >
      <AdminLinks/>
    </el-menu>


    <el-menu
        default-active="1"
        v-if="authData?.user?.user_type === 'store_owner'"
        class="el-menu-vertical-demo "
        style="border: none;"
        :collapse="store.state.sideNavCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="navigateToSelectedPage"
    >
      <StoreOwnerLinks/>
    </el-menu>

  </div>

  <!--    MOBILE NAV -->
  <div class="sm:flex md:hidden">
    <TheMobileMenu :class="{'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode}">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo "
          style="border: none; width: 100%"
          :collapse="!store.state.ShowMobileMenu"
          @open="handleOpen"
          @close="handleClose"
          @select="navigateToSelectedPage"
      >
        <AdminLinks/>
      </el-menu>

      <el-menu
          default-active="1"
          v-if="authData?.user?.user_type === 'store_owner'"
          class="el-menu-vertical-demo "
          style="border: none;"
          :collapse="!store.state.sideNavCollapse"
          @open="handleOpen"
          @close="handleClose"
      >
        <StoreOwnerLinks/>
      </el-menu>
    </TheMobileMenu>

  </div>
</template>



<!--<style scoped>-->
<!--/* General styles for menu */-->
<!--.el-menu-vertical-demo {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--  color: var(&#45;&#45;text-color);-->
<!--}-->

<!--/* Handle hover state for menu items and submenu titles */-->
<!--.el-menu-vertical-demo .el-menu-item:hover,-->
<!--.el-menu-vertical-demo .el-submenu__title:hover {-->
<!--  background-color: var(&#45;&#45;hover-background-color);-->
<!--}-->

<!--/* Handle active state for menu items and submenu titles */-->
<!--.el-menu-vertical-demo .el-menu-item.is-active,-->
<!--.el-menu-vertical-demo .el-submenu__title.is-active {-->
<!--  background-color: var(&#45;&#45;active-background-color);-->
<!--}-->

<!--/* Ensure unselected items are also styled */-->
<!--.el-menu-vertical-demo .el-menu-item:not(.is-active),-->
<!--.el-menu-vertical-demo .el-submenu__title:not(.is-active) {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--}-->

<!--/* Drop-down menu styles */-->
<!--.el-menu-vertical-demo .el-submenu .el-menu {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--}-->

<!--/* Drop-down menu item styles */-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--}-->

<!--/* Drop-down menu item hover styles */-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item:hover {-->
<!--  background-color: var(&#45;&#45;hover-background-color);-->
<!--}-->

<!--/* Drop-down menu item active styles */-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item.is-active {-->
<!--  background-color: var(&#45;&#45;active-background-color);-->
<!--}-->

<!--/* Non-collapsed state of submenu */-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) .el-submenu .el-menu {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--}-->

<!--/* Non-collapsed state submenu item styles */-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) .el-submenu .el-menu-item {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--}-->

<!--/* Non-collapsed state submenu item hover styles */-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) .el-submenu .el-menu-item:hover {-->
<!--  background-color: var(&#45;&#45;hover-background-color);-->
<!--}-->

<!--/* Non-collapsed state submenu item active styles */-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) .el-submenu .el-menu-item.is-active {-->
<!--  background-color: var(&#45;&#45;active-background-color);-->
<!--}-->

<!--/* Width and height for non-collapsed state */-->
<!--.el-menu-vertical-demo:not(.el-menu&#45;&#45;collapse) {-->
<!--  width: 200px;-->
<!--  min-height: 400px;-->
<!--}-->

<!--/* Ensure submenu heading and links have white background */-->
<!--.el-menu-vertical-demo .el-submenu__title,-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item {-->
<!--  background-color: var(&#45;&#45;background-color);-->
<!--  color: var(&#45;&#45;text-color);-->
<!--}-->

<!--/* Adjust background color for submenu heading and links on hover */-->
<!--.el-menu-vertical-demo .el-submenu__title:hover,-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item:hover {-->
<!--  background-color: var(&#45;&#45;hover-background-color);-->
<!--}-->

<!--/* Adjust background color for submenu heading and links on active state */-->
<!--.el-menu-vertical-demo .el-submenu__title.is-active,-->
<!--.el-menu-vertical-demo .el-submenu .el-menu-item.is-active {-->
<!--  background-color: var(&#45;&#45;active-background-color);-->
<!--}-->
<!--</style>-->

