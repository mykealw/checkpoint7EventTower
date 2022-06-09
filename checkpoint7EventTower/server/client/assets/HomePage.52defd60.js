import{u,D as x,c as b,a as h,o as p,b as v,d as e,j as i,F as m,B as y,q as w,s as E,e as k,x as f}from"./vendor.95959a42.js";import{_ as C,e as l,l as c,P as d,A as _}from"./index.ed12f5ca.js";const j={name:"Home",setup(){const r=u();return x(async()=>{try{await l.getAllEvents()}catch(t){c.log(t),d.toast(t.message,"error")}}),{events:b(()=>_.towerEvents),async getAllEvents(){try{await l.getAllEvents()}catch(t){c.log(t),d.toast(t.message,"error")}},async filterEvents(t){try{await l.filterEvents(t)}catch(n){c.log(n),d.toast(n.message,"error")}},async goTo(t){try{await l.getActiveEvent(t),r.push({name:"Event",params:{id:_.activeEvent.id}})}catch(n){c.log(n),d.toast(n.message,"error")}}}}},a=r=>(w("data-v-1a4cd5be"),r=r(),E(),r),A=a(()=>e("div",{class:"row"},[e("div",{class:"col-md-12 p-0 mt-2 position-relative"},[e("img",{class:"img1 border border-primary d-flex mx-auto",src:"https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",alt:""}),e("h3",{class:"text-primary position-absolute marginT picfont ts text-start"},[f(" Get ahead of the scalpers."),e("br"),f("Reserve your seat now with"),e("br"),f("real events for real people. ")])])],-1)),S={class:"row justify-content-center my-5 center-text"},B=a(()=>e("h3",{class:"picfont text-primary",title:"All Events"},"All",-1)),H=[B],T=a(()=>e("h3",{class:"picfont text-primary",title:"Concerts"},"Concerts",-1)),D=[T],I=a(()=>e("h3",{class:"picfont text-primary",title:"Conventions"},"Conventions",-1)),M=[I],P=a(()=>e("h3",{class:"picfont text-primary",title:"Sports"},"Sports",-1)),V=[P],G=a(()=>e("h3",{class:"picfont text-primary",title:"Digital"},"Digital",-1)),N=[G],$={class:"row"},q=["title"];function F(r,t,n,o,R,L){const g=h("TowerEvent");return p(),v(m,null,[A,e("div",S,[e("div",{class:"col-md-2 d-flex pt-3 pb-2 bg-dark justify-content-center selectable roundleft",onClick:t[0]||(t[0]=i(s=>o.getAllEvents(""),["prevent"]))},H),e("div",{class:"col-md-2 d-flex pt-3 pb-2 bg-dark justify-content-center selectable",onClick:t[1]||(t[1]=i(s=>o.filterEvents("concert"),["prevent"]))},D),e("div",{class:"col-md-2 d-flex pt-3 pb-2 bg-dark justify-content-center selectable",onClick:t[2]||(t[2]=i(s=>o.filterEvents("convention"),["prevent"]))},M),e("div",{class:"col-md-2 d-flex pt-3 pb-2 bg-dark justify-content-center selectable",onClick:t[3]||(t[3]=i(s=>o.filterEvents("sport"),["prevent"]))},V),e("div",{class:"col-md-2 d-flex pt-3 pb-2 bg-dark justify-content-center selectable roundright",onClick:t[4]||(t[4]=i(s=>o.filterEvents("digital"),["prevent"]))},N)]),e("div",$,[(p(!0),v(m,null,y(o.events,s=>(p(),v("div",{class:"col-md-3",title:s.name,key:s.id},[k(g,{event:s,onClick:W=>o.goTo(s.id)},null,8,["event","onClick"])],8,q))),128))])],64)}var J=C(j,[["render",F],["__scopeId","data-v-1a4cd5be"]]);export{J as default};
