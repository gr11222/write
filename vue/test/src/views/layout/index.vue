<template>
  <div style="height:100%;">
    <Head></Head>
    <el-container style="overflow:auto;width:100%;height: calc(100% - 60px);min-height:500px;">
      <Side/>
      <Main_view/>
    </el-container>
  </div>
</template>

<style>
</style>

<script>
import Head from "./header";
import Side from "./sidebar";
import Main_view from "./main_view";
export default {
  components: { Head, Side, Main_view },
  methods: {
    openfn(e) {
      console.log(e);
    }
  },
  watch: {
    "$route.path": function() {
      console.log(arguments);
      console.log(this.$route.fullPath);
      if (this.$route.fullPath === "/layout") {
        console.log(22222222);
      }
      // console.log(this.$route);
    }
  },
  mounted() {}
};
</script>