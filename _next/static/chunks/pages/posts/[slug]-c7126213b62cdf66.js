(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{592:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[slug]",function(){return e(4018)}])},20:function(t,n,e){"use strict";e.d(n,{Z:function(){return s}});var r=e(5944),i=e(9008),o=e.n(i),c=e(1163),a=e(2660);function s(t){var n=t.title,e=t.description,i=t.image,s=(0,c.useRouter)(),l=n?"".concat(n," | ").concat(a.px):a.px,u=s.pathname.startsWith("/posts/"),d="".concat(a.y0).concat(s.asPath);return(0,r.BX)(o(),{children:[(0,r.tZ)("title",{children:l}),(0,r.tZ)("meta",{name:"description",content:e}),(0,r.tZ)("meta",{property:"og:title",content:l}),(0,r.tZ)("meta",{property:"og:description",content:e}),(0,r.tZ)("meta",{property:"og:type",content:u?"article":"website"}),(0,r.tZ)("meta",{property:"og:url",content:d}),(0,r.tZ)("meta",{property:"og:image",content:"".concat(a.y0).concat(i||"/images/icon.jpg")}),(0,r.tZ)("meta",{property:"og:site_name",content:a.px}),(0,r.tZ)("meta",{name:"twitter:card",content:"summary"}),(0,r.tZ)("link",{rel:"canonical",href:d})]})}},1634:function(t,n,e){"use strict";e.d(n,{Z:function(){return p}});var r=e(5944),i=e(917),o=e(4918),c=e(1334),a=e(5861),s=e(3067),l=e(1720);function u(t){var n=t.dateTime,e=(0,l.useMemo)((function(){return function(t){var n=new Date(t),e=n.getFullYear(),r="0".concat(n.getMonth()+1).slice(-2),i="0".concat(n.getDate()).slice(-2);return"".concat(e,"-").concat(r,"-").concat(i)}(n)}),[n]);return(0,r.tZ)(a.Z,{component:"time",variant:"body2",dateTime:n,children:e})}var d=e(3181),Z=function(t){return(0,i.iv)("display:flex;align-items:center;margin:",t.spacing(1,0),";")};function p(t){var n=t.post,e=t.link;return(0,r.BX)("header",{children:[(0,r.BX)("div",{css:Z,children:[(0,r.tZ)(o.Z,{fontSize:"small",sx:{mr:.5}}),(0,r.tZ)(u,{dateTime:n.date}),n.update&&(0,r.BX)(r.HY,{children:[(0,r.tZ)(c.Z,{fontSize:"small",sx:{ml:2,mr:.5}}),(0,r.tZ)(u,{dateTime:n.update})]})]}),(0,r.tZ)(a.Z,{component:"h1",variant:"h5",gutterBottom:!0,children:e?(0,r.tZ)(s.Z,{href:"/posts/".concat(n.slug,"/"),children:n.title}):n.title}),(0,r.tZ)(d.Z,{tags:n.tags})]})}},3181:function(t,n,e){"use strict";e.d(n,{Z:function(){return l}});var r=e(797),i=e(5944),o=e(917),c=(e(1720),e(3067)),a=(0,o.iv)("padding:0;margin:0;"),s=(0,o.iv)("display:inline;padding:0;margin:0;");function l(t){var n,e,o=t.tags;return(0,i.tZ)("ul",{css:a,children:(n=" ",e=o.map((function(t){return(0,i.tZ)("li",{css:s,children:(0,i.tZ)(c.Z,{href:"/tags/".concat(t,"/"),color:"textSecondary",underline:"hover",children:"#".concat(t)})},t)})),e.reduce((function(t,e){return(0,r.Z)(t).concat([n,e])}),[]))})}},13:function(t,n,e){"use strict";e.d(n,{Z:function(){return s}});var r=e(5944),i=e(917),o=e(1634),c=(0,i.iv)("list-style:none;padding:0;margin:0;"),a=function(t){return(0,i.iv)("padding:",t.spacing(2,3),";margin:",t.spacing(2,0),";border:1px solid #bbb;")};function s(t){var n=t.posts;return(0,r.tZ)("ul",{css:c,children:n.map((function(t){return(0,r.tZ)("li",{css:a,children:(0,r.tZ)("article",{children:(0,r.tZ)(o.Z,{post:t,link:!0})})},t.slug)}))})}},4018:function(t,n,e){"use strict";e.r(n),e.d(n,{__N_SSG:function(){return F},default:function(){return R}});var r=e(5944),i=e(3156),o=e(1720),c=e(20),a=e(917),s=e(3067),l=function(t){return(0,a.iv)("display:flex;padding:0;margin:",t.spacing(4,0),";")},u=function(t){return(0,a.iv)("display:flex;align-items:center;padding:",t.spacing(1,2),";margin:0;")},d=(0,a.iv)("flex:1;padding-left:0;justify-content:flex-end;"),Z=(0,a.iv)("flex:1;padding-right:0;"),p=(0,a.iv)("border-left:1px solid #6c6c6c;border-right:1px solid #6c6c6c;");function f(t){var n=t.prev,e=t.next;return(0,r.BX)("ul",{css:l,children:[(0,r.tZ)("li",{css:[u,d],children:n?(0,r.tZ)(s.Z,{href:"/posts/".concat(n.slug),variant:"body1",children:n.title}):null}),(0,r.tZ)("li",{css:[u,p],children:(0,r.tZ)(s.Z,{href:"/",variant:"body1",children:"HOME"})}),(0,r.tZ)("li",{css:[u,Z],children:e?(0,r.tZ)(s.Z,{href:"/posts/".concat(e.slug),variant:"body1",children:e.title}):null})]})}var g=e(5861),h=e(3181),m=e(13),v=function(t){return(0,a.iv)("margin:",t.spacing(4,"auto"),";")};function y(t){var n=t.tags,e=t.posts;return(0,r.BX)("aside",{css:v,children:[(0,r.BX)("header",{children:[(0,r.tZ)(g.Z,{variant:"h5",component:"h1",children:"\u540c\u3058\u30bf\u30b0\u3092\u542b\u3080\u8a18\u4e8b"}),(0,r.tZ)(h.Z,{tags:n})]}),(0,r.tZ)("main",{children:(0,r.tZ)(m.Z,{posts:e})})]})}var b=e(1799),x=e(9396),_=e(1899),w=e(629),k=e(3946),B=e(8665),X=e(2882),S=e(7906),z=e(295),T=e(3816),C=e(3252),E=e(7357),N=e(1771),M=e(1634),j=function(t){return(0,a.iv)("padding:",t.spacing(.5,1),";border-radius:",t.spacing(.5),';background-color:#1e1e1e;color:#d4d4d4;font-family:"SFMono-Regular",Consolas,Menlo,Courier,monospace,monospace;font-size:0.9em;pre > &{padding:0;background-color:transparent;}')},O=(0,a.iv)("word-break:break-all;"),A=function(t){return(0,a.iv)("display:flex;justify-content:space-between;align-items:center;padding:",t.spacing(.5,4),";border-top-right-radius:5px;border-top-left-radius:5px;background-color:#555;color:white;")},D=function(t){return(0,a.iv)("overflow:auto;padding:",t.spacing(1,4),";border-bottom-right-radius:5px;border-bottom-left-radius:5px;")},H=(0,a.iv)("& &{margin-top:0;margin-bottom:0;}"),P={p:function(t){return(0,r.tZ)(g.Z,(0,b.Z)({my:2,textAlign:"justify",whiteSpace:"pre-line"},t))},h2:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({my:4,borderBottom:"1px solid currentcolor"},t),{component:"h2",variant:"h4"}))},h3:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({my:3},t),{component:"h3",variant:"h5"}))},h4:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({my:3},t),{component:"h4",variant:"h6"}))},ul:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({my:2,css:H},t),{component:"ul"}))},ol:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({my:2,css:H},t),{component:"ol"}))},li:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({},t),{component:"li"}))},code:function(t){var n="string"===typeof t.children&&/^[a-zA-Z$_][a-zA-Z0-9$_.]*$/.test(t.children);return(0,r.tZ)("code",(0,x.Z)((0,b.Z)({},t),{css:[j,n&&O]}))},pre:function(t){return(0,r.tZ)(g.Z,(0,x.Z)((0,b.Z)({component:"pre"},t),{css:D}))},a:s.Z,table:function(t){return(0,r.tZ)(X.Z,{component:w.Z,variant:"outlined",children:(0,r.tZ)(S.Z,(0,b.Z)({},t))})},tbody:z.Z,tr:T.Z,th:function(t){return(0,r.tZ)(C.Z,(0,x.Z)((0,b.Z)({component:"th"},t),{align:t.align||void 0}))},td:function(t){return(0,r.tZ)(C.Z,(0,x.Z)((0,b.Z)({},t),{align:t.align||void 0}))},"app-code-wrapper":function(t){var n=t.title,e=t.lang,i=t.code,c=t.children,a=(0,o.useState)(!1),s=a[0],l=a[1];return(0,r.BX)(w.Z,{elevation:4,sx:{my:2},children:[(0,r.BX)("div",{css:A,children:[(0,r.tZ)(g.Z,{component:"span",children:"diff"===e&&n?"diff: ".concat(n):n}),(0,r.tZ)(k.Z,{"aria-label":"copy",size:"small",sx:{color:"white"},onClick:function(){navigator.clipboard.writeText(i).then((function(){l(!0)}))},children:(0,r.tZ)(_.Z,{fontSize:"small"})})]}),c,(0,r.tZ)(B.Z,{open:s,autoHideDuration:5e3,onClose:function(){l(!1)},message:"\u30b3\u30fc\u30c9\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f",anchorOrigin:{vertical:"top",horizontal:"center"}})]})}};function $(t){var n=t.post,e=t.content;return(0,r.BX)("article",{children:[(0,r.tZ)(E.Z,{mb:4,children:(0,r.tZ)(M.Z,{post:n})}),(0,r.tZ)("main",{children:(0,r.tZ)(N.Z,{source:e,components:P})})]})}var F=!0;function R(t){var n=t.post,e=t.next,o=t.prev,a=t.sameTags,s=t.content;return(0,r.BX)(i.Z,{children:[(0,r.tZ)(c.Z,{title:n.title,description:n.description}),(0,r.tZ)($,{post:n,content:s}),(0,r.tZ)(f,{next:e,prev:o}),a.length>0&&(0,r.tZ)(y,{tags:n.tags,posts:a})]})}}},function(t){t.O(0,[103,774,888,179],(function(){return n=592,t(t.s=n);var n}));var n=t.O();_N_E=n}]);