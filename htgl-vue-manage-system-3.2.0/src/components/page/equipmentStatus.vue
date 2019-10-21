<template>
  <div class="content-outerbox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>状态信息</span>
      </div>
      <div class="login-tips">
        <div class="login-tips-1">系统时间:</div>
        <div class="login-tips-2">{{ systemTime }}</div>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">GNSS时间:</span>
        <span class="login-tips-2">{{ gnssTime }}</span>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">系统状态:</span>
        <span class="login-tips-2">{{ systemStatus }}</span>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">卫星状态:</span>
        <span class="login-tips-2">{{ satelliteStatus }}</span>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">系统温度:</span>
        <span class="login-tips-2">{{ systemTemperature }}° C</span>
      </div>
      <!-- <div class="login-tips">
        <span class="login-tips-1">授时次数:</span>
        <span class="login-tips-2">{{ timingNumber }}</span>
      </div> -->
      <div class="login-tips">
        <span class="login-tips-1">版本信息:</span>
        <span class="login-tips-2">{{ version }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getEquipmentStatus } from "../../service/dao";
export default {
  name: "equipmentStatus",
  data: function() {
    return {
      systemTime: "",
      gnssTime: "",
      systemStatus: "",
      satelliteStatus: "",
      timingNumber: "",
      systemTemperature: "",
      version: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      getEquipmentStatus({}).then(
        res => {
          loadingInstance.close();
          this.systemTime = res.value.systemTime;
          this.gnssTime = res.value.gnssTime;
          this.systemStatus = res.value.systemStatus;
          this.satelliteStatus = res.value.satelliteStatus;
          this.timingNumber = res.value.timingNumber;
          this.systemTemperature = res.value.systemTemperature;
          this.version = res.value.version;
        },
        error => {
          loadingInstance.close();
        }
      );
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