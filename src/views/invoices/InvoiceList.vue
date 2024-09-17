<script setup lang="ts">
import {ArrowRight, Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import ValidatedInvoice from "@/views/invoices/ValidatedInvoice.vue";
import {reactive, ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});
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
  store.dispatch('postData', {data: invoice_number, url:"invoice"});
}

const form = ref({
  invoice_number:58585
})
const postManually = ref(true)
const showValidatedInvoice = ref(false)
const validatedInvoicePdfUrl = ref('https://advatech.up.railway.app/media/verified_invoices/verified_invoice_id_187.pdf')
const submitLoading = ref(false);

const handleDialogClose = ()=> {
  showValidatedInvoice.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  console.log(form.value, 'form')
  validatedInvoicePdfUrl.value = '';

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("postData", {url: 'invoice',
        data:form.value}).then((response) => {
        showValidatedInvoice.value = true;
          validatedInvoicePdfUrl.value = response.data?.download_url;
        submitLoading.value = false

      })
    } else {
      submitLoading.value = false;
      showValidatedInvoice.value = true;
    }
    submitLoading.value = false;
  });
};



</script>

<template>
  <div class=" h-full w-full">
    <router-view/>

    <div
        v-if="showValidatedInvoice"
    >
      <ValidatedInvoice
          @close-dialog="handleDialogClose"
          :download-url="validatedInvoicePdfUrl"/>
    </div>


    <div class="py-4">
      <el-switch
          active-text="Use Invoice Number To Validate"
          inactive-text="Validate From List"
          v-model="postManually"/>

      <el-form v-if="postManually"
               label-position="top"
               :model="form"
               ref="ruleForm"
               label-width="100px">
        <el-form-item label="Invoice Number"
                      prop="invoice_number"
                      class="w-full md:w-[200px]">
          <el-input-number
              style="width: 100%"
              v-model="form.invoice_number"/>
        </el-form-item>

        <el-button
            class="w-full md:w-[200px]"
            :loading="submitLoading"
            @click="submitForm(ruleForm)"
            type="primary"
          >Validate Invoice
        </el-button>
      </el-form>
    </div>

    <BaseDataTable
        :columns="columns"
        fetch-url="invoice"
        v-if="!postManually"
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
  </div>

</template>

<style scoped>

</style>