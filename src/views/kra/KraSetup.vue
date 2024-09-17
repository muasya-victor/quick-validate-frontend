<template>
  <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      class="flex flex-col gap-4 w-full h-fit"
      label-position="top"
  >

    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
      <el-form-item label="Pin" prop="pin">
        <el-input
            v-model="form.pin"
            :prefix-icon="UserIcon"
            placeholder="client Id"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Branch Id" prop="branch_id">
        <el-input
            v-model="form.branch_id"
            :prefix-icon="UserIcon"
            placeholder="client Id"
            size="large"
            type="text"
        />
      </el-form-item>
    </div>


    <div class="flex w-full ">
      <el-button
          :loading="submitLoading"
          class="w-fit "
          size="large"
          style="border-radius: 4px"
          type="primary"
          html-type="submit"
          @click="submitForm(ruleForm)"
      >
        Submit Quick Book Credentials
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted , inject} from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/router";
import {useRoute} from "vue-router"

const route = useRoute()

const loading = ref(false);

const form = ref({
  invoice_number: 0,
  pin: 0,
  branch_id: 0,
  original_invoice_number: 0,
  customer_pin: 0,
  customer_name: '',
  sales_type_code: 0,
  reciept_type_code: 0,
  payment_type_code: 0,
  sales_standard_code: 0,
  cfm_date: '',
  sales_date: '',
  stock_released_date: '',
  cancel_requested_date: '',
  cancel_date: '',
  credit_note_date: '',
  credit_note_reason_code: 0,
  total_item_count: 0,
  taxable_amountA: 0,
  taxable_amountB: 0,
  taxable_amountC: 0,
  taxable_amountD: 0,
  taxable_amountE: 0,
  tax_rateA: 0,
  tax_rateB: 0,
  tax_rateC: 0,
  tax_rateD: 0,
  tax_rateE: 0,
  tax_amountA: 0,
  tax_amountB: 0,
  tax_amountC: 0,
  tax_amountD: 0,
  tax_amountE: 0,
  total_taxable_amount: 0,
  purchase_accept_Y_N: '',
  remark: '',
  registration_id: 0,
  registration_name: '',
  modifier_id: 0,
  modifier_name: '',
  customer_mobile_number: '',
  receipt_published_date: '',
  receipt_number: '',
  trader_name: '',
  address: '',
  top_message: '',
  bottom_message: '',
  item_sequence: 0,
  item_code: 0,
  item_classification_code: 0,
  item_name: '',
  barcode: '',
  packaging_unit_code: 0,
  package: 0,
  quantity_unit_code: 0,
  quantity: 0,
  price: 0,
  supply_amount: 0,
  discount_rate: 0,
  discount_amount: 0,
  insurance_company_code: 0,
  insurance_company_name: '',
  insurance_rate: 0,
  insurance_amount: 0,
  taxation_type_code: 0,
  taxable_amount: 0,
  total_tax_amount: 0,
  total_amount: 0
});


const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});

const authData = JSON.parse(localStorage.getItem("authData"))?.user;

const setData = () => {
  form.value = authData
}

const submitLoading = ref(false);

const fetchQuickBookDetails = ()=>{
  store.dispatch('fetchList', {url:`quickbook-authentication?user=${authData?.id}`})
      .then((res)=>{
        form.value = res.data?.results[0]
      })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("patchData", {url: 'quickbook-authentication',
        data:form.value,
        id:form.value?.id}).then((response) => {
        submitLoading.value = false

      })
    } else {
      submitLoading.value = false;
    }
    loading.value = false;
  });
};

const fetchOnMount = ()=>{
  fetchQuickBookDetails()
}

onMounted(()=>{
  fetchOnMount()
})

</script>

<style scoped></style>