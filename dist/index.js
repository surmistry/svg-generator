module.exports=function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){const o=r(2);t.exports={hexagon:o}},function(t,e,r){const o=r(3),n={width:10,height:10};getTemplateHead=(t,e=n)=>{const r=Math.sqrt(3)/2,{width:o,height:i}=e,s=.01*t,l=s+t*r/2,f=s+3/4*t,u=1/4*t-s,c=s+t*r,a=0-s;return`<svg viewBox="0 0 ${o} ${i}" xmlns="http://www.w3.org/2000/svg" version="1.1"  xmlns:xlink="http://www.w3.org/1999/xlink">\n  <defs><symbol id="h"><polygon points="${t}, ${l} ${f}, ${s+t*r} ${u}, ${c} ${a}, ${s+t*r/2} ${1/4*t}, 0 ${3*t/4}, 0"/></symbol>\n  <symbol id="hH"><polygon points="${t}, 0 ${f}, ${l} ${u}, ${c/2} ${a}, 0"/></symbol></defs>`};const i=({x:t,y:e},r)=>`  <use href="#hH" x="${t}" y="${e}" style="fill: ${r}"/>`,s=({x:t,y:e},r)=>`  <use href="#h" x="${t}" y="${e}" style="fill: ${r}"/>`,l={r:250,g:100,b:0},f={r:53,g:3,b:252};t.exports=({colors:{start:t,end:e},noise:r=15,shapeSize:n=2,width:u=100,height:c=80})=>{const a=t?o.convertHexToRgb(t):l,h=e?o.convertHexToRgb(e):f;let p=getTemplateHead(n,{width:u,height:c}),g=0;const d=n*Math.sqrt(3)/4,y=3*n/2,b=o.createColorMatrix(a,h,n,r,[u,c]),x=b[0].length,$=b.length;for(let t=0;t<c;t+=d){let e=0;if(0===t){for(let r=0;r<u;r+=y){const o=e>=x?x-1:e;p+=i({x:r,y:t},b[g>=$?$-1:g][o]),e++}g++,e=0}for(let r=g%2?-3/4*n:0;r<u;r+=y){const o=e>=x?x-1:e;p+=s({x:r,y:t},b[g>=$?$-1:g][o]),e++}g++}return p+"</svg>"}},function(t,e,r){const o=r(4),n=r(5),i=(t,e)=>{for(let r in t)t[r]+=e[r];return t},s=[...Array(10)].map((t,e)=>""+e).concat(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]),l=(t,e,r=16)=>{const o=Math.floor(t/r),n=e>0?Math.floor(((t,e=15)=>{const r=Math.random()*e+t;return r<255?r<0?0:r:255})(t,e)%r):Math.floor(t%r);return`${s[o]}${s[n]}`},f=["r","g","b"],u=(t,e,r=f)=>{let o="#";for(let n of r)o+=l(t[n],e);return o},c="horizontal",a=(t,e)=>t.indexOf(e)>=0,h=["noise","width","height","size"],p=["start","end","output"];t.exports={validateInputs:(t,e=h,r=p)=>{for(let[o,n]of Object.entries(t))if(a(e,o)){if("number"!=typeof n)throw new Error(`${o} requires a number,\nthis is incorrect ${n}`)}else if(a(r,o)&&"string"!=typeof n)throw new Error(`${o} requires a string,\nthis is incorrect ${n}`)},createColorMatrix:(t,e,r,o,n=[100,100],s=c)=>{const l=r/(2*Math.sqrt(3)),f=r,a=Math.floor(n[0]/f);return(({height:t,width:e},r,o,n)=>{const s=((t,e,r)=>{let o={};for(let n in e)o[n]=(r[n]-e[n])/t;return o})(t*e,r,o);let l=[...Array(t)].map(t=>[]),f=r;for(let r=0;r<t;r++){let o=0;for(let t=r;t>=0&&(l[t][o]=u(f,n),f=i(f,s),o++,!(o>=e));t--);if(r===t-1)for(o=1;o<e;o++){let r=o;for(let o=t-1;o>=0&&r<e;o--)l[o][r]=u(f,n),f=i(f,s),r++}}return l})({height:Math.floor(n[1]/l),width:a},t,e,o)},writeFile:(t,e)=>{o.writeFileSync(n.resolve(t),e),console.log("Successfully wrote to file: ",t)},convertHexToRgb:t=>{let e={};if("string"==typeof t){const r=t.replace("#","");e.r=parseInt(r.substring(0,2),16),e.g=parseInt(r.substring(2,4),16),e.b=parseInt(r.substring(4,6),16)}else e=t;return e}}},function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")}]);