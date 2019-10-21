<template>
  <div class="content-outerbox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网络设置</span>
      </div>
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="120px" label-position="left">
          <el-form-item label="网络适配器:">
            <el-select @change="change" v-model="form.wkname" placeholder="请选择">
              <el-option
                v-for="(item,index) in adapterList"
                :key="index"
                :label="item.name"
                :value="item.wkname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适配器类型:">{{form.type}}</el-form-item>
          <el-form-item label="适配器状态:">{{form.status}}</el-form-item>
          <el-form-item label="适配器MAC地址:">
            <el-input :readonly="true" v-model="form.macaddr"></el-input>
            <!-- <el-button @click="modifyAdapter('macaddr',form.wkname)" type="text">修改</el-button> -->
          </el-form-item>
          <el-form-item label="适配器IP地址:">
            <el-input v-model="form.ip"></el-input>
            <el-button @click="modifyAdapter('ip',form.wkname)" type="text">修改</el-button>
          </el-form-item>
          <el-form-item label="适配器掩码:">
            <el-input v-model="form.netmask"></el-input>
            <el-button @click="modifyAdapter('netmask',form.wkname)" type="text">修改</el-button>
          </el-form-item>
          <el-form-item label="适配器网关:">
            <el-input v-model="form.gateway"></el-input>
            <el-button @click="modifyAdapter('gateway',form.wkname)" type="text">修改</el-button>
          </el-form-item>
          <el-form-item label="网络开关:">
            <el-select v-model="form.onboot" placeholder="请选择">
              <el-option label="yes" value="yes"></el-option>
              <el-option label="no" value="no"></el-option>
            </el-select>
            <el-button @click="modifyAdapter('onboot',form.wkname)" type="text">修改</el-button>
          </el-form-item>
          <el-form-item label="BOOTPROTO:">
            <el-select v-model="form.bootproto" placeholder="请选择">
              <el-option label="static" value="static"></el-option>
              <el-option label="dhcp" value="dhcp"></el-option>
            </el-select>
            <el-button @click="modifyAdapter('bootproto',form.wkname)" type="text">修改</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="restartNet()">重启网络</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getNetAdapterList, modifyAdapter, resNet } from "../../service/dao";
export default {
  name: "networkSet",
  data: function() {
    return {
      form: {
        wkname: "未选择",
        type: "",
        status: "",
        macaddr: "",
        ip: "",
        netmask: "",
        gateway: "",
        onboot: "",
        bootproto: ""
      },
      adapterList: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      getNetAdapterList({}).then(
        res => {
          loadingInstance.close();
          this.adapterList = res.value;
          this.change(this.adapterList[0].wkname);
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    change(wkname) {
      for (var i = 0; i < this.adapterList.length; i++) {
        let cur_adapter = this.adapterList[i];
        if (cur_adapter.wkname === wkname) {
          this.form = {
            wkname: cur_adapter.wkname,
            type: cur_adapter.type,
            status: cur_adapter.status,
            macaddr: cur_adapter.macaddr,
            ip: cur_adapter.ip,
            netmask: cur_adapter.netmask,
            gateway: cur_adapter.gateway,
            onboot: cur_adapter.onboot,
            bootproto: cur_adapter.bootproto
          };
          break;
        }
      }
    },
    modifyAdapter(type, wkname) {
      if (this.form.adapterVal !== "未选择") {
        let loadingInstance = this.$loading({ target: ".content" });
        let value = {
          wkname: this.form.wkname,
          macaddr: "",
          ip: "",
          netmask: "",
          gateway: "",
          onboot: "",
          bootproto: ""
        };
        value[type] = this.form[type];
        for (var i = 0; i < this.adapterList.length; i++) {
          let cur_adapter = this.adapterList[i];
          if (cur_adapter.wkname === value.wkname) {
            for (const key in value) {
              if (!value[key]) {
                value[key] = cur_adapter[key];
              }
            }
            break;
          }
        }
        modifyAdapter(value).then(
          res => {
            this.$message.success("修改成功");
            for (var j = 0; j < this.adapterList.length; j++) {
              let cur_adapter = this.adapterList[j];
              if (cur_adapter.wkname === wkname) {
                cur_adapter[type] = this.form[type];
                break;
              }
            }
            loadingInstance.close();
          },
          error => {
            loadingInstance.close();
          }
        );
      } else {
        this.$message.error("未选择适配器");
      }
    },
    restartNet() {
      let loadingInstance = this.$loading({ target: ".content" });
      resNet({}).then(
        res => {
          loadingInstance.close();
          this.$message.success(res.value);
          this.init();
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
.form-box .el-input {
  width: 90%;
}
.el-button {
  margin-left: 10px;
}
.el-button:focus {
  color: #ffffff;
  background: #2967bc;
}
.el-button:hover {
  color: #ffffff;
  background: #2967bc;
}
</style>