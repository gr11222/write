<template>
  <div>
    <div class="work-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="fn">新增</el-button>
      <el-button
        size="small"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
      >修改</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
    </div>
    <Table
      :header="header"
      @handleRowClick="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      :api="table_api"
      selection="checkbox"
      :refresh="refresh"
    ></Table>
  </div>
</template>

<script>
import Table from "@/components/table";
import { table } from "@/api/table";
export default {
  data() {
    return {
      header: [
        {
          label: "日期",
          prop:"time"
        },
        {
          label: "姓名",
          prop:"username",
          formatter(row,clo,cellValue){
            return cellValue
          }
        }
      ],
      refresh:false,
    };
  },
  components: {
    Table
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSelectionChange(rows){
      console.log(rows)
    },
    table_api(...args){
      return table(...args)
    },
    fn(){
      this.refresh = !this.refresh
    }
  },
  mounted() {
    console.log(this)
  }
};
</script>
<style lang="less" scoped>
.work-container {
  padding: 5px;
}
</style>