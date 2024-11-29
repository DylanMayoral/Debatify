// animejs@3.2.2 downloaded from https://ga.jspm.io/npm:animejs@3.2.2/lib/anime.es.js

var e={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:true,timelineOffset:0};var t={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0};var r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"];var n={CSS:{},springs:{}};function minMax(e,t,r){return Math.min(Math.max(e,t),r)}function stringContains(e,t){return e.indexOf(t)>-1}function applyArguments(e,t){return e.apply(null,t)}var a={arr:function(e){return Array.isArray(e)},obj:function(e){return stringContains(Object.prototype.toString.call(e),"Object")},pth:function(e){return a.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||a.svg(e)},str:function(e){return typeof e==="string"},fnc:function(e){return typeof e==="function"},und:function(e){return typeof e==="undefined"},nil:function(e){return a.und(e)||e===null},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return a.hex(e)||a.rgb(e)||a.hsl(e)},key:function(r){return!e.hasOwnProperty(r)&&!t.hasOwnProperty(r)&&r!=="targets"&&r!=="keyframes"}};function parseEasingParameters(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map((function(e){return parseFloat(e)})):[]}function spring(e,t){var r=parseEasingParameters(e);var i=minMax(a.und(r[0])?1:r[0],.1,100);var o=minMax(a.und(r[1])?100:r[1],.1,100);var u=minMax(a.und(r[2])?10:r[2],.1,100);var s=minMax(a.und(r[3])?0:r[3],.1,100);var c=Math.sqrt(o/i);var l=u/(2*Math.sqrt(o*i));var g=l<1?c*Math.sqrt(1-l*l):0;var f=1;var v=l<1?(l*c-s)/g:-s+c;function solver(e){var r=t?t*e/1e3:e;r=l<1?Math.exp(-r*l*c)*(f*Math.cos(g*r)+v*Math.sin(g*r)):(f+v*r)*Math.exp(-r*c);return e===0||e===1?e:1-r}function getDuration(){var t=n.springs[e];if(t)return t;var r=1/6;var a=0;var i=0;while(true){a+=r;if(solver(a)===1){i++;if(i>=16)break}else i=0}var o=a*r*1e3;n.springs[e]=o;return o}return t?solver:getDuration}function steps(e){e===void 0&&(e=10);return function(t){return Math.ceil(minMax(t,1e-6,1)*e)*(1/e)}}var i=function(){var e=11;var t=1/(e-1);function A(e,t){return 1-3*t+3*e}function B(e,t){return 3*t-6*e}function C(e){return 3*e}function calcBezier(e,t,r){return((A(t,r)*e+B(t,r))*e+C(t))*e}function getSlope(e,t,r){return 3*A(t,r)*e*e+2*B(t,r)*e+C(t)}function binarySubdivide(e,t,r,n,a){var i,o,u=0;do{o=t+(r-t)/2;i=calcBezier(o,n,a)-e;i>0?r=o:t=o}while(Math.abs(i)>1e-7&&++u<10);return o}function newtonRaphsonIterate(e,t,r,n){for(var a=0;a<4;++a){var i=getSlope(t,r,n);if(i===0)return t;var o=calcBezier(t,r,n)-e;t-=o/i}return t}function bezier(r,n,a,i){if(0<=r&&r<=1&&0<=a&&a<=1){var o=new Float32Array(e);if(r!==n||a!==i)for(var u=0;u<e;++u)o[u]=calcBezier(u*t,r,a);return function(e){return r===n&&a===i||e===0||e===1?e:calcBezier(getTForX(e),n,i)}}function getTForX(n){var i=0;var u=1;var s=e-1;for(;u!==s&&o[u]<=n;++u)i+=t;--u;var c=(n-o[u])/(o[u+1]-o[u]);var l=i+c*t;var g=getSlope(l,r,a);return g>=.001?newtonRaphsonIterate(n,l,r,a):g===0?l:binarySubdivide(n,i,i+t,r,a)}}return bezier}();var o=function(){var e={linear:function(){return function(e){return e}}};var t={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Expo:function(){return function(e){return e?Math.pow(2,10*e-10):0}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){var t,r=4;while(e<((t=Math.pow(2,--r))-1)/11);return 1/Math.pow(4,3-r)-7.5625*Math.pow((t*3-2)/22-e,2)}},Elastic:function(e,t){e===void 0&&(e=1);t===void 0&&(t=.5);var r=minMax(e,1,10);var n=minMax(t,.1,2);return function(e){return e===0||e===1?e:-r*Math.pow(2,10*(e-1))*Math.sin((e-1-n/(Math.PI*2)*Math.asin(1/r))*(Math.PI*2)/n)}}};var r=["Quad","Cubic","Quart","Quint"];r.forEach((function(e,r){t[e]=function(){return function(e){return Math.pow(e,r+2)}}}));Object.keys(t).forEach((function(r){var n=t[r];e["easeIn"+r]=n;e["easeOut"+r]=function(e,t){return function(r){return 1-n(e,t)(1-r)}};e["easeInOut"+r]=function(e,t){return function(r){return r<.5?n(e,t)(r*2)/2:1-n(e,t)(r*-2+2)/2}};e["easeOutIn"+r]=function(e,t){return function(r){return r<.5?(1-n(e,t)(1-r*2))/2:(n(e,t)(r*2-1)+1)/2}}}));return e}();function parseEasings(e,t){if(a.fnc(e))return e;var r=e.split("(")[0];var n=o[r];var u=parseEasingParameters(e);switch(r){case"spring":return spring(e,t);case"cubicBezier":return applyArguments(i,u);case"steps":return applyArguments(steps,u);default:return applyArguments(n,u)}}function selectString(e){try{var t=document.querySelectorAll(e);return t}catch(e){return}}function filterArray(e,t){var r=e.length;var n=arguments.length>=2?arguments[1]:void 0;var a=[];for(var i=0;i<r;i++)if(i in e){var o=e[i];t.call(n,o,i,e)&&a.push(o)}return a}function flattenArray(e){return e.reduce((function(e,t){return e.concat(a.arr(t)?flattenArray(t):t)}),[])}function toArray(e){if(a.arr(e))return e;a.str(e)&&(e=selectString(e)||e);return e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e]}function arrayContains(e,t){return e.some((function(e){return e===t}))}function cloneObject(e){var t={};for(var r in e)t[r]=e[r];return t}function replaceObjectProps(e,t){var r=cloneObject(e);for(var n in e)r[n]=t.hasOwnProperty(n)?t[n]:e[n];return r}function mergeObjects(e,t){var r=cloneObject(e);for(var n in t)r[n]=a.und(e[n])?t[n]:e[n];return r}function rgbToRgba(e){var t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return t?"rgba("+t[1]+",1)":e}function hexToRgba(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;var r=e.replace(t,(function(e,t,r,n){return t+t+r+r+n+n}));var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);var a=parseInt(n[1],16);var i=parseInt(n[2],16);var o=parseInt(n[3],16);return"rgba("+a+","+i+","+o+",1)"}function hslToRgba(e){var t=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e);var r=parseInt(t[1],10)/360;var n=parseInt(t[2],10)/100;var a=parseInt(t[3],10)/100;var i=t[4]||1;function hue2rgb(e,t,r){r<0&&(r+=1);r>1&&(r-=1);return r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}var o,u,s;if(n==0)o=u=s=a;else{var c=a<.5?a*(1+n):a+n-a*n;var l=2*a-c;o=hue2rgb(l,c,r+1/3);u=hue2rgb(l,c,r);s=hue2rgb(l,c,r-1/3)}return"rgba("+o*255+","+u*255+","+s*255+","+i+")"}function colorToRgb(e){return a.rgb(e)?rgbToRgba(e):a.hex(e)?hexToRgba(e):a.hsl(e)?hslToRgba(e):void 0}function getUnit(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function getTransformUnit(e){return stringContains(e,"translate")||e==="perspective"?"px":stringContains(e,"rotate")||stringContains(e,"skew")?"deg":void 0}function getFunctionValue(e,t){return a.fnc(e)?e(t.target,t.id,t.total):e}function getAttribute(e,t){return e.getAttribute(t)}function convertPxToUnit(e,t,r){var i=getUnit(t);if(arrayContains([r,"deg","rad","turn"],i))return t;var o=n.CSS[t+r];if(!a.und(o))return o;var u=100;var s=document.createElement(e.tagName);var c=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;c.appendChild(s);s.style.position="absolute";s.style.width=u+r;var l=u/s.offsetWidth;c.removeChild(s);var g=l*parseFloat(t);n.CSS[t+r]=g;return g}function getCSSValue(e,t,r){if(t in e.style){var n=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();var a=e.style[t]||getComputedStyle(e).getPropertyValue(n)||"0";return r?convertPxToUnit(e,a,r):a}}function getAnimationType(e,t){return a.dom(e)&&!a.inp(e)&&(!a.nil(getAttribute(e,t))||a.svg(e)&&e[t])?"attribute":a.dom(e)&&arrayContains(r,t)?"transform":a.dom(e)&&t!=="transform"&&getCSSValue(e,t)?"css":e[t]!=null?"object":void 0}function getElementTransforms(e){if(a.dom(e)){var t=e.style.transform||"";var r=/(\w+)\(([^)]*)\)/g;var n=new Map;var i;while(i=r.exec(t))n.set(i[1],i[2]);return n}}function getTransformValue(e,t,r,n){var a=stringContains(t,"scale")?1:0+getTransformUnit(t);var i=getElementTransforms(e).get(t)||a;if(r){r.transforms.list.set(t,i);r.transforms.last=t}return n?convertPxToUnit(e,i,n):i}function getOriginalTargetValue(e,t,r,n){switch(getAnimationType(e,t)){case"transform":return getTransformValue(e,t,n,r);case"css":return getCSSValue(e,t,r);case"attribute":return getAttribute(e,t);default:return e[t]||0}}function getRelativeValue(e,t){var r=/^(\*=|\+=|-=)/.exec(e);if(!r)return e;var n=getUnit(e)||0;var a=parseFloat(t);var i=parseFloat(e.replace(r[0],""));switch(r[0][0]){case"+":return a+i+n;case"-":return a-i+n;case"*":return a*i+n}}function validateValue(e,t){if(a.col(e))return colorToRgb(e);if(/\s/g.test(e))return e;var r=getUnit(e);var n=r?e.substr(0,e.length-r.length):e;return t?n+t:n}function getDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function getCircleLength(e){return Math.PI*2*getAttribute(e,"r")}function getRectLength(e){return getAttribute(e,"width")*2+getAttribute(e,"height")*2}function getLineLength(e){return getDistance({x:getAttribute(e,"x1"),y:getAttribute(e,"y1")},{x:getAttribute(e,"x2"),y:getAttribute(e,"y2")})}function getPolylineLength(e){var t=e.points;var r=0;var n;for(var a=0;a<t.numberOfItems;a++){var i=t.getItem(a);a>0&&(r+=getDistance(n,i));n=i}return r}function getPolygonLength(e){var t=e.points;return getPolylineLength(e)+getDistance(t.getItem(t.numberOfItems-1),t.getItem(0))}function getTotalLength(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return getCircleLength(e);case"rect":return getRectLength(e);case"line":return getLineLength(e);case"polyline":return getPolylineLength(e);case"polygon":return getPolygonLength(e)}}function setDashoffset(e){var t=getTotalLength(e);e.setAttribute("stroke-dasharray",t);return t}function getParentSvgEl(e){var t=e.parentNode;while(a.svg(t)){if(!a.svg(t.parentNode))break;t=t.parentNode}return t}function getParentSvg(e,t){var r=t||{};var n=r.el||getParentSvgEl(e);var a=n.getBoundingClientRect();var i=getAttribute(n,"viewBox");var o=a.width;var u=a.height;var s=r.viewBox||(i?i.split(" "):[0,0,o,u]);return{el:n,viewBox:s,x:s[0]/1,y:s[1]/1,w:o,h:u,vW:s[2],vH:s[3]}}function getPath(e,t){var r=a.str(e)?selectString(e)[0]:e;var n=t||100;return function(e){return{property:e,el:r,svg:getParentSvg(r),totalLength:getTotalLength(r)*(n/100)}}}function getPathProgress(e,t,r){function point(r){r===void 0&&(r=0);var n=t+r>=1?t+r:0;return e.el.getPointAtLength(n)}var n=getParentSvg(e.el,e.svg);var a=point();var i=point(-1);var o=point(1);var u=r?1:n.w/n.vW;var s=r?1:n.h/n.vH;switch(e.property){case"x":return(a.x-n.x)*u;case"y":return(a.y-n.y)*s;case"angle":return Math.atan2(o.y-i.y,o.x-i.x)*180/Math.PI}}function decomposeValue(e,t){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;var n=validateValue(a.pth(e)?e.totalLength:e,t)+"";return{original:n,numbers:n.match(r)?n.match(r).map(Number):[0],strings:a.str(e)||t?n.split(r):[]}}function parseTargets(e){var t=e?flattenArray(a.arr(e)?e.map(toArray):toArray(e)):[];return filterArray(t,(function(e,t,r){return r.indexOf(e)===t}))}function getAnimatables(e){var t=parseTargets(e);return t.map((function(e,r){return{target:e,id:r,total:t.length,transforms:{list:getElementTransforms(e)}}}))}function normalizePropertyTweens(e,t){var r=cloneObject(t);/^spring/.test(r.easing)&&(r.duration=spring(r.easing));if(a.arr(e)){var n=e.length;var i=n===2&&!a.obj(e[0]);i?e={value:e}:a.fnc(t.duration)||(r.duration=t.duration/n)}var o=a.arr(e)?e:[e];return o.map((function(e,r){var n=a.obj(e)&&!a.pth(e)?e:{value:e};a.und(n.delay)&&(n.delay=r?0:t.delay);a.und(n.endDelay)&&(n.endDelay=r===o.length-1?t.endDelay:0);return n})).map((function(e){return mergeObjects(e,r)}))}function flattenKeyframes(e){var t=filterArray(flattenArray(e.map((function(e){return Object.keys(e)}))),(function(e){return a.key(e)})).reduce((function(e,t){e.indexOf(t)<0&&e.push(t);return e}),[]);var r={};var loop=function(n){var i=t[n];r[i]=e.map((function(e){var t={};for(var r in e)a.key(r)?r==i&&(t.value=e[r]):t[r]=e[r];return t}))};for(var n=0;n<t.length;n++)loop(n);return r}function getProperties(e,t){var r=[];var n=t.keyframes;n&&(t=mergeObjects(flattenKeyframes(n),t));for(var i in t)a.key(i)&&r.push({name:i,tweens:normalizePropertyTweens(t[i],e)});return r}function normalizeTweenValues(e,t){var r={};for(var n in e){var i=getFunctionValue(e[n],t);if(a.arr(i)){i=i.map((function(e){return getFunctionValue(e,t)}));i.length===1&&(i=i[0])}r[n]=i}r.duration=parseFloat(r.duration);r.delay=parseFloat(r.delay);return r}function normalizeTweens(e,t){var r;return e.tweens.map((function(n){var i=normalizeTweenValues(n,t);var o=i.value;var u=a.arr(o)?o[1]:o;var s=getUnit(u);var c=getOriginalTargetValue(t.target,e.name,s,t);var l=r?r.to.original:c;var g=a.arr(o)?o[0]:l;var f=getUnit(g)||getUnit(c);var v=s||f;a.und(u)&&(u=l);i.from=decomposeValue(g,v);i.to=decomposeValue(getRelativeValue(u,g),v);i.start=r?r.end:0;i.end=i.start+i.delay+i.duration+i.endDelay;i.easing=parseEasings(i.easing,i.duration);i.isPath=a.pth(o);i.isPathTargetInsideSVG=i.isPath&&a.svg(t.target);i.isColor=a.col(i.from.original);i.isColor&&(i.round=1);r=i;return i}))}var u={css:function(e,t,r){return e.style[t]=r},attribute:function(e,t,r){return e.setAttribute(t,r)},object:function(e,t,r){return e[t]=r},transform:function(e,t,r,n,a){n.list.set(t,r);if(t===n.last||a){var i="";n.list.forEach((function(e,t){i+=t+"("+e+") "}));e.style.transform=i}}};function setTargetsValue(e,t){var r=getAnimatables(e);r.forEach((function(e){for(var r in t){var n=getFunctionValue(t[r],e);var a=e.target;var i=getUnit(n);var o=getOriginalTargetValue(a,r,i,e);var s=i||getUnit(o);var c=getRelativeValue(validateValue(n,s),o);var l=getAnimationType(a,r);u[l](a,r,c,e.transforms,true)}}))}function createAnimation(e,t){var r=getAnimationType(e.target,t.name);if(r){var n=normalizeTweens(t,e);var a=n[n.length-1];return{type:r,property:t.name,animatable:e,tweens:n,duration:a.end,delay:n[0].delay,endDelay:a.endDelay}}}function getAnimations(e,t){return filterArray(flattenArray(e.map((function(e){return t.map((function(t){return createAnimation(e,t)}))}))),(function(e){return!a.und(e)}))}function getInstanceTimings(e,t){var r=e.length;var getTlOffset=function(e){return e.timelineOffset?e.timelineOffset:0};var n={};n.duration=r?Math.max.apply(Math,e.map((function(e){return getTlOffset(e)+e.duration}))):t.duration;n.delay=r?Math.min.apply(Math,e.map((function(e){return getTlOffset(e)+e.delay}))):t.delay;n.endDelay=r?n.duration-Math.max.apply(Math,e.map((function(e){return getTlOffset(e)+e.duration-e.endDelay}))):t.endDelay;return n}var s=0;function createNewInstance(r){var n=replaceObjectProps(e,r);var a=replaceObjectProps(t,r);var i=getProperties(a,r);var o=getAnimatables(r.targets);var u=getAnimations(o,i);var c=getInstanceTimings(u,a);var l=s;s++;return mergeObjects(n,{id:l,children:[],animatables:o,animations:u,duration:c.duration,delay:c.delay,endDelay:c.endDelay})}var c=[];var l=function(){var e;function play(){e||isDocumentHidden()&&anime.suspendWhenDocumentHidden||!(c.length>0)||(e=requestAnimationFrame(step))}function step(t){var r=c.length;var n=0;while(n<r){var a=c[n];if(a.paused){c.splice(n,1);r--}else{a.tick(t);n++}}e=n>0?requestAnimationFrame(step):void 0}function handleVisibilityChange(){if(anime.suspendWhenDocumentHidden)if(isDocumentHidden())e=cancelAnimationFrame(e);else{c.forEach((function(e){return e._onDocumentVisibility()}));l()}}typeof document!=="undefined"&&document.addEventListener("visibilitychange",handleVisibilityChange);return play}();function isDocumentHidden(){return!!document&&document.hidden}function anime(e){e===void 0&&(e={});var t=0,r=0,n=0;var a,i=0;var o=null;function makePromise(e){var t=window.Promise&&new Promise((function(e){return o=e}));e.finished=t;return t}var s=createNewInstance(e);makePromise(s);function toggleInstanceDirection(){var e=s.direction;e!=="alternate"&&(s.direction=e!=="normal"?"normal":"reverse");s.reversed=!s.reversed;a.forEach((function(e){return e.reversed=s.reversed}))}function adjustTime(e){return s.reversed?s.duration-e:e}function resetTime(){t=0;r=adjustTime(s.currentTime)*(1/anime.speed)}function seekChild(e,t){t&&t.seek(e-t.timelineOffset)}function syncInstanceChildren(e){if(s.reversePlayback)for(var t=i;t--;)seekChild(e,a[t]);else for(var r=0;r<i;r++)seekChild(e,a[r])}function setAnimationsProgress(e){var t=0;var r=s.animations;var n=r.length;while(t<n){var a=r[t];var i=a.animatable;var o=a.tweens;var c=o.length-1;var l=o[c];c&&(l=filterArray(o,(function(t){return e<t.end}))[0]||l);var g=minMax(e-l.start-l.delay,0,l.duration)/l.duration;var f=isNaN(g)?1:l.easing(g);var v=l.to.strings;var m=l.round;var d=[];var p=l.to.numbers.length;var h=void 0;for(var y=0;y<p;y++){var b=void 0;var T=l.to.numbers[y];var P=l.from.numbers[y]||0;b=l.isPath?getPathProgress(l.value,f*T,l.isPathTargetInsideSVG):P+f*(T-P);m&&(l.isColor&&y>2||(b=Math.round(b*m)/m));d.push(b)}var x=v.length;if(x){h=v[0];for(var w=0;w<x;w++){v[w];var M=v[w+1];var I=d[w];isNaN(I)||(h+=M?I+M:I+" ")}}else h=d[0];u[a.type](i.target,a.property,h,i.transforms);a.currentValue=h;t++}}function setCallback(e){s[e]&&!s.passThrough&&s[e](s)}function countIteration(){s.remaining&&s.remaining!==true&&s.remaining--}function setInstanceProgress(e){var i=s.duration;var u=s.delay;var c=i-s.endDelay;var l=adjustTime(e);s.progress=minMax(l/i*100,0,100);s.reversePlayback=l<s.currentTime;a&&syncInstanceChildren(l);if(!s.began&&s.currentTime>0){s.began=true;setCallback("begin")}if(!s.loopBegan&&s.currentTime>0){s.loopBegan=true;setCallback("loopBegin")}l<=u&&s.currentTime!==0&&setAnimationsProgress(0);(l>=c&&s.currentTime!==i||!i)&&setAnimationsProgress(i);if(l>u&&l<c){if(!s.changeBegan){s.changeBegan=true;s.changeCompleted=false;setCallback("changeBegin")}setCallback("change");setAnimationsProgress(l)}else if(s.changeBegan){s.changeCompleted=true;s.changeBegan=false;setCallback("changeComplete")}s.currentTime=minMax(l,0,i);s.began&&setCallback("update");if(e>=i){r=0;countIteration();if(s.remaining){t=n;setCallback("loopComplete");s.loopBegan=false;s.direction==="alternate"&&toggleInstanceDirection()}else{s.paused=true;if(!s.completed){s.completed=true;setCallback("loopComplete");setCallback("complete");if(!s.passThrough&&"Promise"in window){o();makePromise(s)}}}}}s.reset=function(){var e=s.direction;s.passThrough=false;s.currentTime=0;s.progress=0;s.paused=true;s.began=false;s.loopBegan=false;s.changeBegan=false;s.completed=false;s.changeCompleted=false;s.reversePlayback=false;s.reversed=e==="reverse";s.remaining=s.loop;a=s.children;i=a.length;for(var t=i;t--;)s.children[t].reset();(s.reversed&&s.loop!==true||e==="alternate"&&s.loop===1)&&s.remaining++;setAnimationsProgress(s.reversed?s.duration:0)};s._onDocumentVisibility=resetTime;s.set=function(e,t){setTargetsValue(e,t);return s};s.tick=function(e){n=e;t||(t=n);setInstanceProgress((n+(r-t))*anime.speed)};s.seek=function(e){setInstanceProgress(adjustTime(e))};s.pause=function(){s.paused=true;resetTime()};s.play=function(){if(s.paused){s.completed&&s.reset();s.paused=false;c.push(s);resetTime();l()}};s.reverse=function(){toggleInstanceDirection();s.completed=!s.reversed;resetTime()};s.restart=function(){s.reset();s.play()};s.remove=function(e){var t=parseTargets(e);removeTargetsFromInstance(t,s)};s.reset();s.autoplay&&s.play();return s}function removeTargetsFromAnimations(e,t){for(var r=t.length;r--;)arrayContains(e,t[r].animatable.target)&&t.splice(r,1)}function removeTargetsFromInstance(e,t){var r=t.animations;var n=t.children;removeTargetsFromAnimations(e,r);for(var a=n.length;a--;){var i=n[a];var o=i.animations;removeTargetsFromAnimations(e,o);o.length||i.children.length||n.splice(a,1)}r.length||n.length||t.pause()}function removeTargetsFromActiveInstances(e){var t=parseTargets(e);for(var r=c.length;r--;){var n=c[r];removeTargetsFromInstance(t,n)}}function stagger(e,t){t===void 0&&(t={});var r=t.direction||"normal";var n=t.easing?parseEasings(t.easing):null;var i=t.grid;var o=t.axis;var u=t.from||0;var s=u==="first";var c=u==="center";var l=u==="last";var g=a.arr(e);var f=g?parseFloat(e[0]):parseFloat(e);var v=g?parseFloat(e[1]):0;var m=getUnit(g?e[1]:e)||0;var d=t.start||0+(g?f:0);var p=[];var h=0;return function(e,t,a){s&&(u=0);c&&(u=(a-1)/2);l&&(u=a-1);if(!p.length){for(var y=0;y<a;y++){if(i){var b=c?(i[0]-1)/2:u%i[0];var T=c?(i[1]-1)/2:Math.floor(u/i[0]);var P=y%i[0];var x=Math.floor(y/i[0]);var w=b-P;var M=T-x;var I=Math.sqrt(w*w+M*M);o==="x"&&(I=-w);o==="y"&&(I=-M);p.push(I)}else p.push(Math.abs(u-y));h=Math.max.apply(Math,p)}n&&(p=p.map((function(e){return n(e/h)*h})));r==="reverse"&&(p=p.map((function(e){return o?e<0?e*-1:-e:Math.abs(h-e)})))}var k=g?(v-f)/h:f;return d+k*(Math.round(p[t]*100)/100)+m}}function timeline(e){e===void 0&&(e={});var r=anime(e);r.duration=0;r.add=function(n,i){var o=c.indexOf(r);var u=r.children;o>-1&&c.splice(o,1);function passThrough(e){e.passThrough=true}for(var s=0;s<u.length;s++)passThrough(u[s]);var l=mergeObjects(n,replaceObjectProps(t,e));l.targets=l.targets||e.targets;var g=r.duration;l.autoplay=false;l.direction=r.direction;l.timelineOffset=a.und(i)?g:getRelativeValue(i,g);passThrough(r);r.seek(l.timelineOffset);var f=anime(l);passThrough(f);u.push(f);var v=getInstanceTimings(u,e);r.delay=v.delay;r.endDelay=v.endDelay;r.duration=v.duration;r.seek(0);r.reset();r.autoplay&&r.play();return r};return r}anime.version="3.2.1";anime.speed=1;anime.suspendWhenDocumentHidden=true;anime.running=c;anime.remove=removeTargetsFromActiveInstances;anime.get=getOriginalTargetValue;anime.set=setTargetsValue;anime.convertPx=convertPxToUnit;anime.path=getPath;anime.setDashoffset=setDashoffset;anime.stagger=stagger;anime.timeline=timeline;anime.easing=parseEasings;anime.penner=o;anime.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};export{anime as default};
