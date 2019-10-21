<template>
  <div class="content-outerbox">
    <el-scrollbar>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>模式设置</span>
        </div>
        <span class="fileName">NTP.conf</span>
        <el-button @click="save" type="text">保存</el-button>
        <el-button @click="init" type="text">重新打开</el-button>
        <el-button @click="initialization" type="text">初始化配置</el-button>
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input type="textarea" :rows="15" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <div>配置说明:</div>
        <div class="configList" v-for="(item,index) in config" :key="index">{{index+1}}.{{item}}</div>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import { getModelSet, saveModelSet,resetModelConf } from "../../service/dao";
export default {
  data: function() {
    return {
      form: {
        desc: ""
      },
      config: [
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let loadingInstance = this.$loading({ target: ".content" });
      getModelSet({}).then(
        res => {
          loadingInstance.close();
          this.form.desc = res.value.content;
          this.config = res.value.explain;
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    initialization() {
      let loadingInstance = this.$loading({ target: ".content" });
      resetModelConf({}).then(
        res => {
          loadingInstance.close();
          this.$message.success(res.value);
          this.init();
        },
        error => {
          loadingInstance.close();
        }
      );
    },
    save() {
      let loadingInstance = this.$loading({ target: ".content" });
      saveModelSet({
        content:this.form.desc
      }).then(
        res => {
          loadingInstance.close();
          this.$message.success("保存成功");
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
.fileName {
  margin-right: 30px;
}
.configList {
  font-size: 14px;
  padding: 4px 0px;
}
</style>