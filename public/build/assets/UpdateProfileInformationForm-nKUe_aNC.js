import{T as p,g as t,o as m,c,w as s,b as f,a}from"./app-BD53c_6I.js";import{V as d}from"./VForm-D_52LBJB.js";import{V as _}from"./VCard-FbPoq3pi.js";import"./index-CrjpEtVr.js";import"./form-DsKgHv_O.js";import"./forwardRefs-C-GTDzx5.js";import"./VAvatar-NvWIg0QJ.js";const h=a("div",{class:"pa-3"},[a("h2",null,"Profile Information"),a("p",null," Update your account's profile information and email address. ")],-1),F={__name:"UpdateProfileInformationForm",props:{user:Object},setup(n){const r=n,l=p({_method:"PUT",name:r.user.name,email:r.user.email,photo:null});t(null),t(null);const o=t(null),u=()=>{o.value&&(l.photo=o.value.files[0]),l.post(route("user-profile-information.update"),{errorBag:"updateProfileInformation",preserveScroll:!0,onSuccess:()=>i()})},i=()=>{var e;(e=o.value)!=null&&e.value&&(o.value.value=null)};return(e,v)=>(m(),c(d,{onSubmitted:u},{default:s(()=>[f(_,{class:"glass"},{default:s(()=>[h]),_:1})]),_:1}))}};export{F as default};
