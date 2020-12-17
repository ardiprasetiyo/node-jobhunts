(function(t){function e(e){for(var s,o,i=e[0],c=e[1],l=e[2],p=0,d=[];p<i.length;p++)o=i[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(d.length)d.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,i=1;i<a.length;i++){var c=a[i];0!==r[c]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},r={app:0},n=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],o={data:function(){return{}},methods:{}},i=o,c=a("2877"),l=Object(c["a"])(i,r,n,!1,null,null,null),u=l.exports,p=a("8c4f"),d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[t._m(0),s("section",{staticClass:"app-search mb-4"},[s("div",{staticClass:"container"},[s("div",{staticClass:"card app-card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[t._m(1),s("div",{staticClass:"col-12 mb-3"},[s("div",{staticClass:"app-input-group-icon d-relative"},[s("div",{staticClass:"app-group-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.querySearch,expression:"querySearch"}],staticClass:"form-control app-input app-input-rounded",attrs:{type:"text",placeholder:"Cari pekerjaan impianmu"},domProps:{value:t.querySearch},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateData()},input:function(e){e.target.composing||(t.querySearch=e.target.value)}}})]),s("div",{staticClass:"app-group-icon",on:{click:function(e){return t.updateData()}}},[s("img",{staticClass:"icon",attrs:{src:a("7669")}})])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"d-inline-block float-center"},[s("input",{ref:"vocationalcheckbox",staticClass:"ml-1",attrs:{type:"checkbox",id:"isVocational"},on:{click:t.setIsVocational}}),s("label",{staticClass:"pl-3 app-text-subheader text-opensans",attrs:{for:"isVocational"}},[t._v("Hanya tampilkan pekerjaan untuk SMA/SMK")])])])])])])])]),t.isLoading?s("section",{staticClass:"app-loading"},[s("h5",{staticClass:"text-center text-poppins"},[t._v("Mengambil Data")]),s("p",{staticClass:"text-center text-opensans"},[t._v(" Ini namanya loading, ditunggu aja ... ")])]):t._e(),t.isLoading?t._e():s("section",{staticClass:"app-total-job"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("h1",{staticClass:"app-text-subheader text-poppins ml-3",domProps:{innerHTML:t._s(t.getTotalJobs>0?"<b>"+t.getTotalJobs+"</b> Pekerjaan ditemukan\n                ":"Pekerjaan tidak ditemukan")}})])])])]),t.isLoading?t._e():s("section",{staticClass:"app-jobs-content"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},t._l(t.getJobs,(function(e,a){return s("div",{key:a,staticClass:"col-12 col-lg-6 mt-2 mb-2"},[s("a",{staticClass:"app-nolink",attrs:{href:"#!"},on:{click:function(a){return t.redirectJob(e.job_url)}}},[s("div",{staticClass:"app-card card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-lg-12 mt-2 mb-2"},[s("span",{staticClass:"app-pils pils-bg-info mx-2 text-opensans"},[t._v(t._s(t.capitalizeEachWord(e.type)))]),e.is_vocational?s("span",{staticClass:"app-pils pils-bg-success mx-2 text-opensans"},[t._v("SMA/SMK")]):t._e()]),s("div",{staticClass:"col-12 col-lg-12 mt-2"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-4 col-lg-4 my-auto"},[s("img",{staticClass:"img img-fluid d-block mx-auto my-auto",attrs:{src:e.company.logo,alt:"",width:"92px"}})]),s("div",{staticClass:"col-8 col-lg-8 my-auto"},[s("h1",{staticClass:"app-text-header-larger text-poppins"},[t._v(" "+t._s(e.title)+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-8 col-lg-8 offset-lg-4 offset-4"},[s("h1",{staticClass:"app-text-subheader text-opensans"},[t._v(" "+t._s(e.company.name)+" ")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-8 col-lg-8 offset-lg-4 offset-4"},[s("div",{staticClass:"row"},[t._m(2,!0),s("div",{staticClass:"col-12 col-lg-12"},[s("h1",{staticClass:"app-text-subheader font-weight-bold text-opensans"},[t._v(" "+t._s(t.salaryParse(e.salary.min,e.salary.max,e.salary.type))+" ")])])])])])])])])])])])})),0)])]),t.isLoading?t._e():s("section",{staticClass:"app-pagination mt-4 mb-4"},[s("div",{staticClass:"container"},[s("div",{staticClass:"col-lg-4 offset-lg-4 col-12"},[s("div",{staticClass:"card app-card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-4 col-lg-4 text-center my-auto app-text-subheader text-center",on:{click:function(e){return t.moveToPage(t.activePage-1)}}},[s("a",{class:{btn:!0,"app-text-disabled":t.activePage-1==0},attrs:{href:"#!"}},[t._v("Kembali")])]),s("div",{staticClass:"col-4 col-lg-4 text-center"},[s("select",{ref:"pagination",staticClass:"form-control",attrs:{name:"pagination",id:""},on:{change:function(e){return t.jumpToPage()}}},t._l(Math.ceil(t.getTotalJobs/this.jobPerPage),(function(e){return s("option",{key:e,domProps:{value:e,selected:e==t.activePage}},[t._v(" "+t._s(e)+" ")])})),0)]),s("div",{staticClass:"col-4 col-lg-4 text-center my-auto app-text-subheader text-center"},[s("a",{class:{btn:!0,"app-text-disabled":t.activePage+1>Math.ceil(t.getTotalJobs/this.jobPerPage)},attrs:{href:"#!"},on:{click:function(e){return t.moveToPage(t.activePage+1)}}},[t._v("Lanjut")])])])])])])])]),t._m(3)])},v=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"app-navbar",staticStyle:{"z-index":""}},[s("div",{staticClass:"fixed-top w-100 bg-white p-2 app-navbar-wrapper"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-6 d-block my-auto"},[s("h1",{staticClass:"app-navbar-title text-left text-poppins"},[t._v("Joobhunts")])]),s("div",{staticClass:"col-6"},[s("img",{staticClass:"app-icon d-block my-auto float-right",attrs:{src:a("b040")}})])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 mb-2"},[a("h1",{staticClass:"app-text-header text-poppins"},[t._v("Cari Pekerjaan")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 col-lg-12 mb-3"},[a("h1",{staticClass:"app-text-subheader text-opensans"},[t._v(" Bandung ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{staticClass:"container"},[a("div",{staticClass:"row mt-4 mb-4"},[a("div",{staticClass:"col-12 text-center"},[a("span",{staticClass:"app-text-subheader text-opensans d-block"},[t._v("Brought to you by "),a("a",{attrs:{href:"https://www.instagram.com/nerdstrtype/",target:"_blank"}},[t._v("@nerdstrtype")]),t._v(" brain")]),a("span",{staticClass:"text-center text-opensans app-text-subheader"},[t._v("This is my one week open source project")])])])])])}],b=(a("99af"),a("a15b"),a("d81d"),a("fb6a"),a("a9e3"),a("25eb"),a("ac1f"),a("1276"),a("96cf"),a("1da1")),f={name:"Home",data:function(){return{activePage:1,querySearch:"",jobPerPage:30,isVocational:!1,isLoading:!1}},methods:{setIsVocational:function(){this.isVocational=this.$refs.vocationalcheckbox.checked,this.activePage=1,this.updateData()},updateData:function(){var t=this;return Object(b["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoading=!0,e.next=3,t.$store.dispatch("getJobs",{searchQuery:t.querySearch,page:t.activePage,isVocational:t.isVocational});case 3:t.isLoading=!1;case 4:case"end":return e.stop()}}),e)})))()},capitalizeEachWord:function(t){var e=t.split(" ");return e=e.map((function(t){return t[0].toUpperCase()+t.slice(1)})),e.join(" ")},redirectJob:function(t){window.open(t)},moveToPage:function(t){console.log(t),0==t||t>Math.ceil(this.$store.state.currentJobs.totalJobs/this.jobPerPage)||(this.activePage=t,this.updateData())},jumpToPage:function(){var t=Number.parseInt(this.$refs.pagination.value);this.activePage=t,this.moveToPage(t)},salaryParse:function(t,e,a){return t&&e?(t=String(t),e=String(e),t=t.length>6?"".concat(t.slice(0,t.length-6)):"".concat(t.slice(0,t.length-3)," Ribu "),e=e.length>6?"".concat(e.slice(0,e.length-6)," Juta"):"".concat(e.slice(0,e.length-3)," Ribu"),a=a.toLowerCase(),a="monthly"==a?"Bulan":"yearly"==a?"Tahun":null,"IDR. ".concat(t," - ").concat(e," ").concat(a?"/ "+a:"")):"Lamar untuk melihat gaji"}},computed:{getJobs:function(){return this.$store.state.currentJobs.jobs},getTotalJobs:function(){return this.$store.state.currentJobs.totalJobs},getPagination:function(){var t=this.$store.state.currentJobs.totalJobs;Math.ceil(t/12),this.activePage}},mounted:function(){var t=this;return Object(b["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoading=!0,e.next=3,t.$store.dispatch("getJobs");case 3:t.isLoading=!1;case 4:case"end":return e.stop()}}),e)})))()}},g=f,h=(a("e8f3"),Object(c["a"])(g,d,v,!1,null,"f9380f36",null)),m=h.exports;s["a"].use(p["a"]);var C=[{path:"/",name:"Home",component:m}],y=new p["a"]({mode:"history",base:"/",routes:C}),x=y,_=a("b85c"),w=a("2f62"),k=(a("b64b"),a("bf19"),a("8206")),j=a.n(k),P=function(){var t=Object(b["a"])(regeneratorRuntime.mark((function t(e){var a,s,r,n,o,i,c,l,u,p,d,v,b;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=Object.assign({},e),s={errors:{status:!1,reason:null,request_config:null},data:null},a.requestUrl){t.next=6;break}return s.errors.status=!0,s.errors.reason="Request URL must be provided",t.abrupt("return",s);case 6:if(a.requestMethod){t.next=10;break}return s.errors.status=!0,s.errors.reason="Request method must be provided",t.abrupt("return",s);case 10:if(r=a.requestUrl,n=a.requestMethod,o={"Content-Type":"application/json"},a.requestHeaders)for(i=a.requestHeaders,c=0,l=Object.keys(i);c<l.length;c++)u=l[c],p=i[u],o[u]=p;return d=a.requestBody||null,t.prev=15,t.next=18,j()({url:r,method:n,data:d,headers:o});case 18:if(v=t.sent,v.data){t.next=23;break}return s.errors.status=!0,s.errors.reason="No response",t.abrupt("return",s);case 23:return s.data=v.data,t.abrupt("return",s);case 27:return t.prev=27,t.t0=t["catch"](15),s.errors.status=!0,s.errors.reason=t.t0.message,t.t0.hasOwnProperty("toJSON")&&(b=t.t0.toJSON(),s.errors.request_config={url:b.config.url,method:b.config.method,data:b.config.data,headers:b.config.headers}),t.abrupt("return",s);case 33:case"end":return t.stop()}}),t,null,[[15,27]])})));return function(e){return t.apply(this,arguments)}}(),J={Request:P};s["a"].use(w["a"]);var O=new w["a"].Store({state:{currentJobs:{jobs:[],totalJobs:0}},mutations:{setCurrentJobs:function(t,e){t.currentJobs.jobs=[],t.totalJobs=0;var a,s=e.data[0],r=s.count.length>0?s.count[0].total_jobs:0,n=Object(_["a"])(s.data);try{for(n.s();!(a=n.n()).done;){var o=a.value;t.currentJobs.jobs.push(o)}}catch(i){n.e(i)}finally{n.f()}t.currentJobs.totalJobs=r}},actions:{getJobs:function(t){var e=arguments;return Object(b["a"])(regeneratorRuntime.mark((function a(){var s,r,n,o,i,c,l,u,p,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(s=e.length>1&&void 0!==e[1]?e[1]:{},r=s.page||1,n=s.searchQuery,o=s.category,i=s.isVocational,c="".concat("https://joobhunts.herokuapp.com","/api/v1/jobs?page=").concat(r),n&&(c+="&searchQuery=".concat(n)),i&&(c+="&vocationalLevel=1"),o){l=Object(_["a"])(o);try{for(l.s();!(u=l.n()).done;)p=u.value,c+="&category=".concat(p)}catch(v){l.e(v)}finally{l.f()}}return a.next=11,J.Request({requestUrl:c,requestMethod:"GET"});case 11:d=a.sent,d.errors.status&&console.log("ERROR ".concat(d.errrors.reason)),t.commit("setCurrentJobs",d.data);case 14:case"end":return a.stop()}}),a)})))()}},modules:{}});s["a"].config.productionTip=!1,new s["a"]({router:x,store:O,render:function(t){return t(u)}}).$mount("#app")},7669:function(t,e,a){t.exports=a.p+"img/search-icon.c652f8c9.svg"},b040:function(t,e,a){t.exports=a.p+"img/bookmark-active-icon.e5b8ebb4.svg"},b3cd:function(t,e,a){},e8f3:function(t,e,a){"use strict";a("b3cd")}});
//# sourceMappingURL=app.2d94a1db.js.map