<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
@import '../static/css/main.css';
@import '../static/css/color-dark.css'; /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
.el-row {
    margin-bottom: 20px;
    background-color: #ffffff;
    padding: 20px;
}
.list .el-col {
    margin-bottom: 25px;
}
.edit-form .el-select,
.edit-form .el-date-editor {
    width: 100%;
}
.date-picker {
    width: 100% !important;
}
</style>
