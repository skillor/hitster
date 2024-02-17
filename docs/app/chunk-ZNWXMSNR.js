import{a as L,b as P,c as R,d as D,f as G,g as q,h as U,i as K,j as T,l as b,m as H,p as X}from"./chunk-MEKUWKY6.js";import{Aa as u,Ca as z,Da as V,F as I,J as S,K as C,Ka as A,L as M,La as N,Na as W,Oa as B,P as x,U as s,V as O,Wa as j,a as v,aa as h,ca as a,da as w,ha as t,ia as n,ja as y,ma as k,oa as c,pa as f,ua as l,va as E,za as F}from"./chunk-3H3GWGAR.js";function J(o,p){if(o&1){let d=k();t(0,"button",33),c("click",function(){S(d);let m=f();return C(m.paste())}),M(),t(1,"svg",34),y(2,"path",35),n()()}if(o&2){let d=f();w("animate-bg-error-to-neutral",d.clipboardError)}}function Q(o,p){if(o&1&&(t(0,"option",36),l(1),n()),o&2){let d=p.$implicit;a("value",d.value),s(),E(d.key)}}function Y(o,p){if(o&1&&(t(0,"div",37)(1,"a",38),l(2," Login "),M(),t(3,"svg",39),y(4,"path",40),n()()()),o&2){let d=f();s(),w("btn-disabled",d.disableSpotifyLogin)}}function Z(o,p){if(o&1){let d=k();t(0,"app-starting-modal",41),c("close",function(){S(d);let m=f();return C(m.clickFirstStart())}),n()}o&2&&a("loading",!1)}function $(o,p){o&1&&y(0,"iframe",42)}var _=()=>({standalone:!0}),pe=(()=>{let p=class p{requestFullscreen(){document.body.style.zoom="",document.documentElement.requestFullscreen({navigationUI:"hide"}).then(()=>setTimeout(()=>this.skippingResize=!1,200)),this.skippingResize=!0}clickFirstStart(){b()&&this.requestFullscreen(),this.startingModal=!1}resizeEvent(e){this.startingModal||this.skippingResize||b()&&(this.startingModal=!0)}constructor(e){this.router=e,this.hasClipboard=navigator.clipboard&&navigator.clipboard.readText,this.hiddenInputString="assets/playlists/classic-english.json",this.playlists={Classic:"assets/playlists/classic-english.json","Classic (Deutsch)":"assets/playlists/classic-deutsch.json","Wild Mix":"assets/playlists/wild-mix.json","Perfect Playlist":"assets/playlists/perfect.json"},this.clipboardError=!1,this.startingModal=!0,this.skippingResize=!1,this.settings={keepWrongGuesses:!0,seed:"",handleTimes:"fix-tags"},this.inputString="",this.selectString="",this.hasMobileUserAgent=H(),this.removeSpotifyEmbed=H(),this.disableSpotifyLogin=!0}ngOnInit(){(!b()||document.fullscreenElement)&&(this.startingModal=!1);let e=localStorage.getItem("game_settings");e&&(this.settings=v(v({},this.settings),JSON.parse(e))),this.settings.seed="",this.selectString=this.hiddenInputString,this.validateInput()}paste(){navigator.clipboard.readText().then(e=>{T(e)?(this.inputString=e,this.inputChange()):this.clipboardError=!0}).catch(()=>{})}validateInput(){let e=this.inputString;return e==""&&(e=this.hiddenInputString),T(e)}inputChange(){return this.selectString="",this.validateInput()}selectChange(){this.inputString="",this.hiddenInputString=this.selectString}start(){let e=this.inputChange();e&&this.startGame(e)}startGame(e){if(localStorage.removeItem("cached_playlist"),localStorage.setItem("game_settings",JSON.stringify(this.settings)),localStorage.setItem("playlist_link",e.raw),e.type=="spotify-playlist"||e.type=="json"){this.router.navigate(["play"]);return}}messageEvent(e){if(e.origin=="https://open.spotify.com"){if(e.data.type=="ready")document.getElementById("spotify-embed").contentWindow.postMessage({command:"play_from_start"},"*");else if(e.data.type=="playback_update"){if(e.data.payload.duration==0)return;e.data.payload.duration<43300&&(this.disableSpotifyLogin=!1),this.removeSpotifyEmbed=!0}}}};p.\u0275fac=function(m){return new(m||p)(O(j))},p.\u0275cmp=I({type:p,selectors:[["app-home"]],hostBindings:function(m,i){m&1&&c("resize",function(r){return i.resizeEvent(r)},!1,x)("message",function(r){return i.messageEvent(r)},!1,x)},standalone:!0,features:[F],decls:52,vars:24,consts:[[1,"hero","min-h-screen","bg-base-200"],[1,"hero-content","flex-col","lg:flex-row"],[1,"text-center","lg:text-left"],[1,"text-5xl","font-bold"],[1,"py-6"],[1,"card","shrink-0","w-full","max-w-sm","shadow-2xl","bg-base-100"],[1,"card-body"],[1,"form-control"],[1,"label"],[1,"label-text"],[1,"flex","flex-row","gap-2"],["placeholder","spotify.com/playlist/13DZqkaAHiTY0nXtQf9iW0",1,"input","input-bordered","flex-grow","placeholder-neutral",3,"ngModel","ngModelOptions","ngModelChange"],["class","btn btn-neutral",3,"animate-bg-error-to-neutral","click",4,"ngIf"],[1,"select","select-bordered","text-base",3,"ngModel","ngModelOptions","change","ngModelChange"],["disabled","","selected","","value",""],[3,"value",4,"ngFor","ngForOf"],[1,"form-control","mt-6"],[1,"btn","btn-primary","btn-lg","font-bold","text-2xl",3,"disabled","click"],["class","form-control mt-2",4,"ngIf"],[1,"collapse","collapse-arrow"],[1,"collapse-title"],[1,"collapse-content"],[1,"label","gap-2"],["placeholder","random",1,"input","input-sm","input-bordered","placeholder-neutral",3,"ngModel","ngModelOptions","ngModelChange"],[1,"label","gap-3","cursor-pointer"],["type","checkbox","checked","checked",1,"checkbox",3,"ngModel","ngModelOptions","ngModelChange"],[1,"select","select-bordered","select-sm","text-sm","w-full","my-2",3,"ngModel","ngModelOptions","ngModelChange"],["value","fix-all"],["value","keep-all"],["value","fix-tags"],["value","remove-tags"],[3,"loading","close",4,"ngIf"],["id","spotify-embed","class","hidden","src","https://open.spotify.com/embed/track/2bNCdW4rLnCTzgqUXTTDO1?utm_source=generator","width","1","height","1","frameBorder","0","allow","autoplay; clipboard-write; encrypted-media; picture-in-picture",4,"ngIf"],[1,"btn","btn-neutral",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","d","M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"],[3,"value"],[1,"form-control","mt-2"],["href","https://spotify.com/login","target","_blank",1,"btn","btn-neutral","text-lg"],["fill","currentColor","width","24","height","24","xmlns","http://www.w3.org/2000/svg","fill-rule","evenodd","clip-rule","evenodd"],["d","M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"],[3,"loading","close"],["id","spotify-embed","src","https://open.spotify.com/embed/track/2bNCdW4rLnCTzgqUXTTDO1?utm_source=generator","width","1","height","1","frameBorder","0","allow","autoplay; clipboard-write; encrypted-media; picture-in-picture",1,"hidden"]],template:function(m,i){m&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),l(4,"Start now!"),n(),t(5,"p",4),l(6,"Enter a spotify playlist or select a preconfigured playlist to play a game of Hitster!"),n()(),t(7,"div",5)(8,"div",6)(9,"div",7)(10,"label",8)(11,"span",9),l(12,"Spotify Playlist"),n()(),t(13,"div",10)(14,"input",11),c("ngModelChange",function(){return i.inputChange()})("ngModelChange",function(r){return i.inputString=r}),n(),h(15,J,3,2,"button",12),n()(),t(16,"div",7)(17,"label",8)(18,"span",9),l(19,"Playlist"),n()(),t(20,"select",13),c("change",function(){return i.selectChange()})("ngModelChange",function(r){return i.selectString=r}),t(21,"option",14),l(22),n(),h(23,Q,2,2,"option",15),z(24,"keyvalue"),n()(),t(25,"div",16)(26,"button",17),c("click",function(){return i.start()}),l(27," Start "),n()(),h(28,Y,5,2,"div",18),t(29,"details",19)(30,"summary",20),l(31,"Advanced Settings"),n(),t(32,"div",21)(33,"label",22)(34,"span",9),l(35,"Seed"),n(),t(36,"input",23),c("ngModelChange",function(r){return i.settings.seed=r}),n()(),t(37,"label",24)(38,"span",9),l(39,"Keep wrong guesses"),n(),t(40,"input",25),c("ngModelChange",function(r){return i.settings.keepWrongGuesses=r}),n()(),t(41,"select",26),c("ngModelChange",function(r){return i.settings.handleTimes=r}),t(42,"option",27),l(43,"Fix Everything"),n(),t(44,"option",28),l(45,"Keep Everything"),n(),t(46,"option",29),l(47,"Fix tags like Remastered"),n(),t(48,"option",30),l(49,"Remove tags like Remastered"),n()()()()()()()(),h(50,Z,1,1,"app-starting-modal",31)(51,$,1,0,"iframe",32)),m&2&&(s(14),a("ngModel",i.inputString)("ngModelOptions",u(19,_)),s(),a("ngIf",i.hasClipboard),s(5),a("ngModel",i.selectString)("ngModelOptions",u(20,_)),s(2),E(i.inputString?"Custom":"Select playlist?"),s(),a("ngForOf",V(24,17,i.playlists)),s(3),a("disabled",!i.validateInput()),s(2),a("ngIf",!i.hasMobileUserAgent),s(8),a("ngModel",i.settings.seed)("ngModelOptions",u(21,_)),s(4),a("ngModel",i.settings.keepWrongGuesses)("ngModelOptions",u(22,_)),s(),a("ngModel",i.settings.handleTimes)("ngModelOptions",u(23,_)),s(9),a("ngIf",i.startingModal),s(),a("ngIf",!i.removeSpotifyEmbed))},dependencies:[B,A,N,W,K,q,U,P,L,G,R,D,X]});let o=p;return o})();export{pe as HomeComponent};
