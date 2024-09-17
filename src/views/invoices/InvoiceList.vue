<script setup>
import {ArrowRight, Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";

const columns = ref([
  {
    title: "Invoice Number",
    dataIndex: "invoice_number",
    key: "invoice_number",
  },
  {
    title: "Date Created",
    dataIndex: "date_created",
    key: "date_created",
  },
  {
    title: "Date Updated",
    dataIndex: "date_updated",
    key: "date_updated",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const attemptKraValidation = (invoice_number)=>{
  store.dispatch('postData', {data: invoice_number});
}

</script>

<template>
  <router-view/>

  <BaseDataTable
      :columns="columns"
      :fetch-url="invoice"
      title="Invoices">


    <template v-slot:bodyCell="slotProps">

      <template v-if="slotProps.column.key === 'is_active'">
        <el-tag size="large" type="success" v-if="slotProps.text === true" class="capitalize">
          {{slotProps.text}}
        </el-tag>

        <el-tag type="danger" size="large" v-else class="capitalize">
          {{slotProps.text}}
        </el-tag>
      </template>

      <template v-if="slotProps.column.key === 'actions'">
        <!--                      {{ slotProps.text }}-->

        <ElButton type="primary"
                  @click="attemptKraValidation('edit-user', slotProps.text?.id)"
                  size="default"
                  plain>
          <template #icon>
            <ArrowRight class="h-fit"/>
          </template>
          <template #default>Validate</template>
        </ElButton>
      </template>
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>