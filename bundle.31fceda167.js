!function(){"use strict";function i(t,e){for(var n=[],r=[],i=arguments.length;2<i--;)n.push(arguments[i]);for(;n.length;){var o=n.pop();if(o&&o.pop)for(i=o.length;i--;)n.push(o[i]);else null!=o&&!0!==o&&!1!==o&&r.push(o)}return"function"==typeof t?t(e||{},r):{nodeName:t,attributes:e||{},children:r,key:e&&e.key}}var u=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},o=f,t=a,e=function(t){return s(a(t))},n=s,r=h,b=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function a(t){for(var e,n,r=[],i=0,o=0,a="";null!=(e=b.exec(t));){var s=e[0],c=e[1],h=e.index;if(a+=t.slice(o,h),o=h+s.length,c)a+=c[1];else{a&&(r.push(a),a="");var u=e[2],l=e[3],p=e[4],f=e[5],d=e[6],v=e[7],g="+"===d||"*"===d,m="?"===d||"*"===d,y=u||"/",w=p||f||(v?".*":"[^"+y+"]+?");r.push({name:l||i++,prefix:u||"",delimiter:y,optional:m,repeat:g,pattern:(n=w,n.replace(/([=!:$\/()])/g,"\\$1"))})}}return o<t.length&&(a+=t.substr(o)),a&&r.push(a),r}function s(c){for(var h=new Array(c.length),t=0;t<c.length;t++)"object"==typeof c[t]&&(h[t]=new RegExp("^"+c[t].pattern+"$"));return function(t){for(var e="",n=t||{},r=0;r<c.length;r++){var i=c[r];if("string"!=typeof i){var o,a=n[i.name];if(null==a){if(i.optional)continue;throw new TypeError('Expected "'+i.name+'" to be defined')}if(u(a)){if(!i.repeat)throw new TypeError('Expected "'+i.name+'" to not repeat, but received "'+a+'"');if(0===a.length){if(i.optional)continue;throw new TypeError('Expected "'+i.name+'" to not be empty')}for(var s=0;s<a.length;s++){if(o=encodeURIComponent(a[s]),!h[r].test(o))throw new TypeError('Expected all "'+i.name+'" to match "'+i.pattern+'", but received "'+o+'"');e+=(0===s?i.prefix:i.delimiter)+o}}else{if(o=encodeURIComponent(a),!h[r].test(o))throw new TypeError('Expected "'+i.name+'" to match "'+i.pattern+'", but received "'+o+'"');e+=i.prefix+o}}else e+=i}return e}}function l(t){return t.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function c(t,e){return t.keys=e,t}function p(t){return t.sensitive?"":"i"}function h(t,e){for(var n=(e=e||{}).strict,r=!1!==e.end,i="",o=t[t.length-1],a="string"==typeof o&&/\/$/.test(o),s=0;s<t.length;s++){var c=t[s];if("string"==typeof c)i+=l(c);else{var h=l(c.prefix),u=c.pattern;c.repeat&&(u+="(?:"+h+u+")*"),i+=u=c.optional?h?"(?:"+h+"("+u+"))?":"("+u+")?":h+"("+u+")"}}return n||(i=(a?i.slice(0,-2):i)+"(?:\\/(?=$))?"),i+=r?"$":n&&a?"":"(?=\\/|$)",new RegExp("^"+i,p(e))}function f(t,e,n){return u(e=e||[])?n||(n={}):(n=e,e=[]),t instanceof RegExp?function(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return c(t,e)}(t,e):u(t)?function(t,e,n){for(var r=[],i=0;i<t.length;i++)r.push(f(t[i],e,n).source);return c(new RegExp("(?:"+r.join("|")+")",p(n)),e)}(t,e,n):function(t,e,n){for(var r=a(t),i=h(r,n),o=0;o<r.length;o++)"string"!=typeof r[o]&&e.push(r[o]);return c(i,e)}(t,e,n)}o.parse=t,o.compile=e,o.tokensToFunction=n,o.tokensToRegExp=r;var d,v="undefined"!=typeof document,g="undefined"!=typeof window,m="undefined"!=typeof history,y="undefined"!=typeof process,w=v&&document.ontouchstart?"touchstart":"click",_=g&&!(!window.history.location&&!window.location);function x(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._dispatch=!0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}function E(t,e){if("function"==typeof t)return E.call(this,"*",t);if("function"==typeof e)for(var n=new k(t,null,this),r=1;r<arguments.length;++r)this.callbacks.push(n.middleware(arguments[r]));else"string"==typeof t?this["string"==typeof e?"redirect":"show"](t,e):this.start(t)}function P(t,e,n){var r=this.page=n||E,i=r._window,o=r._hashbang,a=r._getBase();"/"===t[0]&&0!==t.indexOf(a)&&(t=a+(o?"#!":"")+t);var s=t.indexOf("?");if(this.canonicalPath=t,this.path=t.replace(a,"")||"/",o&&(this.path=this.path.replace("#!","")||"/"),this.title=v&&i.document.title,this.state=e||{},this.state.path=t,this.querystring=~s?r._decodeURLEncodedURIComponent(t.slice(s+1)):"",this.pathname=r._decodeURLEncodedURIComponent(~s?t.slice(0,s):t),this.params={},this.hash="",!o){if(!~this.path.indexOf("#"))return;var c=this.path.split("#");this.path=this.pathname=c[0],this.hash=r._decodeURLEncodedURIComponent(c[1])||"",this.querystring=this.querystring.split("#")[0]}}function k(t,e,n){this.page=n||L;var r=e||{};r.strict=r.strict||n._strict,this.path="*"===t?"(.*)":t,this.method="GET",this.regexp=o(this.path,this.keys=[],r)}x.prototype.configure=function(t){var e=t||{};this._window=e.window||g&&window,this._dispatch=!1!==e.dispatch,this._decodeURLComponents=!1!==e.decodeURLComponents,this._popstate=!1!==e.popstate&&g,this._click=!1!==e.click&&v,this._hashbang=!!e.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):g&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(w,this.clickHandler,!1):v&&n.document.removeEventListener(w,this.clickHandler,!1),this._hashbang&&g&&!m?n.addEventListener("hashchange",this._onpopstate,!1):g&&n.removeEventListener("hashchange",this._onpopstate,!1)},x.prototype.base=function(t){if(0===arguments.length)return this._base;this._base=t},x.prototype._getBase=function(){var t=this._base;if(t)return t;var e=g&&this._window&&this._window.location;return g&&this._hashbang&&e&&"file:"===e.protocol&&(t=e.pathname),t},x.prototype.strict=function(t){if(0===arguments.length)return this._strict;this._strict=t},x.prototype.start=function(t){if(this.configure(t),this._dispatch){var e;if(this._running=!0,_){var n=this._window.location;e=this._hashbang&&~n.hash.indexOf("#!")?n.hash.substr(2)+n.search:this._hashbang?n.search+n.hash:n.pathname+n.search+n.hash}this.replace(e,null,!0,this._dispatch)}},x.prototype.stop=function(){if(this._running){this.current="",this.len=0,this._running=!1;var t=this._window;this._click&&t.document.removeEventListener(w,this.clickHandler,!1),g&&t.removeEventListener("popstate",this._onpopstate,!1),g&&t.removeEventListener("hashchange",this._onpopstate,!1)}},x.prototype.show=function(t,e,n,r){var i=new P(t,e,this),o=this.prevContext;return this.prevContext=i,this.current=i.path,this._dispatch&&this.dispatch(i,o),!1!==i.handled&&!1!==r&&i.pushState(),i},x.prototype.back=function(t,e){var n=this;if(0<this.len){var r=this._window;m&&r.history.back(),this.len--}else t?setTimeout(function(){n.show(t,e)}):setTimeout(function(){n.show(n._getBase(),e)})},x.prototype.redirect=function(t,e){var n=this;"string"==typeof t&&"string"==typeof e&&E.call(this,t,function(t){setTimeout(function(){n.replace(e)},0)}),"string"==typeof t&&void 0===e&&setTimeout(function(){n.replace(t)},0)},x.prototype.replace=function(t,e,n,r){var i=new P(t,e,this),o=this.prevContext;return this.prevContext=i,this.current=i.path,i.init=n,i.save(),!1!==r&&this.dispatch(i,o),i},x.prototype.dispatch=function(e,n){var r=0,i=0,o=this;function a(){var t=o.callbacks[r++];if(e.path===o.current)return t?void t(e,a):function(t){if(t.handled)return;var e,n=this._window;e=this._hashbang?_&&this._getBase()+n.location.hash.replace("#!",""):_&&n.location.pathname+n.location.search;if(e===t.canonicalPath)return;this.stop(),t.handled=!1,_&&(n.location.href=t.canonicalPath)}.call(o,e);e.handled=!1}n?function t(){var e=o.exits[i++];if(!e)return a();e(n,t)}():a()},x.prototype.exit=function(t,e){if("function"==typeof t)return this.exit("*",t);for(var n=new k(t,null,this),r=1;r<arguments.length;++r)this.exits.push(n.middleware(arguments[r]))},x.prototype.clickHandler=function(t){if(1===this._which(t)&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.defaultPrevented)){var e=t.target,n=t.path||(t.composedPath?t.composedPath():null);if(n)for(var r=0;r<n.length;r++)if(n[r].nodeName&&"A"===n[r].nodeName.toUpperCase()&&n[r].href){e=n[r];break}for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;if(e&&"A"===e.nodeName.toUpperCase()){var i="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name;if(!e.hasAttribute("download")&&"external"!==e.getAttribute("rel")){var o=e.getAttribute("href");if((this._hashbang||!this._samePath(e)||!e.hash&&"#"!==o)&&!(o&&-1<o.indexOf("mailto:"))&&(i?!e.target.baseVal:!e.target)&&(i||this.sameOrigin(e.href))){var a=i?e.href.baseVal:e.pathname+e.search+(e.hash||"");a="/"!==a[0]?"/"+a:a,y&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var s=a,c=this._getBase();0===a.indexOf(c)&&(a=a.substr(c.length)),this._hashbang&&(a=a.replace("#!","")),(!c||s!==a||_&&"file:"===this._window.location.protocol)&&(t.preventDefault(),this.show(s))}}}}},x.prototype._onpopstate=(d=!1,g?(v&&"complete"===document.readyState?d=!0:window.addEventListener("load",function(){setTimeout(function(){d=!0},0)}),function(t){if(d)if(t.state){var e=t.state.path;this.replace(e,t.state)}else if(_){var n=this._window.location;this.show(n.pathname+n.search+n.hash,void 0,void 0,!1)}}):function(){}),x.prototype._which=function(t){return null==(t=t||g&&this._window.event).which?t.button:t.which},x.prototype._toURL=function(t){var e=this._window;if("function"==typeof URL&&_)return new URL(t,e.location.toString());if(v){var n=e.document.createElement("a");return n.href=t,n}},x.prototype.sameOrigin=function(t){if(!t||!_)return!1;var e=this._toURL(t),n=this._window.location;return n.protocol===e.protocol&&n.hostname===e.hostname&&n.port===e.port},x.prototype._samePath=function(t){if(!_)return!1;var e=this._window.location;return t.pathname===e.pathname&&t.search===e.search},x.prototype._decodeURLEncodedURIComponent=function(t){return"string"!=typeof t?t:this._decodeURLComponents?decodeURIComponent(t.replace(/\+/g," ")):t},P.prototype.pushState=function(){var t=this.page,e=t._window,n=t._hashbang;t.len++,m&&e.history.pushState(this.state,this.title,n&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},P.prototype.save=function(){var t=this.page;m&&"file:"!==t._window.location.protocol&&t._window.history.replaceState(this.state,this.title,t._hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},k.prototype.middleware=function(n){var r=this;return function(t,e){if(r.match(t.path,t.params))return n(t,e);e()}},k.prototype.match=function(t,e){var n=this.keys,r=t.indexOf("?"),i=~r?t.slice(0,r):t,o=this.regexp.exec(decodeURIComponent(i));if(!o)return!1;for(var a=1,s=o.length;a<s;++a){var c=n[a-1],h=this.page._decodeURLEncodedURIComponent(o[a]);void 0===h&&hasOwnProperty.call(e,c.name)||(e[c.name]=h)}return!0};var L=function t(){var e=new x;function n(){return E.apply(e,arguments)}return n.callbacks=e.callbacks,n.exits=e.exits,n.base=e.base.bind(e),n.strict=e.strict.bind(e),n.start=e.start.bind(e),n.stop=e.stop.bind(e),n.show=e.show.bind(e),n.back=e.back.bind(e),n.redirect=e.redirect.bind(e),n.replace=e.replace.bind(e),n.dispatch=e.dispatch.bind(e),n.exit=e.exit.bind(e),n.configure=e.configure.bind(e),n.sameOrigin=e.sameOrigin.bind(e),n.clickHandler=e.clickHandler.bind(e),n.create=t,Object.defineProperty(n,"len",{get:function(){return e.len},set:function(t){e.len=t}}),Object.defineProperty(n,"current",{get:function(){return e.current},set:function(t){e.current=t}}),n.Context=P,n.Route=k,n}(),R=L;E.default=L;var O=function(){return(O=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};var T={},U={},C=[],A=function(){if(C.length){var e=C.shift(),n=new XMLHttpRequest;n.open("get",e+"index.json"),n.onload=function(){var t=JSON.parse(n.responseText);U[e]=t,A()},n.send()}},N=function(){var n=10,r=function(){var t=document.documentElement.scrollTop||document.body.scrollTop,e=n?Math.floor(t/n):0;scrollTo(0,t-e),n--&&e&&requestAnimationFrame(r)};r()},j=function(t){var e,n=t.getAttribute("href");/$http/.test(n)||T[e=n]||U[e]||(T[e]=!0,1===C.push(e)&&A())},H=function(t){var e=t.currentTarget;/$http/.test(e.getAttribute("href"))||(t.preventDefault(),R(e.href),N())},S=function(t,e){var n=t.to,r=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&(n[r[i]]=t[r[i]])}return n}(t,["to"]);return i("a",O({},r,{href:n,onclick:H,oncreate:j,onupdate:j}),e)},$=function(t){return i("ul",{class:"PostTags"},t.tags.map(function(t){return i("li",{key:t,class:"PostTags-li"},i(S,{class:"PostTags-Link",to:"/tags/"+t+"/"},t)," ")}))},B="/blog",I=function(t){var e=t.post;return i("article",null,i("span",null,e.date),i("h1",{class:"PostThumb-title"},i(S,{to:B+"/"+e.slug+"/"},e.title)),i($,{tags:e.tags}))},M=function(t){return i("ul",{class:"Posts"},t.posts.map(function(t){return i("li",{key:t.slug,class:"Posts-li"},i(I,{post:t}))}))},q=function(t){var e=t.page;return i("div",{class:"PostListPager"},function(t){for(var e=new Array(t),n=0;n<t;++n)e[n]=n;return e}(t.max).map(function(t){return t+1===e?i("span",{class:"PostListPager-item"},t+1):i(S,{class:"PostListPager-item",to:t?"/p"+(t+1)+"/":"/"},t+1)}))},D=function(t){var e=t.prev,n=t.next;return i("div",{class:"PostPager"},i("div",{class:"PostPager-item"},e?i(S,{to:B+"/"+e.slug+"/"},e.title):null),i("div",{class:"PostPager-item"},i(S,{to:"/"},"HOME")),i("div",{class:"PostPager-item"},n?i(S,{to:B+"/"+n.slug+"/"},n.title):null))},V=function(t){var e=t.target;"a"!==e.tagName.toLowerCase()||/^http/.test(e.getAttribute("href"))||(t.preventDefault(),R(e.href),N())},F=[function(t){var e=t.posts,n=t.pager;return i("div",null,i(M,{posts:e}),i(q,{page:n.page,max:n.max}))},function(t){var e=t.post,n=t.prev,r=t.next;return i("div",null,i("article",null,i("span",null,e.date),i("h1",null,e.title),i($,{tags:e.tags}),i("div",{innerHTML:e.contents,oncreate:function(t){t.innerHTML=e.contents},onclick:V})),i(D,{prev:n,next:r}))},function(t){var e=t.posts,n=t.tag;return i("div",null,i("div",null,i(S,{to:"/"},"TOP")," > ",i("span",null,n)),i("p",null,"「",n,"」の検索結果"),i(M,{posts:e}))}];function K(){return function(t){return i(F[t.data.component],t.data.props)}}var X=function(){return i("header",{class:"Header"},i("h1",{class:"Header-title"},i(S,{to:"/"},"Tech SANDBOX")))},z=function(){return i("footer",{class:"Footer"},i("p",null,"Author: ",i("a",{href:"https://github.com/iMasanari"},"iMasanari")),i("small",null,i("a",{href:"https://github.com/iMasanari/imasanari.github.io/"},"> Blog Repository <")))},G=function(t,e,n,r){var i,o=[].map,a=r&&r.children[0]||null,s=a&&function e(t){return{nodeName:t.nodeName.toLowerCase(),attributes:{},children:o.call(t.childNodes,function(t){return 3===t.nodeType?t.nodeValue:e(t)})}}(a),m=[],y=!0,c=b(t),h=function t(r,i,o){for(var e in o)"function"==typeof o[e]?function(t,n){o[t]=function(t){var e=n(t);return"function"==typeof e&&(e=e(f(r,c),o)),e&&e!==(i=f(r,c))&&!e.then&&l(c=p(r,b(i,e),c)),e}}(e,o[e]):t(r.concat(e),i[e]=b(i[e]),o[e]=b(o[e]));return o}([],c,b(e));return l(),h;function w(t){return"function"==typeof t?w(t(c,h)):null!=t?t:""}function u(){i=!i;var t=w(n);for(r&&!i&&(a=function t(e,n,r,i,o){if(i===r);else if(null==r||r.nodeName!==i.nodeName){var a=function t(e,n){var r="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),i=e.attributes;if(i){i.oncreate&&m.push(function(){i.oncreate(r)});for(var o=0;o<e.children.length;o++)r.appendChild(t(e.children[o]=w(e.children[o]),n));for(var a in i)x(r,a,i[a],null,n)}return r}(i,o);e.insertBefore(a,n),null!=r&&E(e,n,r),n=a}else if(null==r.nodeName)n.nodeValue=i;else{!function(t,e,n,r){for(var i in b(e,n))n[i]!==("value"===i||"checked"===i?t[i]:e[i])&&x(t,i,n[i],e[i],r);var o=y?n.oncreate:n.onupdate;o&&m.push(function(){o(t,e)})}(n,r.attributes,i.attributes,o=o||"svg"===i.nodeName);for(var s={},c={},h=[],u=r.children,l=i.children,p=0;p<u.length;p++){h[p]=n.childNodes[p];var f=_(u[p]);null!=f&&(s[f]=[h[p],u[p]])}for(var p=0,d=0;d<l.length;){var f=_(u[p]),v=_(l[d]=w(l[d]));if(c[f])p++;else if(null==v||v!==_(u[p+1]))if(null==v||y)null==f&&(t(n,h[p],u[p],l[d],o),d++),p++;else{var g=s[v]||[];f===v?(t(n,g[0],g[1],l[d],o),p++):g[0]?t(n,n.insertBefore(g[0],h[p]),g[1],l[d],o):t(n,h[p],null,l[d],o),c[v]=l[d],d++}else null==f&&E(n,h[p],u[p]),p++}for(;p<u.length;)null==_(u[p])&&E(n,h[p],u[p]),p++;for(var p in s)c[p]||E(n,s[p][0],s[p][1])}return n}(r,a,s,s=t)),y=!1;m.length;)m.pop()()}function l(){i||(i=!0,setTimeout(u))}function b(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n}function p(t,e,n){var r={};return t.length?(r[t[0]]=1<t.length?p(t.slice(1),e,n[t[0]]):e,b(n,r)):e}function f(t,e){for(var n=0;n<t.length;)e=e[t[n++]];return e}function _(t){return t?t.key:null}function d(t){return t.currentTarget.events[t.type](t)}function x(t,e,n,r,i){if("key"===e);else if("style"===e)for(var o in b(r,n)){var a=null==n||null==n[o]?"":n[o];"-"===o[0]?t[e].setProperty(o,a):t[e][o]=a}else"o"===e[0]&&"n"===e[1]?(e=e.slice(2),t.events?r||(r=t.events[e]):t.events={},(t.events[e]=n)?r||t.addEventListener(e,d):t.removeEventListener(e,d)):e in t&&"list"!==e&&!i?t[e]=null==n?"":n:null!=n&&!1!==n&&t.setAttribute(e,n),null!=n&&!1!==n||t.removeAttribute(e)}function E(t,e,n){function r(){t.removeChild(function t(e,n){var r=n.attributes;if(r){for(var i=0;i<n.children.length;i++)t(e.childNodes[i],n.children[i]);r.ondestroy&&r.ondestroy(e)}return e}(e,n))}var i=n.attributes&&n.attributes.onremove;i?i(e,r):r()}}({data:window.__data||{}},{setData:function(t){return document.title=t.title,{data:t}}},function(){return i("div",{class:"App"},i(X,null),i("div",{class:"content"},i(K,null)),i(z,null))},document.body);R("*",function(t){!function(e,n){if(U[e])n(U[e]);else{var r=new XMLHttpRequest;r.open("get",e+"index.json"),r.onload=function(){var t=JSON.parse(r.responseText);U[e]=t,n(t)},r.send()}}(t.pathname,G.setData),t.pathname!==location.pathname&&window.gtag("config","UA-74494516-4",{page_path:t.pathname})}),R.start()}();
