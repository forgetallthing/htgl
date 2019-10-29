webpackJsonp([6],{"Yk/k":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("skVP"),a={name:"userManager",data:function(){var e=this;return{input:"",tableData:[],tableHeight:window.innerHeight-229,search:"",dialogFormVisible:!1,form:{userName:"",passWord:"",role:"admin"},formLabelWidth:"120px",rules:{userName:[{validator:function(t,r,o){""===r?o(new Error("请输入用户名")):(/^[a-zA-z0-9_]{1,50}$/.test(e.form.userName)||o(new Error("用户名必须由数字字母下划线组成")),o())},trigger:"blur"}]}}},mounted:function(){this.init()},methods:{init:function(){var e=this,t=this.$loading({target:".content"});Object(o.j)({}).then(function(r){t.close(),r.value.users&&(e.tableData=r.value.users.map(function(e){return e.roleName="管理员","input"===e.role&&(e.roleName="录入员"),"worker"===e.role&&(e.roleName="作业人员"),"finance"===e.role&&(e.roleName="财务人员"),e}))},function(e){t.close()}),t.close()},showCard:function(){this.dialogFormVisible=!0},addUser:function(){var e=this;this.dialogFormVisible=!1;var t=this.$loading({target:".content"});Object(o.b)({userName:this.form.userName,role:this.form.role}).then(function(r){t.close(),e.$message.success("添加成功"),e.init()},function(e){t.close()}),t.close()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.addUser()})},handleReset:function(e,t){var r=this;this.$confirm("确认重置密码？").then(function(e){var a=r.$loading({target:".content"});Object(o.m)({userName:t.userName}).then(function(e){a.close(),r.$message.success("重置成功")},function(e){a.close()}),a.close()}).catch(function(e){})},handleDelete:function(e,t){var r=this;this.$confirm("确认删除用户？").then(function(e){var a=r.$loading({target:".content"});Object(o.e)({userName:t.userName,role:t.role}).then(function(e){a.close(),r.$message.success("删除成功"),r.init()},function(e){a.close()}),a.close()}).catch(function(e){})}}},l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content-outerbox"},[r("el-row",{staticClass:"list"},[r("el-col",{attrs:{span:12}},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入关键字搜索"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}},[r("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.showCard()}}},[e._v("新建")])],1),e._v(" "),r("el-col",[r("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData.filter(function(t){return!e.search||t.userName.toLowerCase().includes(e.search.toLowerCase())||t.roleName.toLowerCase().includes(e.search.toLowerCase())}),border:"","max-height":e.tableHeight,"default-sort":{prop:"userName",order:"descending"}}},[r("el-table-column",{attrs:{prop:"userName",label:"用户名",sortable:""}}),e._v(" "),r("el-table-column",{attrs:{prop:"roleName",label:"用户角色",sortable:""}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"新建用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form}},[r("el-form-item",{staticStyle:{width:"80%"},attrs:{label:"用户名","label-width":e.formLabelWidth,prop:"userName"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[r("el-select",{attrs:{placeholder:"请选择用户角色"},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},[r("el-option",{attrs:{label:"管理员",value:"admin"}}),e._v(" "),r("el-option",{attrs:{label:"录入员",value:"input"}}),e._v(" "),r("el-option",{attrs:{label:"作业人员",value:"worker"}}),e._v(" "),r("el-option",{attrs:{label:"财务人员",value:"finance"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=r("VU/8")(a,l,!1,function(e){r("joeM")},"data-v-c7cc09e0",null);t.default=s.exports},joeM:function(e,t){}});