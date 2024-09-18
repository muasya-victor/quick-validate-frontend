<script setup lang="ts">
import {ArrowRight, Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import ValidatedInvoice from "@/views/invoices/ValidatedInvoice.vue";
import {reactive, ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";
import {formatDate} from "@/utility/functions"

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
    dataIndex: "created_date",
    key: "created_date",
  },
  {
    title: "Date Updated",
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const attemptKraValidation = (invoice_number)=>{
  store.dispatch('postData', {data: {"invoice_number": invoice_number}, url:"invoice"});
}

const form = ref({
  invoice_number:1020
})
const postManually = ref(false)
const showValidatedInvoice = ref(false)
const validatedInvoicePdfUrl = ref('')
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

      <div v-if="postManually" class="py-4">
        <el-form
                 label-position="top"
                 :model="form"
                 ref="ruleForm"
                 label-width="100px">
          <el-form-item label="Invoice Number"
                        prop="invoice_number"
                        class="w-full md:w-[200px]">
            <el-input-number
                size="large"
                style="width: 100%"
                v-model="form.invoice_number"/>
          </el-form-item>

          <el-button
              class="w-full md:w-[200px]"
              size="large"
              :loading="submitLoading"
              @click="submitForm(ruleForm)"
              type="primary"
          >Validate Invoice
          </el-button>
        </el-form>
      </div>

    </div>

    <BaseDataTable
        :columns="columns"
        fetch-url="invoice-list"
        v-if="!postManually"
        title="Invoices">


      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'created_date'">
          {{formatDate(slotProps.text)}}
        </template>
        <template v-if="slotProps.column.key === 'updated_date'">
          {{formatDate(slotProps.text)}}
        </template>

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
                    @click="attemptKraValidation(slotProps.text?.invoice_number)"
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