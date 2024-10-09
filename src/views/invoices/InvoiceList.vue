<script setup lang="ts">
import {ArrowRight, Delete, Download, EditPen, Open} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import ValidatedInvoice from "@/views/invoices/ValidatedInvoice.vue";
import {reactive, ref, watch} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";
import {formatDate} from "@/utility/functions"
import BaseLoader from "@/components/base/BaseLoader.vue";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});
const columns = ref([
  {
    title: "",
    dataIndex: "",
    key: "download_action",
  },
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

const loadingCustomers = ref(false)
const customers = ref([])

const getCustomers = ()=>{
  loadingCustomers.value = true
  customers.value = []
  store.dispatch('fetchList', {url:'customers-list'})
      .then((resp)=>{
        resp.data.map((customer) => {
          customers.value.push({
            label: `${customer.fully_qualified_name} - ${customer.pin}`,
            value: customer,
          })
        })
        loadingCustomers.value = false
        // return customers;
      })
      .catch((err)=>{
        loadingCustomers.value = false
      })
}

const selectCustomer = (value)=>{
  customerObject.value = value
}

const customerObject = ref(null)

const attemptKraValidation = (invoice_number, invoice_id)=>{
  store.state.submitLoading = true
  selected_invoice_id.value = invoice_id

  store.dispatch('postData', {data: {
      "customer_kra_pin": customerObject.value?.pin,
      "invoice_number": invoice_number,
    },
    url:"invoice"})
      .then((response)=>{
        if (selected_invoice_id.value != null && response.data?.download_url){
          store.dispatch('patchData', {url: 'invoice-list', id: selected_invoice_id.value,
            data:{is_validated:true, validated_invoice_url: response.data?.download_url}})
              .then((resp)=>{{
                customerObject.value = null
              }})
        }
        showValidatedInvoice.value = true;
        validatedInvoicePdfUrl.value = response.data?.download_url;
        store.state.submitLoading = false

      })
      .catch((err)=>{
        showValidatedInvoice.value = false;
        store.state.submitLoading = false
      })
  ;
}

const viewSelectedInvoice = (download_url)=>{
  console.log(download_url, 'url')
  showValidatedInvoice.value = true;
  validatedInvoicePdfUrl.value = download_url;
}

const form = ref({
  invoice_number:1020
})
const postManually = ref(false)

const invoiceNumberFilter = ref('')
const backendUrl = ref('invoice-list')

watch(invoiceNumberFilter, (newFilterValue) => {
  if (newFilterValue) {
    // Ensure no slash before '?'
    backendUrl.value = `invoice-list?invoice_number=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'invoice-list';
    store.state.refreshData = false;
  }
});


const showValidatedInvoice = ref(false)
const validatedInvoicePdfUrl = ref('')
const selected_invoice_id = ref(null)
const submitLoading = ref(false);

const handleDialogClose = ()=> {
  showValidatedInvoice.value = false
}

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

    <div v-if="store.state.submitLoading" class="h-full w-full flex justify-center items-center text-blue-500">
      <BaseLoader/>
    </div>

    <BaseDataTable
        :columns="columns"
        :show-other-items="true"
        :fetch-url="backendUrl"
        v-if="!store.state.submitLoading"
        title="Invoices">

      <template #otherItems>
        <el-input placeholder="search by invoice number" v-model="invoiceNumberFilter"/>

        <el-select
            clearable
            size="large"
            @focus="getCustomers"
            @change="selectCustomer"
            placeholder="Select Customer To Validate"
            :loading="loadingCustomers"
            style="width: 240px"
        >
          <el-option
              v-for="item in customers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>


        <el-tag v-if="customerObject !== null" type="success" class="h-full" size="large">Customer :
          {{customerObject?.fully_qualified_name}} - {{customerObject?.pin}}</el-tag>
      </template>

      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'download_action'">
          <el-checkbox v-if="slotProps.text.is_validated === true" size="large" />
          </template>

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
          <ElButton type="primary"
                    v-if="slotProps.text?.is_validated === false && customerObject !== null"
                    @click="attemptKraValidation(slotProps.text?.invoice_number, slotProps?.text?.id)"
                    size="default"
                    plain>
            <template #icon>
              <ArrowRight class="h-fit"/>
            </template>
            <template #default>Validate</template>
          </ElButton>
          <ElButton v-if="slotProps.text?.is_validated === true"
                    @click="viewSelectedInvoice(slotProps.text?.validated_invoice_url)"
                    size="default"
                    plain>
            <template #icon>
              <Open class="h-fit"/>
            </template>
            <template #default>View Validated Invoice</template>
          </ElButton>
        </template>
      </template>
    </BaseDataTable>
  </div>

</template>

<style scoped>

</style>