/*
 * Aria Templates 1.4.3 - 23 Aug 2013
 *
 * Copyright 2009-2013 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//***MULTI-PART
//*******************
//LOGICAL-PATH:aria/map/CfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.map.CfgBeans",$namespaces:{json:"aria.core.JsonTypes",core:"aria.core.CfgBeans"},$beans:{MapCfg:{$type:"json:Object",$properties:{id:{$type:"json:String",$mandatory:!0},domElement:{$type:"json:ObjectRef",$mandatory:!0},initArgs:{$type:"json:MultiTypes",$default:{}}}},CreateMapCfg:{$type:"MapCfg",$properties:{provider:{$type:"json:String",$mandatory:!0},afterCreate:{$type:"core:Callback"}}}}});
//*******************
//LOGICAL-PATH:aria/map/MapManager.js
//*******************
(function(){var e={},t={},i={},r={microsoft7:"aria.map.providers.Microsoft7MapProvider",google3:"aria.map.providers.Google3MapProvider"},s={},a={};Aria.classDefinition({$classpath:"aria.map.MapManager",$singleton:!0,$dependencies:["aria.map.CfgBeans","aria.templates.DomElementWrapper","aria.utils.Type"],$constructor:function(){this._createdDomWrappers={}},$destructor:function(){this.destroyAllMaps();for(var n in a)a.hasOwnProperty(n)&&a[n].$dispose();t=null,i=null,this._createdDomWrappers=null,s=null,a=null,e=null,r=null},$events:{mapReady:"",mapDestroy:""},$statics:{INEXISTENT_PROVIDER:"Provider %1 cannot be found",INVALID_PROVIDER:"Provider %1 is not valid",DUPLICATED_PROVIDER:"Provider %1 exists already",DUPLICATED_MAP_ID:"A map with id %1 already exists.",LOADING:"loading",READY:"ready"},$prototype:{createMap:function(e){if(aria.core.JsonValidator.validateCfg("aria.map.CfgBeans.CreateMapCfg",e)){if(i[e.id])return this.$logError(this.DUPLICATED_MAP_ID,e.id),void 0;i[e.id]=this.LOADING;var t=e.provider;t in r||this.addProvider(t,t),this._getProviderInstance(t,{fn:this._loadProviderDependencies,scope:this,args:e})}},getMap:function(t){return e[t]?e[t].instance:null},getMapDom:function(e){var i=this._createdDomWrappers[e];if(i)return i;var r=t[e];return r?(i=new aria.templates.DomElementWrapper(r),this._createdDomWrappers[e]=i,i):void 0},destroyMap:function(r){var a=e[r];if(a){s[a.providerName].disposeMap(a.instance),a=null,delete e[r],delete t[r];var n=this._createdDomWrappers[r];n&&(n.$dispose(),n=null,delete this._createdDomWrappers[r]),delete i[r],this.$raiseEvent({name:"mapDestroy",mapId:r})}},destroyAllMaps:function(t){var i,s=t&&t in r;for(var a in e)e.hasOwnProperty(a)&&(i=e[a],s&&i.providerName!=t||this.destroyMap(a))},addProvider:function(e,t){r[e]?this.$logError(this.DUPLICATED_PROVIDER,e):aria.utils.Type.isObject(t)?this._isValidProvider(t)?(s[e]=t,r[e]=t):this.$logError(this.INVALID_PROVIDER,e):r[e]=t},removeProvider:function(e){this.destroyAllMaps(e),delete r[e],a[e]&&(a[e].$dispose(),delete a[e]),delete s[e]},hasProvider:function(e){return e in r},_getProviderInstance:function(e,t){s[e]?this.$callback(t):Aria.load({classes:[r[e]],oncomplete:{fn:this._setProviderInstance,scope:this,args:{providerName:e,cb:t}},onerror:{fn:this._raiseInexistentProviderError,scope:this,args:{providerName:e,cb:t}}})},_raiseInexistentProviderError:function(e){this.$logError(this.INEXISTENT_PROVIDER,e.providerName);var t=e.cb.args;delete i[t.id];var r=t.afterCreate;r&&this.$callback(r,null)},_setProviderInstance:function(e){var t=e.providerName,n=Aria.getClassRef(r[t]),o=!aria.utils.Type.isFunction(n),l=o?n:new n,c=this._isValidProvider(l);if(c)s[t]=l,o||(a[t]=l),this.$callback(e.cb);else{var u=e.cb.args;delete i[u.id],l.$dispose(),this.$logError(this.INVALID_PROVIDER,e.providerName);var h=u.afterCreate;h&&this.$callback(h,null)}},_isValidProvider:function(e){for(var t=!0,i=["load","getMap","disposeMap"],r=0;i.length>r;r++)t=t&&e[i[r]]&&aria.utils.Type.isFunction(e[i[r]]);return t},_loadProviderDependencies:function(e,t){var i=s[t.provider];i.load({fn:this._retrieveMapInstance,scope:this,args:t})},_retrieveMapInstance:function(r,a){var n=r&&r.id&&r.provider?r:a,o=n.provider,l=n.id,c=n.afterCreate,u=s[o].getMap(n);e[l]={instance:u,providerName:o},t[l]=n.domElement,i[l]=this.READY,c&&this.$callback(c,u),this.$raiseEvent({name:"mapReady",mapId:l})},getMapStatus:function(e){return i[e]||null}}})})();
//*******************
//LOGICAL-PATH:aria/embed/controllers/MapController.js
//*******************
(function(){var e={},t={};Aria.classDefinition({$classpath:"aria.embed.controllers.MapController",$singleton:!0,$dependencies:["aria.map.MapManager","aria.utils.Json"],$constructor:function(){this.mapManager=aria.map.MapManager,this.mapManager.$addListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}}),this._listeners=0},$destructor:function(){this.mapManager.$removeListeners({mapDestroy:{fn:this._nullifyMapDom,scope:this}}),this.mapManager=null,e=null,t=null},$prototype:{onEmbededElementCreate:function(t,i){var r=this.mapManager.getMapStatus(i.id),s=e[i.id];null===r?this._createMap(t,i):t.appendChild(s),r=this.mapManager.getMapStatus(i.id),i.loadingIndicator&&r!=this.mapManager.READY&&this._activateLoadingIndicator(t,i)},_createMap:function(t,i){var r=aria.utils.Json.copy(i);r.provider,delete r.loadingIndicator;var s=Aria.$window.document.createElement("div");r.domElement=s,e[i.id]=s,t.appendChild(s),this.mapManager.createMap(r)},_activateLoadingIndicator:function(e,i){this._triggerLoadingIndicator(e,!0),t[i.id]={container:e},0===this._listeners&&this.mapManager.$addListeners({mapReady:{fn:this._removeLoadingIndicator,scope:this}}),this._listeners++},_removeLoadingIndicator:function(e){var i=t[e.mapId];i&&(this._triggerLoadingIndicator(i.container,!1),delete t[e.mapId],this._listeners--,0===this._listeners&&this.mapManager.$removeListeners({mapReady:{fn:this._removeLoadingIndicator,scope:this}}))},onEmbededElementDispose:function(t,i){var r=i.id;i.loadingIndicator&&this._triggerLoadingIndicator(t,!1);var s=e[r];if(s){var a=s.parentNode;a&&a.removeChild(s)}},_nullifyMapDom:function(t){delete e[t.mapId]},_triggerLoadingIndicator:function(e,t){e&&(t?aria.utils.DomOverlay.create(e):aria.utils.DomOverlay.detachFrom(e))}}})})();
//*******************
//LOGICAL-PATH:aria/embed/Map.js
//*******************
Aria.classDefinition({$classpath:"aria.embed.Map",$extends:"aria.embed.Element",$dependencies:["aria.embed.controllers.MapController"],$constructor:function(e){this.$Element.constructor.apply(this,arguments),this._cfg.controller=aria.embed.controllers.MapController,this._cfg.args={id:e.id,provider:e.provider,initArgs:e.initArgs,loadingIndicator:e.loadingIndicator}},$prototype:{_cfgBeanName:"aria.embed.CfgBeans.MapCfg"}});
//*******************
//LOGICAL-PATH:aria/map/providers/IMapProvider.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.map.providers.IMapProvider",$interface:{load:function(){},getMap:function(){},disposeMap:function(){}}});
//*******************
//LOGICAL-PATH:aria/map/providers/Google3MapProvider.js
//*******************
Aria.classDefinition({$classpath:"aria.map.providers.Google3MapProvider",$singleton:!0,$dependencies:["aria.utils.ScriptLoader"],$implements:["aria.map.providers.IMapProvider"],$statics:{MISSING_ARGS:"Missing map arguments",MISSING_LATLNG:"Missing latitude (lat) or longitude (lng) in the initArgs of the map cfg"},$constructor:function(){this.credentials=""},$prototype:{load:function(e){if(this.isLoaded())this.$callback(e);else{var t=this;Aria.$window.__googleMapLoaded=function(){Aria.$window.__googleMapLoaded=null,t.$callback(e),t=null},aria.utils.ScriptLoader.load([this._getFullUrl()])}},isLoaded:function(){var e=Aria.$window.google;return!!(e&&e.maps&&e.maps.Map)},getMap:function(e){if(this.isLoaded()){if(!e.initArgs)return this.$logError(this.MISSING_ARGS),void 0;var t=e.initArgs,i=t.lat,r=t.lng;if(null==i||null==r)return this.$logError(this.MISSING_LATLNG),void 0;var s=Aria.$window.google,a={center:new s.maps.LatLng(i,r),zoom:t.zoom||10,mapTypeId:t.mapTypeId||s.maps.MapTypeId.ROADMAP,overviewMapControl:t.overviewMapControl!==!1,overviewMapControlOptions:{opened:t.overviewMapControlOpen!==!1}};aria.utils.Json.inject(e.initArgs,a);var n=e.domElement;if(!n.offsetHeight){var o=n.parentNode;o&&(n.style.cssText="padding:0;margin:0;height:"+o.offsetHeight+"px;")}return new Aria.$window.google.maps.Map(n,a)}},disposeMap:function(e){var t=e.getDiv(),i=t.parentNode;i&&i.removeChild(t)},_getFullUrl:function(){var e=["/maps/api/js?v=3&sensor=false&callback=__googleMapLoaded"],t=!1,i=this.credentials;return i&&(0===i.indexOf("gme-")?(t="https:"==Aria.$window.document.location.protocol,e.push("client="+i)):e.push("key="+i)),(t?"https://maps-api-ssl.google.com":"http://maps.googleapis.com")+e.join("&")}}});
//*******************
//LOGICAL-PATH:aria/map/providers/Microsoft7MapProvider.js
//*******************
Aria.classDefinition({$classpath:"aria.map.providers.Microsoft7MapProvider",$singleton:!0,$dependencies:["aria.utils.ScriptLoader"],$implements:["aria.map.providers.IMapProvider"],$constructor:function(){this.credentials="",this._loadCallback=null},$destructor:function(){this._loadCallback=null},$prototype:{load:function(e){if(this.isLoaded())this.$callback(e);else{var t=this;this._loadCallback=e,Aria.$window.__bing7MapLoadCallback=function(){t._afterLoad.apply(t),t=null},aria.utils.ScriptLoader.load(["http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&mkt=en-US&onscriptload=__bing7MapLoadCallback"])}},_afterLoad:function(){this.$assert(35,this.isLoaded()),Aria.$window.__bing7MapLoadCallback=null;var e=this;Aria.$window.Microsoft.Maps.loadModule("Microsoft.Maps.Overlays.Style",{callback:function(){e.$callback(e._loadCallback),e=null}})},isLoaded:function(){return Aria.$window.Microsoft!==void 0&&Aria.$window.Microsoft.Maps!==void 0&&Aria.$window.Microsoft.Maps.Map!==void 0},getMap:function(e){var t={credentials:this.credentials};return aria.utils.Json.inject(e.initArgs,t),this.isLoaded()?new Aria.$window.Microsoft.Maps.Map(e.domElement,t):null},disposeMap:function(e){var t=e.getRootElement().parentNode;e.dispose(),t&&t.parentNode&&t.parentNode.removeChild(t)}}});