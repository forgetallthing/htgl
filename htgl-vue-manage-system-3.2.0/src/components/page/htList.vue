<template>
    <div class="content-outerbox">
        <el-row class="list">
            <el-col :span="12">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                </el-input>
            </el-col>
            <el-col :span="12" style="text-align:right;">
                <el-button type="primary" @click="newBuild()">新建</el-button>
            </el-col>
            <el-col>
                <el-table
                    :data="
                        tableData.filter(
                            data =>
                                !search ||
                                data.col1.toLowerCase().includes(search.toLowerCase()) ||
                                data.col2.toLowerCase().includes(search.toLowerCase())
                        )
                    "
                    border
                    :max-height="tableHeight"
                    ref='table'
                    style="width: 100%"
                    :default-sort = "{prop: 'col1', order: 'descending'}"
                >
                    <el-table-column prop="col1" label="收费单号" sortable></el-table-column>
                    <el-table-column prop="col2" label="项目名称" sortable></el-table-column>
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
import { getContracts, addContract, delContract } from '../../service/dao';
export default {
    name: 'htList',
    data: function() {
        return {
            tableData: [],
            search: '',
            tableHeight:window.innerHeight - 229,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let loadingInstance = this.$loading({ target: '.content' });
            getContracts({}).then(
                res => {
                    loadingInstance.close();
                    this.tableData = res.value.contracts;
                },
                error => {
                    loadingInstance.close();
                }
            );
            loadingInstance.close();
        },
        newBuild() {
            let loadingInstance = this.$loading({ target: '.content' });
            addContract({}).then(
                res => {
                    loadingInstance.close();
                    this.$message.success('新建成功');
                    this.init();
                },
                error => {
                    loadingInstance.close();
                }
            );
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.$router.push({
                name: 'edit',
                params: {
                    col1: row.col1
                }
            });
        },
        handleDelete(index, row) {
            this.$confirm('确认删除？')
                .then(_ => {
                    let loadingInstance = this.$loading({ target: '.content' });
                    delContract({
                        col1: row.col1
                    }).then(
                        res => {
                            loadingInstance.close();
                            this.$message.success('删除成功');
                            this.init();
                        },
                        error => {
                            loadingInstance.close();
                        }
                    );
                })
                .catch(_ => {});
        }
    }
};
</script>
<style></style>

<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
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
