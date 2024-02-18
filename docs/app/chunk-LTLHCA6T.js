import{$ as D,C as y,Ca as v,Da as ce,E as R,F as C,Fa as he,I as P,J as re,Ja as fe,K as H,Ka as W,L as u,M as se,Na as pe,P as oe,Pa as ge,Q as ae,R as V,Sa as me,W as E,X as w,Y as F,Z as l,_ as le,a as p,b as _,ba as h,ea as k,ga as b,ha as ue,i as te,k as ie,la as d,m as ne,ma as f,na as L,ra as de,sa as g,ya as m}from"./chunk-XXS4HW3G.js";var Ae=(()=>{let e=class e{constructor(i,r){this._renderer=i,this._elementRef=r,this.onChange=s=>{},this.onTouched=()=>{}}setProperty(i,r){this._renderer.setProperty(this._elementRef.nativeElement,i,r)}registerOnTouched(i){this.onTouched=i}registerOnChange(i){this.onChange=i}setDisabledState(i){this.setProperty("disabled",i)}};e.\u0275fac=function(r){return new(r||e)(l(w),l(E))},e.\u0275dir=u({type:e});let t=e;return t})(),O=(()=>{let e=class e extends Ae{};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=V(e)))(s||e)}})(),e.\u0275dir=u({type:e,features:[h]});let t=e;return t})(),A=new C(""),Re={provide:A,useExisting:y(()=>He),multi:!0},He=(()=>{let e=class e extends O{writeValue(i){this.setProperty("checked",i)}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=V(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(r,s){r&1&&g("change",function(a){return s.onChange(a.target.checked)})("blur",function(){return s.onTouched()})},features:[v([Re]),h]});let t=e;return t})(),Le={provide:A,useExisting:y(()=>Ee),multi:!0};function We(){let t=W()?W().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var $e=new C(""),Ee=(()=>{let e=class e extends Ae{constructor(i,r,s){super(i,r),this._compositionMode=s,this._composing=!1,this._compositionMode==null&&(this._compositionMode=!We())}writeValue(i){let r=i??"";this.setProperty("value",r)}_handleInput(i){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(i)}_compositionStart(){this._composing=!0}_compositionEnd(i){this._composing=!1,this._compositionMode&&this.onChange(i)}};e.\u0275fac=function(r){return new(r||e)(l(w),l(E),l($e,8))},e.\u0275dir=u({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(r,s){r&1&&g("input",function(a){return s._handleInput(a.target.value)})("blur",function(){return s.onTouched()})("compositionstart",function(){return s._compositionStart()})("compositionend",function(a){return s._compositionEnd(a.target.value)})},features:[v([Le]),h]});let t=e;return t})();var qe=new C(""),ze=new C("");function we(t){return t!=null}function Fe(t){return de(t)?te(t):t}function Ie(t){let e={};return t.forEach(n=>{e=n!=null?p(p({},e),n):e}),Object.keys(e).length===0?null:e}function Se(t,e){return e.map(n=>n(t))}function Ze(t){return!t.validate}function xe(t){return t.map(e=>Ze(e)?e:n=>e.validate(n))}function Xe(t){if(!t)return null;let e=t.filter(we);return e.length==0?null:function(n){return Ie(Se(n,e))}}function Oe(t){return t!=null?Xe(xe(t)):null}function Ye(t){if(!t)return null;let e=t.filter(we);return e.length==0?null:function(n){let i=Se(n,e).map(Fe);return ne(i).pipe(ie(Ie))}}function Ne(t){return t!=null?Ye(xe(t)):null}function ye(t,e){return t===null?[e]:Array.isArray(t)?[...t,e]:[t,e]}function Ke(t){return t._rawValidators}function Je(t){return t._rawAsyncValidators}function $(t){return t?Array.isArray(t)?t:[t]:[]}function G(t,e){return Array.isArray(t)?t.includes(e):t===e}function ve(t,e){let n=$(e);return $(t).forEach(r=>{G(n,r)||n.push(r)}),n}function _e(t,e){return $(e).filter(n=>!G(t,n))}var j=class{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Oe(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Ne(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,n){return this.control?this.control.hasError(e,n):!1}getError(e,n){return this.control?this.control.getError(e,n):null}},q=class extends j{get formDirective(){return null}get path(){return null}},x=class extends j{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}},z=class{constructor(e){this._cd=e}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}},Qe={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},ni=_(p({},Qe),{"[class.ng-submitted]":"isSubmitted"}),ri=(()=>{let e=class e extends z{constructor(i){super(i)}};e.\u0275fac=function(r){return new(r||e)(l(x,2))},e.\u0275dir=u({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,s){r&2&&ue("ng-untouched",s.isUntouched)("ng-touched",s.isTouched)("ng-pristine",s.isPristine)("ng-dirty",s.isDirty)("ng-valid",s.isValid)("ng-invalid",s.isInvalid)("ng-pending",s.isPending)},features:[h]});let t=e;return t})();var I="VALID",T="INVALID",M="PENDING",S="DISABLED";function et(t){return(U(t)?t.validators:t)||null}function tt(t){return Array.isArray(t)?Oe(t):t||null}function it(t,e){return(U(e)?e.asyncValidators:t)||null}function nt(t){return Array.isArray(t)?Ne(t):t||null}function U(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}var Z=class{constructor(e,n){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(n)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get valid(){return this.status===I}get invalid(){return this.status===T}get pending(){return this.status==M}get disabled(){return this.status===S}get enabled(){return this.status!==S}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(ve(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(ve(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(_e(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(_e(e,this._rawAsyncValidators))}hasValidator(e){return G(this._rawValidators,e)}hasAsyncValidator(e){return G(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){this.touched=!0,this._parent&&!e.onlySelf&&this._parent.markAsTouched(e)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(e=>e.markAllAsTouched())}markAsUntouched(e={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(n=>{n.markAsUntouched({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}markAsDirty(e={}){this.pristine=!1,this._parent&&!e.onlySelf&&this._parent.markAsDirty(e)}markAsPristine(e={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(n=>{n.markAsPristine({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}markAsPending(e={}){this.status=M,e.emitEvent!==!1&&this.statusChanges.emit(this.status),this._parent&&!e.onlySelf&&this._parent.markAsPending(e)}disable(e={}){let n=this._parentMarkedDirty(e.onlySelf);this.status=S,this.errors=null,this._forEachChild(i=>{i.disable(_(p({},e),{onlySelf:!0}))}),this._updateValue(),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(_(p({},e),{skipPristineCheck:n})),this._onDisabledChange.forEach(i=>i(!0))}enable(e={}){let n=this._parentMarkedDirty(e.onlySelf);this.status=I,this._forEachChild(i=>{i.enable(_(p({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(_(p({},e),{skipPristineCheck:n})),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===I||this.status===M)&&this._runAsyncValidator(e.emitEvent)),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(e)}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(n=>n._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?S:I}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e){if(this.asyncValidator){this.status=M,this._hasOwnPendingAsyncValidator=!0;let n=Fe(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(i=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(i,{emitEvent:e})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(e,n={}){this.errors=e,this._updateControlsErrors(n.emitEvent!==!1)}get(e){let n=e;return n==null||(Array.isArray(n)||(n=n.split(".")),n.length===0)?null:n.reduce((i,r)=>i&&i._find(r),this)}getError(e,n){let i=n?this.get(n):this;return i&&i.errors?i.errors[e]:null}hasError(e,n){return!!this.getError(e,n)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(e)}_initObservables(){this.valueChanges=new D,this.statusChanges=new D}_calculateStatus(){return this._allControlsDisabled()?S:this.errors?T:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(M)?M:this._anyControlsHaveStatus(T)?T:I}_anyControlsHaveStatus(e){return this._anyControls(n=>n.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e={}){this.pristine=!this._anyControlsDirty(),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}_updateTouched(e={}){this.touched=this._anyControlsTouched(),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){U(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let n=this._parent&&this._parent.dirty;return!e&&!!n&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=tt(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=nt(this._rawAsyncValidators)}};var Pe=new C("CallSetDisabledState",{providedIn:"root",factory:()=>X}),X="always";function rt(t,e){return[...e.path,t]}function st(t,e,n=X){at(t,e),e.valueAccessor.writeValue(t.value),(t.disabled||n==="always")&&e.valueAccessor.setDisabledState?.(t.disabled),lt(t,e),dt(t,e),ut(t,e),ot(t,e)}function Ce(t,e){t.forEach(n=>{n.registerOnValidatorChange&&n.registerOnValidatorChange(e)})}function ot(t,e){if(e.valueAccessor.setDisabledState){let n=i=>{e.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(n),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(n)})}}function at(t,e){let n=Ke(t);e.validator!==null?t.setValidators(ye(n,e.validator)):typeof n=="function"&&t.setValidators([n]);let i=Je(t);e.asyncValidator!==null?t.setAsyncValidators(ye(i,e.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();Ce(e._rawValidators,r),Ce(e._rawAsyncValidators,r)}function lt(t,e){e.valueAccessor.registerOnChange(n=>{t._pendingValue=n,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&ke(t,e)})}function ut(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&ke(t,e),t.updateOn!=="submit"&&t.markAsTouched()})}function ke(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function dt(t,e){let n=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};t.registerOnChange(n),e._registerOnDestroy(()=>{t._unregisterOnChange(n)})}function ct(t,e){if(!t.hasOwnProperty("model"))return!1;let n=t.model;return n.isFirstChange()?!0:!Object.is(e,n.currentValue)}function ht(t){return Object.getPrototypeOf(t.constructor)===O}function ft(t,e){if(!e)return null;Array.isArray(e);let n,i,r;return e.forEach(s=>{s.constructor===Ee?n=s:ht(s)?i=s:r=s}),r||i||n||null}function Ve(t,e){let n=t.indexOf(e);n>-1&&t.splice(n,1)}function De(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var pt=class extends Z{constructor(e=null,n,i){super(et(n),it(i,n)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(n),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),U(n)&&(n.nonNullable||n.initialValueIsDefault)&&(De(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,n={}){this.value=this._pendingValue=e,this._onChange.length&&n.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,n.emitViewToModelChange!==!1)),this.updateValueAndValidity(n)}patchValue(e,n={}){this.setValue(e,n)}reset(e=this.defaultValue,n={}){this._applyFormState(e),this.markAsPristine(n),this.markAsUntouched(n),this.setValue(this.value,n),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Ve(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Ve(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){De(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var gt={provide:x,useExisting:y(()=>mt)},be=Promise.resolve(),mt=(()=>{let e=class e extends x{constructor(i,r,s,o,a,c){super(),this._changeDetectorRef=a,this.callSetDisabledState=c,this.control=new pt,this._registered=!1,this.name="",this.update=new D,this._parent=i,this._setValidators(r),this._setAsyncValidators(s),this.valueAccessor=ft(this,o)}ngOnChanges(i){if(this._checkForErrors(),!this._registered||"name"in i){if(this._registered&&(this._checkName(),this.formDirective)){let r=i.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in i&&this._updateDisabled(i),ct(i,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(i){this.viewModel=i,this.update.emit(i)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){st(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(i){be.then(()=>{this.control.setValue(i,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(i){let r=i.isDisabled.currentValue,s=r!==0&&fe(r);be.then(()=>{s&&!this.control.disabled?this.control.disable():!s&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(i){return this._parent?rt(i,this._parent):[i]}};e.\u0275fac=function(r){return new(r||e)(l(q,9),l(qe,10),l(ze,10),l(A,10),l(le,8),l(Pe,8))},e.\u0275dir=u({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[P.None,"disabled","isDisabled"],model:[P.None,"ngModel","model"],options:[P.None,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[v([gt]),h,se]});let t=e;return t})();var yt={provide:A,useExisting:y(()=>vt),multi:!0},vt=(()=>{let e=class e extends O{writeValue(i){this.setProperty("value",parseFloat(i))}registerOnChange(i){this.onChange=r=>{i(r==""?null:parseFloat(r))}}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=V(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["input","type","range","formControlName",""],["input","type","range","formControl",""],["input","type","range","ngModel",""]],hostBindings:function(r,s){r&1&&g("change",function(a){return s.onChange(a.target.value)})("input",function(a){return s.onChange(a.target.value)})("blur",function(){return s.onTouched()})},features:[v([yt]),h]});let t=e;return t})();var _t={provide:A,useExisting:y(()=>Ge),multi:!0};function Te(t,e){return t==null?`${e}`:(e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function Ct(t){return t.split(":")[0]}var Ge=(()=>{let e=class e extends O{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(i){this._compareWith=i}writeValue(i){this.value=i;let r=this._getOptionId(i),s=Te(r,i);this.setProperty("value",s)}registerOnChange(i){this.onChange=r=>{this.value=this._getOptionValue(r),i(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(i){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r),i))return r;return null}_getOptionValue(i){let r=Ct(i);return this._optionMap.has(r)?this._optionMap.get(r):i}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=V(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(r,s){r&1&&g("change",function(a){return s.onChange(a.target.value)})("blur",function(){return s.onTouched()})},inputs:{compareWith:"compareWith"},features:[v([_t]),h]});let t=e;return t})(),oi=(()=>{let e=class e{constructor(i,r,s){this._element=i,this._renderer=r,this._select=s,this._select&&(this.id=this._select._registerOption())}set ngValue(i){this._select!=null&&(this._select._optionMap.set(this.id,i),this._setElementValue(Te(this.id,i)),this._select.writeValue(this._select.value))}set value(i){this._setElementValue(i),this._select&&this._select.writeValue(this._select.value)}_setElementValue(i){this._renderer.setProperty(this._element.nativeElement,"value",i)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(r){return new(r||e)(l(E),l(w),l(Ge,9))},e.\u0275dir=u({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})(),Vt={provide:A,useExisting:y(()=>je),multi:!0};function Me(t,e){return t==null?`${e}`:(typeof e=="string"&&(e=`'${e}'`),e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function Dt(t){return t.split(":")[0]}var je=(()=>{let e=class e extends O{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(i){this._compareWith=i}writeValue(i){this.value=i;let r;if(Array.isArray(i)){let s=i.map(o=>this._getOptionId(o));r=(o,a)=>{o._setSelected(s.indexOf(a.toString())>-1)}}else r=(s,o)=>{s._setSelected(!1)};this._optionMap.forEach(r)}registerOnChange(i){this.onChange=r=>{let s=[],o=r.selectedOptions;if(o!==void 0){let a=o;for(let c=0;c<a.length;c++){let N=a[c],B=this._getOptionValue(N.value);s.push(B)}}else{let a=r.options;for(let c=0;c<a.length;c++){let N=a[c];if(N.selected){let B=this._getOptionValue(N.value);s.push(B)}}}this.value=s,i(s)}}_registerOption(i){let r=(this._idCounter++).toString();return this._optionMap.set(r,i),r}_getOptionId(i){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r)._value,i))return r;return null}_getOptionValue(i){let r=Dt(i);return this._optionMap.has(r)?this._optionMap.get(r)._value:i}};e.\u0275fac=(()=>{let i;return function(s){return(i||(i=V(e)))(s||e)}})(),e.\u0275dir=u({type:e,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(r,s){r&1&&g("change",function(a){return s.onChange(a.target)})("blur",function(){return s.onTouched()})},inputs:{compareWith:"compareWith"},features:[v([Vt]),h]});let t=e;return t})(),ai=(()=>{let e=class e{constructor(i,r,s){this._element=i,this._renderer=r,this._select=s,this._select&&(this.id=this._select._registerOption(this))}set ngValue(i){this._select!=null&&(this._value=i,this._setElementValue(Me(this.id,i)),this._select.writeValue(this._select.value))}set value(i){this._select?(this._value=i,this._setElementValue(Me(this.id,i)),this._select.writeValue(this._select.value)):this._setElementValue(i)}_setElementValue(i){this._renderer.setProperty(this._element.nativeElement,"value",i)}_setSelected(i){this._renderer.setProperty(this._element.nativeElement,"selected",i)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(r){return new(r||e)(l(E),l(w),l(je,9))},e.\u0275dir=u({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})();var bt=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=H({type:e}),e.\u0275inj=R({});let t=e;return t})();var li=(()=>{let e=class e{static withConfig(i){return{ngModule:e,providers:[{provide:Pe,useValue:i.callSetDisabledState??X}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=H({type:e}),e.\u0275inj=R({imports:[bt]});let t=e;return t})();function ci(t){if(!t)return null;let e=t,n=e.indexOf("spotify.com/playlist/");return n>=0?(e=e.substring(n+21),n=e.indexOf("?"),n>=0&&(e=e.substring(0,e.indexOf("?"))),{type:"spotify-playlist",payload:e,raw:t}):e.endsWith(".json")?{type:"json",payload:e,raw:t}:null}function Mt(t,e){t=t.toLowerCase(),e=e.toLowerCase();let n=[];for(var i=0;i<=t.length;i++){let s=i;for(var r=0;r<=e.length;r++)if(i==0)n[r]=r;else if(r>0){let o=n[r-1];t.charAt(i-1)!=e.charAt(r-1)&&(o=Math.min(Math.min(o,s),n[r])+1),n[r-1]=s,s=o}i>0&&(n[e.length]=s)}return n[e.length]}function At(t,e){let n=t,i=e;t.length<e.length&&(n=e,i=t);let r=n.length;return r==0?1:(r-Mt(n,i))/r}function fi(t,e){let n=t,i=e;return t.length<e.length&&(n=e,i=t),n=n.substring(0,i.length),At(n,i)}function pi(t=void 0,e=void 0,n="01234567890abcdefghijklmnopqrstuvwxyz"){return t===void 0&&(t=16),[...new Array(t)].map(i=>n[Math.floor((e?e.next():Math.random())*n.length)]).join("")}function Et(){return window.innerWidth>screen.availWidth}function wt(){return screen.orientation.type.includes("portrait")}function Ue(){return Y()||Et()&&wt()}function Y(){return[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(t=>navigator.userAgent.match(t))}function gi(){return navigator&&navigator.userActivation&&navigator.userActivation.hasBeenActive}function mi(){return Intl.DateTimeFormat().resolvedOptions().locale.split("-").at(-1).toUpperCase()}function Ft(t,e){t&1&&(d(0,"div",10),m(1,` Click to continue
`),f())}function It(t,e){t&1&&(d(0,"div",11),oe(),d(1,"svg",12),L(2,"path",13),f(),ae(),d(3,"span"),m(4,"To hear full songs you have to "),d(5,"span",14),m(6,"enable Desktop Site Mode"),f(),m(7,", otherwise you will only hear a 30 second preview."),f()())}function St(t,e){t&1&&L(0,"span",15)}function xt(t,e){t&1&&(d(0,"span",16),m(1,"Start"),f())}var Ot=t=>({"btn-primary btn-lg":t}),Ai=(()=>{let e=class e{constructor(){this.scale=0,this.loading=!0,this.close=new D,this.isMobile=Ue(),this.hasMobileUserAgent=Y()}ngAfterViewChecked(){window.visualViewport&&(this.scale=window.visualViewport.scale)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=re({type:e,selectors:[["app-starting-modal"]],inputs:{loading:"loading"},outputs:{close:"close"},standalone:!0,features:[ce],decls:12,vars:7,consts:[["class","fixed text-3xl font-bold","style","top:1em; left:1em;",4,"ngIf"],[1,"modal","modal-open"],[1,"modal-box","flex","flex-col","justify-center","items-center","text-center","gap-4"],[1,"text-2xl","font-bold"],["role","alert","class","alert alert-warning",4,"ngIf"],[1,"btn","w-full",3,"ngClass"],["class","loading loading-spinner",4,"ngIf"],["class","text-xl font-bold",4,"ngIf"],["method","dialog",1,"modal-backdrop",2,"z-index","3000"],[3,"click"],[1,"fixed","text-3xl","font-bold",2,"top","1em","left","1em"],["role","alert",1,"alert","alert-warning"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24",1,"stroke-current","shrink-0","h-6","w-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"],[1,"font-bold","whitespace-nowrap"],[1,"loading","loading-spinner"],[1,"text-xl","font-bold"]],template:function(r,s){r&1&&(k(0,Ft,2,0,"div",0),d(1,"dialog",1)(2,"div",2)(3,"h3",3),m(4,"Welcome to Hitster!"),f(),k(5,It,8,0,"div",4),d(6,"button",5),k(7,St,1,0,"span",6)(8,xt,2,0,"span",7),f()(),d(9,"div",8)(10,"button",9),g("click",function(){return s.close.emit()}),m(11,"close"),f()()()),r&2&&(b("ngIf",!s.hasMobileUserAgent&&s.isMobile&&s.scale==1),F(5),b("ngIf",s.hasMobileUserAgent),F(),b("ngClass",he(5,Ot,!s.loading)),F(),b("ngIf",s.loading),F(),b("ngIf",!s.loading))},dependencies:[me,pe,ge]});let t=e;return t})();var K=function(t,e){return K=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])},K(t,e)};function Q(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}K(t,e),t.prototype=e===null?Object.create(e):(n.prototype=e.prototype,new n)}var J,ee=function(){function t(){}return t._xfnv1a=function(e){for(var n=2166136261,i=0;i<e.length;i++)n=Math.imul(n^e.charCodeAt(i),16777619);return function(){return n+=n<<13,n^=n>>>7,n+=n<<3,n^=n>>>17,(n+=n<<5)>>>0}},t}(),Nt=function(t){function e(n){var i=t.call(this)||this;return i.a=e._xfnv1a(n)(),i}return Q(e,t),e.prototype.next=function(){var n=this.a+=1831565813;return n=Math.imul(n^n>>>15,1|n),(((n^=n+Math.imul(n^n>>>7,61|n))^n>>>14)>>>0)/4294967296},e}(ee),Pt=function(t){function e(n){var i=t.call(this)||this,r=e._xfnv1a(n);return i.a=r(),i.b=r(),i.c=r(),i.d=r(),i}return Q(e,t),e.prototype.next=function(){this.a>>>=0,this.b>>>=0,this.c>>>=0,this.d>>>=0;var n=this.a+this.b|0;return this.a=this.b^this.b>>>9,this.b=this.c+(this.c<<3)|0,this.c=this.c<<21|this.c>>>11,this.d=this.d+1|0,n=n+this.d|0,this.c=this.c+n|0,(n>>>0)/4294967296},e}(ee),kt=function(t){function e(n){var i=t.call(this)||this,r=e._xfnv1a(n);return i.a=r(),i.b=r(),i.c=r(),i.d=r(),i}return Q(e,t),e.prototype.next=function(){var n=this.b<<9,i=5*this.a;return i=i<<7|9*(i>>>25),this.c^=this.a,this.d^=this.b,this.b^=this.c,this.a^=this.d,this.c^=n,this.d=this.d<<11|this.d>>>21,(i>>>0)/4294967296},e}(ee);(function(t){t.sfc32="sfc32",t.mulberry32="mulberry32",t.xoshiro128ss="xoshiro128ss"})(J||(J={}));var wi=function(){function t(e,n){n===void 0&&(n=J.sfc32),this.str=e,this.prng=n,this.generator=this._initializeGenerator()}return t.prototype.next=function(){return this.generator.next()},t.prototype._initializeGenerator=function(){if(function(n){return n===null}(e=this.str)||function(n){return n===void 0}(e))return this.wrap();var e;switch(this.prng){case"sfc32":return new Pt(this.str);case"mulberry32":return new Nt(this.str);case"xoshiro128ss":return new kt(this.str);default:return this.wrap()}},t.prototype.wrap=function(){return{next:function(){return Math.random()}}},t}();export{He as a,Ee as b,ri as c,mt as d,vt as e,Ge as f,oi as g,ai as h,li as i,ci as j,fi as k,pi as l,Ue as m,Y as n,gi as o,mi as p,Ai as q,wi as r};