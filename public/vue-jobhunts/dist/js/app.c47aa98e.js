(function(t){function e(e){for(var r,o,i=e[0],c=e[1],l=e[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(r=!1)}r&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},n={app:0},s=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},s=[],o={data:function(){return{}},methods:{}},i=o,c=a("2877"),l=Object(c["a"])(i,n,s,!1,null,null,null),u=l.exports,d=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home p-4"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12 col-md-12 col-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-12"},[a("h1",{staticClass:"font-weight-bolder"},[t._v("Joobhunts")]),a("p",{staticClass:"font-weight-bolder"},[t._v(" Cari Qerja Gak Sesulit Cari Jodoh ")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 px-2"},[a("div",{staticClass:"input-grouping"},[a("input",{ref:"searchbar",staticClass:"form-control",attrs:{type:"text",placeholder:"Masukan kata kunci pekerjaan"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchQuery(e)}}}),a("div",{staticClass:"icon-wrapper"},[a("i",{staticClass:"material-icons icon icon-info",on:{click:t.searchQuery}},[t._v("search")])])])]),a("div",{staticClass:"col-12 mt-3"},[t.isLoading?t._e():a("p",{staticClass:"m-0",domProps:{innerHTML:t._s(t.getJobs.totalJobs>0?"<b>"+t.getJobs.totalJobs+"</b> pekerjaan\n                  ditemukan":"tidak ada pekerjaan")}})])])])]),t.isLoading?a("div",{staticClass:"row mt-2 mb-2"},[t._m(0)]):t._e(),t.isLoading?t._e():a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col-12 col-lg-12 col-md-12 col-sm-12"},[a("div",{staticClass:"row mt-2 mb-4"},t._l(t.getJobs.jobs,(function(e,r){return a("div",{key:r,staticClass:"col-12 col-lg-4 mb-4",on:{click:function(a){return t.showDetailJob(e._id)}}},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-3 col-lg-3 col-md-2 col-sm-2 col-xs-2 mb-3"},[a("img",{staticClass:"img img-fluid rounded-circle mx-auto d-block",attrs:{src:e.company.logo,alt:""}})]),a("div",{staticClass:"col-8"},[a("h5",[t._v(t._s(e.title))]),a("p",[t._v(t._s(e.company.name))])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("h6",[t._v(" "+t._s(e.type.split(" ").map((function(t){return t.charAt(0).toUpperCase()+t.slice(1)})).join(" "))+" "+t._s(e.location_detail.length>0?"- "+e.location_detail[0].name:"")+" ")]),a("h6",[t._v(" "+t._s(e.salary.min&&e.salary.max?"IDR "+(new Intl.NumberFormat).format(e.salary.min)+" - "+(new Intl.NumberFormat).format(e.salary.max):"")+" ")])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 pt-2 pb-2"},[a("p",{domProps:{innerHTML:t._s(e.description.substr(0,100)+"...")}})]),a("div",{staticClass:"col-12"},[e.is_vocational?a("span",{staticClass:"badge badge-success mr-2 p-2 mb-2"},[t._v("SMA/SMK")]):t._e(),t._l(e.tags,(function(e,r){return a("span",{key:r,staticClass:"badge badge-info mr-2 p-2 mb-2"},[t._v(t._s(e))])}))],2)])])])])})),0)])])]),t.getJobs.totalJobs>0&&!t.isLoading?a("div",{staticClass:"col-12"},[a("nav",{attrs:{"aria-label":"..."}},[a("ul",{staticClass:"pagination justify-content-center"},[a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link",attrs:{href:"#!",tabindex:"-1"},on:{click:function(e){t.toPage(t.getPagination.filter((function(t){return t.isActive}))[0].pageNum-1)}}},[t._v("Mundur")])]),t._l(t.getPagination,(function(e,r){return a("li",{key:r,class:{"page-item":!0,active:e.isActive}},[a("a",{staticClass:"page-link",attrs:{href:"#!"},on:{click:function(a){return t.toPage(e.pageNum)}}},[t._v(t._s(e.pageNum))])])})),a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link",attrs:{href:"#!"},on:{click:function(e){t.toPage(t.getPagination.filter((function(t){return t.isActive}))[0].pageNum+1)}}},[t._v("Maju")])])],2)])]):t._e()])])])},f=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 col-lg-12 col-sm-12 col-md-12"},[a("h3",{staticClass:"text-center"},[t._v("Tunggu Sebentar Napa ...")]),a("p",{staticClass:"text-center"},[t._v(" Ikan hiu makan udang, tunggu sebentar dang ")])])}],m=(a("a4d3"),a("e01a"),a("99af"),a("4de4"),a("d81d"),a("fb6a"),a("b0c0"),a("ac1f"),a("1276"),a("96cf"),a("1da1")),b=a("5886");a("4413");r["a"].use(b["default"]);var g={name:"Home",data:function(){return{activePage:1,querySearch:"",isLoading:!0}},methods:{searchQuery:function(t){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.$refs.searchbar.value,e.querySearch=a,e.activePage=1,e.isLoading=!0,t.next=6,e.$store.dispatch("getJobs",{searchQuery:e.querySearch,page:e.activePage});case 6:e.isLoading=!1;case 7:case"end":return t.stop()}}),t)})))()},toPage:function(t){var e=this.$store.state.currentJobs.totalJobs;t>Math.ceil(e/12)||0==t||(this.activePage=t,this.$store.dispatch("getJobs",{searchQuery:this.querySearch,page:this.activePage}),window.scrollTo(0,0))},showDetailJob:function(t){var e=this.getJobs.jobs,a=e.filter((function(e){return e._id==t})),r=a[0],n=r.title,s=r.description,o=r.type,i=r.is_vocational,c=r.salary.min&&r.salary.max?"IDR ".concat((new Intl.NumberFormat).format(r.salary.min)," \n            - ").concat((new Intl.NumberFormat).format(r.salary.max)):"",l=r.category_detail.length>0?r.category_detail[0].name:"",u=r.location_detail.length>0?r.location_detail[0].name:"",d=r.company.name;this.$swal.fire({html:'\n          <div class="row">\n            <div class="col-12 col-lg-12 col-md-12 col-sm-12">\n              <h3 class="text-poppins mb-4">'.concat(n,'</h3>\n              <h6 class="text-opensans">').concat(c,'</h6>\n              <p class="text-opensans" style="font-size: 16px">').concat(d," <br> ").concat(o," ").concat(u?"- ".concat(u):"",'</p>\n              <p class="text-opensans mb-4" style="font-size: 16px">').concat(i&&l?"Direkomendasikan untuk jurusan <b>"+l+"</b>":"",'</p>\n              <div class="row">\n                <div class="col-12 col-lg-12 col-md-12 col-sm-12" style="font-size: 16px">\n                  ').concat(s,"\n                </div>\n              </div>\n\n            </div>\n          </div>\n        "),showCloseButton:!0,showCancelButton:!0,showConfirmButton:!0,confirmButtonText:"Lamar Sekarang Di ".concat(r.job_source.split("")[0].toUpperCase()+r.job_source.slice(1)),cancelButtonText:"Kembali",width:"100%"}).then((function(t){t.isConfirmed&&window.open(r.job_url,"_blank")}))}},computed:{getJobs:function(){return this.$store.state.currentJobs},getPagination:function(){var t=this,e=this.activePage,a=this.$store.state.currentJobs.totalJobs,r=[];return e-1==0&&++e,e+1==Math.ceil(a/12)+1&&--e,r.push({pageNum:e-1}),r.push({pageNum:e}),r.push({pageNum:e+1}),r.map((function(e){return e.pageNum==t.activePage?e.isActive=!0:e.isActive=!1})),r}},created:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getJobs");case 2:t.isLoading=!1;case 3:case"end":return e.stop()}}),e)})))()}},h=g,v=(a("f620"),Object(c["a"])(h,p,f,!1,null,"a43a4122",null)),y=v.exports;r["a"].use(d["a"]);var _=[{path:"/",name:"Home",component:y}],w=new d["a"]({mode:"history",base:"/",routes:_}),C=w,k=a("b85c"),x=a("2f62"),j=(a("b64b"),a("bf19"),a("8206")),J=a.n(j),O=function(){var t=Object(m["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,s,o,i,c,l,u,d,p,f,m;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=Object.assign({},e),r={errors:{status:!1,reason:null,request_config:null},data:null},a.requestUrl){t.next=6;break}return r.errors.status=!0,r.errors.reason="Request URL must be provided",t.abrupt("return",r);case 6:if(a.requestMethod){t.next=10;break}return r.errors.status=!0,r.errors.reason="Request method must be provided",t.abrupt("return",r);case 10:if(n=a.requestUrl,s=a.requestMethod,o={"Content-Type":"application/json"},a.requestHeaders)for(i=a.requestHeaders,c=0,l=Object.keys(i);c<l.length;c++)u=l[c],d=i[u],o[u]=d;return p=a.requestBody||null,t.prev=15,t.next=18,J()({url:n,method:s,data:p,headers:o});case 18:if(f=t.sent,f.data){t.next=23;break}return r.errors.status=!0,r.errors.reason="No response",t.abrupt("return",r);case 23:return r.data=f.data,t.abrupt("return",r);case 27:return t.prev=27,t.t0=t["catch"](15),r.errors.status=!0,r.errors.reason=t.t0.message,t.t0.hasOwnProperty("toJSON")&&(m=t.t0.toJSON(),r.errors.request_config={url:m.config.url,method:m.config.method,data:m.config.data,headers:m.config.headers}),t.abrupt("return",r);case 33:case"end":return t.stop()}}),t,null,[[15,27]])})));return function(e){return t.apply(this,arguments)}}(),P={Request:O};r["a"].use(x["a"]);var q=new x["a"].Store({state:{currentJobs:{jobs:[],totalJobs:0}},mutations:{setCurrentJobs:function(t,e){t.currentJobs.jobs=[],t.totalJobs=0;var a,r=e.data[0],n=r.count.length>0?r.count[0].total_jobs:0,s=Object(k["a"])(r.data);try{for(s.s();!(a=s.n()).done;){var o=a.value;t.currentJobs.jobs.push(o)}}catch(i){s.e(i)}finally{s.f()}t.currentJobs.totalJobs=n}},actions:{getJobs:function(t){var e=arguments;return Object(m["a"])(regeneratorRuntime.mark((function a(){var r,n,s,o,i,c,l,u,d,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=e.length>1&&void 0!==e[1]?e[1]:{},n=r.page||1,s=r.searchQuery,o=r.category,i=r.isVocational,c="".concat("https://joobhunts.herokuapp.com","/api/v1/jobs?page=").concat(n),s&&(c+="&searchQuery=".concat(s)),i&&(c+="&isVocational=1"),o){l=Object(k["a"])(o);try{for(l.s();!(u=l.n()).done;)d=u.value,c+="&category=".concat(d)}catch(f){l.e(f)}finally{l.f()}}return a.next=11,P.Request({requestUrl:c,requestMethod:"GET"});case 11:p=a.sent,p.errors.status&&console.log("ERROR ".concat(p.errrors.reason)),t.commit("setCurrentJobs",p.data);case 14:case"end":return a.stop()}}),a)})))()}},modules:{}});r["a"].config.productionTip=!1,new r["a"]({router:C,store:q,render:function(t){return t(u)}}).$mount("#app")},a7eb:function(t,e,a){},f620:function(t,e,a){"use strict";a("a7eb")}});
//# sourceMappingURL=app.c47aa98e.js.map