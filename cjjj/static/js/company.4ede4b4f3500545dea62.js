webpackJsonp([7],{"2uFj":function(t,n,i){var e="",a="";a=(e="http://120.76.188.39:8080")+"/cjjjapi",t.exports={origin:e,staticOrigin:a}},"2zds":function(t,n){},"9kw5":function(t,n){},PBmY:function(t,n){},YhU3:function(t,n){},miO0:function(t,n){},"msV+":function(t,n,i){"use strict";var e={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"rich-content",domProps:{innerHTML:this._s(this.richContent)}})},staticRenderFns:[]};var a=i("vSla")({props:["richContent"]},e,!1,function(t){i("2zds")},null,null);n.a=a.exports},yzc5:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});i("miO0");var e=i("OTYB"),a=i.n(e),c=(i("PBmY"),i("I4Nl")),o=i.n(c),r=i("MVMM"),s=i("aozt"),l=i.n(s),d=i("2uFj"),u={data:function(){return{richContent:""}},components:{RichContent:i("msV+").a},created:function(){var t=this;this.$indicator.open({spinnerType:"fading-circle"}),l()({url:d.origin+"/cjjjapi/wx/getBizArticleShareById.action",method:"post",data:{id:"gongsijianjie"}}).then(function(n){if(n.data.code&&t.$toast(n.data.message),!n.data.data.contentUrl)return t.$indicator.close(),t.$messageBox({title:"提示",message:"请先在后台编辑公司简介"});l()({url:d.staticOrigin+n.data.data.contentUrl+"?t="+Date.now(),method:"get"}).then(function(n){t.$indicator.close(),n.data=n.data.replace(/src="\/cjjjapi\/pics\//gi,'src="'+d.origin+"/cjjjapi/pics/"),t.richContent=n.data}).catch(function(n){t.$indicator.close(),console.log(n),t.$toast("客户端请求出错")})}).catch(function(n){t.$indicator.close(),console.log(n),t.$toast("客户端请求出错")})}},p={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"page-item"},[n("rich-content",{attrs:{richContent:this.richContent}})],1)},staticRenderFns:[]};var f=i("vSla")(u,p,!1,function(t){i("9kw5")},null,null).exports;r.default.prototype.$toast=o.a,r.default.prototype.$indicator=a.a,r.default.config.productionTip=!1,new r.default({el:"#app",components:{App:f},template:"<App/>"})}},["yzc5"]);