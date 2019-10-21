<template>
    <div class="content-outerbox">
        <el-row>
            <el-col :span="12">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="12" style="text-align:right;">
                <el-button type="primary" @click="showCard()">新建</el-button>
            </el-col>
            <el-col>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column prop="roleName" label="用户角色"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role" placeholder="请选择用户角色">
                        <el-option label="管理员" value="admin"></el-option>
                        <el-option label="用户" value="normal"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getUserList, addUser, resetPW, delUser } from '../../service/dao';
export default {
    name: 'userManager',
    data: function() {
        return {
            input: '',
            tableData: [],
            dialogFormVisible: false,
            form: {
                userName: '',
                role: '',
            },
            formLabelWidth: '120px'
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let loadingInstance = this.$loading({ target: '.content' });
            getUserList({}).then(
                res => {
                    loadingInstance.close();
                    if (res.value.users) {
                        this.tableData = res.value.users.map(k => {
                            k.roleName = k.role === 'admin' ? '管理员' : '用户';
                            return k;
                        });
                    }
                },
                error => {
                    loadingInstance.close();
                }
            );
            loadingInstance.close();
        },
        showCard() {
            this.dialogFormVisible = true;
        },
        addUser() {
            this.dialogFormVisible = false;
            console.log(this.form);
        },
        handleReset(index, row) {
            this.$confirm('确认重置密码？')
                .then(_ => {
                    let loadingInstance = this.$loading({ target: '.content' });
                    resetPW({
                        userName: row.userName
                    }).then(
                        res => {
                            loadingInstance.close();
                            this.$message.success('重置成功');
                        },
                        error => {
                            loadingInstance.close();
                        }
                    );
                    loadingInstance.close();
                })
                .catch(_ => {});
        },
        handleDelete(index, row) {
            this.$confirm('确认删除用户？')
                .then(_ => {
                    let loadingInstance = this.$loading({ target: '.content' });
                    delUser({
                        userName: row.userName
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
                    loadingInstance.close();
                })
                .catch(_ => {});
        }
    }
};
</script>

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
