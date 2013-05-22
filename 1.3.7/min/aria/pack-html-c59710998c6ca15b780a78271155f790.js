/*
 * Aria Templates 1.3.7 - 22 May 2013
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
//LOGICAL-PATH:aria/html/beans/ElementCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.ElementCfg",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$properties:{id:{$type:"json:String",$mandatory:!1},tagName:{$type:"json:String",$sample:"div",$mandatory:!0},attributes:{$type:"html:HtmlAttribute",$default:{}},bind:{$type:"json:Object",$default:{},$restricted:!1},on:{$type:"json:Object",$default:{},$restricted:!1}},$restricted:!1}}});
//*******************
//LOGICAL-PATH:aria/html/Element.js
//*******************
(function(){function e(e){e.writeMarkup=Aria.empty,e.writeMarkupBegin=Aria.empty,e.writeMarkupEnd=Aria.empty,e.initWidget=Aria.empty}Aria.classDefinition({$classpath:"aria.html.Element",$extends:"aria.widgetLibs.BindableWidget",$dependencies:["aria.html.beans.ElementCfg","aria.core.JsonValidator","aria.utils.Html","aria.utils.Json","aria.utils.Delegate","aria.templates.DomEventWrapper","aria.utils.Dom","aria.utils.Type"],$constructor:function(t){this.$cfgBean=this.$cfgBean||"aria.html.beans.ElementCfg.Properties";var i=aria.core.JsonValidator.normalize({json:t,beanName:this.$cfgBean});if(this.$BindableWidget.constructor.apply(this,arguments),!i)return e(this);var r=t.id;this._id=r?this._context.$getId(r):this._createDynamicId(),this._domElt=null,this.__delegateId=null,this._registerBindings(),this._normalizeCallbacks()},$destructor:function(){this.__delegateId&&(aria.utils.Delegate.remove(this.__delegateId),this.__delegateId=null),this.$BindableWidget.$destructor.call(this),this._domElt=null},$prototype:{_normalizeCallbacks:function(){var e,t=this._cfg.on,i=!1;for(var r in t)if(t.hasOwnProperty(r)){i=!0,e=t[r],aria.utils.Type.isArray(e)||(e=[e]);for(var a=0,s=e.length;s>a;a++)e[a]=this.$normCallback.call(this._context._tpl,e[a]);t[r]=e}if(i){var n=aria.utils.Delegate;this.__delegateId=n.add({fn:this._delegate,scope:this})}},_delegate:function(e){var t,i,r=e.type,a=this._cfg.on[r];if(a){for(var s=new aria.templates.DomEventWrapper(e),n=0,o=a.length;o>n&&(t=a[n],i=t.fn.call(t.scope,s,t.args),i!==!1);n++);return s.$dispose(),i}},writeMarkup:function(e){this._openTag(e),e.write("/>")},writeMarkupBegin:function(e){this._openTag(e),e.write(">")},writeMarkupEnd:function(e){e.write("</"+this._cfg.tagName+">")},onbind:Aria.empty,initWidget:function(){this._domElt=aria.utils.Dom.getElementById(this._id)},_openTag:function(e){var t=this._cfg,i=aria.utils.Html.buildAttributeList(t.attributes),r=["<",t.tagName," id='",this._id,"' "];i&&r.push(i," "),this.__delegateId&&r.push(aria.utils.Delegate.getMarkup(this.__delegateId)," "),e.write(r.join(""))},_notifyDataChange:function(e,t){this.onbind(t,this._transform(this._cfg.bind[t].transform,e.newValue,"toWidget"),e.oldValue)},_chainListener:function(e,t,i,r){var a=e[t]||[];aria.utils.Type.isArray(a)||(a=[a]),r?a.push(i):a.splice(0,0,i),e[t]=a}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/CheckBoxCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.CheckBoxCfg",$namespaces:{base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{bind:{$type:"base:Properties.$properties.bind",$properties:{checked:{$type:"common:BindingRef"}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/CheckBox.js
//*******************
(function(){function e(e){var t=this._bindingListeners.checked,i=this._transform(t.transform,e.target.getProperty("checked"),"fromWidget");aria.utils.Json.setValue(t.inside,t.to,i,t.cb)}Aria.classDefinition({$classpath:"aria.html.CheckBox",$extends:"aria.html.Element",$dependencies:["aria.html.beans.CheckBoxCfg"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2."},$constructor:function(t,i,r){this.$cfgBean="aria.html.beans.CheckBoxCfg.Properties",t.tagName="input",t.attributes=t.attributes||{},t.attributes.type="checkbox",t.on=t.on||{},this._chainListener(t.on,"click",{fn:e,scope:this}),this.$Element.constructor.call(this,t,i,r)},$prototype:{writeMarkupBegin:function(){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this);var e=this._cfg.bind;if(e.checked){var t=this._transform(e.checked.transform,e.checked.inside[e.checked.to],"toWidget");null!=t&&(this._domElt.checked=t)}},onbind:function(e,t){"checked"===e&&(this._domElt.checked=t)}}})})();
//*******************
//LOGICAL-PATH:aria/html/HtmlLibrary.js
//*******************
Aria.classDefinition({$classpath:"aria.html.HtmlLibrary",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{TextInput:"aria.html.TextInput",Template:"aria.html.Template",CheckBox:"aria.html.CheckBox"}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TemplateCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TemplateCfg",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$properties:{attributes:{$type:"html:HtmlAttribute"},id:{$type:"json:String",$mandatory:!1},classpath:{$type:"json:PackageName",$mandatory:!0},type:{$type:"json:String",$default:"div"},data:{$type:"json:ObjectRef",$mandatory:!1},moduleCtrl:{$type:"html:ModuleCtrl",$mandatory:!1},args:{$type:"json:Array",$contentType:{$type:"json:MultiTypes"},$default:[]},baseTabIndex:{$type:"json:Integer",$default:0}}}}});
//*******************
//LOGICAL-PATH:aria/html/Template.js
//*******************
Aria.classDefinition({$classpath:"aria.html.Template",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.html.beans.TemplateCfg","aria.templates.TemplateTrait","aria.utils.Html","aria.templates.TemplateCtxt","aria.utils.Dom","aria.templates.ModuleCtrlFactory","aria.core.environment.Customizations"],$events:{ElementReady:""},$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid.",ERROR_SUBTEMPLATE:"#ERROR IN SUBTEMPLATE#"},$constructor:function(e){this.$BaseWidget.constructor.apply(this,arguments),this._domId=e.id?this._context.$getId(e.id):this._createDynamicId(),this._subTplDiv=null,this.subTplCtxt=null,this._needCreatingModuleCtrl=e.moduleCtrl&&null==e.moduleCtrl.getData,this._tplcfg={classpath:aria.core.environment.Customizations.getTemplateCP(e.classpath),args:e.args,id:this._domId,moduleCtrl:e.moduleCtrl},this._checkCfgConsistency(e);var t=new aria.templates.TemplateCtxt;this.subTplCtxt=t,this._initCtxDone=!1,this.isDiffered=!1},$destructor:function(){this._subTplDiv=null,this.subTplCtxt&&(this.subTplCtxt.$dispose(),this.subTplCtxt=null),this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{$init:function(e){var t=aria.templates.TemplateTrait.prototype;for(var i in t)t.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&(e[i]=t[i])},_checkCfgConsistency:function(e){try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:"aria.html.beans.TemplateCfg.Properties"},!0),this._needCreatingModuleCtrl&&(this._cfgOk=this._cfgOk&&aria.core.JsonValidator.normalize({json:e.moduleCtrl,beanName:"aria.templates.CfgBeans.InitModuleCtrl"}))}catch(t){var i=aria.core.Log;if(i){for(var r,a=0,s=t.errors.length;s>a;a++)r=t.errors[a],r.message=i.prepareLoggedMessage(r.msgId,r.msgArgs);this.$logError(this.INVALID_CONFIGURATION,null,t)}}},_onTplLoad:function(e,t){var i=this._tplcfg;if(!i)return t.autoDispose&&e.moduleCtrlPrivate.$dispose(),void 0;var r=this._subTplDiv;i.tplDiv=r,i.data=this._cfg.data,e.moduleCtrl?i.moduleCtrl=e.moduleCtrl:i.context=this._context,t.autoDispose&&(null==i.toDispose?i.toDispose=[e.moduleCtrlPrivate]:i.toDispose.push(e.moduleCtrlPrivate));var a=this.subTplCtxt;a.parent=this._context,e=a.initTemplate(i),this._initCtxDone=!0,e?(a.dataReady(),r&&a._cfg&&(r.className=r.className+" "+a.getCSSClassNames(!0),a.$onOnce({Ready:this.__innerTplReadyCb,scope:this}),a.$refresh()),this.tplcfg=null):(a.$dispose(),this.subTplCtxt=null),r=null},initWidget:function(){aria.html.Template.superclass.initWidget.call(this);var e=aria.utils.Dom.getElementById(this._domId);if(this._subTplDiv=e,this._initCtxDone){var t=this.subTplCtxt;e.className=e.className+" "+t.getCSSClassNames(!0),t.linkToPreviousMarkup(e),t.viewReady()}},writeMarkup:function(e){if(this._cfgOk){var t=this._tplcfg;if(Aria.load({templates:[t.classpath],classes:this._needCreatingModuleCtrl?[this._cfg.moduleCtrl.classpath]:null,oncomplete:{scope:this,fn:this._onModuleCtrlLoad}}),this._tplcfg){var i=this._cfg.type,r=["<",i,' id="',this._domId,'"'];if(this._cfg.attributes&&r.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes)),r.push(">"),this._initCtxDone){var a=this.subTplCtxt,s=a.getMarkup();null!=s?r.push(s):r.push(this.ERROR_SUBTEMPLATE)}else this.isDiffered=!0;r.push("</"+i+">"),e.write(r.join(""))}else e.write("<div>"+this.ERROR_SUBTEMPLATE+"</div>")}},getId:function(){return this._cfg.id}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TextInputCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TextInputCfg",$namespaces:{json:"aria.core.JsonTypes",base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{tagName:{$type:"base:Properties.$properties.tagName",$mandatory:!0},bind:{$type:"base:Properties.$properties.bind",$properties:{value:{$type:"common:BindingRef"}}},on:{$type:"base:Properties.$properties.on",$properties:{type:{$type:"common:Callback"}}},password:{$type:"json:Boolean",$default:!1},autoselect:{$type:"json:Boolean",$default:!1}}}}});
//*******************
//LOGICAL-PATH:aria/html/TextInput.js
//*******************
(function(){function e(e,t){e.fn.call(e.scope,t,e.args)}function t(t){this._typeCallback=null;for(var i,r=0,a=t.length;a>r;r++)i=this.$normCallback.call(this._context._tpl,t[r]),e(i,this._domElt.value)}function i(e,i){this._typeCallback=aria.core.Timer.addCallback({fn:t,scope:this,delay:12,args:i})}function r(e){this._hasPlaceholder&&(aria.utils.Array.contains(o,e.keyCode)?e.preventDefault():this._removePlaceholder())}function a(e){var t=this._bindingListeners.value,i=this._transform(t.transform,e.target.getValue(),"fromWidget");this._hasFocus=!1,this._hasPlaceholder?aria.utils.Json.setValue(t.inside,t.to,"",t.cb):aria.utils.Json.setValue(t.inside,t.to,i,t.cb),this._firstFocus=!0}function s(){this._hasFocus=!0,this._hasPlaceholder&&aria.core.Timer.addCallback({fn:this._setCaretForPlaceholder,scope:this,delay:4})}function n(){this._hasPlaceholder?aria.utils.Caret.setPosition(this._domElt,0,0):this._cfg.autoselect&&this._autoselect()}var o=null,l=null;Aria.classDefinition({$classpath:"aria.html.TextInput",$extends:"aria.html.Element",$dependencies:["aria.html.beans.TextInputCfg","aria.utils.Caret","aria.DomEvent"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2."},$onload:function(){var e=aria.DomEvent;o=[e.KC_END,e.KC_RIGHT,e.KC_ARROW_RIGHT,e.KC_DOWN,e.KC_ARROW_DOWN,e.KC_DELETE,e.KC_BACKSPACE]},$constructor:function(e,t,i){this.$cfgBean=this.$cfgBean||"aria.html.beans.TextInputCfg.Properties",e.tagName="input",e.attributes=e.attributes||{},e.attributes.type=e.password?"password":"text",e.on=e.on||{},l="placeholder"in Aria.$window.document.createElement("input"),e.placeholder&&l&&(e.attributes.placeholder=e.placeholder),this._registerListeners(e),this._reactOnType=this._registerType(e.on,t),this._firstFocus=!0,this._hasFocus=!1,this._hasPlaceholder=!1,this.$Element.constructor.call(this,e,t,i)},$destructor:function(){this._typeCallback&&aria.core.Timer.cancelCallback(this._typeCallback),this.$Element.$destructor.call(this)},$prototype:{writeMarkupBegin:function(){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this);var e=this._cfg.bind;if(e.value){var t=this._transform(e.value.transform,e.value.inside[e.value.to],"toWidget");null!=t&&(this._domElt.value=t)}this._setPlaceholder()},onbind:function(e,t){"value"===e&&(t=null!=t?t+"":"",t&&this._removePlaceholder(),this._domElt.value=t,this._setPlaceholder())},getId:function(){return this._cfg.id},focus:function(){this._domElt.focus()},_registerType:function(e){e.type&&(this._chainListener(e,"keydown",{fn:i,scope:this,args:aria.utils.Type.isArray(e.type)?e.type:[e.type]}),delete e.type)},_autoselect:function(){this._firstFocus&&(this._firstFocus=!1,aria.utils.Caret.select(this._domElt))},_setPlaceholder:function(){if(!l&&this._cfg.placeholder){var e=this._domElt;if(""===e.value){e.value=this._cfg.placeholder;var t=new aria.utils.ClassList(e);t.add("placeholder"),t.$dispose(),this._hasFocus&&aria.utils.Caret.setPosition(e,0,0),this._hasPlaceholder=!0,this._domElt.unselectable="on"}}},_removePlaceholder:function(){if(this._hasPlaceholder){var e=this._domElt,t=new aria.utils.ClassList(e);e.value="",this._hasPlaceholder=!1,t.remove("placeholder"),t.$dispose(),this._domElt.unselectable="off"}},_registerListeners:function(e){var t=e.on;this._chainListener(t,"blur",{fn:a,scope:this}),(!l&&e.placeholder||e.autoselect)&&(this._chainListener(t,"focus",{fn:s,scope:this}),this._chainListener(t,"click",{fn:n,scope:this}),this._chainListener(t,"keydown",{fn:r,scope:this}),this._chainListener(t,"type",{fn:this._setPlaceholder,scope:this}))},_setCaretForPlaceholder:function(){this._hasPlaceholder&&aria.utils.Caret.setPosition(this._domElt,0,0)}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/AutoCompleteCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.AutoCompleteCfg",$namespaces:{json:"aria.core.JsonTypes",input:"aria.html.beans.TextInputCfg"},$beans:{Properties:{$type:"input:Properties",$properties:{bind:{$type:"input:Properties.bind",$properties:{suggestions:{$type:"json:Array",$contentType:{$type:"json:Object"},$default:[]}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/controllers/Suggestions.js
//*******************
(function(){function e(){this.getSuggestions=function(e,t){this.pendingSuggestion={entry:e,callback:t}},this.getAllSuggestions=function(e){this.pendingSuggestion={callback:e}},this.$dispose=Aria.empty}function t(e){var t=e.scope;t._autoDisposeHandler=!1,t.$logError(t.INVALID_RESOURCES_HANDLER,e.classpath)}function i(e){var t=e.scope,i=Aria.getClassInstance(e.classpath),r=t._resourcesHandler.pendingSuggestion;t._resourcesHandler=i,t._autoDisposeHandler=!0,r&&(r.entry?i.getSuggestions(r.entry,r.callback):i.getAllSuggestions(r.callback))}function r(e){aria.core.Timer.addCallback({fn:i,args:e,scope:{},delay:12})}function s(i,s){var a=Aria.getClassRef(i);if(a)return new a;var n={scope:s,classpath:i};return Aria.load({classes:[i],oncomplete:{fn:r,args:n},onerror:{fn:t,args:n}}),new e}Aria.classDefinition({$classpath:"aria.html.controllers.Suggestions",$dependencies:["aria.utils.Json","aria.utils.Type"],$constructor:function(){this._init()},$destructor:function(){this.dispose()},$statics:{INVALID_RESOURCES_HANDLER:"Invalid resources handler '%1'"},$prototype:{_init:function(){this.data={suggestions:[],value:null},this._resourcesHandler=null,this._autoDisposeHandler=!1},dispose:function(){this._autoDisposeHandler&&this._resourcesHandler&&this._resourcesHandler.$dispose()},setResourcesHandler:function(e){aria.utils.Type.isString(e)&&(e=s(e,this),this._autoDisposeHandler=!0),this._resourcesHandler=e},suggestValue:function(e){this._resourcesHandler.getSuggestions(e,{fn:this._callback,scope:this})},_callback:function(e){aria.utils.Json.setValue(this.data,"suggestions",e||[])},setSelected:function(e){aria.utils.Json.setValue(this.data,"value",e),this.empty()},empty:function(){aria.utils.Json.setValue(this.data,"suggestions",[])}}})})();