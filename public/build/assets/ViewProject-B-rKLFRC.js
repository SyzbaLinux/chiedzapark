import{A as me}from"./AppLayout-OflP5zYw.js";import{S as he}from"./StatCard-D7tuviKI.js";import{p as pe,s as fe,x as q,g as _e,I as ve,d as H,y as be,z as ge,b as e,A as x,F as $,o as d,c as p,w as l,m as O,a as r,i as n,t as u,l as W,h as v,f as g,j as ye}from"./app-Cl5oehoc.js";import{_ as Ve}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{d as ke,c as Ce,a as R,V as c,b as U}from"./VMain-DQQwScRe.js";import{V}from"./VSpacer-DPb5g0gs.js";import{V as G}from"./VDialog-YbFqzVN0.js";import{V as J}from"./VForm-BWG-bGHq.js";import{V as f,a as K,b as Q}from"./VCard-DLzqHLpN.js";import{m as Se,u as Be,a as X,V as k}from"./VTextField-lRESKyaC.js";import{a as _,V as I}from"./VRow-59tK4lLu.js";import{c as we,u as Fe,b as xe,V as F,L as Ae,d as N,e as De}from"./index-u-zX2pI_.js";import{a as Pe,b as Y}from"./VCheckboxBtn-C76ZE-Us.js";import{a as je,V as Z}from"./VDataTable-Cx3L5HDh.js";import"./VAvatar-DU_qoMnl.js";import"./easing-DY7PVvcf.js";import"./forwardRefs-C-GTDzx5.js";import"./form-Cs-gquPx.js";import"./filter-BnAl0SOL.js";const Te=pe({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...Se(),...Pe()},"VSwitch"),Re=fe()({name:"VSwitch",inheritAttrs:!1,props:Te(),emits:{"update:focused":t=>!0,"update:modelValue":t=>!0,"update:indeterminate":t=>!0},setup(t,o){let{attrs:L,slots:m}=o;const a=q(t,"indeterminate"),i=q(t,"modelValue"),{loaderClasses:C}=we(t),{isFocused:A,focus:s,blur:b}=Be(t),E=_e(),M=ve&&window.matchMedia("(forced-colors: active)").matches,ee=H(()=>typeof t.loading=="string"&&t.loading!==""?t.loading:t.color),te=be(),le=H(()=>t.id||`switch-${te}`);function ae(){a.value&&(a.value=!1)}function se(S){var B,w;S.stopPropagation(),S.preventDefault(),(w=(B=E.value)==null?void 0:B.input)==null||w.click()}return Fe(()=>{const[S,B]=ge(L),w=X.filterProps(t),oe=Y.filterProps(t);return e(X,x({class:["v-switch",{"v-switch--flat":t.flat},{"v-switch--inset":t.inset},{"v-switch--indeterminate":a.value},C.value,t.class]},S,w,{modelValue:i.value,"onUpdate:modelValue":D=>i.value=D,id:le.value,focused:A.value,style:t.style}),{...m,default:D=>{let{id:re,messagesId:ne,isDisabled:ie,isReadonly:ce,isValid:z}=D;const P={model:i,isValid:z};return e(Y,x({ref:E},oe,{modelValue:i.value,"onUpdate:modelValue":[y=>i.value=y,ae],id:re.value,"aria-describedby":ne.value,type:"checkbox","aria-checked":a.value?"mixed":void 0,disabled:ie.value,readonly:ce.value,onFocus:s,onBlur:b},B),{...m,default:y=>{let{backgroundColorClasses:j,backgroundColorStyles:h}=y;return e("div",{class:["v-switch__track",M?void 0:j.value],style:h.value,onClick:se},[m["track-true"]&&e("div",{key:"prepend",class:"v-switch__track-true"},[m["track-true"](P)]),m["track-false"]&&e("div",{key:"append",class:"v-switch__track-false"},[m["track-false"](P)])])},input:y=>{let{inputNode:j,icon:h,backgroundColorClasses:de,backgroundColorStyles:ue}=y;return e($,null,[j,e("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":h||t.loading},t.inset||M?void 0:de.value],style:t.inset?void 0:ue.value},[m.thumb?e(xe,{defaults:{VIcon:{icon:h,size:"x-small"}}},{default:()=>[m.thumb({...P,icon:h})]}):e(ke,null,{default:()=>[t.loading?e(Ae,{name:"v-switch",active:!0,color:z.value===!1?void 0:ee.value},{default:T=>m.loader?m.loader(T):e(Ce,{active:T.isActive,color:T.color,indeterminate:!0,size:"16",width:"2"},null)}):h&&e(F,{key:String(h),icon:h,size:"x-small"},null)]})])])}})}})}),{}}}),Ue={components:{StatCard:he,AppLayout:me},data(){return{headers:[{title:"ID",key:"id"},{title:"Client",key:"client.full_name"},{title:"Stand No",key:"stand.stand_number"},{title:"Batch No",key:"batch"},{title:"More",key:"actions",sortable:!1}],batchesHeaders:[{title:"ID",key:"id"},{title:"Batch Name",key:"name"},{title:"More",key:"actions",sortable:!1}],search:"",showActive:!0,showCancelled:!1,showBatch:!1,items:[],title:"Active Contracts",batchForm:this.$inertia.form({project_id:this.$page.props.project.id,id:null,name:""}),dialogBatch:!1,selectedBatch:!1,dialogSelectedBatch:!1,batchSelectedForm:this.$inertia.form({id:null,project_id:this.$page.props.project.id,batch_id:null,start_date:null,end_date:null,installment_amount:null,calculate_penalty:1,calculate_penalty_after:10,penalty_percentage:10})}},created(){this.items=this.$page.props.project.active},methods:{makeCancelledVisible(){this.showCancelled=!0,this.showActive=!1,this.showBatch=!1,this.items=this.$page.props.project.cancelled,this.title="Cancelled Contracts"},makeActiveVisible(){this.showCancelled=!1,this.showActive=!0,this.showBatch=!1,this.items=this.$page.props.project.active,this.title="Active Contracts"},makeBatchVisible(){this.showCancelled=!1,this.showActive=!1,this.showBatch=!0,this.title="All Project Batches"},addBatch(){this.batchForm.post(route("admin.batch.store"),{onSuccess:()=>{this.batchForm.reset(),this.dialogBatch=!1}})},editBatch(t){this.batchForm.id=t.id,this.batchForm.project_id=t.project_id,this.batchForm.name=t.name,this.dialogBatch=!0},deleteBatch(t){this.$swal.fire({title:"Are you sure?",icon:"question",showDenyButton:!0,confirmButtonText:"Delete",denyButtonText:"Cancel"}).then(o=>{o.isConfirmed&&this.$inertia.visit(route("admin.batch.destroy",t),{method:"delete"})})},selectBatch(t){this.selectedBatch=t,this.batchSelectedForm.batch_id=t.id},addBatchRule(){this.batchSelectedForm.post(route("admin.batch-rules.store"),{onSuccess:()=>{this.batchSelectedForm.reset(),this.dialogSelectedBatch=!1}})},editRule(t){this.batchSelectedForm.id=t.id,this.batchSelectedForm.project_id=t.project_id,this.batchSelectedForm.batch_id=t.batch_id,this.batchSelectedForm.start_date=t.start_date,this.batchSelectedForm.end_date=t.end_date,this.batchSelectedForm.installment_amount=t.installment_amount,this.batchSelectedForm.calculate_penalty=t.calculate_penalty,this.batchSelectedForm.calculate_penalty_after=t.calculate_penalty_after,this.dialogSelectedBatch=!0},deleteRule(t){this.$swal.fire({title:"Are you sure?",icon:"question",showDenyButton:!0,confirmButtonText:"Delete",denyButtonText:"Cancel"}).then(o=>{o.isConfirmed&&this.$inertia.visit(route("admin.batch-rules.destroy",t),{method:"delete"})})}}},Ie={class:"glass pa-3"},Ne={class:"d-flex align-center"},Le={style:{width:"80%"},class:"pa-3 mt-n5"},Ee={class:"ml-3 mt-2"},Me={class:"d-flex align-center"},ze={style:{width:"80%"},class:"pa-3 mt-n5"},qe={class:"ml-3 mt-2"},He={class:"d-flex align-center"},Oe={style:{width:"80%"},class:"pa-3 mt-n5"},We={class:"ml-3 mt-2"},Ge={key:0},Je={key:0},Ke=r("label",{for:"start_date"},"Select Start Date",-1),Qe=r("br",null,null,-1),Xe={key:0,class:"_12px",style:{color:"red"}},Ye=r("label",{for:"start_date"},"Select End Date",-1),Ze=r("br",null,null,-1),$e={key:0,class:"_12px",style:{color:"red"}},et=r("thead",null,[r("tr",null,[r("th",{class:"text-left"},"Start Date "),r("th",{class:"text-left"},"End Date "),r("th",{class:"text-left"},"Installment "),r("th",{class:"text-left"},"Penalty Day "),r("th",null,"More")])],-1),tt={class:"d-flex"},lt={class:"d-flex"};function at(t,o,L,m,a,i){const C=O("DatePickerEs"),A=O("AppLayout");return d(),p(A,null,{default:l(()=>[r("div",Ie,[e(U,{class:"rounded-lg px-2 mb-5",density:"comfortable"},{default:l(()=>[e(R,null,{default:l(()=>[n(u(t.$page.props.project.name),1)]),_:1}),e(V),e(G,{persistent:"","max-width":"500",modelValue:a.dialogBatch,"onUpdate:modelValue":o[2]||(o[2]=s=>a.dialogBatch=s)},{activator:l(({props:s})=>[e(c,x(s,{text:"Add Batch",variant:"flat"}),null,16)]),default:l(()=>[e(J,{onSubmit:W(i.addBatch,["prevent"])},{default:l(()=>[e(f,{title:"Add Batch"},{default:l(()=>[e(K,null,{default:l(()=>[e(k,{label:"Batch Name",modelValue:a.batchForm.name,"onUpdate:modelValue":o[0]||(o[0]=s=>a.batchForm.name=s)},null,8,["modelValue"])]),_:1}),e(Q,null,{default:l(()=>[e(V),e(c,{text:"Cancel",color:"warning",onClick:o[1]||(o[1]=s=>a.dialogBatch=!1)}),e(c,{variant:"flat",loading:a.batchForm.processing,text:"Submit Details",type:"submit"},null,8,["loading"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])]),_:1}),e(I,{class:"mt-3"},{default:l(()=>[e(_,{cols:"4"},{default:l(()=>[e(f,{onClick:i.makeActiveVisible,variant:"flat",class:"cursor-pointer glass cursor-hand rounded-lg mb-5"},{default:l(()=>[r("div",Ne,[r("div",Le,[r("h1",Ee,u(t.$page.props.project.active.length),1),n(" Active Contracts ")]),e(f,{color:"success",class:"mt-n1 pa-3",elevation:"12"},{default:l(()=>[e(F,null,{default:l(()=>[n("mdi-file-document-edit")]),_:1})]),_:1})]),a.showActive?(d(),p(N,{key:0,color:"primary",height:"10","model-value":100})):v("",!0)]),_:1},8,["onClick"])]),_:1}),e(_,{cols:"4"},{default:l(()=>[e(f,{onClick:i.makeCancelledVisible,variant:"flat",class:"cursor-pointer glass cursor-hand rounded-lg mb-5"},{default:l(()=>[r("div",Me,[r("div",ze,[r("h1",qe,u(t.$page.props.project.cancelled.length),1),n(" Cancelled Contracts ")]),e(f,{color:"error",class:"mt-n1 pa-3",elevation:"12"},{default:l(()=>[e(F,null,{default:l(()=>[n("mdi-account-cancel")]),_:1})]),_:1})]),a.showCancelled?(d(),p(N,{key:0,color:"primary",height:"10","model-value":100})):v("",!0)]),_:1},8,["onClick"])]),_:1}),e(_,{cols:"4"},{default:l(()=>[e(f,{onClick:i.makeBatchVisible,variant:"flat",class:"cursor-pointer glass cursor-hand rounded-lg mb-5"},{default:l(()=>[r("div",He,[r("div",Oe,[r("h1",We,u(t.$page.props.project.batches.length),1),n(" Batches ")]),e(f,{color:"error",class:"mt-n1 pa-3",elevation:"12"},{default:l(()=>[e(F,null,{default:l(()=>[n("mdi-account-cancel")]),_:1})]),_:1})]),a.showBatch?(d(),p(N,{key:0,color:"primary",height:"10","model-value":100})):v("",!0)]),_:1},8,["onClick"])]),_:1})]),_:1}),e(U,{class:"my-3 rounded-lg bg-white"},{default:l(()=>[e(R,null,{default:l(()=>[n(u(a.title),1)]),_:1}),e(V),e(De,{"max-width":"350px"},{default:l(()=>[e(k,{modelValue:a.search,"onUpdate:modelValue":o[3]||(o[3]=s=>a.search=s),"hide-details":"",variant:"solo",density:"compact",class:"mr-3",placeholder:"Search...","prepend-inner-icon":"mdi-magnify",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),a.showBatch?(d(),g("div",Ge,[a.selectedBatch?(d(),g("div",Je,[e(U,{class:"rounded-lg px-2 mb-5",density:"comfortable"},{default:l(()=>[e(R,null,{default:l(()=>[n(u(t.$page.props.project.name)+" | "+u(a.selectedBatch.name),1)]),_:1}),e(V),e(c,{onClick:o[4]||(o[4]=s=>a.selectedBatch=null)},{default:l(()=>[n(" Back to Batch List ")]),_:1}),e(G,{persistent:"","max-width":"700",modelValue:a.dialogSelectedBatch,"onUpdate:modelValue":o[14]||(o[14]=s=>a.dialogSelectedBatch=s)},{activator:l(({props:s})=>[e(c,x(s,{text:"Add Batch Rules",variant:"flat"}),null,16)]),default:l(()=>[e(J,{onSubmit:W(i.addBatchRule,["prevent"])},{default:l(()=>[e(f,{title:"Add Batch"},{default:l(()=>[e(K,null,{default:l(()=>[e(I,{class:"mb-3"},{default:l(()=>[e(_,{cols:"12",md:"6"},{default:l(()=>[Ke,n(),Qe,e(C,{modelValue:a.batchSelectedForm.start_date,"onUpdate:modelValue":o[5]||(o[5]=s=>a.batchSelectedForm.start_date=s),valueType:"format",value:a.batchSelectedForm.start_date,"onUpdate:value":o[6]||(o[6]=s=>a.batchSelectedForm.start_date=s)},null,8,["modelValue","value"]),t.$page.props.errors.start_date?(d(),g("span",Xe,u(t.$page.props.errors.start_date),1)):v("",!0)]),_:1}),e(_,{cols:"12",md:"6"},{default:l(()=>[Ye,n(),Ze,e(C,{modelValue:a.batchSelectedForm.end_date,"onUpdate:modelValue":o[7]||(o[7]=s=>a.batchSelectedForm.end_date=s),valueType:"format",value:a.batchSelectedForm.end_date,"onUpdate:value":o[8]||(o[8]=s=>a.batchSelectedForm.end_date=s)},null,8,["modelValue","value"]),t.$page.props.errors.end_date?(d(),g("span",$e,u(t.$page.props.errors.end_date),1)):v("",!0)]),_:1})]),_:1}),e(k,{label:"Installment Amount",modelValue:a.batchSelectedForm.installment_amount,"onUpdate:modelValue":o[9]||(o[9]=s=>a.batchSelectedForm.installment_amount=s),"error-messages":t.$page.props.errors.installment_amount},null,8,["modelValue","error-messages"]),e(I,null,{default:l(()=>[e(_,null,{default:l(()=>[e(k,{class:"mt-5",label:"Penalty %",modelValue:a.batchSelectedForm.penalty_percentage,"onUpdate:modelValue":o[10]||(o[10]=s=>a.batchSelectedForm.penalty_percentage=s),"error-messages":t.$page.props.errors.penalty_percentage,hint:"Default is 10%","persistent-hint":""},null,8,["modelValue","error-messages"])]),_:1}),e(_,null,{default:l(()=>[e(k,{class:"mt-5",label:"Calculate Penalty After",modelValue:a.batchSelectedForm.calculate_penalty_after,"onUpdate:modelValue":o[11]||(o[11]=s=>a.batchSelectedForm.calculate_penalty_after=s),"error-messages":t.$page.props.errors.calculate_penalty_after,hint:"Enter day of month. eg every 10th","persistent-hint":""},null,8,["modelValue","error-messages"])]),_:1}),e(_,null,{default:l(()=>[e(Re,{"true-value":1,"false-value":0,color:"primary",class:"mt-5",label:"Calculate Penalty for this Period?",inset:"",modelValue:a.batchSelectedForm.calculate_penalty,"onUpdate:modelValue":o[12]||(o[12]=s=>a.batchSelectedForm.calculate_penalty=s)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(Q,null,{default:l(()=>[e(V),e(c,{text:"Cancel",color:"warning",variant:"flat",onClick:o[13]||(o[13]=s=>a.dialogSelectedBatch=!1)}),e(c,{variant:"flat",loading:a.batchSelectedForm.processing,text:"Submit Rule Details",type:"submit"},null,8,["loading"])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])]),_:1}),e(je,null,{default:l(()=>[et,r("tbody",null,[(d(!0),g($,null,ye(a.selectedBatch.rules,s=>(d(),g("tr",{key:s.id},[r("td",null,u(s.start_date),1),r("td",null,u(s.end_date),1),r("td",null,u(s.installment_amount),1),r("td",null,u(s.calculate_penalty_after),1),r("td",null,[e(c,{onClick:b=>i.editRule(s),class:"mx-1",color:"success"},{default:l(()=>[n("View")]),_:2},1032,["onClick"]),e(c,{onClick:b=>i.deleteRule(s),color:"error",class:"mx-1"},{default:l(()=>[n(" Delete ")]),_:2},1032,["onClick"])])]))),128))])]),_:1})])):(d(),p(Z,{key:1,items:t.$page.props.project.batches,headers:a.batchesHeaders},{"item.actions":l(({item:s})=>[r("div",tt,[e(c,{onClick:b=>i.selectBatch(s),class:"mx-1",color:"success"},{default:l(()=>[n("View")]),_:2},1032,["onClick"]),e(c,{onClick:b=>i.editBatch(s),class:"mx-1",color:"primary"},{default:l(()=>[n("Edit")]),_:2},1032,["onClick"]),e(c,{onClick:b=>i.deleteBatch(s),color:"error",class:"mx-1"},{default:l(()=>[n(" Delete ")]),_:2},1032,["onClick"])])]),_:1},8,["items","headers"]))])):(d(),p(Z,{key:1,items:a.items,headers:a.headers,search:a.search},{"item.actions":l(({item:s})=>[r("div",lt,[e(c,{class:"mx-1",color:"success"},{default:l(()=>[n("View")]),_:1}),a.showActive?(d(),p(c,{key:0,color:"error",class:"mx-1"},{default:l(()=>[n(" Cancel ")]),_:1})):v("",!0),a.showCancelled?(d(),p(c,{key:1,color:"primary",class:"mx-1"},{default:l(()=>[n(" Restore ")]),_:1})):v("",!0)])]),_:1},8,["items","headers","search"]))])]),_:1})}const Ct=Ve(Ue,[["render",at]]);export{Ct as default};
