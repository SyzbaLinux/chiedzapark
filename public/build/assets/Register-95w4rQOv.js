import{T as g,o as w,f as _,b as r,w as t,F as b,m as n,a as l,u as a,i,l as x}from"./app-BC1dH9xr.js";import{D as k}from"./Default-D4OyV7Fa.js";import{V as y,a as d,b as h}from"./VCard-Bhjw8zLL.js";import{V as m}from"./VTextField-Ck1dqWXX.js";import{V as v}from"./VCheckbox-B9UHBraG.js";import{V as u}from"./VMain-l479Zb3L.js";import{V as C}from"./VSpacer-BSGohfrL.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VAvatar-Be7A3W-i.js";import"./easing-DY7PVvcf.js";import"./form-3dzU4Hie.js";import"./forwardRefs-C-GTDzx5.js";import"./VCheckboxBtn-Xt9SGpiJ.js";const q=l("h1",null,"Register",-1),F=l("div",{class:"ms-2"},[i(" I agree to the "),l("a",{target:"_blank",href:"#"},"Terms of Service"),i(" and "),l("a",{href:"#",target:"_blank"},"Privacy Policy")],-1),M={__name:"Register",setup(T){const e=g({name:"",email:"",password:"",password_confirmation:"",terms:!1}),p=()=>{e.post(route("register"),{onFinish:()=>e.reset("password","password_confirmation")})};return(f,o)=>{const V=n("Head"),c=n("InertiaLink");return w(),_(b,null,[r(V,{title:"Register"}),r(k,null,{default:t(()=>[l("form",{onSubmit:x(p,["prevent"])},[r(y,{class:"glass mx-auto","max-width":"500"},{default:t(()=>[r(d,{class:"text-center mt-3"},{default:t(()=>[q]),_:1}),r(d,null,{default:t(()=>[r(m,{id:"name",modelValue:a(e).name,"onUpdate:modelValue":o[0]||(o[0]=s=>a(e).name=s),type:"text",label:"Enter Your Fullname",required:"",autofocus:"",autocomplete:"name","error-messages":a(e).errors.name},null,8,["modelValue","error-messages"]),r(m,{id:"email",modelValue:a(e).email,"onUpdate:modelValue":o[1]||(o[1]=s=>a(e).email=s),type:"email",label:"Email",required:"",autocomplete:"username","error-messages":a(e).errors.email},null,8,["modelValue","error-messages"]),r(m,{id:"password",modelValue:a(e).password,"onUpdate:modelValue":o[2]||(o[2]=s=>a(e).password=s),type:"password",label:"Password",required:"",autocomplete:"new-password","error-messages":a(e).errors.password},null,8,["modelValue","error-messages"]),r(m,{id:"password_confirmation",modelValue:a(e).password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=s=>a(e).password_confirmation=s),type:"password",label:"Confirm Password",required:"",autocomplete:"new-password","error-messages":a(e).errors.password_confirmation},null,8,["modelValue","error-messages"]),r(v,{id:"terms",checked:a(e).terms,"onUpdate:checked":o[4]||(o[4]=s=>a(e).terms=s),name:"terms",required:""},{label:t(()=>[F]),_:1},8,["checked"])]),_:1}),r(h,null,{default:t(()=>[r(u,{variant:"flat",size:"large",type:"submit",loading:a(e).processing},{default:t(()=>[i(" Register ")]),_:1},8,["loading"]),r(C),r(c,{href:f.route("login")},{default:t(()=>[r(u,{variant:"text"},{default:t(()=>[i(" Already registered? ")]),_:1})]),_:1},8,["href"])]),_:1})]),_:1})],32)]),_:1})],64)}}};export{M as default};
