<template>
  <div class="content-outerbox">
    <el-row class="list">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-button type="primary" @click="newBuild()">新建</el-button>
      </el-col>
      <el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="col1" label="收费单号"></el-table-column>
          <el-table-column prop="col2" label="项目名称"></el-table-column>
          <!-- <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {} from "../../service/dao";
export default {
  name: "htList",
  data: function() {
    return {
      input: "",
      tableData: [
        {
          col1: "02UJ23878",
          col2: "安全性鉴定1"
        },
        {
          col1: "02UJ23878",
          col2: "安全性鉴定2"
        },
        {
          col1: "02UJ23878",
          col2: "安全性鉴定3"
        }
      ]
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
    newBuild(){
      this.$router.push({
        path:'/edit',
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        path:'/edit',
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style>

</style>

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