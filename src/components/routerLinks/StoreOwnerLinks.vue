<script setup>

import {DataAnalysis, Setting} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu-item index="1">
    <el-icon>
      <data-analysis/>
    </el-icon>
    <template #title>My Stores</template>
  </el-menu-item>
  <el-menu-item index="4">
    <el-icon><setting /></el-icon>
    <template #title>Profile</template>
  </el-menu-item>
</template>

<style scoped>

</style>