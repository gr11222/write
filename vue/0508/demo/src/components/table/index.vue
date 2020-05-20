<template>
  <div class="theTable">
    <el-table
      ref="theTable"
      :data="theData"
      tooltip-effect="dark"
      style="width: 100%"
      border
      fit
      :highlight-current-row="selection=='radio'"
      @selection-change="rowSelect"
      @current-change="rowClick"
      v-loading="loading"
    >
      <el-table-column align="center" v-if="selection=='checkbox'" type="selection" width="55"></el-table-column>
      <el-table-column align="center" v-if="selection=='radio'" width="55">
        <template slot-scope="scope">
          <el-radio class="table-radio" v-model="radio" :label="scope.row.index" name="1"></el-radio>
        </template>
      </el-table-column>
      <el-table-column align="center" v-if="index" type="index" width="55"></el-table-column>
      <el-table-column
        v-for="item in header"
        :key="item.label"
        :label="item.label"
        :width="item.width"
        :prop="item.prop"
        :formatter="item.formatter"
      ></el-table-column>
    </el-table>
    <div class="table-page" v-if="isPage">
      <el-pagination
        :page-sizes="[10,20,30,40,50]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="page"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // table header
    header: {
      type: Array
    },
    // api data
    api: Function,
    // table index option
    index: {
      type: Boolean,
      default: true
    },
    // selected type
    selection: {
      default() {
        return "radio";
      }
    },
    // multiple selected callback
    handleSelectionChange: Function,
    // single selected callback
    handleRowClick: Function,
    isPage: {
      type: Boolean,
      default: true
    },
    refresh:Boolean
  },
  data() {
    return {
      singleSelected: {},
      selected: [],
      radio: null,
      loading: false,
      theData: [],
      total: 0,
      page: 1,
      rows: 20
    };
  },
  watch:{
    refresh(){
      this.theApi();
    }
  },
  methods: {
    rowSelect(selection) {
      this.$emit("handleSelectionChange", selection);
    },
    rowClick(row) {
      this.radio = row?row.index:null;
      this.$emit("handleRowClick", row);
    },
    currentChange(page) {
      this.page = page;
      this.theApi();
    },
    sizeChange(rows) {
      this.rows = rows;
      this.theApi();
    },
    theApi() {
      this.loading = true;
      let data = {};
      if (this.isPage) {
        data = { page: this.page, rows: this.rows };
      }
      this.api(data)
        .then(data => {
          this.loading = false;
          this.total = data.total;
          this.theData = data.rows.map((item, index) => {
            return { ...item, index };
          });
        })
        .catch(() => {
          this.loading = false;
          return false;
        });
    }
  },
  mounted() {    
    this.theApi();
  }
};
</script>

<style>
.table-radio .el-radio__label {
  display: none;
}
.theTable .el-table td,
.el-table th {
  padding: 3px 0;
}
</style>
<style lang="less" scoped>
.table-page {
  padding: 10px;
  text-align: center;
}
</style>