<script setup>

import {InfoFilled} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {ref, computed} from "vue";


const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-red-200'
  },
  textColor: {
    type: String,
    default: 'text-red-500'
  },
  showActions: {
    type: Boolean,
    default: false
  },
  showActionsWidth: {
    type: String,
    default: "200"
  },
  content: {
    type: String,
    default: "some data"
  },
  actionRoutes: {
    type: Array,
    default: [{label:'Actions', value:'', roles:[]}]
  },
  allowedRoles: {
    type: Array,
    default: []
  },
  count: {
    type: Number,
    default: 0
  },
})

const userType = JSON.parse(localStorage.getItem("authData"))?.user?.role;

// Compute the allowed roles based on userType and props.allowedRoles
const computedAllowedRoles = computed(() => {
  if (userType) {
    return [userType];
  }
  return props.allowedRoles;
});
console.log('Computed Allowed Roles:', computedAllowedRoles.value);

const filteredRoutes = computed(() => {
  const filtered = props.actionRoutes.filter(route =>
      Array.isArray(route.roles) && route.roles.some(role => computedAllowedRoles.value.includes(role))
  );
  console.log('Filtered Routes:', filtered); // Debugging line
  return filtered;
})

const actions = ref('')
const performAction = ()=>{
  if (actions.value !== '') {
    router.push({ name: actions.value })
        .then(() => {
          console.log('Navigation success');
          actions.value = '';
        })
        .catch((error) => {
          console.error('Navigation error:', error);
        });
  } else {
    console.error('Action value is empty or invalid');
  }
}
</script>

<template>
  <div class="w-full md:w-[340px] px-4 py-4 rounded-lg flex gap-2 items-center bg-white">
    <div class="h-18 w-18 flex items-center justify-center bg-yellow-50 rounded-full p-2"
         :class="[bgColor ? bgColor : 'bg-gray-100'] , [textColor ? textColor : 'text-gray-100']">

      <slot name="icon"></slot>
    </div>

    <div class="flex flex-col items-start w-fit justify-between h-full">
      <span class="text-gray-800 font-extrabold text-lg capitalize">{{content}}</span>

      <div class="w-full flex items-center justify-between gap-4">
        <div class="text-3xl flex items-center justify-center text-orange-500 font-extrabold p-2 rounded h-[3rem] w-[3rem]">{{count}}</div>
        <div
            title="Actions"
            v-if="showActions"
            class="p-2"
        >
          <span>
            <el-select
                v-model="actions"
                placeholder="Actions"
                size="default"
                class=""
                @change="performAction"
                style="width: 150px; border-radius: 60px"
            >
            <el-option
                v-for="item in filteredRoutes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          </span>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>

</style>