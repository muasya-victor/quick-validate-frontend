  <template>
    <el-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      class="flex flex-col gap-4 w-full h-fit"
      label-position="top"
    >

      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <el-form-item label="First Name" prop="first_name">
          <el-input
              v-model="form.first_name"
              :prefix-icon="UserIcon"
              placeholder="first name"
              size="large"
              type="text"
          />
        </el-form-item>
        <el-form-item label="Last Name" prop="last_name">
          <el-input
              v-model="form.last_name"
              :prefix-icon="UserIcon"
              placeholder="last name"
              size="large"
              type="text"
          />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
              v-model="form.email"
              :prefix-icon="FolderOpened"
              placeholder="email"
              size="large"
              type="email"
          />
        </el-form-item>
        <el-form-item v-if="route.name !== 'edit-user'" label="Password" prop="password">
          <el-input
              v-model="form.password"
              :prefix-icon="LockClosedIcon"
              placeholder="password"
              show-password
              size="large"
              type="password"
          />
        </el-form-item>
        <el-form-item v-if="route.name !== 'edit-user'" label="Password Confirmation" prop="password_confirmation"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                message: 'Please enter password',
              },
              {
                validator: validatePassword
              }
          ]"
            >
          <el-input
              v-model="form.password_confirmation"
              :prefix-icon="LockClosedIcon"
              placeholder="password"
              show-password
              size="large"
              type="password"
          />
        </el-form-item>
        <el-form-item label="User Type" prop="role" class="w-full">
          <el-select
              clearable
              v-model="form.role"
              placeholder="Select"
              size="large"
          >
            <el-option
                v-for="item in user_types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone_number" class="w-full"
                      :rules="[
              {
                required: true,
                trigger: 'blur',
                message: 'Please enter a valid phone number',
              },
              {
                validator: validatePhoneNumber
              }
          ]"
        >
          <el-input
              v-model="form.phone_number"
              style="max-width: 600px"
              placeholder="Please input phone number"
              class="input-with-select"
              type="number"
          >
            <template #prepend>
              <el-select v-model="form.country_code"
                         placeholder="Country Code" style="width: 60px">
                <el-option label="+254" value="+254" />
                <el-option label="+255" value="+255" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Organization" prop="organization" class="w-full">
          <el-select
              v-model="form.organization"
              clearable
              @focus="fetchStores"
              @change="clearBranch"
              :loading="storeLoading"
              placeholder="Organization To Which a user belongs"
              size="large"
          >
            <template #loading>
              <BaseLoader/>
            </template>
            <el-option
                v-for="item in registeredStores"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Branch **Optional" prop="branch" class="w-full" v-if="form.firm_id">
          <el-select
              v-model="form.branch_id"
              clearable
              @focus="fetchBranches"
              :loading="branchLoading"
              placeholder="Branch To Which a user belongs"
              size="large"
          >
            <template #loading>
              <BaseLoader/>
            </template>
            <el-option
                v-for="item in registeredBranches"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
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
          Register
        </el-button>
      </div>
      <div class="text-sm hidden">
        <span class="text-gray-400"> Already have an Account ? </span>
        <router-link :to="{name:'login'}" class="text-blue-400 hover:text-blue-500 hover:font-bold">
          Sign In </router-link>
      </div>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onMounted , inject} from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/router";
import { FolderOpened } from '@element-plus/icons-vue'
import BaseLoader from "@/components/base/BaseLoader.vue";
import {useRoute} from "vue-router"

const route = useRoute()

const { pushDataToDatabase, submitLoading } = inject('useLifecycle');
const loading = ref(false);

const form = ref({
  first_name: '',
  last_name: '',
  email:''
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Please enter username",
    },
  ],
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  },
});

const clearBranch = ()=>{
  if(form.value.hasOwnProperty('branch_id')) {
    delete form.value.branch_id
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    console.log(fields,'fields')
    if (valid) {
      if (route.name == 'register-user') {
        pushDataToDatabase('postData','users', form)
      }

      if (route.name == 'edit-user') {
        // console.log(form.value.firm_id.value, 'form')
        let payload = {...form.value, branch_id:form.value.branch_id}
        console.log(form.value.branch_id, 'payload')


        // pushDataToDatabase('putData','users', payload, route?.params?.id)
        store.dispatch("putData", {url: 'users', data:payload, id:route?.params.id}).then((response) => {
              submitLoading.value = false

        })
      }
    } else {
      submitLoading.value = false;
    }
    loading.value = false;
  });
};

const user_types = [
  {
    value: 'admin',
    label: 'Super Admin',
  },
  {
    value: 'branch_manager',
    label: 'Branch Manager',
  },{
    value: 'organization_manager',
    label: 'Organization Owner',
  },
  {
    value: 'sales_person',
    label: 'Sales Person',
  },
  {
    value: 'marketing_person',
    label: 'Marketing Person',
  }
]

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.value.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const validatePhoneNumber = (rule, value, callback) => {
  const phoneNumberPattern = /^[0-9]+$/; // Regular expression to match only digits

  if (value){
    if (value.length < 7) {
      callback(new Error('Phone number must be at least 7 characters'));
    } else if (value.length > 11) {
      callback(new Error('Phone number must be no more than 11 characters'));
    } else if (!phoneNumberPattern.test(value)) {
      callback(new Error('Phone number must contain only digits'));
    } else {
      callback();
    }
  }

};

const registeredStores = ref([])
const storeLoading = ref(false)

const fetchStores = ()=>{
  storeLoading.value= true
  registeredStores.value = []

  store.dispatch('fetchList', {url:'organizations'})
      .then((resp)=>{
        console.log("resp", resp.data)
        resp.data.map((store)=>{
          registeredStores.value.push({
            'label': store.name,
            'value': store.id,
          })
        })
        storeLoading.value= false
      })
      .catch(err=>{
        storeLoading.value= false
      })
}

const registeredBranches = ref([])
const branchLoading = ref(false)

const fetchBranches = ()=>{
  branchLoading.value= true
  registeredBranches.value = []

  let newUrl = `firms/${form.value?.organization}/branches`

  if (route.name == 'edit-user') {
    // console.log(form.value?.firm_id?.value)
    newUrl = `firms/${form.value?.firm_id}/branches`
  }

  store.dispatch('fetchList', {url:newUrl})
      .then((resp)=>{
        registeredBranches.value = resp?.data

        // registeredBranches.value = resp.data
        branchLoading.value= false
      })
      .catch(err=>{
        branchLoading.value= false
      })
}

const fetchOnMount = ()=>{
  if (route.name == 'edit-user') {
    fetchStores()
    store.dispatch('fetchSingleItem', {url:`users`, id:route?.params?.id}).then((res)=>{
      // fill firm Data
      if (res.data?.firm_id) {
        store.dispatch('fetchSingleItem', {url:`firms`, id: res?.data.organization}).then((resp)=>{
          form.value.organization = {value: resp.data.id, label:resp.data?.name}
        })
      }

      // fill branch data
      if (res.data?.branch_id) {
        store.dispatch('fetchSingleItem', {url:`branches`, id: res?.data.branch_id}).then((resp)=>{
          form.value.branch_id = {value: resp.data.id, label:resp.data?.name}
        })
      }
      form.value = res?.data
      console.log(res.data.user)
    })
  }
}

onMounted(()=>{
  // fetchStores()
  fetchOnMount()
})

</script>

<style scoped></style>