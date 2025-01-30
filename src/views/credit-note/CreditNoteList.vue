<script setup lang="ts">
import {ArrowRight, Delete, Download, EditPen, Open} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import ValidatedInvoice from "@/views/invoices/ValidatedInvoice.vue";
import {reactive, ref, watch} from "vue"
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
    title: "Credit Note Number",
    dataIndex: "credit_note_number",
    key: "credit_note_number",
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
    title: "Original Invoice Number",
    dataIndex: "",
    key: "inv",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const loadingCustomers = ref(false)
const customers = ref([])


const selectCustomer = (value)=>{
  customerObject.value = value
}

const originalInvoiceNumber = ref(null)

const customerObject = ref(null)

const attemptKraValidation = (credit_note_number, original_invoice_number = originalInvoiceNumber.value, pin)=>{
  store.state.submitLoading = true
  if(original_invoice_number < 1){
    alert('invoice number is required')
  }
  store.dispatch('postData', {data: {
      "pin": pin,
      "credit_note_number": credit_note_number,
      "original_invoice_number": 1001,
    },
    url:"validate/creditnotes"})
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
const backendUrl = ref('get/user/creditnotes')

watch(invoiceNumberFilter, (newFilterValue) => {
  if (newFilterValue) {
    // Ensure no slash before '?'
    backendUrl.value = `get/user/creditnotes?credit_note_number=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'get/user/creditnotes';
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
        title="Credit Notes">

      <template #otherItems>
        <el-input placeholder="search by credit note number" v-model="invoiceNumberFilter"/>

        <!-- <el-select
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
          {{customerObject?.fully_qualified_name}} - {{customerObject?.pin}}</el-tag> -->
      </template>

      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'download_action'">
          <el-checkbox v-if="slotProps.text.is_validated === true" size="large" />
        </template>

        <template v-if="slotProps.column.key === 'customer'">
          {{slotProps?.text?.name}}
        </template>

        <template v-if="slotProps.column.key === 'inv'">
          <el-input type="number" placeholder="original invoice number" v-model="originalInvoiceNumber"/>
        </template>
        
        <template v-if="slotProps.column.key === 'pin'">
          <el-tag v-if="slotProps.text?.customer?.pin === null">Null</el-tag>
          <div>
            {{slotProps.text?.customer?.pin}}
          </div>
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
                    @click="attemptKraValidation(slotProps.text?.credit_note_number,
                      slotProps?.text?.original_invoice_number, 
                      slotProps?.text?.customer?.pin
                      )"
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