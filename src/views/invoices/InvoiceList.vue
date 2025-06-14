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
    title: "Total Amount",
    dataIndex: "",
    key: "total_taxable_amount",
  },
  {
    title: "Customer Name",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Customer Pin",
    dataIndex: "",
    key: "pin",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const loadingInvoices = ref(false)
const invoices = ref([])

const getInvoices = ()=>{
  loadingInvoices.value = true
  invoices.value = []
  store.dispatch('fetchList', {url:'get/user/invoices'})
      .then((resp)=>{
        console.log(resp, 'invoices');
        invoices.value = resp?.data?.results
        loadingInvoices.value = false
        // return invoices;
      })
      .catch((err)=>{
        loadingInvoices.value = false
      })
}

const selectInvoice = (value)=>{
  invoiceNumberFilter.value = value
}

const validateWithoutCustomer = ref(false)


const attemptKraValidation = (invoice_number, invoice_id, cfm_date)=>{
  store.state.submitLoading = true
  selected_invoice_id.value = invoice_id

  store.dispatch('postData', {data: {
      "cfm_date": cfm_date,
      "invoice_number": invoice_number,
    },
    url:"validate/invoices"})
      .then((response)=>{
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
const backendUrl = ref('get/user/invoices')

watch(invoiceNumberFilter, (newFilterValue) => {
  if (newFilterValue) {
    backendUrl.value = `get/user/invoices?invoice_number=${newFilterValue}&customer_name=${newFilterValue}&total_taxable_amount=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'get/user/invoices';
    store.state.refreshData = false;
  }
});

const clearInvoice = ()=>{
  invoiceNumberFilter.value = ''
}


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
        <!-- <el-switch
            v-model="validateWithoutCustomer"
            size="large"
            active-text="Open Validation"
            inactive-text="Customer Validation"
        /> -->

        <el-select
            clearable
            filterable
            size="large"
            @focus="getInvoices"
            @change="selectInvoice"
            placeholder="Search by Invoice"
            :loading="loadingInvoices"
            style="width: 300px"
        >
          <el-option
              v-for="item in invoices"
              :key="item.value"
              :value="item.invoice_number"
          >
            {{ item?.invoice_number }} ,
            {{ item?.customer?.name }} ,
            {{ item?.total_taxable_amount }}
          </el-option>
        </el-select>


        <el-tag @close="clearInvoice"
         v-if="invoiceNumberFilter !== ''" closable type="success" class="h-full flex items-center gap-2" size="large">
          Invoice :
          {{invoiceNumberFilter}}
        </el-tag>

      </template>

      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'download_action'">
          <el-checkbox v-if="slotProps.text.is_validated === true" size="large" />
        </template>

        <template v-if="slotProps.column.key === 'customer'">
          {{slotProps?.text?.name}}
        </template>

        <template v-if="slotProps.column.key === 'total_taxable_amount'">
          <div v-if="slotProps?.text?.total_taxable_amount !== null">
            {{slotProps?.text?.total_taxable_amount}}
          </div>
          <div v-else>
            0
          </div>
        </template>

        <template v-if="slotProps.column.key === 'pin'">
          <el-tag v-if="slotProps.text?.customer?.pin === null">Null</el-tag>
          {{slotProps.text?.customer?.pin}}
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
                    v-if="slotProps.text?.is_validated === false && customer !== null"
                    @click="attemptKraValidation(slotProps.text?.invoice_number, slotProps?.text?.id, slotProps?.text?.cfm_date)"
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