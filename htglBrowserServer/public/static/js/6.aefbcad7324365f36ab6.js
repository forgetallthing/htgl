webpackJsonp([6],{"f9l+":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("skVP"),n={data:function(){return{gnssService:{id:1,name:""},ntpdService:{id:2,name:""},netService:{id:3,name:""},hardwareService:{id:4,name:""}}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$loading({target:".content"});Object(i.g)({}).then(function(s){e.close(),t.gnssService.name=" 已启动"+s.value.gnss_time,t.ntpdService.name=" 已启动"+s.value.ntp_time,t.netService.name=" 已启动"+s.value.net_time,t.hardwareService.name=" 已启动"+s.value.device_time},function(t){e.close()})},restart:function(t){var e=this,s=this.$loading({target:".content"});Object(i.m)({serviceId:t}).then(function(i){s.close(),3==t?e.$message.success("重启成功,请刷新页面"):(e.$message.success("重启成功"),e.init())},function(t){s.close()})}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content-outerbox"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v("系统控制")])]),t._v(" "),s("div",{staticClass:"login-tips"},[s("div",{staticClass:"login-tips-1"},[t._v("GNSS服务:")]),t._v(" "),s("div",{staticClass:"login-tips-2"},[t._v(t._s(t.gnssService.name))]),t._v(" "),s("el-button",{staticClass:"restart",attrs:{type:"text"},on:{click:function(e){return t.restart(t.gnssService.id)}}},[t._v("重新启动")])],1),t._v(" "),s("div",{staticClass:"login-tips"},[s("span",{staticClass:"login-tips-1"},[t._v("NTPD服务:")]),t._v(" "),s("span",{staticClass:"login-tips-2"},[t._v(t._s(t.ntpdService.name))]),t._v(" "),s("el-button",{staticClass:"restart",attrs:{type:"text"},on:{click:function(e){return t.restart(t.ntpdService.id)}}},[t._v("重新启动")])],1),t._v(" "),s("div",{staticClass:"login-tips"},[s("span",{staticClass:"login-tips-1"},[t._v("网络服务:")]),t._v(" "),s("span",{staticClass:"login-tips-2"},[t._v(t._s(t.netService.name))]),t._v(" "),s("el-button",{staticClass:"restart",attrs:{type:"text"},on:{click:function(e){return t.restart(t.netService.id)}}},[t._v("重新启动")])],1),t._v(" "),s("div",{staticClass:"login-tips"},[s("span",{staticClass:"login-tips-1"},[t._v("硬件设备:")]),t._v(" "),s("span",{staticClass:"login-tips-2"},[t._v(t._s(t.hardwareService.name))]),t._v(" "),s("el-button",{staticClass:"restart",attrs:{type:"text"},on:{click:function(e){return t.restart(t.hardwareService.id)}}},[t._v("重新启动")])],1)])],1)},staticRenderFns:[]};var c=s("VU/8")(n,a,!1,function(t){s("zXQv")},"data-v-5015655e",null);e.default=c.exports},zXQv:function(t,e){}});