_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[5],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=c,t.useAmp=function(){return c(r.default.useContext(o.AmpStateContext))};var a,r=(a=n("q1tI"))&&a.__esModule?a:{default:a},o=n("lwAK");function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,a=e.hybrid,r=void 0!==a&&a,o=e.hasQuery;return n||r&&(void 0!==o&&o)}},"8Kt/":function(e,t,n){"use strict";n("lSNA");t.__esModule=!0,t.defaultHead=l,t.default=void 0;var a,r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=a?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),o=(a=n("Xuae"))&&a.__esModule?a:{default:a},c=n("lwAK"),i=n("FYa8"),s=n("/0+H");function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[r.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(r.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===r.default.Fragment?e.concat(r.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var d=["name","httpEquiv","charSet","itemProp"];function p(e,t){return e.reduce((function(e,t){var n=r.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,a={};return function(r){var o=!0;if(r.key&&"number"!==typeof r.key&&r.key.indexOf("$")>0){var c=r.key.slice(r.key.indexOf("$")+1);e.has(c)?o=!1:e.add(c)}switch(r.type){case"title":case"base":t.has(r.type)?o=!1:t.add(r.type);break;case"meta":for(var i=0,s=d.length;i<s;i++){var u=d[i];if(r.props.hasOwnProperty(u))if("charSet"===u)n.has(u)?o=!1:n.add(u);else{var l=r.props[u],f=a[u]||new Set;f.has(l)?o=!1:(f.add(l),a[u]=f)}}}return o}}()).reverse().map((function(e,t){var n=e.key||t;return r.default.cloneElement(e,{key:n})}))}function m(e){var t=e.children,n=(0,r.useContext)(c.AmpStateContext),a=(0,r.useContext)(i.HeadManagerContext);return r.default.createElement(o.default,{reduceComponentsToState:p,headManager:a,inAmpMode:(0,s.isInAmpMode)(n)},t)}m.rewind=function(){};var h=m;t.default=h},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},HaOA:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var a=n("q1tI"),r=n.n(a),o=n("YFqc"),c=n.n(o),i=r.a.createElement,s=function(e){var t=e.dateTime,n=Object(a.useMemo)((function(){return function(e){var t=new Date(e),n=t.getFullYear(),a="0".concat(t.getMonth()+1).slice(-2),r="0".concat(t.getDate()).slice(-2);return"".concat(n,"-").concat(a,"-").concat(r)}(t)}),[t]);return i("time",{dateTime:t},n)},u=n("jn4O"),l=r.a.createElement,f=function(e){var t=e.post,n=e.link;return l("header",null,l(s,{dateTime:t.date}),l("h1",null,n?l(c.a,{href:"/blog/[slug]/",as:"/blog/".concat(t.slug,"/")},l("a",null,t.title)):t.title),l(u.a,{tags:t.tags}))}},Ijbi:function(e,t,n){var a=n("WkPL");e.exports=function(e){if(Array.isArray(e))return a(e)}},LEvs:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n("MX0m"),r=n.n(a),o=n("q1tI"),c=n.n(o),i=n("YFqc"),s=n.n(i),u=c.a.createElement,l=function(e){var t=e.label,n=e.active,a=e.basePath,r=e.basePathAs;return n?u("span",null,t):u(s.a,{href:1===t?a||"/":"".concat(a||"","/[page]"),as:1===t?r||"/":"".concat(r||"","/p").concat(t)},u("a",null,t))},f=c.a.createElement,d=function(e){var t=e.pager,n=e.basePath,a=e.basePathAs;return f("ul",{className:"jsx-".concat(p.__hash)+" Pager"},function(e){for(var t=new Array(e),n=0;n<e;++n)t[n]=n;return t}(t.max).map((function(e){return f("li",{key:e,className:"jsx-".concat(p.__hash)+" item"},f(l,{label:e+1,active:e+1===t.current,basePath:n,basePathAs:a}))})),f(r.a,{id:p.__hash},p))},p=[".Pager.jsx-3526723532{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;list-style:none;padding:0;margin-right:auto;margin-left:auto;}",".item.jsx-3526723532{margin-right:1rem;}",".item.jsx-3526723532:last-child{margin-right:0;}"];p.__hash="3526723532"},RIqP:function(e,t,n){var a=n("Ijbi"),r=n("EbDI"),o=n("ZhPi"),c=n("Bnag");e.exports=function(e){return a(e)||r(e)||o(e)||c()}},Xuae:function(e,t,n){"use strict";var a=n("RIqP"),r=n("lwsE"),o=n("W8MJ"),c=n("PJYZ"),i=n("7W2i"),s=n("a1gu"),u=n("Nsbk");function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=u(e);if(t){var r=u(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return s(this,n)}}t.__esModule=!0,t.default=void 0;var f=n("q1tI"),d=!1,p=function(e){i(n,e);var t=l(n);function n(e){var o;return r(this,n),(o=t.call(this,e))._hasHeadManager=void 0,o.emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(a(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,d&&o._hasHeadManager&&(o.props.headManager.mountedInstances.add(c(o)),o.emitChange()),o}return o(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(f.Component);t.default=p},j9eG:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("q1tI"),r=n.n(a),o=n("8Kt/"),c=n.n(o),i=n("nOHt"),s=n("he5r"),u=r.a.createElement,l=function(e){var t=e.title,n=e.description,a=e.image,r=Object(i.useRouter)(),o=t?"".concat(t," | ").concat(s.b):s.b,l=r.pathname.startsWith("/blog/"),f="".concat(s.c).concat(r.asPath);return u(c.a,null,u("title",null,o),u("meta",{name:"description",content:n}),u("meta",{property:"og:title",content:t}),u("meta",{property:"og:description",content:n}),u("meta",{property:"og:type",content:l?"article":"website"}),u("meta",{property:"og:url",content:f}),u("meta",{property:"og:image",content:"".concat(s.c).concat(a||"/images/icon.jpg")}),u("meta",{property:"og:site_name",content:s.b}),u("meta",{name:"twitter:card",content:"summary"}))}},jn4O:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("MX0m"),r=n.n(a),o=n("q1tI"),c=n.n(o),i=n("YFqc"),s=n.n(i),u=c.a.createElement,l=function(e){var t=e.tags;return u("ul",{className:"jsx-".concat(f.__hash)+" Tags"},t.map((function(e){return u("li",{key:e,className:"jsx-".concat(f.__hash)+" item"},u(s.a,{href:"/tags/[tag]/",as:"/tags/".concat(e,"/")},u("a",{className:"jsx-".concat(f.__hash)+" link"},"#",e)))})),u(r.a,{id:f.__hash},f))},f=[".Tags.jsx-1424798431{padding:0;}",".item.jsx-1424798431{display:inline;margin:0 0.2em;}",".link.jsx-1424798431{color:var(--color-text-secondary);}"];f.__hash="1424798431"},lSNA:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},lTfB:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[page]",function(){return n("nXX9")}])},lwAK:function(e,t,n){"use strict";var a;t.__esModule=!0,t.AmpStateContext=void 0;var r=((a=n("q1tI"))&&a.__esModule?a:{default:a}).default.createContext({});t.AmpStateContext=r},nXX9:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return l}));var a=n("q1tI"),r=n.n(a),o=n("nOHt"),c=n("j9eG"),i=n("LEvs"),s=n("pNI0"),u=r.a.createElement,l=!0;t.default=function(e){var t=e.posts,n=e.pager,r=Object(o.useRouter)(),l=r.query.page;return Object(a.useEffect)((function(){"p1"===l&&r.replace("/")}),[l,r]),u("main",null,u(c.a,{description:"\u6280\u8853\u30d6\u30ed\u30b0\u6539\u3081\u3001Qiita\u306e\u4e0b\u66f8\u304d"}),u(s.a,{posts:t}),u(i.a,{pager:n}))}},pNI0:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n("MX0m"),r=n.n(a),o=n("q1tI"),c=n.n(o),i=n("HaOA"),s=c.a.createElement,u=function(e){var t=e.posts;return s("ul",{className:"jsx-".concat(l.__hash)+" Posts"},t.map((function(e){return s("li",{key:e.slug,className:"jsx-".concat(l.__hash)+" Posts-item"},s("article",{className:"jsx-".concat(l.__hash)},s(i.a,{post:e,link:!0})))})),s(r.a,{id:l.__hash},l))},l=[".Posts.jsx-2000003725{list-style:none;padding:0;}",".Posts-item.jsx-2000003725{padding:1rem 1.5rem;margin:1rem 0;border:1px solid #bbb;}"];l.__hash="2000003725"}},[["lTfB",0,2,1,3]]]);