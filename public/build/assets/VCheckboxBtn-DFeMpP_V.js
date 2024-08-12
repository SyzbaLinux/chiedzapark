import{e as q,g as J,u as A,R as K,V as X,q as Q,a as W,A as Y}from"./index-CrjpEtVr.js";import{p as I,af as B,ap as Z,ag as p,s as F,x as S,y as O,d as o,a5 as ee,ak as le,a4 as i,b as d,as as ae,D as $,g as te,z as ne,A as P,e as oe,X as ue,F as ie,a7 as re,K as x,J as ce,B as se,q as de}from"./app-BD53c_6I.js";import{g as ve}from"./VTextField-B720HIDV.js";const j=Symbol.for("vuetify:selection-control-group"),E=I({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:B,trueIcon:B,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:Z},...q(),...J(),...p()},"SelectionControlGroup"),fe=I({...E({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");F()({name:"VSelectionControlGroup",props:fe(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:c}=u;const l=S(e,"modelValue"),t=O(),v=o(()=>e.id||`v-selection-control-group-${t}`),r=o(()=>e.name||v.value),a=new Set;return ee(j,{modelValue:l,forceUpdate:()=>{a.forEach(n=>n())},onForceUpdate:n=>{a.add(n),ae(()=>{a.delete(n)})}}),le({[e.defaultsTarget]:{color:i(e,"color"),disabled:i(e,"disabled"),density:i(e,"density"),error:i(e,"error"),inline:i(e,"inline"),modelValue:l,multiple:o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:r,falseIcon:i(e,"falseIcon"),trueIcon:i(e,"trueIcon"),readonly:i(e,"readonly"),ripple:i(e,"ripple"),type:i(e,"type"),valueComparator:i(e,"valueComparator")}}),A(()=>{var n;return d("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(n=c.default)==null?void 0:n.call(c)])}),{}}});const L=I({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...q(),...E()},"VSelectionControl");function me(e){const u=re(j,void 0),{densityClasses:c}=Q(e),l=S(e,"modelValue"),t=o(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),v=o(()=>e.falseValue!==void 0?e.falseValue:!1),r=o(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=o({get(){const y=u?u.modelValue.value:l.value;return r.value?x(y).some(s=>e.valueComparator(s,t.value)):e.valueComparator(y,t.value)},set(y){if(e.readonly)return;const s=y?t.value:v.value;let b=s;r.value&&(b=y?[...x(l.value),s]:x(l.value).filter(f=>!e.valueComparator(f,t.value))),u?u.modelValue.value=b:l.value=b}}),{textColorClasses:n,textColorStyles:C}=W(o(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:V,backgroundColorStyles:g}=Y(o(()=>a.value&&!e.error&&!e.disabled?e.color:e.baseColor)),h=o(()=>a.value?e.trueIcon:e.falseIcon);return{group:u,densityClasses:c,trueValue:t,falseValue:v,model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:g,icon:h}}const _=F()({name:"VSelectionControl",directives:{Ripple:K},inheritAttrs:!1,props:L(),emits:{"update:modelValue":e=>!0},setup(e,u){let{attrs:c,slots:l}=u;const{group:t,densityClasses:v,icon:r,model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:g,trueValue:h}=me(e),y=O(),s=$(!1),b=$(!1),f=te(),k=o(()=>e.id||`input-${y}`),D=o(()=>!e.disabled&&!e.readonly);t==null||t.onForceUpdate(()=>{f.value&&(f.value.checked=a.value)});function w(m){D.value&&(s.value=!0,ce(m.target,":focus-visible")!==!1&&(b.value=!0))}function G(){s.value=!1,b.value=!1}function M(m){m.stopPropagation()}function N(m){if(!D.value){f.value&&(f.value.checked=a.value);return}e.readonly&&t&&se(()=>t.forceUpdate()),a.value=m.target.checked}return A(()=>{var U,R;const m=l.label?l.label({label:e.label,props:{for:k.value}}):e.label,[z,H]=ne(c),T=d("input",P({ref:f,checked:a.value,disabled:!!e.disabled,id:k.value,onBlur:G,onFocus:w,onInput:N,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:h.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},H),null);return d("div",P({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":s.value,"v-selection-control--focus-visible":b.value,"v-selection-control--inline":e.inline},v.value,e.class]},z,{style:e.style}),[d("div",{class:["v-selection-control__wrapper",n.value],style:C.value},[(U=l.default)==null?void 0:U.call(l,{backgroundColorClasses:V,backgroundColorStyles:g}),oe(d("div",{class:["v-selection-control__input"]},[((R=l.input)==null?void 0:R.call(l,{model:a,textColorClasses:n,textColorStyles:C,backgroundColorClasses:V,backgroundColorStyles:g,inputNode:T,icon:r.value,props:{onFocus:w,onBlur:G,id:k.value}}))??d(ie,null,[r.value&&d(X,{key:"icon",icon:r.value},null),T])]),[[ue("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),m&&d(ve,{for:k.value,onClick:M},{default:()=>[m]})])}),{isFocused:s,input:f}}}),ye=I({indeterminate:Boolean,indeterminateIcon:{type:B,default:"$checkboxIndeterminate"},...L({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),ge=F()({name:"VCheckboxBtn",props:ye(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{slots:c}=u;const l=S(e,"indeterminate"),t=S(e,"modelValue");function v(n){l.value&&(l.value=!1)}const r=o(()=>l.value?e.indeterminateIcon:e.falseIcon),a=o(()=>l.value?e.indeterminateIcon:e.trueIcon);return A(()=>{const n=de(_.filterProps(e),["modelValue"]);return d(_,P(n,{modelValue:t.value,"onUpdate:modelValue":[C=>t.value=C,v],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:r.value,trueIcon:a.value,"aria-checked":l.value?"mixed":void 0}),c)}),{}}});export{ge as V,L as a,_ as b,ye as m};
