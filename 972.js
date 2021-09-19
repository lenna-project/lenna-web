"use strict";(self.webpackChunk_lenna_proj_lenna_web=self.webpackChunk_lenna_proj_lenna_web||[]).push([[972],{433:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>p});var o=t(622),a=t(855),i=t(56),l=t(762),r=t(275),c=t.n(r),s=t(915),u=t(942),d=e([u]);u=(d.then?await d:d)[0];const p=(0,a.defineComponent)({components:{VueEasyLightbox:i.Z},props:{images:{type:Array,required:!0}},data:function(){return{imgs:[],visible:!1,index:0,filetype:"png",options:[{text:"png",value:"png"},{text:"jpg",value:"jpg"},{text:"bmp",value:"bmp"},{text:"ico",value:"ico"},{text:"gif",value:"gif"}]}},methods:{createObjectURL:function(e){return URL.createObjectURL(e)},safeImage:function(e,n){return(0,o.mG)(this,void 0,void 0,(function(){var t;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return[4,e.arrayBuffer().then((function(e){return new Uint8Array(e)}))];case 1:return t=o.sent(),[2,(0,u.OQ)(t,n)]}}))}))},downloadZip:function(){return(0,o.mG)(this,void 0,void 0,(function(){var e,n,t,a,i,r=this;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return e=new(c()),n=(0,s.pm)(),(t=this.images.length)<1?[2]:(a=0,n.info("compressing of "+this.images.length+" images started"),i=this.images.map((function(o){var i="image/"+r.filetype;return r.safeImage(o,r.filetype).then((function(l){var c=new File([l],o.name,{type:i});return a++,n.success("compressed "+o.name+" "+a+" / "+t+" images"),e.file(o.name.replace(/(\.[^/.]+)+$/,"")+"."+r.filetype,c)}))})),[4,Promise.all(i)]);case 1:return o.sent(),e.generateAsync({type:"blob"}).then((function(e){(0,l.saveAs)(e,"images.zip")})),[2]}}))}))},show:function(){this.visible=!0},showImg:function(e){this.index=e,this.visible=!0},handleHide:function(){this.visible=!1}},watch:{$props:{handler:function(){var e=this;this.imgs=[],this.index=0,this.images.forEach((function(n){e.imgs.push(e.createObjectURL(n))}))},deep:!0,immediate:!0}}})}))},97:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>v});var o=t(622),a=t(855),i=t(247),l=t(495),r=t(915),c=t(61),s=t(444),u=t(886),d=t(491),p=t(511),g=t(177),m=t(460),f=t(252),h=e([u]);u=(h.then?await h:h)[0];const v=(0,a.defineComponent)({name:"Home",components:{Slide:l.Slide,PluginsManager:c.Z,ImageUpload:s.Z,ImagePreview:u.Z,ConfigComp:d.Z,Help:p.Z},data:function(){return{pluginUrl:"",just:null,defaultConfig:[],defaultPlugins:[],sourceImages:[],resultImages:[],pluginManager:new g.Q("")}},setup:function(){return{imageUpload:(0,a.ref)(s.Z),pluginsManager:(0,a.ref)(c.Z)}},created:function(){this.$route.query.config&&(this.defaultConfig=JSON.parse(Buffer.from(this.$route.query.config.toString(),"base64").toString("binary")),console.log(this.defaultConfig)),this.$route.query.plugin&&(this.defaultPlugins=[this.$route.query.plugin.toString()]),this.$route.query.just&&(this.pluginManager.filter=this.$route.query.just.toString(),this.just=this.$route.query.just.toString()),this.loadDefaultPluginsMap(),this.loadDefaultPluginJson(),this.loadAddedPlugins()},methods:{loadPlugin:function(e){console.log("loaded plugin: ",e),this.pluginManager.importPlugin(e,e)},loadDefaultPluginsMap:function(){this.pluginManager.importPluginMap("https://lenna.app/lenna-plugins/importmap.json")},loadDefaultPluginJson:function(){this.pluginManager.importPluginsJson("https://lenna.app/lenna-plugins/plugins.json")},loadAddedPlugins:function(){var e=this;console.log((0,f.wI)()),(0,f.wI)().forEach((function(n){e.pluginManager.importPlugin(n,n)}))},onMorePlugins:function(){window.location.replace("/marketplace")},changeImages:function(e){this.sourceImages.push(e.file)},processImages:function(){return(0,o.mG)(this,void 0,void 0,(function(){var e;return(0,o.Jh)(this,(function(n){switch(n.label){case 0:return i.configure({parent:"#process"}),i.start(),e=(0,r.pm)(),[4,(0,m._)(this.sourceImages,this.resultImages,this.pluginManager.getPlugins(),{info:function(n){e.info(n)},success:function(n){e.success(n)}},i.set)];case 1:return n.sent(),this.imageUpload.images=[],this.sourceImages=[],i.done(),i.remove(),[2]}}))}))}}})}))},972:(e,n,t)=>{t.a(e,(async e=>{t.r(n);var o=t(855),a=t(304),i=t(926),l=t(915),r=e([i]);i=(r.then?await r:r)[0],(0,o.createApp)(a.Z).use(i.Z).use(l.ZP,{position:l.Vr.TOP_LEFT}).mount("#app")}))},177:(e,n,t)=>{t.d(n,{Q:()=>i});var o=t(622),a=t(252),i=function(){function e(e){this.configs=[],this.plugins=[],this.filter="",this.filter=e}return e.prototype.importPlugin=function(e,n){return(0,o.mG)(this,void 0,void 0,(function(){var a=this;return(0,o.Jh)(this,(function(i){return[2,System.import(n).then((function(i){return(0,o.mG)(a,void 0,void 0,(function(){var a=this;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return[4,i.init(t.S.default)];case 1:return o.sent(),[2,i.get("default").then((function(t){a.importModule(e,n,t())}))]}}))}))}))]}))}))},e.prototype.importModule=function(e,n,t){return(0,o.mG)(this,void 0,void 0,(function(){var i;return(0,o.Jh)(this,(function(o){return i=(0,a.ME)({name:e,url:n,plugin:t,enabled:!1,config:{}}),this.filter.length>0?i.name.includes(this.filter)&&(i.enabled=!0,this.configs.push({name:i.name,enabled:!0,config:i.config}),this.plugins.push(i)):this.plugins.push(i),[2]}))}))},e.prototype.importPluginMap=function(e){return(0,o.mG)(this,void 0,void 0,(function(){var n,t,a,i,l=this;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return n=[],[4,fetch(e)];case 1:return[4,o.sent().json()];case 2:for(i in t=o.sent(),a=function(e){var o=t.imports[e];n.push(System.import(e).then((function(n){return l.importModule(e,o,n)})))},t.imports)a(i);return[2,Promise.all(n)]}}))}))},e.prototype.importPluginsJson=function(e){return(0,o.mG)(this,void 0,void 0,(function(){var n,t,a,i;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return n=[],[4,fetch(e)];case 1:return[4,o.sent().json()];case 2:for(a in(t=o.sent()).plugins)i=t.plugins[a],n.push(this.importPlugin(a,i));return[2,Promise.all(n)]}}))}))},e.prototype.changeConfig=function(e,n){var t=this.plugins.find((function(n){return n.name===e}));t&&(t.config=n)},e.prototype.getPlugins=function(){return this.plugins},e}()},460:(e,n,t)=>{t.d(n,{_:()=>a});var o=t(622),a=function(e,n,t,a,l){return(0,o.mG)(void 0,void 0,void 0,(function(){var r,c,s,u,d,p,g;return(0,o.Jh)(this,(function(o){for(r=e.length,c=0,a.info("converting "+r+" images started"),n.length=0,s=[],u=function(e){s.push(i(e,t,l).then((function(t){var o=new File([t],e.name,{type:"image/png"});n.push(o),c++,a.success("converted "+c+" of "+r+" images")})))},d=0,p=e;d<p.length;d++)g=p[d],u(g);return[2,Promise.all(s).then((function(){a.info("converted "+c+" images")}))]}))}))},i=function(e,n,t){return(0,o.mG)(void 0,void 0,void 0,(function(){var a,i,l,r,c,s,u;return(0,o.Jh)(this,(function(o){switch(o.label){case 0:return a=0,l=Uint8Array.bind,[4,e.arrayBuffer()];case 1:i=new(l.apply(Uint8Array,[void 0,o.sent()])),r=0,c=n,o.label=2;case 2:return r<c.length?(s=c[r],t(a),a+=1/n.length,s.enabled?[4,null===(u=s.plugin)||void 0===u?void 0:u.process(s.config,i)]:[3,4]):[3,5];case 3:i=o.sent(),o.label=4;case 4:return r++,[3,2];case 5:return t(1),[2,i]}}))}))}},252:(e,n,t)=>{t.d(n,{Oh:()=>o,ME:()=>a,iy:()=>i,wI:()=>l});var o=function(e){var n={name:e.name,enabled:e.enabled,config:e.config};localStorage.setItem(e.name,JSON.stringify(n))},a=function(e){var n=localStorage.getItem(e.name);if(n){var t=JSON.parse(n);e.enabled=t.enabled,e.config=Object.assign(e.config,t.config)}return e},i=function(e,n){return n.forEach((function(n){n.name===e.name&&(e.enabled=n.enabled,e.config=Object.assign(e.config,n.config))})),e},l=function(){var e=localStorage.getItem("plugins")||"[]";return JSON.parse(e)}},926:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>c});var o=t(986),a=t(584),i=t(211),l=e([a]),r=[{path:"/",name:"Home",component:(a=(l.then?await l:l)[0]).Z},{path:"/about",name:"About",component:i.Z},{path:"/just/${just}",name:"Just",component:a.Z}];const c=(0,o.createRouter)({history:(0,o.createWebHistory)(),routes:r})}))},304:(e,n,t)=>{t.d(n,{Z:()=>b});var o=t(855);const a=t.p+"aad257b5f9f4288436c6e6e0ebb2e336.png";(0,o.pushScopeId)("data-v-48f88512");const i={class:"navbar"},l=(0,o.createElementVNode)("div",{id:"banner"},[(0,o.createElementVNode)("img",{src:a})],-1),r=(0,o.createTextVNode)("Home"),c=(0,o.createElementVNode)("a",{href:"marketplace"},"Marketplace",-1),s=(0,o.createTextVNode)("About");(0,o.popScopeId)();const u=(0,o.defineComponent)({name:"Navbar"});u.render=function(e,n,t,a,u,d){const p=(0,o.resolveComponent)("router-link");return(0,o.openBlock)(),(0,o.createElementBlock)("div",i,[l,(0,o.createVNode)(p,{to:"/"},{default:(0,o.withCtx)((()=>[r])),_:1}),c,(0,o.createVNode)(p,{to:"/about"},{default:(0,o.withCtx)((()=>[s])),_:1})])},u.__scopeId="data-v-48f88512";const d=u;(0,o.pushScopeId)("data-v-06c5fd87");const p={class:"footer"},g=(0,o.createTextVNode)(" Convert images online without upload of your data. "),m=(0,o.createElementVNode)("a",{href:"https://lenna.app"}," lenna.app ",-1);(0,o.popScopeId)();const f=(0,o.defineComponent)({name:"Footer"});f.render=function(e,n,t,a,i,l){const r=(0,o.resolveComponent)("v-footer");return(0,o.openBlock)(),(0,o.createElementBlock)("div",p,[(0,o.createVNode)(r,null,{default:(0,o.withCtx)((()=>[g,(0,o.createElementVNode)("p",null,[(0,o.createTextVNode)(" © "+(0,o.toDisplayString)((new Date).getFullYear())+" — ",1),m])])),_:1})])},f.__scopeId="data-v-06c5fd87";const h=f,v=(0,o.defineComponent)({name:"App",components:{Navbar:d,Footer:h}});v.render=function(e,n,t,a,i,l){const r=(0,o.resolveComponent)("Navbar"),c=(0,o.resolveComponent)("router-view"),s=(0,o.resolveComponent)("Footer");return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createVNode)(r),(0,o.createVNode)(c),(0,o.createVNode)(s)])};const b=v},491:(e,n,t)=>{t.d(n,{Z:()=>c});var o=t(855);(0,o.pushScopeId)("data-v-171f4380");const a={key:1,class:"config"};(0,o.popScopeId)();var i=t(85),l=t.n(i);const r=(0,o.defineComponent)({name:"ConfigComp",props:{plugins:{type:Array,required:!0}},data:function(){return{url:"https://lenna.app/?config=",base64config:""}},methods:{download:function(e,n){var t=document.createElement("a");t.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(n)),t.setAttribute("download",e),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)},generateConfigUrlBase64:function(){var e=function(e){for(var n=[],t=0,o=e;t<o.length;t++){var a=o[t];if(a.enabled){var i=a.config;i.name=a.name,n.push(i)}}var l=JSON.stringify(n);return btoa(l)}(this.plugins);this.base64config=this.url+e},generateLennaConfig:function(){var e=function(e){for(var n=[],t=0,o=e;t<o.length;t++){var a=o[t];if(a.enabled){var i=a.config;i.name=a.name,n.push(i)}}return"# https://github.com/lenna-project/lenna-cli\n# lenna-cli images_path --config lenna.yml\n"+l().stringify({pipeline:n})}(this.plugins);this.download("lenna.yml",e)}}});r.render=function(e,n,t,i,l,r){return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[e.plugins?((0,o.openBlock)(),(0,o.createElementBlock)("button",{key:0,onClick:n[0]||(n[0]=(...n)=>e.generateConfigUrlBase64&&e.generateConfigUrlBase64(...n))}," generate actual config url ")):(0,o.createCommentVNode)("",!0),e.base64config?((0,o.openBlock)(),(0,o.createElementBlock)("div",a,[(0,o.withDirectives)((0,o.createElementVNode)("textarea",{"onUpdate:modelValue":n[1]||(n[1]=n=>e.base64config=n),readonly:!0},null,512),[[o.vModelText,e.base64config]])])):(0,o.createCommentVNode)("",!0),(0,o.createElementVNode)("button",{onClick:n[2]||(n[2]=(...n)=>e.generateLennaConfig&&e.generateLennaConfig(...n))},"lenna.yml")])},r.__scopeId="data-v-171f4380";const c=r},511:(e,n,t)=>{t.d(n,{Z:()=>r});var o=t(855);(0,o.pushScopeId)("data-v-219d31e4");const a={class:"help"},i=[(0,o.createElementVNode)("h2",null,"How to Convert Images",-1),(0,o.createElementVNode)("ol",null,[(0,o.createElementVNode)("li",null,"Drop images into left box."),(0,o.createElementVNode)("li",null,"Enable the plugins you want to use in convertion."),(0,o.createElementVNode)("li",null,"Order the plugins via drag and drop"),(0,o.createElementVNode)("li",null,"Press the process button."),(0,o.createElementVNode)("li",null,"Select file type you want to download on the right."),(0,o.createElementVNode)("li",null,"Download your converted images compressed as zip.")],-1)];(0,o.popScopeId)();const l=(0,o.defineComponent)({name:"Help"});l.render=function(e,n,t,l,r,c){return(0,o.openBlock)(),(0,o.createElementBlock)("div",a,i)},l.__scopeId="data-v-219d31e4";const r=l},886:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>l});var o=t(991),a=t(575),i=e([a]);(a=(i.then?await i:i)[0]).Z.render=o.s,a.Z.__scopeId="data-v-329c5e15";const l=a.Z}))},444:(e,n,t)=>{t.d(n,{Z:()=>v});var o=t(855);(0,o.pushScopeId)("data-v-03382e06");const a={class:"image-upload"},i=(0,o.createTextVNode)(" drop"),l=(0,o.createElementVNode)("br",null,null,-1),r=(0,o.createTextVNode)("or"),c=(0,o.createElementVNode)("br",null,null,-1),s=(0,o.createTextVNode)("select files"),u={key:0,class:"image-container"},d=["onClick"],p=["src"];(0,o.popScopeId)();var g=t(658),m=t.n(g),f=t(56);const h=(0,o.defineComponent)({components:{FileUpload:m(),VueEasyLightbox:f.Z},data:function(){return{files:[],images:[],visible:!1,index:0}},methods:{inputFile:function(e,n,t){this.images.push(e.url),this.$emit("changeImage",e)},inputFilter:function(e,n,t){if(e&&!n&&!/\.(gif|jpg|jpeg|png|webp)$/i.test(e.name))return alert("Your choice is not a picture"),t();if(e&&(!n||e.file!==n.file)){e.url="";var o=window.URL||window.webkitURL;o&&o.createObjectURL&&(e.url=o.createObjectURL(e.file))}},showImg:function(e){this.index=e,this.visible=!0},handleHide:function(){this.visible=!1}}});h.render=function(e,n,t,g,m,f){const h=(0,o.resolveComponent)("FileUpload"),v=(0,o.resolveComponent)("vue-easy-lightbox");return(0,o.openBlock)(),(0,o.createElementBlock)("div",a,[(0,o.createVNode)(h,{multiple:!0,drop:!0,"drop-directory":!0,extensions:"gif,jpg,jpeg,png,webp",accept:"image/png,image/gif,image/jpeg,image/webp",modelValue:e.files,"onUpdate:modelValue":n[0]||(n[0]=n=>e.files=n),onInputFilter:e.inputFilter,onInputFile:e.inputFile,ref:"upload",class:"file-upload"},{default:(0,o.withCtx)((()=>[i,l,r,c,s])),_:1},8,["modelValue","onInputFilter","onInputFile"]),e.images.length>0?((0,o.openBlock)(),(0,o.createElementBlock)("div",u,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.images,((n,t)=>((0,o.openBlock)(),(0,o.createElementBlock)("div",{key:t,class:"pic",onClick:()=>e.showImg(t)},[(0,o.createElementVNode)("img",{height:"140",src:n},null,8,p)],8,d)))),128)),(0,o.createVNode)(v,{escDisabled:"",moveDisabled:"",visible:e.visible,imgs:e.images,index:e.index,onHide:e.handleHide},null,8,["visible","imgs","index","onHide"])])):(0,o.createCommentVNode)("",!0)])},h.__scopeId="data-v-03382e06";const v=h},61:(e,n,t)=>{t.d(n,{Z:()=>x});var o=t(855);(0,o.pushScopeId)("data-v-ee826b3a");const a={class:"plugins-manager"};(0,o.popScopeId)();var i=t(734);(0,o.pushScopeId)("data-v-b286d410");const l={key:0,class:"plugin"},r={key:1},c={key:0},s={key:1};(0,o.popScopeId)();var u=t(622);(0,o.pushScopeId)("data-v-8f565294");const d={key:0,class:"plugin-config"},p={class:"parameter"},g=["placeholder","onUpdate:modelValue","id"];(0,o.popScopeId)();const m=(0,o.defineComponent)({name:"PluginConfig",props:{defaultConfig:Object},data:function(){return{config:[]}},methods:{updateConfig:function(){return(0,u.mG)(this,void 0,void 0,(function(){var e,n,t,o;return(0,u.Jh)(this,(function(a){for(e=new Map,n=0,t=this.config;n<t.length;n++)o=t[n],e.set(o.key,o.value);return this.$emit("changeConfig",e),[2]}))}))}},created:function(){for(var e in this.defaultConfig){var n={key:e,value:this.defaultConfig[e]};this.config.push(n)}this.updateConfig()}});m.render=function(e,n,t,a,i,l){return e.config?((0,o.openBlock)(),(0,o.createElementBlock)("div",d,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.config,(t=>((0,o.openBlock)(),(0,o.createElementBlock)("div",{key:t.key},[(0,o.createElementVNode)("div",p,[(0,o.createElementVNode)("label",null,(0,o.toDisplayString)(t.key)+": ",1),(0,o.withDirectives)((0,o.createElementVNode)("input",{type:"number",placeholder:t.key,"onUpdate:modelValue":e=>t.value=e,onChange:n[0]||(n[0]=n=>e.updateConfig()),id:t.key},null,40,g),[[o.vModelText,t.value,void 0,{number:!0}]])])])))),128))])):(0,o.createCommentVNode)("",!0)},m.__scopeId="data-v-8f565294";const f=m;(0,o.pushScopeId)("data-v-3a505396");const h={class:"checkbox-container"},v={class:"checkbox"},b=["checked"],k=(0,o.createElementVNode)("span",null,null,-1);(0,o.popScopeId)();const C=(0,o.defineComponent)({name:"Checkbox",props:{checked:{type:Boolean}},emits:["update:checked"],computed:{value:{get:function(){return this.checked},set:function(e){this.$emit("update:checked",e)}}}});C.render=function(e,n,t,a,i,l){return(0,o.openBlock)(),(0,o.createElementBlock)("div",h,[(0,o.createElementVNode)("label",v,[(0,o.createElementVNode)("input",{onInput:n[0]||(n[0]=n=>e.$emit("update:checked",n.target.checked)),type:"checkbox",checked:e.checked,id:"checkbox"},null,40,b),k])])},C.__scopeId="data-v-3a505396";const y=C;(0,o.pushScopeId)("data-v-223afea4");const V=["src"];(0,o.popScopeId)();const E={props:{src:{type:[Object,String]}},render:function(e,n,t,a,i,l){return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createElementVNode)("img",{id:"icon",src:t.src},null,8,V)])},__scopeId:"data-v-223afea4"};var N=t(252);const w=(0,o.defineComponent)({name:"Plugin",props:{name:String,plugin:Object,url:String,defaultConfig:Object},components:{Checkbox:y,Icon:E,PluginConfig:f},data:function(){return{ui:(0,o.shallowRef)(null),icon:(0,o.shallowRef)(null),processor:null,enabled:!1,keyCounter:0,pluginKey:"",config:{}}},methods:{loadDefaultConfig:function(){var e;return(0,u.mG)(this,void 0,void 0,(function(){var n=this;return(0,u.Jh)(this,(function(t){return null===(e=this.plugin)||void 0===e||e.defaultConfig().then((function(e){if(n.defaultConfig&&n.defaultConfig.length>0){var t=(0,N.iy)({name:n.name||"",enabled:!0,config:e},n.defaultConfig),o=t.enabled,a=t.config;n.config=a,n.enabled=o||!1}else{var i=(0,N.ME)({name:n.name||"",enabled:!1,config:e});o=i.enabled,a=i.config,n.config=a,n.enabled=o||!1}})),[2]}))}))},loadUI:function(){var e,n;return(0,u.mG)(this,void 0,void 0,(function(){var t=this;return(0,u.Jh)(this,(function(o){return(null===(e=this.plugin)||void 0===e?void 0:e.ui)&&this.url&&System.import(this.url).then((function(e){e.get("./Widget").then((function(e){t.ui=e().default}))})).catch((function(e){return console.log(e)})),(null===(n=this.plugin)||void 0===n?void 0:n.icon)&&(this.icon=this.plugin.icon()),[2]}))}))},updateConfig:function(e){return(0,u.mG)(this,void 0,void 0,(function(){return(0,u.Jh)(this,(function(n){return(0,N.Oh)({name:this.name||"",enabled:this.enabled,config:e}),this.$emit("changeConfig",e),[2]}))}))},updateEnabled:function(e){return(0,u.mG)(this,void 0,void 0,(function(){return(0,u.Jh)(this,(function(n){return this.enabled=e,(0,N.Oh)({name:this.name||"",enabled:this.enabled,config:this.config}),this.$emit("changeEnabled",e),[2]}))}))}},created:function(){console.log(this.name),this.loadUI(),this.loadDefaultConfig()},watch:{defaultConfig:{handler:function(){this.keyCounter+=1,this.pluginKey=(this.name||"")+this.keyCounter}}}});w.render=function(e,n,t,a,i,u){const d=(0,o.resolveComponent)("Icon"),p=(0,o.resolveComponent)("Checkbox"),g=(0,o.resolveComponent)("PluginConfig");return e.plugin?((0,o.openBlock)(),(0,o.createElementBlock)("div",l,[e.icon&&!e.enabled?((0,o.openBlock)(),(0,o.createBlock)(d,{key:0,src:e.icon},null,8,["src"])):(0,o.createCommentVNode)("",!0),(0,o.createElementVNode)("div",null,[(0,o.createElementVNode)("h2",null,(0,o.toDisplayString)(e.plugin.name()),1),(0,o.createVNode)(p,{checked:e.enabled,"onUpdate:checked":n[0]||(n[0]=n=>e.updateEnabled(n))},null,8,["checked"])]),e.enabled?((0,o.openBlock)(),(0,o.createElementBlock)("div",r,[(0,o.createElementVNode)("span",null,(0,o.toDisplayString)(e.plugin.description()),1),e.ui&&e.config?((0,o.openBlock)(),(0,o.createElementBlock)("div",c,[((0,o.openBlock)(),(0,o.createBlock)((0,o.resolveDynamicComponent)(e.ui),{key:e.pluginKey,defaultConfig:e.config,onChangeConfig:n[1]||(n[1]=n=>e.updateConfig(n))},null,8,["defaultConfig"]))])):((0,o.openBlock)(),(0,o.createElementBlock)("div",s,[(0,o.createVNode)(g,{key:e.pluginKey,defaultConfig:e.config,onChangeConfig:n[2]||(n[2]=n=>e.updateConfig(n))},null,8,["defaultConfig"])]))])):(0,o.createCommentVNode)("",!0)])):(0,o.createCommentVNode)("",!0)},w.__scopeId="data-v-b286d410";const I=w,B=(0,o.defineComponent)({name:"PluginsManager",props:{pluginsmap:String,pluginsjson:String,defaultConfig:Object,pluginManager:Object,defaultPlugins:Array},components:{Plugin:I,draggable:i.J},data:function(){return{plugins:[],configs:{}}},beforeMount:function(){var e;this.plugins=(null===(e=this.pluginManager)||void 0===e?void 0:e.getPlugins())||[]},methods:{changeEnabled:function(e,n){var t=this.plugins.find((function(n){return n.name===e}));t&&(t.enabled=n)},changeConfig:function(e,n){var t=this.plugins.find((function(n){return n.name===e}));t&&(t.config=n)},raw:function(e){return e}}});B.render=function(e,n,t,i,l,r){const c=(0,o.resolveComponent)("Plugin"),s=(0,o.resolveComponent)("draggable");return(0,o.openBlock)(),(0,o.createElementBlock)("div",a,[(0,o.createVNode)(s,{class:"dragArea list-group plugins",list:e.plugins},{default:(0,o.withCtx)((()=>[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.plugins,(n=>((0,o.openBlock)(),(0,o.createElementBlock)("div",{class:"list-group-item",key:n.name},[(0,o.createVNode)(c,{name:n.name,plugin:n.plugin,url:n.url,defaultConfig:e.configs,onChangeEnabled:t=>e.changeEnabled(n.name,t),onChangeConfig:t=>e.changeConfig(n.name,t)},null,8,["name","plugin","url","defaultConfig","onChangeEnabled","onChangeConfig"])])))),128))])),_:1},8,["list"])])},B.__scopeId="data-v-ee826b3a";const x=B},211:(e,n,t)=>{t.d(n,{Z:()=>E});var o=t(855);(0,o.pushScopeId)("data-v-53080255");const a={class:"about"},i=(0,o.createElementVNode)("h1",null,"About Lenna Project",-1),l=(0,o.createElementVNode)("p",null," Lenna is a library for image processing algorithms. The web page allows to test and use them. ",-1),r=(0,o.createStaticVNode)('<h2 data-v-53080255>Thanks</h2><ul data-v-53080255><li data-v-53080255>Silvia (<a href="https://github.com/silvia-odwyer/photon" data-v-53080255>photon</a>)</li></ul><h2 data-v-53080255>Plugins</h2><p data-v-53080255> Lenna allows to plug in more algorithms. The plugins can be activated for use in the <a href="https://lenna.app/marketplace/" data-v-53080255>marketplace</a>. Some examples can be found at <a href="https://github.com/lenna-project/lenna-plugins" data-v-53080255>lenna-project/lenna-plugins</a> on github. <br data-v-53080255> Following a list of available plugins: <ul data-v-53080255><li data-v-53080255><b data-v-53080255>blur</b> - Blurs the image. The strength can be configured.</li><li data-v-53080255><b data-v-53080255>dramatic</b> - Gives the image a dramatic touch.</li><li data-v-53080255><b data-v-53080255>exif</b> - Allows to clear exif data of the image.</li><li data-v-53080255><b data-v-53080255>rotate</b> - Rotates the image.</li><li data-v-53080255><b data-v-53080255>canny</b> - Shows edges of objects in the image.</li></ul></p><h2 data-v-53080255>Jupyter Notebooks</h2> View some notebooks <a href="/jupyter" data-v-53080255>here</a> to see how the plugins can be used in python. <h2 data-v-53080255>Command Line Interface</h2>',9),c=(0,o.createElementVNode)("iframe",{src:"https://snapcraft.io/lenna-cli/embedded?button=black&summary=true",frameborder:"0",width:"100%",height:"380px",style:{border:"1px solid #CCC","border-radius":"2px"}},null,-1),s=(0,o.createElementVNode)("p",null,[(0,o.createTextVNode)(" A command line interface allows to use the algorithms and run them on multiple images at once. The source for "),(0,o.createElementVNode)("a",{href:"https://github.com/lenna-project/lenna-cli"},"lenna-cli"),(0,o.createTextVNode)(" can be found on github. ")],-1),u=(0,o.createElementVNode)("img",{src:"https://raw.githubusercontent.com/lenna-project/lenna-cli/main/docs/images/run.gif"},null,-1),d=(0,o.createElementVNode)("h2",null,"Desktop App",-1),p=(0,o.createElementVNode)("a",{href:"https://sourceforge.net/projects/lenna/files/latest/download"},[(0,o.createElementVNode)("img",{alt:"Download lenna",src:"https://a.fsdn.com/con/app/sf-download-button",width:"276",height:"48",srcset:"https://a.fsdn.com/con/app/sf-download-button?button_size=2x 2x"})],-1),g=(0,o.createElementVNode)("br",null,null,-1),m=(0,o.createElementVNode)("iframe",{src:"https://snapcraft.io/lenna/embedded?button=black&summary=true&screenshot=true",frameborder:"0",width:"100%",height:"620px",style:{border:"1px solid #CCC","border-radius":"2px"}},null,-1),f=(0,o.createElementVNode)("h2",null,"Desktop Web App",-1),h=(0,o.createElementVNode)("a",{href:"https://github.com/lenna-project/lenna-gui/releases/latest"},"Lenna GUI",-1),v=(0,o.createTextVNode)(" This App supports convertion of images in folders. "),b=(0,o.createElementVNode)("br",null,null,-1),k=(0,o.createTextVNode)(" You can find installers for Mac, Linux and Windows. "),C=(0,o.createElementVNode)("br",null,null,-1);(0,o.popScopeId)();var y=t(511);const V=(0,o.defineComponent)({name:"About",components:{Help:y.Z}});V.render=function(e,n,t,y,V,E){const N=(0,o.resolveComponent)("Help");return(0,o.openBlock)(),(0,o.createElementBlock)("div",a,[i,l,(0,o.createVNode)(N),r,c,s,u,d,p,g,m,f,h,v,b,k,C])},V.__scopeId="data-v-53080255";const E=V},584:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>l});var o=t(16),a=t(579),i=e([a]);(a=(i.then?await i:i)[0]).Z.render=o.s,a.Z.__scopeId="data-v-c3e406a6";const l=a.Z}))},991:(e,n,t)=>{t.d(n,{s:()=>d});var o=t(855);(0,o.pushScopeId)("data-v-329c5e15");const a={class:"image-preview"},i={id:"save"},l=["value"],r=(0,o.createElementVNode)("br",null,null,-1),c={key:0,class:"image-container"},s=["onClick"],u=["src"];function d(e,n,t,d,p,g){const m=(0,o.resolveComponent)("vue-easy-lightbox");return(0,o.openBlock)(),(0,o.createElementBlock)("div",a,[(0,o.createElementVNode)("div",i,[(0,o.withDirectives)((0,o.createElementVNode)("select",{"onUpdate:modelValue":n[0]||(n[0]=n=>e.filetype=n)},[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.options,(e=>((0,o.openBlock)(),(0,o.createElementBlock)("option",{value:e.value,key:e.text},(0,o.toDisplayString)(e.text),9,l)))),128))],512),[[o.vModelSelect,e.filetype]]),(0,o.createElementVNode)("p",{onClick:n[1]||(n[1]=(...n)=>e.downloadZip&&e.downloadZip(...n))},"save files")]),r,e.imgs.length>0?((0,o.openBlock)(),(0,o.createElementBlock)("div",c,[((0,o.openBlock)(!0),(0,o.createElementBlock)(o.Fragment,null,(0,o.renderList)(e.imgs,((n,t)=>((0,o.openBlock)(),(0,o.createElementBlock)("div",{key:t,class:"pic",onClick:()=>e.showImg(t)},[(0,o.createElementVNode)("img",{height:"140",src:n},null,8,u)],8,s)))),128))])):(0,o.createCommentVNode)("",!0),(0,o.createVNode)(m,{escDisabled:"",moveDisabled:"",visible:e.visible,imgs:e.imgs,index:e.index,onHide:e.handleHide},null,8,["visible","imgs","index","onHide"])])}(0,o.popScopeId)()},16:(e,n,t)=>{t.d(n,{s:()=>g});var o=t(855);(0,o.pushScopeId)("data-v-c3e406a6");const a=(0,o.createElementVNode)("br",null,null,-1),i={class:"main"},l=(0,o.createElementVNode)("h1",null,"Convert images online without upload of your data",-1),r={key:0},c={class:"top_main"},s={id:"process"},u={class:"bottom_main"},d={id:"line"},p=(0,o.createElementVNode)("hr",null,null,-1);function g(e,n,t,g,m,f){const h=(0,o.resolveComponent)("ConfigComp"),v=(0,o.resolveComponent)("Help"),b=(0,o.resolveComponent)("Slide"),k=(0,o.resolveComponent)("ImageUpload"),C=(0,o.resolveComponent)("ImagePreview"),y=(0,o.resolveComponent)("PluginsManager");return(0,o.openBlock)(),(0,o.createElementBlock)("div",null,[(0,o.createVNode)(b,null,{default:(0,o.withCtx)((()=>[(0,o.createElementVNode)("button",{onClick:n[0]||(n[0]=n=>e.loadPlugin(e.pluginUrl))},"add plugin"),(0,o.withDirectives)((0,o.createElementVNode)("input",{"onUpdate:modelValue":n[1]||(n[1]=n=>e.pluginUrl=n),placeholder:"https://lenna.app/lenna-plugins/desaturate/remoteEntry.js"},null,512),[[o.vModelText,e.pluginUrl]]),a,e.pluginsManager?((0,o.openBlock)(),(0,o.createBlock)(h,{key:0,plugins:e.pluginsManager.plugins},null,8,["plugins"])):(0,o.createCommentVNode)("",!0),(0,o.createVNode)(v)])),_:1}),(0,o.createElementVNode)("div",i,[l,e.just?((0,o.openBlock)(),(0,o.createElementBlock)("h2",r,(0,o.toDisplayString)(e.just),1)):(0,o.createCommentVNode)("",!0),(0,o.createElementVNode)("div",c,[(0,o.createVNode)(k,{class:"v-step-3",ref:"imageUpload",onChangeImage:n[2]||(n[2]=n=>e.changeImages(n))},null,512),(0,o.createElementVNode)("div",s,[(0,o.createElementVNode)("button",{class:"v-step-5",onClick:n[3]||(n[3]=(...n)=>e.processImages&&e.processImages(...n))}," process images ")]),(0,o.createVNode)(C,{class:"v-step-6",images:e.resultImages},null,8,["images"])]),(0,o.createElementVNode)("div",u,[(0,o.createVNode)(y,{class:"v-step-4",ref:"pluginsManager",pluginManager:e.pluginManager,defaultConfig:e.defaultConfig,defaultPlugins:e.defaultPlugins},null,8,["pluginManager","defaultConfig","defaultPlugins"])]),(0,o.createElementVNode)("div",d,[p,(0,o.createElementVNode)("div",{class:"plus radius",onClick:n[4]||(n[4]=n=>e.onMorePlugins())})])])])}(0,o.popScopeId)()},575:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>o.Z});var o=t(433),a=e([o]);o=(a.then?await a:a)[0]}))},579:(e,n,t)=>{t.a(e,(async e=>{t.d(n,{Z:()=>o.Z});var o=t(97),a=e([o]);o=(a.then?await a:a)[0]}))}}]);
//# sourceMappingURL=972.js.map