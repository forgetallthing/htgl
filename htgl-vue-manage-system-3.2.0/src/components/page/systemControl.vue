<template>
  <div class="content-outerbox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统控制</span>
      </div>
      <div class="login-tips">
        <div class="login-tips-1">GNSS服务:</div>
        <div class="login-tips-2">{{ gnssService.name }}</div>
        <el-button @click="restart(gnssService.id)" class="restart" type="text">重新启动</el-button>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">NTPD服务:</span>
        <span class="login-tips-2">{{ ntpdService.name }}</span>
        <el-button @click="restart(ntpdService.id)" class="restart" type="text">重新启动</el-button>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">网络服务:</span>
        <span class="login-tips-2">{{ netService.name }}</span>
        <el-button @click="restart(netService.id)" class="restart" type="text">重新启动</el-button>
      </div>
      <div class="login-tips">
        <span class="login-tips-1">硬件设备:</span>
        <span class="login-tips-2">{{ hardwareService.name }}</span>
        <el-button @click="restart(hardwareService.id)" class="restart" type="text">重新启动</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getServiceList, restartService } from "../../service/dao";
export default {
  data: function() {
    return {
      gnssService: {
        id: 1,
        name: ""
      },
      ntpdService: {
        id: 2,
        name: ""
      },
      netService: {
        id: 3,
        name: ""
      },
      hardwareService: {
        id: 4,
        name: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      getServiceList({}).then(
        res => {
          loadingInstance.close();
          this.gnssService.name = " 已启动" + res.value.gnss_time;
          this.ntpdService.name = " 已启动" + res.value.ntp_time;
          this.netService.name = " 已启动" + res.value.net_time;
          this.hardwareService.name = " 已启动" + res.value.device_time;
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    restart(id) {
      let loadingInstance = this.$loading({ target: ".content" });
      restartService({
        serviceId: id
      }).then(
        res => {
          loadingInstance.close();
          if (id == 3) {
            this.$message.success("重启成功,请刷新页面");
          } else {
            this.$message.success("重启成功");
            this.init();
          }
        },
        error => {
          loadingInstance.close();
        }
      );
    }
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
  width: 269px;
  line-height: 18px;
  height: auto;
  margin-left: 15px;
}
.restart {
  padding: 0;
}
</style>