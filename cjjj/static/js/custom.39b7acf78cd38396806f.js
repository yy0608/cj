webpackJsonp([8],{"2uFj":function(t,e,i){var n="",o="";o=(n="http://120.76.188.39:8080")+"/cjjjapi",t.exports={origin:n,staticOrigin:o}},"9lpo":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("yvAY");var n=i("fc0N"),o=i.n(n),a=(i("miO0"),i("OTYB")),r=i.n(a),s=(i("PBmY"),i("I4Nl")),c=i.n(s),l=i("MVMM"),d=i("HzJ8"),u=i.n(d),p=i("aozt"),f=i.n(p),v=i("2uFj"),h=i("kyQo"),g={data:function(){return{showOrder:!1,sliderPages:[],sliderinit:{autoplay:5e3,loop:!1,direction:"vertical",duration:300}}},components:{slider:i.n(h).a},created:function(){var t=this;this.$indicator.open({spinnerType:"fading-circle"}),f()({url:v.origin+"/cjjjapi/wx/getBizMultiPicsById.action",method:"post",data:{id:"flow"}}).then(function(e){if(t.$indicator.close(),e.data.code)return t.$toast(e.data.message);var i=[];try{i=JSON.parse(e.data.data.detailPicList)}catch(t){i=[]}var n=!0,o=!1,a=void 0;try{for(var r,s=u()(i);!(n=(r=s.next()).done);n=!0){var c=r.value,l={};l.style={background:"url("+v.staticOrigin+c+") no-repeat center center","background-size":"100% 100% !important"},t.sliderPages.push(l)}}catch(t){o=!0,a=t}finally{try{!n&&s.return&&s.return()}finally{if(o)throw a}}}).catch(function(e){t.$indicator.close(),console.log(e),t.$toast("客户端请求出错")})},methods:{contTouch:function(t){t.preventDefault()},slide:function(t){this.showOrder=t.currentPage===this.sliderPages.length-1},goOrder:function(){window.location.href="./activity.html"}}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-item",on:{touchmove:function(e){t.contTouch(e)}}},[i("div",{staticClass:"my-slider"},[i("slider",{ref:"slider",attrs:{pages:t.sliderPages,sliderinit:t.sliderinit},on:{slide:t.slide}},[i("div",{attrs:{slot:"loading"},slot:"loading"},[t._v("loading...")])])],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showOrder,expression:"showOrder"}],staticClass:"want-order",on:{click:t.goOrder}},[t._v("我要预约")])])},staticRenderFns:[]};var y=i("vSla")(g,m,!1,function(t){i("zbZH")},null,null).exports;l.default.prototype.$toast=c.a,l.default.prototype.$indicator=r.a,l.default.prototype.$messageBox=o.a,l.default.config.productionTip=!1,new l.default({el:"#app",components:{App:y},template:"<App/>"})},PBmY:function(t,e){},YhU3:function(t,e){},miO0:function(t,e){},yvAY:function(t,e){},zbZH:function(t,e){}},["9lpo"]);