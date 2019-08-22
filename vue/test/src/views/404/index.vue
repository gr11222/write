<template>
  <div id="box">404{{text}}</div>
</template>
<script>
export default {
  data() {
    return {
      text: 1
    };
  },
  mounted() {
    this.text = 2;
    new Promise(function(res) {
      res();
    }).then(data => {
      console.dir(document.getElementById("box").textContent);
    });
  },
  activated() {
    // console.log("activated");
  },
  deactivated() {
    // console.log("deactivated");
  }
};
</script>
<style scope>
#box {
  font-size: 150px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100vh;
}
</style>


