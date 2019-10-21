<template>
  <div class="content-outerbox">
    
  </div>
</template>

<script>
import { } from "../../service/dao";
export default {
  name: "htList",
  data: function() {
    return {
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      loadingInstance.close();
    },
  }
};
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.login-tips {
  font-size: 14px;
  color: #303133;
  margin-top: 14px;
  overflow: hidden;
}
.login-tips-1 {
  float: left;
  width: 88px;
  line-height: 18px;
}
.login-tips-2 {
  float: left;
  width: 292px;
  line-height: 18px;
  height: auto;
  margin-left: 15px;
}
</style>