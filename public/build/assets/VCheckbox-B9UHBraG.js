import{m as g,V as t}from"./VCheckboxBtn-Xt9SGpiJ.js";import{m as F,u as I,a as l}from"./VTextField-Ck1dqWXX.js";import{p as B,q as U,s as R,x as q,y as z,d as D,z as M,b as u,A as r}from"./app-BC1dH9xr.js";import{u as N}from"./VAvatar-Be7A3W-i.js";const $=B({...F(),...U(g(),["inline"])},"VCheckbox"),H=R()({name:"VCheckbox",inheritAttrs:!1,props:$(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,d){let{attrs:c,slots:a}=d;const s=q(e,"modelValue"),{isFocused:n,focus:i,blur:m}=I(e),V=z(),p=D(()=>e.id||`checkbox-${V}`);return N(()=>{const[b,f]=M(c),v=l.filterProps(e),k=t.filterProps(e);return u(l,r({class:["v-checkbox",e.class]},b,v,{modelValue:s.value,"onUpdate:modelValue":o=>s.value=o,id:p.value,focused:n.value,style:e.style}),{...a,default:o=>{let{id:x,messagesId:h,isDisabled:P,isReadonly:y,isValid:C}=o;return u(t,r(k,{id:x.value,"aria-describedby":h.value,disabled:P.value,readonly:y.value},f,{error:C.value===!1,modelValue:s.value,"onUpdate:modelValue":A=>s.value=A,onFocus:i,onBlur:m}),a)}})}),{}}});export{H as V};
