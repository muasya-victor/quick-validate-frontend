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
          Update Profile
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

const authData = JSON.parse(localStorage.getItem("authData"))?.user;

const setData = () => {
  form.value = authData
}

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("patchData", {url: 'user',
        data:form.value,
        id:authData?.id}).then((response) => {
        submitLoading.value = false

      })
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


const fetchOnMount = ()=>{
  setData()
}

onMounted(()=>{
  // fetchStores()
  fetchOnMount()
})

</script>

<style scoped></style>