!function e(t,n,o){function r(u,a){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var p=n[u]={exports:{}};t[u][0].call(p.exports,function(e){var n=t[u][1][e];return r(n?n:e)},p,p.exports,e,t,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(e){(function(t){"use strict";var n=e("../core"),o=e("../patch/browser");t.Zone&&console.warn("Zone already exported on window the object!"),t.Zone=n.Zone,t.zone=new t.Zone,o.apply()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../core":2,"../patch/browser":3}],2:[function(e,t){(function(n){"use strict";function o(e,t){var n=arguments.length?Object.create(e):this;return n.parent=e||null,Object.keys(t||{}).forEach(function(o){var r=o.substr(1);"$"===o[0]?n[r]=t[o](e[r]||function(){}):"+"===o[0]?n[r]=e[r]?function(){var n=e[r].apply(this,arguments);return t[o].apply(this,arguments),n}:t[o]:"-"===o[0]?n[r]=e[r]?function(){return t[o].apply(this,arguments),e[r].apply(this,arguments)}:t[o]:n[o]="object"==typeof t[o]?JSON.parse(JSON.stringify(t[o])):t[o]}),n.$id=o.nextId++,n}o.prototype={constructor:o,fork:function(e){return this.onZoneCreated(),new o(this,e)},bind:function(e,t){t||this.enqueueTask(e);var n=this.isRootZone()?this:this.fork();return function(){return n.run(e,this,arguments)}},bindOnce:function(e){var t=this;return this.bind(function(){var n=e.apply(this,arguments);return t.dequeueTask(e),n})},isRootZone:function(){return null===this.parent},run:function(e,t,o){o=o||[];var r=n.zone;n.zone=this;try{return this.beforeTask(),e.apply(t,o)}catch(i){if(!this.onError)throw i;this.onError(i)}finally{this.afterTask(),n.zone=r}},onError:null,beforeTask:function(){},onZoneCreated:function(){},afterTask:function(){},enqueueTask:function(){},dequeueTask:function(){}},o.nextId=1,o.bindPromiseFn=e("./patch/promise").bindPromiseFn,t.exports={Zone:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./patch/promise":9}],3:[function(e,t){(function(n){"use strict";function o(){r.patchSetClearFunction(n,["timeout","interval","immediate"]),r.patchSetFunction(n,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame"]),r.patchFunction(n,["alert","prompt"]),c.apply(),p.apply(),i.apply(),u.patchClass("MutationObserver"),u.patchClass("WebKitMutationObserver"),a.apply(),s.apply(),f.apply()}var r=e("./functions"),i=e("./promise"),u=e("./mutation-observer"),a=e("./define-property"),s=e("./register-element"),c=(e("./websocket"),e("./event-target")),p=e("./property-descriptor"),f=e("./geolocation");t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./define-property":4,"./event-target":5,"./functions":6,"./geolocation":7,"./mutation-observer":8,"./promise":9,"./property-descriptor":10,"./register-element":11,"./websocket":12}],4:[function(e,t){"use strict";function n(){Object.defineProperty=function(e,t,n){if(r(e,t))throw new TypeError("Cannot assign to read only property '"+t+"' of "+e);return"prototype"!==t&&(n=i(e,t,n)),u(e,t,n)},Object.defineProperties=function(e,t){return Object.keys(t).forEach(function(n){Object.defineProperty(e,n,t[n])}),e},Object.create=function(e,t){return"object"==typeof t&&Object.keys(t).forEach(function(n){t[n]=i(e,n,t[n])}),s(e,t)},Object.getOwnPropertyDescriptor=function(e,t){var n=a(e,t);return r(e,t)&&(n.configurable=!1),n}}function o(e,t,n){return n=i(e,t,n),u(e,t,n)}function r(e,t){return e&&e.__unconfigurables&&e.__unconfigurables[t]}function i(e,t,n){return n.configurable=!0,n.configurable||(e.__unconfigurables||u(e,"__unconfigurables",{writable:!0,value:{}}),e.__unconfigurables[t]=!0),n}var u=Object.defineProperty,a=Object.getOwnPropertyDescriptor,s=Object.create;t.exports={apply:n,_redefineProperty:o}},{}],5:[function(e,t){(function(n){"use strict";function o(){if(n.EventTarget)r.patchEventTargetMethods(n.EventTarget.prototype);else{var e=["ApplicationCache","EventSource","FileReader","InputMethodContext","MediaController","MessagePort","Node","Performance","SVGElementInstance","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebKitNamedFlow","Window","Worker","WorkerGlobalScope","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];e.forEach(function(e){n[e]&&r.patchEventTargetMethods(n[e].prototype)})}}var r=e("../utils");t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13}],6:[function(e,t){(function(n){"use strict";function o(e,t){t.map(function(e){return e[0].toUpperCase()+e.substr(1)}).forEach(function(t){var o="set"+t,r=e[o];if(r){var i="clear"+t,a={},s="setInterval"===o?u.bindArguments:u.bindArgumentsOnce;n.zone[o]=function(t){var n,o=t;arguments[0]=function(){return delete a[n],o.apply(this,arguments)};var i=s(arguments);return n=r.apply(e,i),a[n]=!0,n},e[o]=function(){return n.zone[o].apply(this,arguments)};var c=e[i];n.zone[i]=function(e){return a[e]&&(delete a[e],n.zone.dequeueTask()),c.apply(this,arguments)},e[i]=function(){return n.zone[i].apply(this,arguments)}}})}function r(e,t){t.forEach(function(t){var o=e[t];o&&(n.zone[t]=function(t){var n=t;arguments[0]=function(){return n.apply(this,arguments)};var r=u.bindArgumentsOnce(arguments);return o.apply(e,r)},e[t]=function(){return zone[t].apply(this,arguments)})})}function i(e,t){t.forEach(function(t){var o=e[t];n.zone[t]=function(){return o.apply(e,arguments)},e[t]=function(){return n.zone[t].apply(this,arguments)}})}var u=e("../utils");t.exports={patchSetClearFunction:o,patchSetFunction:r,patchFunction:i}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13}],7:[function(e,t){(function(n){"use strict";function o(){n.navigator&&n.navigator.geolocation&&r.patchPrototype(n.navigator.geolocation,["getCurrentPosition","watchPosition"])}var r=e("../utils");t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13}],8:[function(e,t){(function(e){"use strict";function n(t){var n=e[t];if(n){e[t]=function(t){this._o=new n(e.zone.bind(t,!0)),this._creationZone=e.zone};var o=new n(function(){});e[t].prototype.disconnect=function(){var e=this._o.disconnect.apply(this._o,arguments);return this._active&&(this._creationZone.dequeueTask(),this._active=!1),e},e[t].prototype.observe=function(){return this._active||(this._creationZone.enqueueTask(),this._active=!0),this._o.observe.apply(this._o,arguments)};var r;for(r in o)!function(n){void 0===typeof e[t].prototype&&("function"==typeof o[n]?e[t].prototype[n]=function(){return this._o[n].apply(this._o,arguments)}:Object.defineProperty(e[t].prototype,n,{set:function(t){this._o[n]="function"==typeof t?e.zone.bind(t):t},get:function(){return this._o[n]}}))}(r)}}t.exports={patchClass:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(e,t){(function(n){"use strict";function o(e,t){var o=n,r=e.every(function(e){return o=o[e]});r&&t.forEach(function(e){var t=o[e];t&&(o[e]=u(t))})}function r(e){var t=e.then;e.then=function(){var n=a.bindArguments(arguments),o=t.apply(e,n);return r(o)};var n=e["catch"];return e["catch"]=function(){var t=a.bindArguments(arguments),o=n.apply(e,t);return r(o)},e}function i(){if(n.Promise){a.patchPrototype(Promise.prototype,["then","catch"]);var e=[[[],["fetch"]],[["Response","prototype"],["arrayBuffer","blob","json","text"]]];e.forEach(function(e){o(e[0],e[1])})}}var u,a=e("../utils");u=n.Promise?function(e){return function(){var t=e.apply(this,arguments);return t instanceof Promise?t:new Promise(function(e,n){t.then(e,n)})}}:function(e){return function(){return r(e.apply(this,arguments))}},t.exports={apply:i,bindPromiseFn:u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13}],10:[function(e,t){(function(n){"use strict";function o(){if(r()){var e=s.map(function(e){return"on"+e});a.patchProperties(HTMLElement.prototype,e),a.patchProperties(XMLHttpRequest.prototype),"undefined"!=typeof WebSocket&&a.patchProperties(WebSocket.prototype)}else i(),a.patchClass("XMLHttpRequest"),u.apply()}function r(){if(!Object.getOwnPropertyDescriptor(HTMLElement.prototype,"onclick")&&"undefined"!=typeof Element){var e=Object.getOwnPropertyDescriptor(Element.prototype,"onclick");if(e&&!e.configurable)return!1}Object.defineProperty(HTMLElement.prototype,"onclick",{get:function(){return!0}});var t=document.createElement("div"),n=!!t.onclick;return Object.defineProperty(HTMLElement.prototype,"onclick",{}),n}function i(){s.forEach(function(e){var t="on"+e;document.addEventListener(e,function(e){for(var o,r=e.target;r;)r[t]&&!r[t]._unbound&&(o=n.zone.bind(r[t]),o._unbound=r[t],r[t]=o),r=r.parentElement},!0)})}var u=e("./websocket"),a=e("../utils"),s="copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror".split(" ");t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13,"./websocket":12}],11:[function(e,t){(function(n){"use strict";function o(){if("registerElement"in n.document){var e=document.registerElement,t=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"];document.registerElement=function(o,i){return i&&i.prototype&&t.forEach(function(e){if(i.prototype.hasOwnProperty(e)){var t=Object.getOwnPropertyDescriptor(i.prototype,e);t.value?(t.value=n.zone.bind(t.value),r(i.prototype,e,t)):i.prototype[e]=n.zone.bind(i.prototype[e])}else i.prototype[e]&&(i.prototype[e]=n.zone.bind(i.prototype[e]))}),e.apply(document,[o,i])}}}var r=e("./define-property")._redefineProperty;t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./define-property":4}],12:[function(e,t){(function(n){"use strict";function o(){var e=n.WebSocket;r.patchEventTargetMethods(e.prototype),n.WebSocket=function(t,n){var o,i=arguments.length>1?new e(t,n):new e(t),u=Object.getOwnPropertyDescriptor(i,"onmessage");return u&&u.configurable===!1?(o=Object.create(i),["addEventListener","removeEventListener","send","close"].forEach(function(e){o[e]=function(){return i[e].apply(i,arguments)}})):o=i,r.patchProperties(o,["onclose","onerror","onmessage","onopen"]),o}}var r=e("../utils");t.exports={apply:o}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":13}],13:[function(e,t){(function(e){"use strict";function n(t){for(var n=t.length-1;n>=0;n--)"function"==typeof t[n]&&(t[n]=e.zone.bind(t[n]));return t}function o(t){for(var n=t.length-1;n>=0;n--)"function"==typeof t[n]&&(t[n]=e.zone.bindOnce(t[n]));return t}function r(e,t){t.forEach(function(t){var o=e[t];o&&(e[t]=function(){return o.apply(this,n(arguments))})})}function i(e,t){var n=Object.getOwnPropertyDescriptor(e,t)||{enumerable:!0,configurable:!0};delete n.writable,delete n.value;var o=t.substr(2),r="_"+t;n.set=function(e){this[r]&&this.removeEventListener(o,this[r]),"function"==typeof e?(this[r]=e,this.addEventListener(o,e,!1)):this[r]=null},n.get=function(){return this[r]},Object.defineProperty(e,t,n)}function u(e,t){(t||function(){var t=[];for(var n in e)t.push(n);return t}().filter(function(e){return"on"===e.substr(0,2)})).forEach(function(t){i(e,t)})}function a(t){var n=t.addEventListener;t.addEventListener=function(e,t){return t._bound=t._bound||{},arguments[1]=t._bound[e]=zone.bind(t),n.apply(this,arguments)};var o=t.removeEventListener;t.removeEventListener=function(t,n){if(arguments[1]._bound&&arguments[1]._bound[t]){var r=arguments[1]._bound;arguments[1]=r[t],delete r[t]}var i=o.apply(this,arguments);return e.zone.dequeueTask(n),i}}function s(t){var o=e[t];if(o){e[t]=function(){var e=n(arguments);switch(e.length){case 0:this._o=new o;break;case 1:this._o=new o(e[0]);break;case 2:this._o=new o(e[0],e[1]);break;case 3:this._o=new o(e[0],e[1],e[2]);break;case 4:this._o=new o(e[0],e[1],e[2],e[3]);break;default:throw new Error("what are you even doing?")}};var r,i=new o;for(r in i)!function(n){"function"==typeof i[n]?e[t].prototype[n]=function(){return this._o[n].apply(this._o,arguments)}:Object.defineProperty(e[t].prototype,n,{set:function(t){this._o[n]="function"==typeof t?e.zone.bind(t):t},get:function(){return this._o[n]}})}(r);for(r in o)"prototype"!==r&&o.hasOwnProperty(r)&&(e[t][r]=o[r])}}t.exports={bindArguments:n,bindArgumentsOnce:o,patchPrototype:r,patchProperty:i,patchProperties:u,patchEventTargetMethods:a,patchClass:s}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);