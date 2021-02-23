<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="角色管理" name="third">
      <div style="display:flex;flex-wrap: wrap;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card"> 
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>name</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="用户管理" name="first">
      <Table :header="header" :api="table" selection :refresh="refresh">22222</Table>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      <Table :header="header" :api="table" selection="radio" :refresh="refresh">22222</Table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Table from "@/components/table";
import { table } from "@/api/table";
export default {
  data() {
    return {
      activeName: "third",
      header: [
        {
          label: "日期",
          prop: "time"
        },
        {
          label: "姓名",
          prop: "username",
          formatter(row, clo, cellValue) {
            return cellValue;
          }
        }
      ],
      refresh: false,
      table
    };
  },
  components: {
    Table
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.box-card {
  margin-bottom: 20px;
  margin-left: 20px;
  flex-basis: 500px;
}
</style>