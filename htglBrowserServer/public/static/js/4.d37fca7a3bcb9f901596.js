webpackJsonp([4],{nXKJ:function(t,e){},"uM5/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("skVP"),r={name:"networkSet",data:function(){return{form:{wkname:"未选择",type:"",status:"",macaddr:"",ip:"",netmask:"",gateway:"",onboot:"",bootproto:""},adapterList:[]}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$loading({target:".content"});Object(o.f)({}).then(function(a){e.close(),t.adapterList=a.value,t.change(t.adapterList[0].wkname)},function(t){e.close()})},change:function(t){for(var e=0;e<this.adapterList.length;e++){var a=this.adapterList[e];if(a.wkname===t){this.form={wkname:a.wkname,type:a.type,status:a.status,macaddr:a.macaddr,ip:a.ip,netmask:a.netmask,gateway:a.gateway,onboot:a.onboot,bootproto:a.bootproto};break}}},modifyAdapter:function(t,e){var a=this;if("未选择"!==this.form.adapterVal){var r=this.$loading({target:".content"}),n={wkname:this.form.wkname,macaddr:"",ip:"",netmask:"",gateway:"",onboot:"",bootproto:""};n[t]=this.form[t];for(var s=0;s<this.adapterList.length;s++){var l=this.adapterList[s];if(l.wkname===n.wkname){for(var i in n)n[i]||(n[i]=l[i]);break}}Object(o.j)(n).then(function(o){a.$message.success("修改成功");for(var n=0;n<a.adapterList.length;n++){var s=a.adapterList[n];if(s.wkname===e){s[t]=a.form[t];break}}r.close()},function(t){r.close()})}else this.$message.error("未选择适配器")},restartNet:function(){var t=this,e=this.$loading({target:".content"});Object(o.k)({}).then(function(a){e.close(),t.$message.success(a.value),t.init()},function(t){e.close()})}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content-outerbox"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("网络设置")])]),t._v(" "),a("div",{staticClass:"form-box"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px","label-position":"left"}},[a("el-form-item",{attrs:{label:"网络适配器:"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.change},model:{value:t.form.wkname,callback:function(e){t.$set(t.form,"wkname",e)},expression:"form.wkname"}},t._l(t.adapterList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.wkname}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"适配器类型:"}},[t._v(t._s(t.form.type))]),t._v(" "),a("el-form-item",{attrs:{label:"适配器状态:"}},[t._v(t._s(t.form.status))]),t._v(" "),a("el-form-item",{attrs:{label:"适配器MAC地址:"}},[a("el-input",{attrs:{readonly:!0},model:{value:t.form.macaddr,callback:function(e){t.$set(t.form,"macaddr",e)},expression:"form.macaddr"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"适配器IP地址:"}},[a("el-input",{model:{value:t.form.ip,callback:function(e){t.$set(t.form,"ip",e)},expression:"form.ip"}}),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.modifyAdapter("ip",t.form.wkname)}}},[t._v("修改")])],1),t._v(" "),a("el-form-item",{attrs:{label:"适配器掩码:"}},[a("el-input",{model:{value:t.form.netmask,callback:function(e){t.$set(t.form,"netmask",e)},expression:"form.netmask"}}),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.modifyAdapter("netmask",t.form.wkname)}}},[t._v("修改")])],1),t._v(" "),a("el-form-item",{attrs:{label:"适配器网关:"}},[a("el-input",{model:{value:t.form.gateway,callback:function(e){t.$set(t.form,"gateway",e)},expression:"form.gateway"}}),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.modifyAdapter("gateway",t.form.wkname)}}},[t._v("修改")])],1),t._v(" "),a("el-form-item",{attrs:{label:"网络开关:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.onboot,callback:function(e){t.$set(t.form,"onboot",e)},expression:"form.onboot"}},[a("el-option",{attrs:{label:"yes",value:"yes"}}),t._v(" "),a("el-option",{attrs:{label:"no",value:"no"}})],1),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.modifyAdapter("onboot",t.form.wkname)}}},[t._v("修改")])],1),t._v(" "),a("el-form-item",{attrs:{label:"BOOTPROTO:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.bootproto,callback:function(e){t.$set(t.form,"bootproto",e)},expression:"form.bootproto"}},[a("el-option",{attrs:{label:"static",value:"static"}}),t._v(" "),a("el-option",{attrs:{label:"dhcp",value:"dhcp"}})],1),t._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.modifyAdapter("bootproto",t.form.wkname)}}},[t._v("修改")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.restartNet()}}},[t._v("重启网络")])],1)],1)],1)])],1)},staticRenderFns:[]};var s=a("VU/8")(r,n,!1,function(t){a("nXKJ")},"data-v-ec830a9e",null);e.default=s.exports}});