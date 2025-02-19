<template>
  <div :class="{ 'dark-mode': !$store.getters.getLightMode }" class="px-2 pb-2">
    <div class="flex flex-col w-full h-full">
      <a-table
          :columns="columns"
          :data-source="dataSource"
          :scroll="{ x: 1000 }"
          :loading="loading"
          :row-key="(record) => record?.id"
      >
        <template #bodyCell="{ column, text }" class="w-full">
          <slot :column="column" :text="text" name="bodyCell"></slot>
        </template>
        <template #title>
          <div class="w-full py-4 flex flex-col md:justify-between  md:flex-row flex-wrap gap-4
                 bg-white border-b rounded-t border-b-gray-100 md:items-center">
            <div class="font-bold text-xl text-gray-600">{{ title }}</div>
            <el-input placeholder="Search"
                      v-if="showSearch"
                      size="small"
                      class="text-lg h-12 rounded hidden md:block md:w-[300px] w-full "></el-input>
            <div v-else></div>
            <div class="flex flex-col md:flex-row gap-6">
              <slot v-if="showOtherItems" name="otherItems"></slot>
              <router-link v-if="createRouteName !== undefined" :to="{ name: createRouteName }">
                <ElButton size="large" type="primary" class="">
                  <template #icon>
                    <PlusOutlined class="h-fit"/>
                  </template>
                  <span>Add New</span>
                </ElButton>
              </router-link>
              <div class="flex items-start gap-4 justify-between font-bold text-gray-800">
                <ElButton size="large" @click="toggleFilters">
                  <template #icon v-if="!showFilters">
                    <FilterOutlined class="h-fit"/>
                  </template>
                  <template #icon v-if="showFilters">
                    <FilterFilled class="h-fit"/>
                  </template>
                </ElButton>
                <ElButton size="large" @click="refresh">
                  <template #icon>
                    <ReloadOutlined></ReloadOutlined>
                  </template>
                </ElButton>
              </div>
            </div>
            <ElInput v-if="showSearch" style="width: 300px" placeholder="Search" class="text-lg h-12 rounded  md:hidden"></ElInput>
          </div>
          <div v-if="showFilters || showOtherItems" class="flex w-full py-4 gap-2 bg-white justify-start">
            <slot name="filters"></slot>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script >
import store from "../../store"
import {Table} from "ant-design-vue"
import {
  FilterFilled,
  FilterOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import {defineEmits} from 'vue';


export default {
  name: "BaseTable",
  components: {
    PlusOutlined,
    ReloadOutlined,
    SettingOutlined,
    FilterOutlined,
    FilterFilled,
    Table
  },
  data() {
    return {
      dataSource: [],
      showFilters: false,
      loading: true,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    createRouteName: {
      type: String,
      default: undefined,
    },
    fetchUrl: {
      type: String,
      default: "all-users",
    },
    showOtherItems: {
      type: Boolean,
      default: false,
    }, showSearch: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            title: "Name",
            dataIndex: "firstName",
            sorter: true,
            width: "20%",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
        ];
      },
    },
  },
  methods: {
    emit() {
      return defineEmits(['trailingReload'])
    },
    queryData(url) {
      this.loading = true;

      if (this.$route?.name === 'invoice-list'){
        store
            .dispatch("fetchList", {url:'query/quickbooks/invoices/'})
            .then((resp) => {
              store
                  .dispatch("fetchList", {url})
                  .then((resp) => {
                    this.dataSource = resp.data;
                    this.loading = false;
                  })
                  .catch(() => {
                    this.loading = false;
                  });
            })
            .catch(() => {
              this.loading = false;
            });

        return
      }
      if (this.$route?.name === 'credit-note'){
        store
            .dispatch("fetchList", {url:'query/quickbooks/creditnotes/'})
            .then((resp) => {
              store
                  .dispatch("fetchList", {url})
                  .then((resp) => {
                    this.dataSource = resp.data;
                    this.loading = false;
                  })
                  .catch(() => {
                    this.loading = false;
                  });
            })
            .catch(() => {
              this.loading = false;
            });

        return
      }
      if (this.$route?.name === 'customer-list'){
        store
            .dispatch("fetchList", {url:'query/quickbooks/customers/'})
            .then((resp) => {
              store
                  .dispatch("fetchList", {url})
                  .then((resp) => {
                    this.dataSource = resp.data;
                    this.loading = false;
                  })
                  .catch(() => {
                    this.loading = false;
                  });
            })
            .catch(() => {
              this.loading = false;
            });

        return
      }

      store
          .dispatch("fetchList", {url})
          .then((resp) => {
            console.log("here")
            this.dataSource = resp.data?.results;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    refresh() {
      this.queryData(this.fetchUrl);
      this.trailingReload()
    },
    trailingReload() {
      this.$emit('trailingReload')
    },
    getInvoice(){}
  },
  watch: {
    fetchUrl: function (newVal, oldVal) {
      this.queryData(this.fetchUrl);
    }
  },
  mounted() {
    this.queryData(this.fetchUrl);
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #212121;
  color: white;
}

.dark-mode .custom-table {
  /* Add styles for the table in dark mode */
  /* Example: */
  background-color: #212121;
  color: white;
}

.dark-mode .custom-table th,
.dark-mode .custom-table td {
  /* Add styles for table headers and cells in dark mode */
  /* Example: */
  border-color: #fff;
}

.dark-mode .custom-table .ant-table-tbody > tr.ant-table-row:hover > td {
  /* Add styles for table row hover effect in dark mode */
  /* Example: */
  background-color: #444;
}
</style>
