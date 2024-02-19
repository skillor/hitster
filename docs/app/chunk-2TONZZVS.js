import{$ as M,C as v,Ca as _,Da as ge,E as H,F as V,Fa as me,I as P,J as se,Ja as ve,K as L,Ka as q,L as d,M as ae,N as le,Na as ye,O as ue,P as W,Pa as _e,Q as $,R as D,Sa as Ce,W as E,X as F,Y as b,Z as l,_ as de,a as m,b as C,ba as f,ea as k,ga as y,ha as ce,i as ie,k as re,la as u,m as oe,ma as c,na as T,qa as he,ra as fe,sa as p,ta as pe,ya as g}from"./chunk-FH2RP3FQ.js";var Ie=(()=>{let e=class e{constructor(n,r){this._renderer=n,this._elementRef=r,this.onChange=o=>{},this.onTouched=()=>{}}setProperty(n,r){this._renderer.setProperty(this._elementRef.nativeElement,n,r)}registerOnTouched(n){this.onTouched=n}registerOnChange(n){this.onChange=n}setDisabledState(n){this.setProperty("disabled",n)}};e.\u0275fac=function(r){return new(r||e)(l(F),l(E))},e.\u0275dir=d({type:e});let t=e;return t})(),O=(()=>{let e=class e extends Ie{};e.\u0275fac=(()=>{let n;return function(o){return(n||(n=D(e)))(o||e)}})(),e.\u0275dir=d({type:e,features:[f]});let t=e;return t})(),w=new V(""),qe={provide:w,useExisting:v(()=>ze),multi:!0},ze=(()=>{let e=class e extends O{writeValue(n){this.setProperty("checked",n)}};e.\u0275fac=(()=>{let n;return function(o){return(n||(n=D(e)))(o||e)}})(),e.\u0275dir=d({type:e,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(r,o){r&1&&p("change",function(a){return o.onChange(a.target.checked)})("blur",function(){return o.onTouched()})},features:[_([qe]),f]});let t=e;return t})(),Ze={provide:w,useExisting:v(()=>Se),multi:!0};function Xe(){let t=q()?q().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var Ye=new V(""),Se=(()=>{let e=class e extends Ie{constructor(n,r,o){super(n,r),this._compositionMode=o,this._composing=!1,this._compositionMode==null&&(this._compositionMode=!Xe())}writeValue(n){let r=n??"";this.setProperty("value",r)}_handleInput(n){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(n)}_compositionStart(){this._composing=!0}_compositionEnd(n){this._composing=!1,this._compositionMode&&this.onChange(n)}};e.\u0275fac=function(r){return new(r||e)(l(F),l(E),l(Ye,8))},e.\u0275dir=d({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(r,o){r&1&&p("input",function(a){return o._handleInput(a.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(a){return o._compositionEnd(a.target.value)})},features:[_([Ze]),f]});let t=e;return t})();var Ke=new V(""),Je=new V("");function xe(t){return t!=null}function Oe(t){return fe(t)?ie(t):t}function Ne(t){let e={};return t.forEach(i=>{e=i!=null?m(m({},e),i):e}),Object.keys(e).length===0?null:e}function Pe(t,e){return e.map(i=>i(t))}function Qe(t){return!t.validate}function ke(t){return t.map(e=>Qe(e)?e:i=>e.validate(i))}function et(t){if(!t)return null;let e=t.filter(xe);return e.length==0?null:function(i){return Ne(Pe(i,e))}}function Te(t){return t!=null?et(ke(t)):null}function tt(t){if(!t)return null;let e=t.filter(xe);return e.length==0?null:function(i){let n=Pe(i,e).map(Oe);return oe(n).pipe(re(Ne))}}function Ge(t){return t!=null?tt(ke(t)):null}function Ve(t,e){return t===null?[e]:Array.isArray(t)?[...t,e]:[t,e]}function nt(t){return t._rawValidators}function it(t){return t._rawAsyncValidators}function z(t){return t?Array.isArray(t)?t:[t]:[]}function j(t,e){return Array.isArray(t)?t.includes(e):t===e}function De(t,e){let i=z(e);return z(t).forEach(r=>{j(i,r)||i.push(r)}),i}function be(t,e){return z(e).filter(i=>!j(t,i))}var U=class{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Te(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Ge(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,i){return this.control?this.control.hasError(e,i):!1}getError(e,i){return this.control?this.control.getError(e,i):null}},Z=class extends U{get formDirective(){return null}get path(){return null}},x=class extends U{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}},X=class{constructor(e){this._cd=e}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}},rt={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},un=C(m({},rt),{"[class.ng-submitted]":"isSubmitted"}),dn=(()=>{let e=class e extends X{constructor(n){super(n)}};e.\u0275fac=function(r){return new(r||e)(l(x,2))},e.\u0275dir=d({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,o){r&2&&ce("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},features:[f]});let t=e;return t})();var I="VALID",G="INVALID",A="PENDING",S="DISABLED";function ot(t){return(B(t)?t.validators:t)||null}function st(t){return Array.isArray(t)?Te(t):t||null}function at(t,e){return(B(e)?e.asyncValidators:t)||null}function lt(t){return Array.isArray(t)?Ge(t):t||null}function B(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}var Y=class{constructor(e,i){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(i)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get valid(){return this.status===I}get invalid(){return this.status===G}get pending(){return this.status==A}get disabled(){return this.status===S}get enabled(){return this.status!==S}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(De(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(De(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(be(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(be(e,this._rawAsyncValidators))}hasValidator(e){return j(this._rawValidators,e)}hasAsyncValidator(e){return j(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){this.touched=!0,this._parent&&!e.onlySelf&&this._parent.markAsTouched(e)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(e=>e.markAllAsTouched())}markAsUntouched(e={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}markAsDirty(e={}){this.pristine=!1,this._parent&&!e.onlySelf&&this._parent.markAsDirty(e)}markAsPristine(e={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(i=>{i.markAsPristine({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}markAsPending(e={}){this.status=A,e.emitEvent!==!1&&this.statusChanges.emit(this.status),this._parent&&!e.onlySelf&&this._parent.markAsPending(e)}disable(e={}){let i=this._parentMarkedDirty(e.onlySelf);this.status=S,this.errors=null,this._forEachChild(n=>{n.disable(C(m({},e),{onlySelf:!0}))}),this._updateValue(),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(C(m({},e),{skipPristineCheck:i})),this._onDisabledChange.forEach(n=>n(!0))}enable(e={}){let i=this._parentMarkedDirty(e.onlySelf);this.status=I,this._forEachChild(n=>{n.enable(C(m({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(C(m({},e),{skipPristineCheck:i})),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(e){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===I||this.status===A)&&this._runAsyncValidator(e.emitEvent)),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(e)}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(i=>i._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?S:I}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e){if(this.asyncValidator){this.status=A,this._hasOwnPendingAsyncValidator=!0;let i=Oe(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(n=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(n,{emitEvent:e})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(e,i={}){this.errors=e,this._updateControlsErrors(i.emitEvent!==!1)}get(e){let i=e;return i==null||(Array.isArray(i)||(i=i.split(".")),i.length===0)?null:i.reduce((n,r)=>n&&n._find(r),this)}getError(e,i){let n=i?this.get(i):this;return n&&n.errors?n.errors[e]:null}hasError(e,i){return!!this.getError(e,i)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(e)}_initObservables(){this.valueChanges=new M,this.statusChanges=new M}_calculateStatus(){return this._allControlsDisabled()?S:this.errors?G:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(A)?A:this._anyControlsHaveStatus(G)?G:I}_anyControlsHaveStatus(e){return this._anyControls(i=>i.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e={}){this.pristine=!this._anyControlsDirty(),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}_updateTouched(e={}){this.touched=this._anyControlsTouched(),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){B(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let i=this._parent&&this._parent.dirty;return!e&&!!i&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=st(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=lt(this._rawAsyncValidators)}};var je=new V("CallSetDisabledState",{providedIn:"root",factory:()=>K}),K="always";function ut(t,e){return[...e.path,t]}function dt(t,e,i=K){ht(t,e),e.valueAccessor.writeValue(t.value),(t.disabled||i==="always")&&e.valueAccessor.setDisabledState?.(t.disabled),ft(t,e),gt(t,e),pt(t,e),ct(t,e)}function Me(t,e){t.forEach(i=>{i.registerOnValidatorChange&&i.registerOnValidatorChange(e)})}function ct(t,e){if(e.valueAccessor.setDisabledState){let i=n=>{e.valueAccessor.setDisabledState(n)};t.registerOnDisabledChange(i),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(i)})}}function ht(t,e){let i=nt(t);e.validator!==null?t.setValidators(Ve(i,e.validator)):typeof i=="function"&&t.setValidators([i]);let n=it(t);e.asyncValidator!==null?t.setAsyncValidators(Ve(n,e.asyncValidator)):typeof n=="function"&&t.setAsyncValidators([n]);let r=()=>t.updateValueAndValidity();Me(e._rawValidators,r),Me(e._rawAsyncValidators,r)}function ft(t,e){e.valueAccessor.registerOnChange(i=>{t._pendingValue=i,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&Ue(t,e)})}function pt(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&Ue(t,e),t.updateOn!=="submit"&&t.markAsTouched()})}function Ue(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function gt(t,e){let i=(n,r)=>{e.valueAccessor.writeValue(n),r&&e.viewToModelUpdate(n)};t.registerOnChange(i),e._registerOnDestroy(()=>{t._unregisterOnChange(i)})}function mt(t,e){if(!t.hasOwnProperty("model"))return!1;let i=t.model;return i.isFirstChange()?!0:!Object.is(e,i.currentValue)}function vt(t){return Object.getPrototypeOf(t.constructor)===O}function yt(t,e){if(!e)return null;Array.isArray(e);let i,n,r;return e.forEach(o=>{o.constructor===Se?i=o:vt(o)?n=o:r=o}),r||n||i||null}function Ae(t,e){let i=t.indexOf(e);i>-1&&t.splice(i,1)}function we(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var _t=class extends Y{constructor(e=null,i,n){super(ot(i),at(n,i)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(i),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),B(i)&&(i.nonNullable||i.initialValueIsDefault)&&(we(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,i={}){this.value=this._pendingValue=e,this._onChange.length&&i.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,i.emitViewToModelChange!==!1)),this.updateValueAndValidity(i)}patchValue(e,i={}){this.setValue(e,i)}reset(e=this.defaultValue,i={}){this._applyFormState(e),this.markAsPristine(i),this.markAsUntouched(i),this.setValue(this.value,i),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Ae(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Ae(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){we(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var Ct={provide:x,useExisting:v(()=>Vt)},Ee=Promise.resolve(),Vt=(()=>{let e=class e extends x{constructor(n,r,o,s,a,h){super(),this._changeDetectorRef=a,this.callSetDisabledState=h,this.control=new _t,this._registered=!1,this.name="",this.update=new M,this._parent=n,this._setValidators(r),this._setAsyncValidators(o),this.valueAccessor=yt(this,s)}ngOnChanges(n){if(this._checkForErrors(),!this._registered||"name"in n){if(this._registered&&(this._checkName(),this.formDirective)){let r=n.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in n&&this._updateDisabled(n),mt(n,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(n){this.viewModel=n,this.update.emit(n)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){dt(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(n){Ee.then(()=>{this.control.setValue(n,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(n){let r=n.isDisabled.currentValue,o=r!==0&&ve(r);Ee.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(n){return this._parent?ut(n,this._parent):[n]}};e.\u0275fac=function(r){return new(r||e)(l(Z,9),l(Ke,10),l(Je,10),l(w,10),l(de,8),l(je,8))},e.\u0275dir=d({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[P.None,"disabled","isDisabled"],model:[P.None,"ngModel","model"],options:[P.None,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[_([Ct]),f,ae]});let t=e;return t})();var Dt={provide:w,useExisting:v(()=>bt),multi:!0},bt=(()=>{let e=class e extends O{writeValue(n){this.setProperty("value",parseFloat(n))}registerOnChange(n){this.onChange=r=>{n(r==""?null:parseFloat(r))}}};e.\u0275fac=(()=>{let n;return function(o){return(n||(n=D(e)))(o||e)}})(),e.\u0275dir=d({type:e,selectors:[["input","type","range","formControlName",""],["input","type","range","formControl",""],["input","type","range","ngModel",""]],hostBindings:function(r,o){r&1&&p("change",function(a){return o.onChange(a.target.value)})("input",function(a){return o.onChange(a.target.value)})("blur",function(){return o.onTouched()})},features:[_([Dt]),f]});let t=e;return t})();var Mt={provide:w,useExisting:v(()=>Re),multi:!0};function Be(t,e){return t==null?`${e}`:(e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function At(t){return t.split(":")[0]}var Re=(()=>{let e=class e extends O{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(n){this._compareWith=n}writeValue(n){this.value=n;let r=this._getOptionId(n),o=Be(r,n);this.setProperty("value",o)}registerOnChange(n){this.onChange=r=>{this.value=this._getOptionValue(r),n(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(n){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r),n))return r;return null}_getOptionValue(n){let r=At(n);return this._optionMap.has(r)?this._optionMap.get(r):n}};e.\u0275fac=(()=>{let n;return function(o){return(n||(n=D(e)))(o||e)}})(),e.\u0275dir=d({type:e,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(r,o){r&1&&p("change",function(a){return o.onChange(a.target.value)})("blur",function(){return o.onTouched()})},inputs:{compareWith:"compareWith"},features:[_([Mt]),f]});let t=e;return t})(),hn=(()=>{let e=class e{constructor(n,r,o){this._element=n,this._renderer=r,this._select=o,this._select&&(this.id=this._select._registerOption())}set ngValue(n){this._select!=null&&(this._select._optionMap.set(this.id,n),this._setElementValue(Be(this.id,n)),this._select.writeValue(this._select.value))}set value(n){this._setElementValue(n),this._select&&this._select.writeValue(this._select.value)}_setElementValue(n){this._renderer.setProperty(this._element.nativeElement,"value",n)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(r){return new(r||e)(l(E),l(F),l(Re,9))},e.\u0275dir=d({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})(),wt={provide:w,useExisting:v(()=>He),multi:!0};function Fe(t,e){return t==null?`${e}`:(typeof e=="string"&&(e=`'${e}'`),e&&typeof e=="object"&&(e="Object"),`${t}: ${e}`.slice(0,50))}function Et(t){return t.split(":")[0]}var He=(()=>{let e=class e extends O{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(n){this._compareWith=n}writeValue(n){this.value=n;let r;if(Array.isArray(n)){let o=n.map(s=>this._getOptionId(s));r=(s,a)=>{s._setSelected(o.indexOf(a.toString())>-1)}}else r=(o,s)=>{o._setSelected(!1)};this._optionMap.forEach(r)}registerOnChange(n){this.onChange=r=>{let o=[],s=r.selectedOptions;if(s!==void 0){let a=s;for(let h=0;h<a.length;h++){let N=a[h],R=this._getOptionValue(N.value);o.push(R)}}else{let a=r.options;for(let h=0;h<a.length;h++){let N=a[h];if(N.selected){let R=this._getOptionValue(N.value);o.push(R)}}}this.value=o,n(o)}}_registerOption(n){let r=(this._idCounter++).toString();return this._optionMap.set(r,n),r}_getOptionId(n){for(let r of this._optionMap.keys())if(this._compareWith(this._optionMap.get(r)._value,n))return r;return null}_getOptionValue(n){let r=Et(n);return this._optionMap.has(r)?this._optionMap.get(r)._value:n}};e.\u0275fac=(()=>{let n;return function(o){return(n||(n=D(e)))(o||e)}})(),e.\u0275dir=d({type:e,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(r,o){r&1&&p("change",function(a){return o.onChange(a.target)})("blur",function(){return o.onTouched()})},inputs:{compareWith:"compareWith"},features:[_([wt]),f]});let t=e;return t})(),fn=(()=>{let e=class e{constructor(n,r,o){this._element=n,this._renderer=r,this._select=o,this._select&&(this.id=this._select._registerOption(this))}set ngValue(n){this._select!=null&&(this._value=n,this._setElementValue(Fe(this.id,n)),this._select.writeValue(this._select.value))}set value(n){this._select?(this._value=n,this._setElementValue(Fe(this.id,n)),this._select.writeValue(this._select.value)):this._setElementValue(n)}_setElementValue(n){this._renderer.setProperty(this._element.nativeElement,"value",n)}_setSelected(n){this._renderer.setProperty(this._element.nativeElement,"selected",n)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}};e.\u0275fac=function(r){return new(r||e)(l(E),l(F),l(He,9))},e.\u0275dir=d({type:e,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}});let t=e;return t})();var Ft=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=L({type:e}),e.\u0275inj=H({});let t=e;return t})();var pn=(()=>{let e=class e{static withConfig(n){return{ngModule:e,providers:[{provide:je,useValue:n.callSetDisabledState??K}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=L({type:e}),e.\u0275inj=H({imports:[Ft]});let t=e;return t})();function vn(t){if(!t)return null;let e=t,i=e.indexOf("spotify.com/playlist/");return i>=0?(e=e.substring(i+21),i=e.indexOf("?"),i>=0&&(e=e.substring(0,e.indexOf("?"))),{type:"spotify-playlist",payload:e,raw:t}):e.endsWith(".json")?{type:"json",payload:e,raw:t}:null}function It(t,e){t=t.toLowerCase(),e=e.toLowerCase();let i=[];for(var n=0;n<=t.length;n++){let o=n;for(var r=0;r<=e.length;r++)if(n==0)i[r]=r;else if(r>0){let s=i[r-1];t.charAt(n-1)!=e.charAt(r-1)&&(s=Math.min(Math.min(s,o),i[r])+1),i[r-1]=o,o=s}n>0&&(i[e.length]=o)}return i[e.length]}function St(t,e){let i=t,n=e;t.length<e.length&&(i=e,n=t);let r=i.length;return r==0?1:(r-It(i,n))/r}function _n(t,e){let i=t,n=e;return t.length<e.length&&(i=e,n=t),i=i.substring(0,n.length),St(i,n)}function Le(t=void 0){return t?t.next():Math.random()}function Cn(t,e,i=void 0){return Le(i)*(e-t)+t}function Vn(t=void 0,e=void 0,i="01234567890abcdefghijklmnopqrstuvwxyz"){return t===void 0&&(t=16),[...new Array(t)].map(n=>i[Math.floor(Le(e)*i.length)]).join("")}function xt(){return window.innerWidth>screen.availWidth}function We(){return J()||xt()}function J(){return[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some(t=>navigator.userAgent.match(t))}function Dn(){return navigator&&navigator.userActivation&&navigator.userActivation.hasBeenActive}function bn(){return Intl.DateTimeFormat().resolvedOptions().locale.split("-").at(-1).toUpperCase()}function Ot(t,e){if(t&1){let i=he();u(0,"button",11),p("click",function(){le(i);let r=pe();return ue(r.close.emit())}),g(1,` Click to continue
`),c()}}function Nt(t,e){t&1&&(u(0,"div",12),W(),u(1,"svg",13),T(2,"path",14),c(),$(),u(3,"span"),g(4,"To hear full songs you have to "),u(5,"span",15),g(6,"enable Desktop Site Mode"),c(),g(7,", otherwise you will only have a 30s preview."),c()())}function Pt(t,e){t&1&&(u(0,"div",16),W(),u(1,"svg",17),T(2,"path",18),c(),$(),u(3,"span"),g(4,"To hear full songs you have to be logged into Spotify"),c()())}function kt(t,e){t&1&&T(0,"span",19)}function Tt(t,e){t&1&&(u(0,"span",20),g(1,"Start"),c())}var Gt=t=>({"btn-primary btn-lg":t}),On=(()=>{let e=class e{constructor(){this.scale=0,this.loading=!0,this.close=new M,this.isMobile=We(),this.hasMobileUserAgent=J()}ngAfterViewChecked(){window.visualViewport&&(this.scale=window.visualViewport.scale)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=se({type:e,selectors:[["app-starting-modal"]],inputs:{loading:"loading"},outputs:{close:"close"},standalone:!0,features:[ge],decls:13,vars:8,consts:[["class","bg-base-100 p-7 rounded-lg fixed text-[2.5em] font-bold","style","top:1rem; left:0; z-index: 2500;",3,"click",4,"ngIf"],[1,"modal","modal-open"],[1,"modal-box","flex","flex-col","justify-center","items-center","text-center","gap-4"],[1,"text-2xl","font-bold"],["role","alert","class","alert alert-warning shadow-lg rounded-lg gap-1 sm:gap-3",4,"ngIf"],["role","alert","class","alert shadow-lg rounded-lg gap-1 sm:gap-3",4,"ngIf"],[1,"btn","w-full",3,"ngClass"],["class","loading loading-spinner",4,"ngIf"],["class","text-xl font-bold",4,"ngIf"],["method","dialog",1,"modal-backdrop",2,"z-index","3000"],[3,"click"],[1,"bg-base-100","p-7","rounded-lg","fixed","text-[2.5em]","font-bold",2,"top","1rem","left","0","z-index","2500",3,"click"],["role","alert",1,"alert","alert-warning","shadow-lg","rounded-lg","gap-1","sm:gap-3"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24",1,"stroke-current","shrink-0","h-6","w-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"],[1,"font-bold","whitespace-nowrap"],["role","alert",1,"alert","shadow-lg","rounded-lg","gap-1","sm:gap-3"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24",1,"stroke-current","shrink-0","w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],[1,"loading","loading-spinner"],[1,"text-xl","font-bold"]],template:function(r,o){r&1&&(k(0,Ot,2,0,"button",0),u(1,"dialog",1)(2,"div",2)(3,"h3",3),g(4,"Welcome to Hitster!"),c(),k(5,Nt,8,0,"div",4)(6,Pt,5,0,"div",5),u(7,"button",6),k(8,kt,1,0,"span",7)(9,Tt,2,0,"span",8),c()(),u(10,"div",9)(11,"button",10),p("click",function(){return o.close.emit()}),g(12,"close"),c()()()),r&2&&(y("ngIf",!o.hasMobileUserAgent&&o.isMobile&&o.scale==1),b(5),y("ngIf",o.hasMobileUserAgent),b(),y("ngIf",!o.hasMobileUserAgent),b(),y("ngClass",me(6,Gt,!o.loading)),b(),y("ngIf",o.loading),b(),y("ngIf",!o.loading))},dependencies:[Ce,ye,_e]});let t=e;return t})();var Q=function(t,e){return Q=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,n){i.__proto__=n}||function(i,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(i[r]=n[r])},Q(t,e)};function te(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}Q(t,e),t.prototype=e===null?Object.create(e):(i.prototype=e.prototype,new i)}var ee,ne=function(){function t(){}return t._xfnv1a=function(e){for(var i=2166136261,n=0;n<e.length;n++)i=Math.imul(i^e.charCodeAt(n),16777619);return function(){return i+=i<<13,i^=i>>>7,i+=i<<3,i^=i>>>17,(i+=i<<5)>>>0}},t}(),jt=function(t){function e(i){var n=t.call(this)||this;return n.a=e._xfnv1a(i)(),n}return te(e,t),e.prototype.next=function(){var i=this.a+=1831565813;return i=Math.imul(i^i>>>15,1|i),(((i^=i+Math.imul(i^i>>>7,61|i))^i>>>14)>>>0)/4294967296},e}(ne),Ut=function(t){function e(i){var n=t.call(this)||this,r=e._xfnv1a(i);return n.a=r(),n.b=r(),n.c=r(),n.d=r(),n}return te(e,t),e.prototype.next=function(){this.a>>>=0,this.b>>>=0,this.c>>>=0,this.d>>>=0;var i=this.a+this.b|0;return this.a=this.b^this.b>>>9,this.b=this.c+(this.c<<3)|0,this.c=this.c<<21|this.c>>>11,this.d=this.d+1|0,i=i+this.d|0,this.c=this.c+i|0,(i>>>0)/4294967296},e}(ne),Bt=function(t){function e(i){var n=t.call(this)||this,r=e._xfnv1a(i);return n.a=r(),n.b=r(),n.c=r(),n.d=r(),n}return te(e,t),e.prototype.next=function(){var i=this.b<<9,n=5*this.a;return n=n<<7|9*(n>>>25),this.c^=this.a,this.d^=this.b,this.b^=this.c,this.a^=this.d,this.c^=i,this.d=this.d<<11|this.d>>>21,(n>>>0)/4294967296},e}(ne);(function(t){t.sfc32="sfc32",t.mulberry32="mulberry32",t.xoshiro128ss="xoshiro128ss"})(ee||(ee={}));var Pn=function(){function t(e,i){i===void 0&&(i=ee.sfc32),this.str=e,this.prng=i,this.generator=this._initializeGenerator()}return t.prototype.next=function(){return this.generator.next()},t.prototype._initializeGenerator=function(){if(function(i){return i===null}(e=this.str)||function(i){return i===void 0}(e))return this.wrap();var e;switch(this.prng){case"sfc32":return new Ut(this.str);case"mulberry32":return new jt(this.str);case"xoshiro128ss":return new Bt(this.str);default:return this.wrap()}},t.prototype.wrap=function(){return{next:function(){return Math.random()}}},t}();export{ze as a,Se as b,dn as c,Vt as d,bt as e,Re as f,hn as g,fn as h,pn as i,vn as j,_n as k,Cn as l,Vn as m,We as n,J as o,Dn as p,bn as q,On as r,Pn as s};