(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[563],{7573:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tags/[tag]/[page]",function(){return e(8342)}])},9964:function(t,n,e){"use strict";e.d(n,{Z:function(){return i}});var r=e(5944),c=e(9008),o=e(1163),a=e(9321);function i(t){var n=t.title,e=t.description,i=t.image,u=(0,o.useRouter)(),s=n?"".concat(n," | ").concat(a.px):a.px,l=u.pathname.startsWith("/blog/"),p="".concat(a.y0).concat(u.asPath);return(0,r.BX)(c.default,{children:[(0,r.tZ)("title",{children:s}),(0,r.tZ)("meta",{name:"description",content:e}),(0,r.tZ)("meta",{property:"og:title",content:n}),(0,r.tZ)("meta",{property:"og:description",content:e}),(0,r.tZ)("meta",{property:"og:type",content:l?"article":"website"}),(0,r.tZ)("meta",{property:"og:url",content:p}),(0,r.tZ)("meta",{property:"og:image",content:"".concat(a.y0).concat(i||"/images/icon.jpg")}),(0,r.tZ)("meta",{property:"og:site_name",content:a.px}),(0,r.tZ)("meta",{name:"twitter:card",content:"summary"})]})}},1125:function(t,n,e){"use strict";e.d(n,{Z:function(){return p}});var r=e(5944),c=e(917),o=e(5659),a=e(222),i=(e(1720),e(4049));function u(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function s(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})))),r.forEach((function(n){u(t,n,e[n])}))}return t}var l=(0,c.iv)("display:flex;justify-content:center;");function p(t){var n=t.page,e=t.count,c=t.basePath;return(0,r.tZ)(a.Z,{css:l,page:n,count:e,renderItem:function(t){return null==t.page||t.page<=0||e<t.page?(0,r.tZ)(o.Z,s({component:"span"},t)):(0,r.tZ)(o.Z,s({component:i.Z,href:"".concat(c).concat(1===t.page?"":"p".concat(t.page))},t))}})}},7146:function(t,n,e){"use strict";e.d(n,{Z:function(){return d}});var r=e(5944),c=e(917),o=e(4918),a=e(1334),i=e(65),u=e(3020),s=e(1720);function l(t){var n=t.dateTime,e=(0,s.useMemo)((function(){return function(t){var n=new Date(t),e=n.getFullYear(),r="0".concat(n.getMonth()+1).slice(-2),c="0".concat(n.getDate()).slice(-2);return"".concat(e,"-").concat(r,"-").concat(c)}(n)}),[n]);return(0,r.tZ)(i.Z,{component:"time",variant:"body2",dateTime:n,children:e})}var p=e(3376),f=function(t){return(0,c.iv)("display:flex;align-items:center;margin:",t.spacing(1,0),";")};function d(t){var n=t.post,e=t.link;return(0,r.BX)("header",{children:[(0,r.BX)("div",{css:f,children:[(0,r.tZ)(o.Z,{fontSize:"small",sx:{mr:.5}}),(0,r.tZ)(l,{dateTime:n.date}),n.update&&(0,r.BX)(r.HY,{children:[(0,r.tZ)(a.Z,{fontSize:"small",sx:{ml:2,mr:.5}}),(0,r.tZ)(l,{dateTime:n.update})]})]}),(0,r.tZ)(i.Z,{component:"h1",variant:"h5",gutterBottom:!0,children:e?(0,r.tZ)(u.Z,{href:"/blog/".concat(n.slug,"/"),children:n.title}):n.title}),(0,r.tZ)(p.Z,{tags:n.tags})]})}},3376:function(t,n,e){"use strict";e.d(n,{Z:function(){return l}});var r=e(5944),c=e(917),o=(e(1720),e(3020));function a(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"===typeof t)return a(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return a(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var u=(0,c.iv)("padding:0;margin:0;"),s=(0,c.iv)("display:inline;padding:0;margin:0;");function l(t){var n,e,c=t.tags;return(0,r.tZ)("ul",{css:u,children:(n=" ",e=c.map((function(t){return(0,r.tZ)("li",{css:s,children:(0,r.tZ)(o.Z,{href:"/tags/".concat(t,"/"),color:"textSecondary",underline:"hover",children:"#".concat(t)})},t)})),e.reduce((function(t,e){return i(t).concat([n,e])}),[]))})}},2378:function(t,n,e){"use strict";e.d(n,{Z:function(){return u}});var r=e(5944),c=e(917),o=e(7146),a=(0,c.iv)("list-style:none;padding:0;margin:0;"),i=function(t){return(0,c.iv)("padding:",t.spacing(2,3),";margin:",t.spacing(2,0),";border:1px solid #bbb;")};function u(t){var n=t.posts;return(0,r.tZ)("ul",{css:a,children:n.map((function(t){return(0,r.tZ)("li",{css:i,children:(0,r.tZ)("article",{children:(0,r.tZ)(o.Z,{post:t,link:!0})})},t.slug)}))})}},8342:function(t,n,e){"use strict";e.r(n),e.d(n,{__N_SSG:function(){return l},config:function(){return p}});var r=e(5944),c=e(8238),o=e(1163),a=e(1720),i=e(9964),u=e(1125),s=e(2378),l=!0,p={amp:"hybrid"};n.default=function(t){var n=t.posts,e=t.pager,l=(0,o.useRouter)(),p=l.query,f=p.tag,d=p.page;return(0,a.useEffect)((function(){"p1"===d&&l.replace("/tags/".concat(f))}),[f,d,l]),(0,r.BX)(c.Z,{component:"main",children:[(0,r.tZ)(i.Z,{title:"\u300c".concat(f,"\u300d\u306e\u691c\u7d22\u7d50\u679c"),description:"\u300c".concat(f,"\u300d\u306e\u691c\u7d22\u7d50\u679c")}),(0,r.BX)("p",{children:["\u300c",f,"\u300d\u306e\u691c\u7d22\u7d50\u679c"]}),(0,r.tZ)(s.Z,{posts:n}),(0,r.tZ)(u.Z,{page:e.page,count:e.count,basePath:"/tags/".concat(f,"/")})]})}}},function(t){t.O(0,[256,774,888,179],(function(){return n=7573,t(t.s=n);var n}));var n=t.O();_N_E=n}]);