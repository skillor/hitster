import{a as te,b as ie,c as ne,d as oe,f as le,g as ae,h as re,i as se,j as H,l as D,m as M,n as F,q as pe,r as O}from"./chunk-LIUYA2FD.js";import{Aa as q,D as G,Da as Y,Ea as f,G as $,Ia as X,J as W,N as m,O as g,Oa as J,P as w,Pa as K,Q as k,Sa as Z,T as V,Ua as Q,Y as p,Z as I,_a as ee,a as C,ea as _,fa as A,ga as s,ha as S,j as N,k as j,la as l,ma as r,na as y,qa as E,sa as u,t as T,ta as d,w as U,x as z,xa as B,ya as c,za as R}from"./chunk-FH2RP3FQ.js";function P(n=new Date){return`${n.getFullYear()}-${n.getUTCMonth()+1}-${n.getUTCDate()}`}function de(n,a){return n.getUTCDate()==a.getUTCDate()&&n.getUTCMonth()==a.getUTCMonth()&&n.getUTCFullYear()==a.getUTCFullYear()}var ce=(()=>{let a=class a{constructor(e){this.http=e}startedDaily(){localStorage.setItem("daily_played","1")}getDailyValue(){let e=localStorage.getItem("daily_value");return e&&de(new Date(P()),new Date(e))?e:null}hasPlayedToday(){return!!(this.getDailyValue()&&localStorage.getItem("daily_played")=="1")}getDailySeed(){let e=this.getDailyValue();return e?N(D(void 0,new O(e))):(localStorage.setItem("daily_played","0"),this.http.get("https://api.kraken.com/0/public/Ticker?pair=XBTUSD",{observe:"response"}).pipe(j(o=>{if(!o.body)throw new Error(`no body from "${o.url}"`);let h=o.headers.get("last-modified");if(!h)throw new Error(`no last modified from "${o.url}"`);let v=Number(Object.values(o.body.result)[0].o),b=new Date(h);if(isNaN(+b))throw new Error(`invalid date ${b} from "${o.url}"`);if(!de(b,new Date))throw new Error(`date ${b} not matching`);let L=`${P(b)} (${v})`,me=D(void 0,new O(L));return localStorage.setItem("daily_value",L),me}),T(o=>{throw console.error(o),o}),z({count:3,delay:2e3}),T(o=>(console.error("could not get daily lucky number",o),`${P()} (error)`))))}};a.\u0275fac=function(i){return new(i||a)($(Q))},a.\u0275prov=G({token:a,factory:a.\u0275fac,providedIn:"root"});let n=a;return n})();function fe(n,a){if(n&1){let t=E();l(0,"button",37),u("click",function(){m(t);let i=d(2);return g(i.paste())}),w(),l(1,"svg",38),y(2,"path",39),r()()}if(n&2){let t=d(2);S("animate-bg-error-to-neutral",t.clipboardError)}}function he(n,a){if(n&1&&(l(0,"option",40),c(1),r()),n&2){let t=a.$implicit,e=a.index;s("value",e+1),p(),q("",t.title," ")}}function _e(n,a){if(n&1&&(w(),k(),l(0,"div",41)(1,"a",42),c(2," Login "),w(),l(3,"svg",43),y(4,"path",44),r()()()),n&2){let t=d(2);A("data-tip",t.disableSpotifyLogin?"You are logged in":"To hear full songs you have to be logged into Spotify"),p(),S("btn-disabled",t.disableSpotifyLogin)}}var x=()=>({standalone:!0});function ye(n,a){if(n&1){let t=E();l(0,"div",4)(1,"div",5)(2,"h1",6),c(3,"Start now!"),r(),l(4,"p",7),c(5,"Enter a spotify playlist or select a preconfigured playlist to play a game of Hitster!"),r()(),l(6,"div",8)(7,"div",9)(8,"div",10)(9,"label",11)(10,"span",12),c(11,"Spotify Playlist"),r()(),l(12,"div",13)(13,"input",14),u("ngModelChange",function(){m(t);let i=d();return g(i.inputChange())})("ngModelChange",function(i){m(t);let o=d();return g(o.inputString=i)}),r(),_(14,fe,3,2,"button",15),r()(),l(15,"div",10)(16,"label",11)(17,"span",12),c(18,"Playlist"),r()(),l(19,"select",16),u("change",function(){m(t);let i=d();return g(i.selectChange())})("ngModelChange",function(i){m(t);let o=d();return g(o.selectedPlaylist=i)}),l(20,"option",17),c(21),r(),_(22,he,2,2,"option",18),r()(),l(23,"div",19)(24,"button",20),u("click",function(){m(t);let i=d();return g(i.start())}),c(25," Start "),w(),l(26,"svg",21),y(27,"path",22),r()()(),_(28,_e,5,3,"div",23),k(),l(29,"details",24)(30,"summary",25),c(31,"Advanced Settings"),r(),l(32,"div",26)(33,"label",27)(34,"span",12),c(35,"Game Limit"),r(),l(36,"input",28),u("ngModelChange",function(i){m(t);let o=d();return g(o.gameSettingsLimit=i)}),r()(),l(37,"label",27)(38,"span",12),c(39,"Seed"),r(),l(40,"input",29),u("ngModelChange",function(i){m(t);let o=d();return g(o.settings.seed=i)}),r()(),l(41,"label",30)(42,"span",12),c(43,"Keep wrong guesses"),r(),l(44,"input",31),u("ngModelChange",function(i){m(t);let o=d();return g(o.settings.keepWrongGuesses=i)}),r()(),l(45,"select",32),u("ngModelChange",function(i){m(t);let o=d();return g(o.settings.handleTimes=i)}),l(46,"option",33),c(47,"Fix Everything"),r(),l(48,"option",34),c(49,"Keep Everything"),r(),l(50,"option",35),c(51,"Fix tags like Remastered"),r(),l(52,"option",36),c(53,"Remove tags like Remastered"),r()()()()()()()}if(n&2){let t=d();p(13),S("input-error",!t.validateInput()),s("ngModel",t.inputString)("ngModelOptions",f(22,x)),p(),s("ngIf",t.hasClipboard),p(5),s("ngModel",t.selectedPlaylist)("ngModelOptions",f(23,x)),p(),s("value",0),p(),R(t.inputString?"Custom":t.playlists[0].title),p(),s("ngForOf",t.playlists.slice(1)),p(2),s("disabled",!t.validateInput()),p(4),s("ngIf",!t.hasMobileUserAgent),p(8),S("input-error",t.validateGameSettingsLimit()===null),s("ngModel",t.gameSettingsLimit)("ngModelOptions",f(24,x)),p(4),s("ngModel",t.settings.seed)("ngModelOptions",f(25,x)),p(4),s("ngModel",t.settings.keepWrongGuesses)("ngModelOptions",f(26,x)),p(),s("ngModel",t.settings.handleTimes)("ngModelOptions",f(27,x))}}function xe(n,a){n&1&&y(0,"iframe",45)}function ve(n,a){n&1&&(l(0,"div",47),y(1,"span",48),r())}function be(n,a){if(n&1&&_(0,ve,2,0,"div",46),n&2){let t=d();s("ngIf",!t.startingModal)}}function Ce(n,a){if(n&1){let t=E();l(0,"app-starting-modal",49),u("close",function(){m(t);let i=d();return g(i.clickFirstStart())}),r()}if(n&2){let t=d();s("loading",t.loading)}}var Le=(()=>{let a=class a{requestFullscreen(){document.documentElement.requestFullscreen({navigationUI:"hide"}).then(()=>setTimeout(()=>this.skippingResize=!1,200)),M()&&screen.orientation&&screen.orientation.lock&&screen.orientation.lock("portrait"),this.skippingResize=!0}clickFirstStart(){M()&&this.requestFullscreen(),this.startingModal=!1}resizeEvent(e){this.startingModal||this.skippingResize||M()&&(this.startingModal=!0)}constructor(e,i){this.router=e,this.daily=i,this.hasClipboard=navigator.clipboard&&navigator.clipboard.readText,this.loading=!0,this.playlists=[{title:"Daily Challenge",link:"assets/playlists/massive.json",onStart:this.daily.startedDaily,settings:{limit:8,seed:"",keepWrongGuesses:!0,handleTimes:"keep-all"}},{title:"Classic",link:"assets/playlists/classic-english.json"},{title:"Classic (Deutsch)",link:"assets/playlists/classic-deutsch.json"},{title:"Perfect Playlist",link:"assets/playlists/perfect.json"},{title:"Wild Mix",link:"assets/playlists/wild-mix.json"},{title:"Massive",link:"assets/playlists/massive.json"}],this.clipboardError=!1,this.startingModal=!0,this.skippingResize=!1,this.settings={keepWrongGuesses:!0,seed:"",handleTimes:"fix-tags",limit:0},this.gameSettingsLimit="",this.inputString="",this.defaultSelectedPlaylist=0,this.selectedPlaylist=0,this.hasMobileUserAgent=F(),this.removeSpotifyEmbed=F(),this.disableSpotifyLogin=!0}validateGameSettingsLimit(){let e=+this.gameSettingsLimit;return isNaN(e)||e<0?null:e}ngOnInit(){(!M()||document.fullscreenElement)&&(this.startingModal=!1),this.daily.getDailySeed().pipe(U(1)).subscribe(i=>{this.playlists[0]?.settings&&(this.playlists[0].settings.seed=i),this.loading=!1}),this.daily.hasPlayedToday()&&this.playlists.length>1&&(this.defaultSelectedPlaylist=1,this.selectedPlaylist=1);let e=localStorage.getItem("game_settings");e&&(this.settings=C(C({},this.settings),JSON.parse(e))),this.settings.seed="",this.validateInput()}paste(){navigator.clipboard.readText().then(e=>{H(e)?(this.inputString=e,this.inputChange()):this.clipboardError=!0}).catch(()=>{})}validateInput(){let e=this.inputString;return e||(e=this.playlists[this.selectedPlaylist].link),e||(e=this.playlists[this.defaultSelectedPlaylist].link),H(e)}inputChange(){return this.selectedPlaylist=0,this.validateInput()}selectChange(){this.inputString=""}start(){let e=this.validateInput();e&&this.startGame(e)}startGame(e){localStorage.removeItem("cached_playlist"),localStorage.setItem("game_settings",JSON.stringify(this.settings));let i=this.validateGameSettingsLimit();if(i!==null&&(this.settings.limit=i),!this.inputString){let o=this.playlists[this.selectedPlaylist];this.settings=C(C({},this.settings),o.settings),o.onStart&&o.onStart()}this.router.navigate(["play"],{queryParams:{p:e.raw,s:JSON.stringify(this.settings)},queryParamsHandling:"merge"})}messageEvent(e){if(e.origin=="https://open.spotify.com"){if(e.data.type=="ready")document.getElementById("spotify-embed").contentWindow.postMessage({command:"play_from_start"},"*");else if(e.data.type=="playback_update"){if(e.data.payload.duration==0)return;e.data.payload.duration<43300&&(this.disableSpotifyLogin=!1),this.removeSpotifyEmbed=!0}}}};a.\u0275fac=function(i){return new(i||a)(I(ee),I(ce))},a.\u0275cmp=W({type:a,selectors:[["app-home"]],hostBindings:function(i,o){i&1&&u("resize",function(v){return o.resizeEvent(v)},!1,V)("message",function(v){return o.messageEvent(v)},!1,V)},standalone:!0,features:[Y],decls:5,vars:4,consts:[["class","min-h-screen flex flex-col justify-center items-center bg-base-200 px-4",4,"ngIf","ngIfElse"],["id","spotify-embed","class","hidden","src","https://open.spotify.com/embed/track/2bNCdW4rLnCTzgqUXTTDO1?utm_source=generator","width","1","height","1","frameBorder","0","allow","autoplay; clipboard-write; encrypted-media; picture-in-picture",4,"ngIf"],["loadingSpinner",""],[3,"loading","close",4,"ngIf"],[1,"min-h-screen","flex","flex-col","justify-center","items-center","bg-base-200","px-4"],[1,"text-center","pt-4"],[1,"text-5xl","font-bold"],[1,"py-6"],[1,"card","shrink-0","w-full","max-w-sm","shadow-2xl","bg-base-100","pb-4"],[1,"card-body"],[1,"form-control"],[1,"label"],[1,"label-text"],[1,"flex","flex-row","gap-2"],["placeholder","spotify.com/playlist/13DZqkaAHiTY0nXtQf9iW0",1,"w-0","input","input-bordered","flex-grow","placeholder-neutral",3,"ngModel","ngModelOptions","ngModelChange"],["class","btn btn-neutral",3,"animate-bg-error-to-neutral","click",4,"ngIf"],[1,"select","select-bordered","text-base",3,"ngModel","ngModelOptions","change","ngModelChange"],["selected","",3,"value"],[3,"value",4,"ngFor","ngForOf"],[1,"form-control","mt-6"],[1,"btn","btn-primary","btn-lg","font-bold","text-2xl","flex-nowrap",3,"disabled","click"],["fill","currentColor","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24",1,"w-8","h-8"],["fill-rule","evenodd","d","M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z","clip-rule","evenodd"],["class","form-control mt-2 tooltip before:text-base",4,"ngIf"],[1,"collapse","collapse-arrow"],[1,"collapse-title","text-nowrap"],[1,"collapse-content"],[1,"label","gap-2"],["placeholder","\u221E",1,"w-0","flex-grow","max-w-48","input","input-sm","input-bordered","placeholder-neutral",3,"ngModel","ngModelOptions","ngModelChange"],["placeholder","random",1,"w-0","flex-grow","max-w-48","input","input-sm","input-bordered","placeholder-neutral",3,"ngModel","ngModelOptions","ngModelChange"],[1,"label","gap-3","cursor-pointer"],["type","checkbox","checked","checked",1,"checkbox",3,"ngModel","ngModelOptions","ngModelChange"],[1,"select","select-bordered","select-sm","text-sm","w-full","my-2",3,"ngModel","ngModelOptions","ngModelChange"],["value","fix-all"],["value","keep-all"],["value","fix-tags"],["value","remove-tags"],[1,"btn","btn-neutral",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","d","M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"],[3,"value"],[1,"form-control","mt-2","tooltip","before:text-base"],["href","https://spotify.com/login","target","_blank",1,"btn","btn-neutral","text-lg","w-full"],["fill","currentColor","width","24","height","24","xmlns","http://www.w3.org/2000/svg","fill-rule","evenodd","clip-rule","evenodd"],["d","M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"],["id","spotify-embed","src","https://open.spotify.com/embed/track/2bNCdW4rLnCTzgqUXTTDO1?utm_source=generator","width","1","height","1","frameBorder","0","allow","autoplay; clipboard-write; encrypted-media; picture-in-picture",1,"hidden"],["class","w-full text-center padding-inset-top mt-6",4,"ngIf"],[1,"w-full","text-center","padding-inset-top","mt-6"],[1,"loading","loading-spinner","loading-lg"],[3,"loading","close"]],template:function(i,o){if(i&1&&_(0,ye,54,28,"div",0)(1,xe,1,0,"iframe",1)(2,be,1,1,"ng-template",null,2,X)(4,Ce,1,1,"app-starting-modal",3),i&2){let h=B(3);s("ngIf",!o.loading)("ngIfElse",h),p(),s("ngIf",!o.removeSpotifyEmbed),p(3),s("ngIf",o.startingModal)}},dependencies:[Z,J,K,se,ae,re,ie,te,le,ne,oe,pe]});let n=a;return n})();export{Le as HomeComponent};
