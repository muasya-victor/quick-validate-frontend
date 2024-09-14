<script lang="ts" setup>
import {h, ref} from 'vue'
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'
import {useStore} from "vuex";

const drawer = ref(true)
const direction = ref<DrawerProps['direction']>('ttb')
const store = useStore()

</script>

<template>
  <el-drawer
      v-model="store.state.ShowMobileMenu"
      title="Menu"
      :direction="direction"
      size="90%"
  >
    <slot></slot>
  </el-drawer>
  </template>

<style scoped>

</style>