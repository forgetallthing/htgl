webpackJsonp([7],{"2Ffe":function(s,t){},mH0W:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("skVP"),e={name:"equipmentStatus",data:function(){return{systemTime:"",gnssTime:"",systemStatus:"",satelliteStatus:"",timingNumber:"",systemTemperature:"",version:""}},mounted:function(){this.init()},methods:{init:function(){var s=this,t=this.$loading({target:".content"});Object(a.b)({}).then(function(i){t.close(),s.systemTime=i.value.systemTime,s.gnssTime=i.value.gnssTime,s.systemStatus=i.value.systemStatus,s.satelliteStatus=i.value.satelliteStatus,s.timingNumber=i.value.timingNumber,s.systemTemperature=i.value.systemTemperature,s.version=i.value.version},function(s){t.close()})}}},n={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"content-outerbox"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[s._v("状态信息")])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("div",{staticClass:"login-tips-1"},[s._v("系统时间:")]),s._v(" "),i("div",{staticClass:"login-tips-2"},[s._v(s._s(s.systemTime))])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("span",{staticClass:"login-tips-1"},[s._v("GNSS时间:")]),s._v(" "),i("span",{staticClass:"login-tips-2"},[s._v(s._s(s.gnssTime))])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("span",{staticClass:"login-tips-1"},[s._v("系统状态:")]),s._v(" "),i("span",{staticClass:"login-tips-2"},[s._v(s._s(s.systemStatus))])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("span",{staticClass:"login-tips-1"},[s._v("卫星状态:")]),s._v(" "),i("span",{staticClass:"login-tips-2"},[s._v(s._s(s.satelliteStatus))])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("span",{staticClass:"login-tips-1"},[s._v("系统温度:")]),s._v(" "),i("span",{staticClass:"login-tips-2"},[s._v(s._s(s.systemTemperature)+"° C")])]),s._v(" "),i("div",{staticClass:"login-tips"},[i("span",{staticClass:"login-tips-1"},[s._v("版本信息:")]),s._v(" "),i("span",{staticClass:"login-tips-2"},[s._v(s._s(s.version))])])])],1)},staticRenderFns:[]};var l=i("VU/8")(e,n,!1,function(s){i("2Ffe")},"data-v-352e7795",null);t.default=l.exports}});