<template>
  <el-dialog v-model="visible" :show-close="false"
             :before-close="closeDialog"
             width="1000" style="border-radius: 5px; max-width: 90%; min-width: 50%">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">
          <slot name="title"/>
        </h4>
        <el-button type="danger" @click="closeDialog">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <slot name="content">

    </slot>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
const router = useRouter()

const visible = ref(true)

const closeDialog = ()=>{
  router.go(-1)
}

</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>
