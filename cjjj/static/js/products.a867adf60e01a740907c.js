webpackJsonp([2],{"2uFj":function(t,n,e){var i="",o="";o=(i="http://120.76.188.39:8080")+"/cjjjapi",t.exports={origin:i,staticOrigin:o}},"2zds":function(t,n){},PBmY:function(t,n){},YXEC:function(t,n){},YhU3:function(t,n){},miO0:function(t,n){},"msV+":function(t,n,e){"use strict";var i={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"rich-content",domProps:{innerHTML:this._s(this.richContent)}})},staticRenderFns:[]};var o=e("vSla")({props:["richContent"]},i,!1,function(t){e("2zds")},null,null);n.a=o.exports},p26x:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});e("yvAY");var i=e("fc0N"),o=e.n(i),a=(e("miO0"),e("OTYB")),c=e.n(a),r=(e("PBmY"),e("I4Nl")),s=e.n(r),d=e("MVMM"),u=e("aozt"),l=e.n(u),p=e("2uFj"),f={data:function(){return{richContent:""}},components:{RichContent:e("msV+").a},created:function(){var t=this;this.$indicator.open({spinnerType:"fading-circle"}),l()({url:p.origin+"/cjjjapi/wx/getBizArticleShareById.action",method:"post",data:{id:"chanpinjieshao"}}).then(function(n){if(n.data.code&&t.$toast(n.data.message),!n.data.data.contentUrl)return t.$indicator.close(),t.$messageBox({title:"提示",message:"请先在后台编辑产品介绍"});l()({url:p.staticOrigin+n.data.data.contentUrl+"?t="+Date.now(),method:"get"}).then(function(n){t.$indicator.close(),n.data=n.data.replace(/src="\/cjjjmnt\/ueditor/gi,'src="'+p.origin+"/cjjjmnt/ueditor"),t.richContent=n.data}).catch(function(n){t.$indicator.close(),console.log(n),t.$toast("客户端请求出错")})}).catch(function(n){t.$indicator.close(),console.log(n),t.$toast("客户端请求出错")})}},h={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"page-item"},[n("rich-content",{attrs:{richContent:this.richContent}})],1)},staticRenderFns:[]};var m=e("vSla")(f,h,!1,function(t){e("YXEC")},null,null).exports;d.default.prototype.$toast=s.a,d.default.prototype.$indicator=c.a,d.default.prototype.$messageBox=o.a,d.default.config.productionTip=!1,new d.default({el:"#app",components:{App:m},template:"<App/>"})},yvAY:function(t,n){}},["p26x"]);