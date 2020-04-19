"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function isObject(t){return"object"===_typeof(t)&&null!==t&&t.constructor&&t.constructor===Object}function assign(){for(var t=arguments[0],e=1;e<arguments.length;e++)for(var n in arguments[e])t[n]=arguments[e][n];return t}function removeCookie(t,e){cookie(t,"",isObject(e)?assign(e,{expires:-1}):{path:e,expires:-1})}function cookie(t,e,n){if(1<arguments.length&&"string"==typeof e){if(isObject(n)||(n={}),"number"==typeof n.expires){var o=new Date;o.setDate(o.getDate()+n.expires)}return document.cookie=[t+"="+e,"number"==typeof n.expires?";expires="+o:"","string"==typeof n.domain?";domain="+n.domain:"","string"==typeof n.path?";path="+n.path:""].join("")}for(var r=document.cookie.split("; "),a=0;a<r.length;a++)if(r[a].split("=")[0]===t)return r[a].split("=")[1];return""}function toUrlDataSmartisan(t,e,n){if(isObject(t)){var o="";for(var r in t)o+="&"+r+t[r];return(o=o.slice(1),"POST"===(n=n||"").toUpperCase())?o:e+="/"+o}return e}function toUrlData(t,e,n){if(isObject(t)){var o="";for(var r in t)o+="&"+r+"="+t[r];return(o=o.slice(1),"POST"===(n=n||"").toUpperCase())?o:e+="?"+o}return e}function xhrGet(t,e,n){var o=null;o="function"==typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t=toUrlData(n,t),o.open("GET",t),o.send(),o.onreadystatechange=function(){4===o.readyState&&/^2\d{2}$/.test(o.status)&&"function"==typeof e&&e(o.responseText)}}function xhrPost(t,e,n){var o=null;(o="function"==typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")).open("POST",t,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n=toUrlData(n,t,"POST"),o.send(n),o.onreadystatechange=function(){4===o.readyState&&/^2\d{2}$/.test(o.status)&&e(o.responseText)}}function ajaxsmartisan(e){if((e=assign({type:"GET",url:"",data:null,dataType:"text",status:null,success:function(){},complete:function(){},error:function(){}},e)).type=e.type.toLowerCase(),isObject(e.context)){["success","complete","error"].forEach(function(t){e[t]=e[t].bind(e.context)})}var n=null;n="function"==typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),"get"===e.type&&(e.url=toUrlDataSmartisan(e.data,e.url,e.type)),"post"===e.type&&(e.data=toUrlDataSmartisan(e.data,e.url,e.type)),n.open(e.type,e.url,!0),"post"===e.type&&n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send("get"===e.type?null:e.data),n.onreadystatechange=function(){if(4===n.readyState){if(e.complete(),/^2\d{2}$/.test(n.status))try{var t="json"===e.dataType?JSON.parse(n.responseText):n.responseText;e.success(t)}catch(t){e.error(t,n.status)}else e.error("error",n.status);isObject(e.status)&&"function"==typeof e.status[n.status]&&e.status[n.status]()}}}function ajax(e){if((e=assign({type:"GET",url:"",data:null,dataType:"text",status:null,success:function(){},complete:function(){},error:function(){}},e)).type=e.type.toLowerCase(),isObject(e.context)){["success","complete","error"].forEach(function(t){e[t]=e[t].bind(e.context)})}var n=null;n="function"==typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),"get"===e.type&&(e.url=toUrlData(e.data,e.url,e.type)),"post"===e.type&&(e.data=toUrlData(e.data,e.url,e.type)),n.open(e.type,e.url,!0),"post"===e.type&&n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send("get"===e.type?null:e.data),n.onreadystatechange=function(){if(4===n.readyState){if(e.complete(),/^2\d{2}$/.test(n.status))try{var t="json"===e.dataType?JSON.parse(n.responseText):n.responseText;e.success(t)}catch(t){e.error(t,n.status)}else e.error("error",n.status);isObject(e.status)&&"function"==typeof e.status[n.status]&&e.status[n.status]()}}}function jsonp(t,e,n,o){var r={};r[n||"callback"]="global_fn_name",o=assign(r,o=o||{}),window.global_fn_name=function(t){e(t)};var a=document.createElement("script");a.src=toUrlData(o,t),document.body.appendChild(a),a.onload=function(){a.remove()}}function _(t){var e=document.querySelectorAll(t);return null===e?e:1===e.length?e[0]:[].slice.call(e)}function removeClass(t,e){var n=new RegExp("\\s?"+e,"g");t.className=t.className.replace(n,"")}function addClass(t,e){if(new RegExp("\\s?"+e,"g").test(t.className))return!1;t.className+=" "+e}function on(s,t,u,c){if(4===arguments.length&&"string"==typeof u)return s.addEventListener(t,function(t){var e=t||event,n=e.target||e.srcElement,o=u.substr(0,1),r=null,a=u;switch(o){case".":r="className",a=u.slice(1);break;case"#":r="id",a=u.slice(1);break;default:r="nodeName"}for(;n!==s&&n;){if(n[r]===("nodeName"===r?a.toUpperCase():a)){c.call(n,e);break}n=n.parentNode}}),!1;s.addEventListener(t,u)}function throttle(e,n){n=n||100;var o=null;return function(){if("number"==typeof o)return!1;var t=arguments;o=setTimeout(function(){o=null,e.apply(!1,t)},n)}}function shaking(e,n){n=n||100;var o=null;return function(){clearTimeout(o);var t=arguments;o=setTimeout(function(){o=null,e.apply(!1,t)},n)}}
//# sourceMappingURL=utils-4a48789407.js.map
