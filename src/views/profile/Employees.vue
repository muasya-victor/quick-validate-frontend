<script setup>
import {Delete, EditPen} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {ref} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
const userType = JSON.parse(localStorage.getItem("authData"))?.user?.user_type;

const props = defineProps(
    {
      newUrl : {
        type: String,
        default : 'users'
      },
    })

const columns = ref([
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Role",
    dataIndex: "user_type",
    key: "user_type",
  },
  {
    title: "Is Active",
    dataIndex: "is_active",
    key: "is_active",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const goTo = (name, id)=>{
  router.push({name: name, params: {id: id}});
}

const deleteUser =  (id)=> {
  store.dispatch('deleteData',{id: id, url: 'users'});
  allowDelete.value = ''
}


const activateUser =  (id)=> {
  store.dispatch('putData',{id: id, url: 'users', data:null});
}
const allowDelete = ref('');

</script>

<template>
  <router-view/>

  <BaseDataTable
      :columns="columns"
      :fetch-url="props.newUrl"
      createRouteName="register-user"
      title="Employees">


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
                  @click="goTo('edit-user', slotProps.text?.id)"
                  size="default" plain>
          <template #icon>
            <EditPen class="h-fit"/>
          </template>
        </ElButton>

        <el-popover
            placement="bottom"
            title=""
            :width="200"
            trigger="click"
        >
          <template #reference>
            <ElButton type="danger"

                      title="Fire User"
                      v-if="(userType === 'super_admin' || userType === 'firm_owner') && slotProps.text?.is_active === true"
                      size="default" plain>
              <template #icon>
                <Delete class="h-fit"/>
              </template>
            </ElButton>
          </template>

          <template #default>
            <div class="flex flex-col gap-2">
              <!--              <span>Type the word <span>delete</span> to confirm</span>-->
              <el-form
                  label-position="top"
              >
                <el-form-item label="Type delete to confirm">
                  <el-input placeholder="delete" v-model="allowDelete" size="large"></el-input>
                </el-form-item>
              </el-form>


              <el-button
                  type="danger"
                  class="capitalize"
                  :disabled="allowDelete == 'delete' ? false : true"
                  @click="deleteUser(slotProps.text?.id)"
                  size="large">
                confirm and delete
              </el-button>
            </div>

          </template>

        </el-popover>

        <ElButton
            type="success"
            v-if="slotProps.text?.is_active === false"
            @click="activateUser(slotProps.text?.id)"
            size="default" plain>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </template>
        </ElButton>
      </template>
    </template>
  </BaseDataTable>
</template>

<style scoped>

</style>