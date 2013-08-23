/*
 * Aria Templates 1.4.7 - 23 Aug 2013
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
(function(){function e(e){e.writeMarkup=Aria.empty,e.writeMarkupBegin=Aria.empty,e.writeMarkupEnd=Aria.empty,e.initWidget=Aria.empty}Aria.classDefinition({$classpath:"aria.html.Element",$extends:"aria.widgetLibs.BindableWidget",$dependencies:["aria.html.beans.ElementCfg","aria.core.JsonValidator","aria.utils.Html","aria.utils.Json","aria.utils.Delegate","aria.templates.DomEventWrapper","aria.utils.Dom","aria.utils.Type"],$constructor:function(t){this.$cfgBean=this.$cfgBean||"aria.html.beans.ElementCfg.Properties";var i=aria.core.JsonValidator.normalize({json:t,beanName:this.$cfgBean});if(this.$BindableWidget.constructor.apply(this,arguments),!i)return e(this);var r=t.id;this._id=r?this._context.$getId(r):this._createDynamicId(),this._domElt=null,this.__delegateId=null,this._registerBindings(),this._normalizeCallbacks()},$destructor:function(){this.__delegateId&&(aria.utils.Delegate.remove(this.__delegateId),this.__delegateId=null),this.$BindableWidget.$destructor.call(this),this._domElt=null},$prototype:{_normalizeCallbacks:function(){var e,t=this._cfg.on,i=!1;for(var r in t)if(t.hasOwnProperty(r)){i=!0,e=t[r],aria.utils.Type.isArray(e)||(e=[e]);for(var s=0,a=e.length;a>s;s++)e[s]=this.$normCallback.call(this._context._tpl,e[s]);t[r]=e}if(i){var n=aria.utils.Delegate;this.__delegateId=n.add({fn:this._delegate,scope:this})}},_delegate:function(e){var t,i,r=e.type,s=this._cfg.on[r];if(s){for(var a=new aria.templates.DomEventWrapper(e),n=0,o=s.length;o>n&&(t=s[n],i=t.fn.call(t.scope,a,t.args),i!==!1);n++);return a.$dispose(),i}},writeMarkup:function(e){this._openTag(e),e.write("/>")},writeMarkupBegin:function(e){this._openTag(e),e.write(">")},writeMarkupEnd:function(e){e.write("</"+this._cfg.tagName+">")},onbind:Aria.empty,initWidget:function(){this._domElt=aria.utils.Dom.getElementById(this._id)},_openTag:function(e){var t=this._cfg,i=aria.utils.Html.buildAttributeList(t.attributes),r=["<",t.tagName," id='",this._id,"' "];i&&r.push(i," "),this.__delegateId&&r.push(aria.utils.Delegate.getMarkup(this.__delegateId)," "),e.write(r.join(""))},_notifyDataChange:function(e,t){this.onbind(t,this._transform(this._cfg.bind[t].transform,e.newValue,"toWidget"),e.oldValue)},_chainListener:function(e,t,i,r){var s=e[t]||[];aria.utils.Type.isArray(s)||(s=[s]),r?s.push(i):s.splice(0,0,i),e[t]=s}}})})();
//*******************
//LOGICAL-PATH:aria/html/DisabledTrait.js
//*******************
Aria.classDefinition({$classpath:"aria.html.DisabledTrait",$dependencies:["aria.utils.Type","aria.utils.Json"],$prototype:{initDisabledWidgetAttribute:function(){var e=this._cfg.bind,t=e.disabled;if(t){var i=this._transform(t.transform,t.inside[t.to],"toWidget");aria.utils.Type.isBoolean(i)?this._domElt.disabled=i:aria.utils.Json.setValue(t.inside,t.to,this._domElt.disabled)}},onDisabledBind:function(e,t){"disabled"===e&&(this._domElt.disabled=t)}}});
//*******************
//LOGICAL-PATH:aria/html/InputElement.js
//*******************
(function(){Aria.classDefinition({$classpath:"aria.html.InputElement",$extends:"aria.html.Element",$dependencies:["aria.html.DisabledTrait"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2.",BINDING_NEEDED:"The property '%2' from Widget %1 should be bound to a data model"},$constructor:function(e,t,i,r){e.tagName="input",e.attributes=e.attributes||{},e.attributes.type=r,this.$Element.constructor.call(this,e,t,i)},$prototype:{$init:function(e){var t=aria.html.DisabledTrait.prototype;for(var i in t)t.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&(e[i]=t[i])},writeMarkupBegin:function(){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this),this.initDisabledWidgetAttribute()},onbind:function(e,t,i){this.$Element.onbind.apply(this,arguments),this.onDisabledBind(e,t,i)}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/InputElementCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.InputElementCfg",$namespaces:{base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{bind:{$type:"base:Properties.bind",$properties:{disabled:{$type:"common:BindingRef"}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/CheckBoxCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.CheckBoxCfg",$namespaces:{base:"aria.html.beans.InputElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{bind:{$type:"base:Properties.bind",$properties:{checked:{$type:"common:BindingRef"}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/CheckBox.js
//*******************
(function(){function e(e){var t=this._bindingListeners.checked,i=this._transform(t.transform,e.target.getProperty("checked"),"fromWidget");aria.utils.Json.setValue(t.inside,t.to,i,t.cb)}Aria.classDefinition({$classpath:"aria.html.CheckBox",$extends:"aria.html.InputElement",$dependencies:["aria.html.beans.CheckBoxCfg"],$constructor:function(t,i,r){this.$cfgBean=this.$cfgBean||"aria.html.beans.CheckBoxCfg.Properties",t.on=t.on||{},this._chainListener(t.on,"click",{fn:e,scope:this}),this.$InputElement.constructor.call(this,t,i,r,"checkbox")},$prototype:{initWidget:function(){this.$InputElement.initWidget.call(this);var e=this._cfg.bind;if(e.checked){var t=this._transform(e.checked.transform,e.checked.inside[e.checked.to],"toWidget");null!=t&&(this._domElt.checked=t)}else this.$logWarn(this.BINDING_NEEDED,[this.$class,"checked"])},onbind:function(e,t){this.$InputElement.onbind.apply(this,arguments),"checked"===e&&(this._domElt.checked=t)}}})})();
//*******************
//LOGICAL-PATH:aria/html/HtmlLibrary.js
//*******************
Aria.classDefinition({$classpath:"aria.html.HtmlLibrary",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{TextInput:"aria.html.TextInput",Template:"aria.html.Template",CheckBox:"aria.html.CheckBox",RadioButton:"aria.html.RadioButton",Select:"aria.html.Select"}}});
//*******************
//LOGICAL-PATH:aria/html/beans/RadioButtonCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.RadioButtonCfg",$namespaces:{json:"aria.core.JsonTypes",base:"aria.html.beans.InputElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{value:{$type:"json:String"},bind:{$type:"base:Properties.$properties.bind",$properties:{selectedValue:{$type:"common:BindingRef"}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/RadioButton.js
//*******************
(function(){function e(){var e=this._bindingListeners.selectedValue,t=this._transform(e.transform,this._cfg.value,"fromWidget");aria.utils.Json.setValue(e.inside,e.to,t)}Aria.classDefinition({$classpath:"aria.html.RadioButton",$extends:"aria.html.InputElement",$dependencies:["aria.html.beans.RadioButtonCfg"],$constructor:function(t,i,r){this.$cfgBean=this.$cfgBean||"aria.html.beans.RadioButtonCfg.Properties",t.on=t.on||{},this._chainListener(t.on,"click",{fn:e,scope:this}),this.$InputElement.constructor.call(this,t,i,r,"radio")},$prototype:{initWidget:function(){this.$InputElement.initWidget.call(this);var e=this._cfg.bind,t=e.selectedValue;if(t){var i=this._transform(t.transform,t.inside[t.to],"toWidget");this._domElt.checked=i===this._cfg.value}else this.$logWarn(this.BINDING_NEEDED,[this.$class,"selectedValue"])},onbind:function(e,t){this.$InputElement.onbind.apply(this,arguments),"selectedValue"===e&&(this._domElt.checked=t===this._cfg.value)}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/SelectCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.SelectCfg",$namespaces:{json:"aria.core.JsonTypes",base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{options:{$type:"json:Array",$contentType:{$type:"json:MultiTypes",$contentTypes:[{$type:"ListItemCfg"},{$type:"json:String"}]},$default:[]},bind:{$type:"base:Properties.bind",$properties:{selectedIndex:{$type:"common:BindingRef"},value:{$type:"common:BindingRef"},disabled:{$type:"common:BindingRef"}}}}},ListItemCfg:{$type:"json:Object",$restricted:!1,$properties:{value:{$type:"json:MultiTypes",$mandatory:!1,$contentTypes:[{$type:"json:Integer"},{$type:"json:String"}]},label:{$type:"json:String",$mandatory:!0},attributes:{$type:"html:HtmlAttribute"}}}}});
//*******************
//LOGICAL-PATH:aria/html/Select.js
//*******************
Aria.classDefinition({$classpath:"aria.html.Select",$extends:"aria.html.Element",$statics:{BINDING_NEEDED:"The property '%2' from Widget %1 should be bound to a data model",WRONG_OPTIONS:"Can't use the options property if an html body content is defined for %1"},$dependencies:["aria.html.beans.SelectCfg","aria.utils.Type","aria.html.DisabledTrait"],$constructor:function(e,t,i){this.$cfgBean=this.$cfgBean||"aria.html.beans.SelectCfg.Properties",e.tagName="select",e.attributes=e.attributes||{},e.on=e.on||{},this._chainListener(e.on,"click",{fn:this.__updateDataModel,scope:this}),this.$Element.constructor.call(this,e,t,i)},$prototype:{$init:function(e){var t=aria.html.DisabledTrait.prototype;for(var i in t)t.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&(e[i]=t[i])},writeMarkup:function(e){this._openTag(e),e.write(">");var t=this._cfg.options;if(t){this.options=[];for(var i=aria.utils.String,r=0,s=t.length;s>r;r++){e.write("<option ");var n=t[r];n=aria.utils.Type.isString(n)?{label:n,value:n}:{label:n.label,attributes:n.attributes,value:n.value||n.label};var a=i.encodeForQuotedHTMLAttribute(n.value);if(e.write('value="'+a+'"'),n.attributes){var o=aria.utils.Html.buildAttributeList(n.attributes);e.write(o)}e.write(">"),e.write(i.escapeHTML(n.label)),e.write("</option>"),this.options[r]=n}}e.write("</"+this._cfg.tagName+">")},writeMarkupBegin:function(e){this.options&&this.$logError(this.WRONG_OPTIONS,[this.$class]),this._openTag(e),e.write(">")},writeMarkupEnd:function(e){e.write("</"+this._cfg.tagName+">")},initWidget:function(){this.$Element.initWidget.call(this),this.setOptions();var e=this.getSelectedIndexFromBindings();null!=e&&(this._domElt.selectedIndex=e),this.initDisabledWidgetAttribute(),this.__updateDataModel()},isIndexValid:function(e){return aria.utils.Type.isNumber(e)&&e>=0&&this.options.length-1>=e},getSelectedIndexFromBindings:function(){var e=this._cfg.bind,t=!1;if(e.selectedIndex){var i=this._transform(e.selectedIndex.transform,e.selectedIndex.inside[e.selectedIndex.to],"toWidget");if(null!=i)return this.isIndexValid(i)||(i=-1),i;t=!0}if(e.value){var r=this._transform(e.value.transform,e.value.inside[e.value.to],"toWidget");if(null!=r)return this.getIndex(r);t=!0}t||this.$logWarn(this.BINDING_NEEDED,[this.$class,"selectedIndex"])},setOptions:function(){if(!this.options&&(this.options=[],this._domElt.options))for(var e=0,t=this._domElt.options.length;t>e;e++){var i={value:this._domElt.options[e].value,label:this._domElt.options[e].label};this.options.push(i)}},onbind:function(e,t,i){"selectedIndex"===e?(this._domElt.selectedIndex=t,this.setValueInDataModel(),this.isIndexValid(t)||this.setIndexInDataModel()):"value"===e&&(this._domElt.selectedIndex=this.getIndex(t),this.setIndexInDataModel(),-1===this._domElt.selectedIndex&&this.setValueInDataModel()),this.onDisabledBind(e,t,i)},getIndex:function(e){if(this.options)for(var t=0,i=this.options.length;i>t;t++)if(this.options[t].value===e)return t;return-1},__updateDataModel:function(){this.setIndexInDataModel(),this.setValueInDataModel()},setValueInDataModel:function(){var e=this._bindingListeners.value;if(e){var t=this._domElt.selectedIndex,i="";-1!=t&&(i=this.options[this._domElt.selectedIndex].value);var r=this._transform(e.transform,i,"fromWidget");aria.utils.Json.setValue(e.inside,e.to,r,e.cb)}},setIndexInDataModel:function(){var e=this._bindingListeners.selectedIndex;if(e){var t=this._transform(e.transform,this._domElt.selectedIndex,"fromWidget");aria.utils.Json.setValue(e.inside,e.to,t,e.cb)}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TemplateCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TemplateCfg",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$properties:{attributes:{$type:"html:HtmlAttribute"},id:{$type:"json:String",$mandatory:!1},classpath:{$type:"json:PackageName",$mandatory:!0},type:{$type:"json:String",$default:"div"},data:{$type:"json:ObjectRef",$mandatory:!1},moduleCtrl:{$type:"html:ModuleCtrl",$mandatory:!1},args:{$type:"json:Array",$contentType:{$type:"json:MultiTypes"},$default:[]},baseTabIndex:{$type:"json:Integer",$default:0}}}}});
//*******************
//LOGICAL-PATH:aria/html/Template.js
//*******************
Aria.classDefinition({$classpath:"aria.html.Template",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.html.beans.TemplateCfg","aria.templates.TemplateTrait","aria.utils.Html","aria.templates.TemplateCtxt","aria.utils.Dom","aria.templates.ModuleCtrlFactory","aria.core.environment.Customizations"],$events:{ElementReady:""},$statics:{ERROR_SUBTEMPLATE:"#ERROR IN SUBTEMPLATE#"},$constructor:function(e){this.$BaseWidget.constructor.apply(this,arguments),this._domId=e.id?this._context.$getId(e.id):this._createDynamicId(),this._subTplDiv=null,this.subTplCtxt=null,this._needCreatingModuleCtrl=e.moduleCtrl&&null==e.moduleCtrl.getData,this._tplcfg={classpath:aria.core.environment.Customizations.getTemplateCP(e.classpath),args:e.args,id:this._domId,moduleCtrl:e.moduleCtrl},this._checkCfgConsistency(e);var t=new aria.templates.TemplateCtxt;this.subTplCtxt=t,this._initCtxDone=!1,this.isDiffered=!1,this._cssClassNames=""},$destructor:function(){this._subTplDiv=null,this.subTplCtxt&&(this.subTplCtxt.$dispose(),this.subTplCtxt=null),this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{$init:function(e){var t=aria.templates.TemplateTrait.prototype;for(var i in t)t.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&(e[i]=t[i])},_checkCfgConsistency:function(e){var t=aria.core.JsonValidator;this._cfgOk=t.validateCfg("aria.html.beans.TemplateCfg.Properties",e),this._needCreatingModuleCtrl&&(this._cfgOk=this._cfgOk&&t.validateCfg("aria.templates.CfgBeans.InitModuleCtrl",e.moduleCtrl))},_onTplLoad:function(e,t){var i=this._tplcfg;if(!i)return t.autoDispose&&e.moduleCtrlPrivate.$dispose(),void 0;var r=this._subTplDiv;i.tplDiv=r,i.data=this._cfg.data,e.moduleCtrl?i.moduleCtrl=e.moduleCtrl:i.context=this._context,t.autoDispose&&(null==i.toDispose?i.toDispose=[e.moduleCtrlPrivate]:i.toDispose.push(e.moduleCtrlPrivate));var s=this.subTplCtxt;s.parent=this._context,e=s.initTemplate(i),this._initCtxDone=!0,e?(s.dataReady(),r&&s._cfg&&(r.className=r.className+" "+s.getCSSClassNames(!0),s.$onOnce({Ready:this.__innerTplReadyCb,scope:this}),s.$refresh()),this.tplcfg=null):(s.$dispose(),this.subTplCtxt=null),r=null},initWidget:function(){aria.html.Template.superclass.initWidget.call(this);var e=aria.utils.Dom.getElementById(this._domId);if(this._subTplDiv=e,this._initCtxDone){var t=this.subTplCtxt;e.className=e.className+" "+this._cssClassNames,t.linkToPreviousMarkup(e),t.viewReady()}},writeMarkup:function(e){if(this._cfgOk){var t=this._tplcfg;if(Aria.load({templates:[t.classpath],classes:this._needCreatingModuleCtrl?[this._cfg.moduleCtrl.classpath]:null,oncomplete:{scope:this,fn:this._onModuleCtrlLoad}}),this._tplcfg){var i=this._cfg.type,r=["<",i,' id="',this._domId,'"'];if(this._cfg.attributes&&r.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes)),r.push(">"),this._initCtxDone){var s=this.subTplCtxt;this._cssClassNames=s.getCSSClassNames(!0);var a=s.getMarkup();null!=a?r.push(a):r.push(this.ERROR_SUBTEMPLATE)}else this.isDiffered=!0;r.push("</"+i+">"),e.write(r.join(""))}else e.write("<div>"+this.ERROR_SUBTEMPLATE+"</div>")}},getId:function(){return this._cfg.id}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TextInputCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TextInputCfg",$namespaces:{json:"aria.core.JsonTypes",base:"aria.html.beans.ElementCfg",baseInput:"aria.html.beans.InputElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$properties:{tagName:{$type:"base:Properties.tagName",$mandatory:!0},bind:{$type:"baseInput:Properties.bind",$properties:{value:{$type:"common:BindingRef"}}},on:{$type:"base:Properties.on",$properties:{type:{$type:"common:Callback"}}},password:{$type:"json:Boolean",$default:!1},autoselect:{$type:"json:Boolean",$default:!1}}}}});
//*******************
//LOGICAL-PATH:aria/html/TextInput.js
//*******************
(function(){function e(e,t){e.fn.call(e.scope,t,e.args)}function t(t){this._typeCallback=null;for(var i,r=0,s=t.length;s>r;r++)i=this.$normCallback.call(this._context._tpl,t[r]),e(i,this._domElt.value)}function i(e,i){this._typeCallback=aria.core.Timer.addCallback({fn:t,scope:this,delay:12,args:i})}function r(e){this._hasPlaceholder&&(aria.utils.Array.contains(o,e.keyCode)?e.preventDefault():this._removePlaceholder())}function s(e){var t=this._bindingListeners.value,i=this._transform(t.transform,e.target.getValue(),"fromWidget");this._hasFocus=!1,this._hasPlaceholder?aria.utils.Json.setValue(t.inside,t.to,"",t.cb):aria.utils.Json.setValue(t.inside,t.to,i,t.cb),this._firstFocus=!0}function a(){this._hasFocus=!0,this._hasPlaceholder&&aria.core.Timer.addCallback({fn:this._setCaretForPlaceholder,scope:this,delay:4})}function n(){this._hasPlaceholder?aria.utils.Caret.setPosition(this._domElt,0,0):this._cfg.autoselect&&this._autoselect()}var o=null,l=null;Aria.classDefinition({$classpath:"aria.html.TextInput",$extends:"aria.html.InputElement",$dependencies:["aria.html.beans.TextInputCfg","aria.utils.Caret","aria.DomEvent"],$statics:{DEPRECATED_PASSWORD:"The Password property is deprecated. Add the input type as an attribute"},$onload:function(){var e=aria.DomEvent;o=[e.KC_END,e.KC_RIGHT,e.KC_ARROW_RIGHT,e.KC_DOWN,e.KC_ARROW_DOWN,e.KC_DELETE,e.KC_BACKSPACE]},$constructor:function(e,t,i){this.$cfgBean=this.$cfgBean||"aria.html.beans.TextInputCfg.Properties",e.tagName="input",e.attributes=e.attributes||{};var r=e.attributes.type;e.password?(r="password",this.$logWarn(this.DEPRECATED_PASSWORD,[this.tplClasspath,i])):r||(r="text"),e.on=e.on||{},l="placeholder"in Aria.$window.document.createElement("input"),e.placeholder&&l&&(e.attributes.placeholder=e.placeholder),this._registerListeners(e),this._reactOnType=this._registerType(e.on,t),this._firstFocus=!0,this._hasFocus=!1,this._hasPlaceholder=!1,this.$InputElement.constructor.call(this,e,t,i,r)},$destructor:function(){this._typeCallback&&aria.core.Timer.cancelCallback(this._typeCallback),this.$InputElement.$destructor.call(this)},$prototype:{initWidget:function(){this.$InputElement.initWidget.call(this);var e=this._cfg.bind;if(e.value){var t=this._transform(e.value.transform,e.value.inside[e.value.to],"toWidget");null!=t&&(this._domElt.value=t)}else this.$logWarn(this.BINDING_NEEDED,[this.$class,"value"]);this._setPlaceholder()},onbind:function(e,t){this.$InputElement.onbind.apply(this,arguments),"value"===e&&(t=null!=t?t+"":"",t&&this._removePlaceholder(),this._domElt.value=t,this._setPlaceholder())},getId:function(){return this._cfg.id},focus:function(){this._domElt.focus()},_registerType:function(e){e.type&&(this._chainListener(e,"keydown",{fn:i,scope:this,args:aria.utils.Type.isArray(e.type)?e.type:[e.type]}),delete e.type)},_autoselect:function(){this._firstFocus&&(this._firstFocus=!1,aria.utils.Caret.select(this._domElt))},_setPlaceholder:function(){if(!l&&this._cfg.placeholder){var e=this._domElt;if(""===e.value){e.value=this._cfg.placeholder;var t=new aria.utils.ClassList(e);t.add("placeholder"),t.$dispose(),this._hasFocus&&aria.utils.Caret.setPosition(e,0,0),this._hasPlaceholder=!0,this._domElt.unselectable="on"}}},_removePlaceholder:function(){if(this._hasPlaceholder){var e=this._domElt,t=new aria.utils.ClassList(e);e.value="",this._hasPlaceholder=!1,t.remove("placeholder"),t.$dispose(),this._domElt.unselectable="off"}},_registerListeners:function(e){var t=e.on;this._chainListener(t,"blur",{fn:s,scope:this}),(!l&&e.placeholder||e.autoselect)&&(this._chainListener(t,"focus",{fn:a,scope:this}),this._chainListener(t,"click",{fn:n,scope:this}),this._chainListener(t,"keydown",{fn:r,scope:this}),this._chainListener(t,"type",{fn:this._setPlaceholder,scope:this}))},_setCaretForPlaceholder:function(){this._hasPlaceholder&&aria.utils.Caret.setPosition(this._domElt,0,0)}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/AutoCompleteCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.AutoCompleteCfg",$namespaces:{json:"aria.core.JsonTypes",input:"aria.html.beans.TextInputCfg"},$beans:{Properties:{$type:"input:Properties",$properties:{bind:{$type:"input:Properties.bind",$properties:{suggestions:{$type:"json:Array",$contentType:{$type:"json:Object"},$default:[]}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/controllers/Suggestions.js
//*******************
(function(){function e(){this.getSuggestions=function(e,t){this.pendingSuggestion={entry:e,callback:t}},this.getAllSuggestions=function(e){this.pendingSuggestion={callback:e}},this.$dispose=Aria.empty}function t(e){var t=e.scope;t._autoDisposeHandler=!1,t.$logError(t.INVALID_RESOURCES_HANDLER,e.classpath)}function i(e){var t=e.scope,i=Aria.getClassInstance(e.classpath),r=t._resourcesHandler.pendingSuggestion;t._resourcesHandler=i,t._autoDisposeHandler=!0,r&&(r.entry?i.getSuggestions(r.entry,r.callback):i.getAllSuggestions(r.callback))}function r(e){aria.core.Timer.addCallback({fn:i,args:e,scope:{},delay:12})}function s(i,s){var a=Aria.getClassRef(i);if(a)return new a;var n={scope:s,classpath:i};return Aria.load({classes:[i],oncomplete:{fn:r,args:n},onerror:{fn:t,args:n}}),new e}Aria.classDefinition({$classpath:"aria.html.controllers.Suggestions",$dependencies:["aria.utils.Json","aria.utils.Type"],$constructor:function(){this._init()},$destructor:function(){this.dispose()},$statics:{INVALID_RESOURCES_HANDLER:"Invalid resources handler '%1'"},$prototype:{_init:function(){this.data={suggestions:[],value:null},this._resourcesHandler=null,this._autoDisposeHandler=!1},dispose:function(){this._autoDisposeHandler&&this._resourcesHandler&&this._resourcesHandler.$dispose()},setResourcesHandler:function(e){aria.utils.Type.isString(e)&&(e=s(e,this),this._autoDisposeHandler=!0),this._resourcesHandler=e},suggestValue:function(e){this._resourcesHandler.getSuggestions(e,{fn:this._callback,scope:this})},_callback:function(e){aria.utils.Json.setValue(this.data,"suggestions",e||[])},setSelected:function(e){aria.utils.Json.setValue(this.data,"value",e),this.empty()},empty:function(){aria.utils.Json.setValue(this.data,"suggestions",[])}}})})();