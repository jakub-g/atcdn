/*
 * Aria Templates 1.4.4 - 22 May 2013
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
//LOGICAL-PATH:aria/touch/Event.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Event",$constructor:function(){this.touchEventMap={touchstart:"touchstart",touchend:"touchend",touchmove:"touchmove"},this.touch=!0,this.__touchDetection()},$prototype:{__touchDetection:function(){this.touch="ontouchstart"in Aria.$frameworkWindow||Aria.$frameworkWindow.DocumentTouch&&Aria.$frameworkWindow.document instanceof Aria.$frameworkWindow.DocumentTouch,this.touch||(this.touchEventMap={touchstart:"mousedown",touchend:"mouseup",touchmove:"mousemove"}),Aria.$window.navigator.msPointerEnabled&&(this.touchEventMap={touchstart:"MSPointerDown",touchend:"MSPointerUp",touchmove:"MSPointerMove"})},getPositions:function(t){var e=[];if(t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0]){for(var i=0;t.touches.length>i;i++)e.push({x:t.touches[i].pageX?t.touches[i].pageX:t.touches[i].clientX,y:t.touches[i].pageY?t.touches[i].pageY:t.touches[i].clientY});if(t.type==this.touchEventMap.touchend)for(var i=0;t.changedTouches.length>i;i++)e.push({x:t.changedTouches[i].pageX?t.changedTouches[i].pageX:t.changedTouches[i].clientX,y:t.changedTouches[i].pageY?t.changedTouches[i].pageY:t.changedTouches[i].clientY})}else e.push({x:t.pageX?t.pageX:t.clientX,y:t.pageY?t.pageY:t.clientY});return e},getFingerIndex:function(t){var e=0;if(Aria.$window.navigator.msPointerEnabled)e=t.isPrimary?0:1;else if(t.touches||t.changedTouches)if(t.changedTouches.length>1)e=100+t.changedTouches.length;else if(t.type==this.touchEventMap.touchend)e=t.touches.length+t.changedTouches.length-1;else for(var i=t.changedTouches[0].pageX?t.changedTouches[0].pageX:t.changedTouches[0].clientX,s=t.changedTouches[0].pageY?t.changedTouches[0].pageY:t.changedTouches[0].clientY,a=0;t.touches.length>a;a++)if(i==(t.touches[a].pageX?t.touches[a].pageX:t.touches[a].clientX)&&s==(t.touches[a].pageY?t.touches[a].pageY:t.touches[a].clientY)){e=a;break}return e}}});
//*******************
//LOGICAL-PATH:aria/touch/Gesture.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.Gesture",$dependencies:["aria.utils.Event","aria.utils.Delegate","aria.utils.AriaWindow","aria.touch.Event"],$statics:{NB_TOUCHES:1},$constructor:function(){this.body={},this.touchEventMap=aria.touch.Event.touchEventMap;var t=aria.utils.AriaWindow;t.$on({attachWindow:this._connectTouchEvents,detachWindow:this._disconnectTouchEvents,scope:this}),this.eventsAlreadyAttached=!1,t.isWindowUsed&&this._connectTouchEvents(),this.timerId=null,this.startData=null,this.currentData=null},$destructor:function(){aria.utils.AriaWindow.$unregisterListeners(this),this._disconnectTouchEvents(),this.body=null},$prototype:{_connectTouchEvents:function(){if(!this.eventsAlreadyAttached){this.body=Aria.$window.document.body;for(var t=this._getInitialListenersList(),e=0;t.length>e;e++)this._addListener(t[e].evt,t[e].cb);this.eventsAlreadyAttached=!0}},_disconnectTouchEvents:function(){for(var t=this._getInitialListenersList(),e=0;t.length>e;e++)this._removeListener(t[e].evt,t[e].cb);this.eventsAlreadyAttached=!1},_getInitialListenersList:function(){return[]},_getAdditionalListenersList:function(){return[]},_getFakeEventsMap:function(){return{}},_gestureStart:function(t,e){return this.__validateNbTouches(t)?(this._disconnectTouchEvents(),this.startData={positions:aria.touch.Event.getPositions(t),time:(new Date).getTime()},this.currentData=null,this._connectAdditionalTouchEvents(),this._getFakeEventsMap().start?this._raiseFakeEvent(t,this._getFakeEventsMap().start,e):null!=t.returnValue?t.returnValue:!t.defaultPrevented):null},_gestureMove:function(t,e){return this.__validateNbTouches(t)?(this.currentData={positions:aria.touch.Event.getPositions(t),time:(new Date).getTime()},this._getFakeEventsMap().move?this._raiseFakeEvent(t,this._getFakeEventsMap().move,e):null!=t.returnValue?t.returnValue:!t.defaultPrevented):null},_gestureEnd:function(t,e){return this.__validateNbTouches(t)?(this._disconnectAdditionalTouchEvents(),this._connectTouchEvents(),this.currentData={positions:aria.touch.Event.getPositions(t),time:(new Date).getTime()},this._getFakeEventsMap().end?this._raiseFakeEvent(t,this._getFakeEventsMap().end,e):null!=t.returnValue?t.returnValue:!t.defaultPrevented):null},_gestureCancel:function(t,e){return this._disconnectAdditionalTouchEvents(),this._connectTouchEvents(),this.currentData={positions:aria.touch.Event.getPositions(t),time:(new Date).getTime()},this._getFakeEventsMap().cancel?this._raiseFakeEvent(t,this._getFakeEventsMap().cancel,e):null!=t.returnValue?t.returnValue:!t.defaultPrevented},_connectAdditionalTouchEvents:function(){for(var t=this._getAdditionalListenersList(),e=0;t.length>e;e++)this._addListener(t[e].evt,t[e].cb)},_disconnectAdditionalTouchEvents:function(){for(var t=this._getAdditionalListenersList(),e=0;t.length>e;e++)this._removeListener(t[e].evt,t[e].cb)},_addListener:function(t,e){aria.utils.Event.addListener(this.body,t,e)},_removeListener:function(t,e){aria.utils.Event.removeListener(this.body,t,e)},_raiseFakeEvent:function(t,e,i){var s=t.target?t.target:t.srcElement,a=aria.DomEvent.getFakeEvent(e,s);t.returnValue||a.preventDefault(),t.cancelBubble&&a.stopPropagation(),a.pageX=t.pageX,a.pageY=t.pageY,a.clientX=t.clientX,a.clientY=t.clientY,a.touches=t.touches,a.changedTouches=t.changedTouches,a.isPrimary=t.isPrimary,this.startData&&this.startData.time&&(a.duration=(new Date).getTime()-this.startData.time),i||(i={}),i.startX=this.startData.positions[0].x,i.startY=this.startData.positions[0].y;var n=aria.touch.Event.getPositions(t);return i.currentX=n[0].x,i.currentY=n[0].y,a.detail=i,aria.utils.Delegate.delegate(a),t.cancelBubble=a.hasStopPropagation,t.returnValue=!a.hasPreventDefault,t.returnValue},_calculateDistance:function(t,e,i,s){return Math.sqrt(Math.pow(i-t,2)+Math.pow(s-e,2))},__validateNbTouches:function(t){var e=aria.touch.Event.getFingerIndex(t);return 1==this.NB_TOUCHES&&0===e||2==this.NB_TOUCHES&&e>=0}}});
//*******************
//LOGICAL-PATH:aria/touch/DoubleTap.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.DoubleTap",$extends:"aria.touch.Gesture",$statics:{MARGIN:10,BETWEEN_DELAY:200},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._doubleTapStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._doubleTapMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._doubleTapEnd,scope:this}}]},_getFakeEventsMap:function(){return{doubletapstart:"doubletapstart",cancel:"doubletapcancel",finalize:"doubletap"}},_doubleTapStart:function(t){var e=this._gestureStart(t);return null==e?this.timerId?this._doubleTapCancel(t):null!=t.returnValue?t.returnValue:!t.defaultPrevented:this.timerId?(aria.core.Timer.cancelCallback(this.timerId),e):this._raiseFakeEvent(t,this._getFakeEventsMap().doubletapstart)},_doubleTapMove:function(t){var e=aria.touch.Event.getPositions(t);if(this.MARGIN>=this._calculateDistance(this.startData.positions[0].x,this.startData.positions[0].y,e[0].x,e[0].y)){var i=this._gestureMove(t);return null==i?this._doubleTapCancel(t):i}return this._doubleTapCancel(t)},_doubleTapEnd:function(t){var e=this._gestureEnd(t);return null==e?this._doubleTapCancel(t):this.timerId?(this.timerId=null,this._raiseFakeEvent(t,this._getFakeEventsMap().finalize)):(this.timerId=aria.core.Timer.addCallback({fn:this._doubleTapFinalCancel,scope:this,delay:this.BETWEEN_DELAY,args:t}),e)},_doubleTapCancel:function(t){return this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._gestureCancel(t)},_doubleTapFinalCancel:function(t){return this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._raiseFakeEvent(t,this._getFakeEventsMap().cancel)}}});
//*******************
//LOGICAL-PATH:aria/touch/Drag.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Drag",$extends:"aria.touch.Gesture",$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._dragStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._dragMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._dragEnd,scope:this}}]},_getFakeEventsMap:function(){return{dragstart:"dragstart",dragmove:"dragmove",dragend:"drag",cancel:"dragcancel"}},_dragStart:function(t){var e=null!=this.currentData,i=this._gestureStart(t);return null==i&&e?(this.currentData={positions:aria.touch.Event.getPositions(t),time:(new Date).getTime()},this._raiseFakeEvent(t,this._getFakeEventsMap().cancel)):null==i?null!=t.returnValue?t.returnValue:!t.defaultPrevented:i},_dragMove:function(t){var e=null!=this.currentData,i=this._gestureMove(t);if(null!=i){var s=this._getFakeEventsMap().dragstart;return e&&(s=this._getFakeEventsMap().dragmove),this._raiseFakeEvent(t,s)}return this.currentData=null,e?this._gestureCancel(t):null!=t.returnValue?t.returnValue:!t.defaultPrevented},_dragEnd:function(t){var e=null!=this.currentData,i=this._gestureEnd(t);return e?null==i?null!=t.returnValue?t.returnValue:!t.defaultPrevented:this._raiseFakeEvent(t,this._getFakeEventsMap().dragend):null!=t.returnValue?t.returnValue:!t.defaultPrevented}}});
//*******************
//LOGICAL-PATH:aria/touch/LongPress.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.LongPress",$extends:"aria.touch.Gesture",$statics:{MARGIN:10,PRESS_DURATION:1e3},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._longPressStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._longPressMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._longPressCancel,scope:this}}]},_getFakeEventsMap:function(){return{start:"longpressstart",cancel:"longpresscancel",finalize:"longpress"}},_longPressStart:function(t){var e=this._gestureStart(t);return null!=e?(this.timerId=aria.core.Timer.addCallback({fn:this._longPressFinalize,scope:this,delay:this.PRESS_DURATION,args:t}),e):this.timerId?this._longPressCancel(t):null!=t.returnValue?t.returnValue:!t.defaultPrevented},_longPressMove:function(t){var e=aria.touch.Event.getPositions(t);if(this.MARGIN>=this._calculateDistance(this.startData.positions[0].x,this.startData.positions[0].y,e[0].x,e[0].y)){var i=this._gestureMove(t);return null==i?this._longPressCancel(t):i}return this._longPressCancel(t)},_longPressCancel:function(t){return this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._gestureCancel(t)},_longPressFinalize:function(t){this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._gestureEnd(t),this._raiseFakeEvent(t,this._getFakeEventsMap().finalize)}}});
//*******************
//LOGICAL-PATH:aria/touch/Pinch.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Pinch",$extends:"aria.touch.Gesture",$statics:{NB_TOUCHES:2},$events:{pinchstart:"",pinchmove:"",pinchend:"",pinchcancel:""},$constructor:function(){this.$Gesture.constructor.call(this),this.lastKnownAngle=null,this.initialPinchData=null,this.primaryPoint=null,this.secondaryPoint=null},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._pinchStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._pinchMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._pinchEnd,scope:this}}]},_getFakeEventsMap:function(){return{start:"pinchstart",move:"pinchmove",end:"pinch",cancel:"pinchcancel"}},_pinchStart:function(t){if(t.touches&&t.touches.length>=2){var e=aria.touch.Event.getPositions(t);this.primaryPoint=e[0],this.secondaryPoint=e[1]}else t.isPrimary?this.primaryPoint=aria.touch.Event.getPositions(t)[0]:t.isPrimary!==void 0&&t.isPrimary===!1&&(this.secondaryPoint=aria.touch.Event.getPositions(t)[0]);if(t.touches&&t.touches.length>=2||t.isPrimary!==void 0&&t.isPrimary===!1){var i=this._calculateDistance(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y),s=this.__calculateAngle(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y);return this.initialPinchData={distance:i,dVariation:0,angle:s},this.lastKnownAngle=s,this.$raiseEvent({name:"pinchstart",distance:i,dVariation:0,angle:s,originalEvent:t}),this._gestureStart(t,this.initialPinchData)}return null!=t.returnValue?t.returnValue:!t.defaultPrevented},_pinchMove:function(t){if(t.touches&&t.touches.length>=2){var e=aria.touch.Event.getPositions(t);this.primaryPoint=e[0],this.secondaryPoint=e[1]}else{if(void 0===t.isPrimary)return this.$raiseEvent({name:"pinchcancel"}),this._gestureCancel(t);t.isPrimary?this.primaryPoint=aria.touch.Event.getPositions(t):this.secondaryPoint=aria.touch.Event.getPositions(t)}var i=this._calculateDistance(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y),s=this.__calculateAngle(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y);this.lastKnownAngle=s;var a={distance:i,dVariation:i-this.initialPinchData.distance,angle:s};return this.$raiseEvent({name:"pinchmove",distance:i,dVariation:i-this.initialPinchData.distance,angle:s,originalEvent:t}),this._gestureMove(t,a)},_pinchEnd:function(t){if(t.touches&&t.changedTouches&&(t.changedTouches.length||0)+(t.touches.length||0)>=2){var e=aria.touch.Event.getPositions(t);this.primaryPoint=e[0],this.secondaryPoint=e[1]}if(t.isPrimary!==void 0&&(t.isPrimary?this.primaryPoint=aria.touch.Event.getPositions(t):this.secondaryPoint=aria.touch.Event.getPositions(t)),t.touches&&t.changedTouches&&(t.changedTouches.length||0)+(t.touches.length||0)>=2||t.isPrimary!==void 0){var i=this._calculateDistance(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y),s=this.__calculateAngle(this.primaryPoint.x,this.primaryPoint.y,this.secondaryPoint.x,this.secondaryPoint.y);Math.abs(s-this.lastKnownAngle)>150&&(s=this.__calculateAngle(this.secondaryPoint.x,this.secondaryPoint.y,this.primaryPoint.x,this.primaryPoint.y));var a={distance:i,dVariation:i-this.initialPinchData.distance,angle:s};return this.$raiseEvent({name:"pinchend",distance:i,dVariation:i-this.initialPinchData.distance,angle:s,originalEvent:t}),this._gestureEnd(t,a)}return this.$raiseEvent({name:"pinchcancel"}),this._gestureCancel(t)},__calculateAngle:function(t,e,i,s){return 180*Math.atan2(s-e,i-t)/Math.PI}}});
//*******************
//LOGICAL-PATH:aria/touch/SingleTap.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.SingleTap",$extends:"aria.touch.Gesture",$statics:{MARGIN:10,FINAL_DELAY:250},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._singleTapStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._singleTapMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._singleTapEnd,scope:this}}]},_getFakeEventsMap:function(){return{start:"singletapstart",cancel:"singletapcancel",finalize:"singletap"}},_singleTapStart:function(t){if(this.timerId)return this._singleTapFinalCancel(t);var e=this._gestureStart(t);return null==e?null!=t.returnValue?t.returnValue:!t.defaultPrevented:e},_singleTapMove:function(t){var e=aria.touch.Event.getPositions(t);if(this.MARGIN>=this._calculateDistance(this.startData.positions[0].x,this.startData.positions[0].y,e[0].x,e[0].y)){var i=this._gestureMove(t);return null==i?this._singleTapCancel(t):i}return this._singleTapCancel(t)},_singleTapEnd:function(t){var e=this._gestureEnd(t);return null!=e?(this.timerId=aria.core.Timer.addCallback({fn:this._singleTapFinalize,scope:this,delay:this.FINAL_DELAY,args:t}),e):this._singleTapCancel(t)},_singleTapCancel:function(t){return this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._gestureCancel(t)},_singleTapFinalize:function(t){this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._raiseFakeEvent(t,this._getFakeEventsMap().finalize)},_singleTapFinalCancel:function(t){return this.timerId&&(aria.core.Timer.cancelCallback(this.timerId),this.timerId=null),this._raiseFakeEvent(t,this._getFakeEventsMap().cancel)}}});
//*******************
//LOGICAL-PATH:aria/touch/Swipe.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Swipe",$extends:"aria.touch.Gesture",$statics:{MARGIN:20},$events:{swipestart:"",swipemove:"",swipeend:"",swipecancel:""},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._swipeStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._swipeMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._swipeEnd,scope:this}}]},_getFakeEventsMap:function(){return{start:"swipestart",move:"swipemove",end:"swipe",cancel:"swipecancel"}},_swipeStart:function(t){var e=this._gestureStart(t);return null!=e?(this.$raiseEvent({name:"swipestart",startX:this.startData.positions[0].x,startY:this.startData.positions[0].y,originalEvent:t}),e):null!=t.returnValue?t.returnValue:!t.defaultPrevented},_swipeMove:function(t){var e=this._getRoute(this.startData.positions[0],aria.touch.Event.getPositions(t)[0]);if(e){var i=this._gestureMove(t,e);return null!=i?(this.$raiseEvent({name:"swipemove",route:e,originalEvent:t}),i):this._swipeCancel(t)}return this._swipeCancel(t)},_swipeEnd:function(t){var e=this._getRoute(this.startData.positions[0],aria.touch.Event.getPositions(t)[0]);if(e){var i=this._gestureEnd(t,e);return null!=i?(this.$raiseEvent({name:"swipeend",route:e,originalEvent:t}),i):this._swipeCancel(t)}return this._swipeCancel(t)},_swipeCancel:function(t){return this.$raiseEvent({name:"swipecancel"}),this._gestureCancel(t)},_getRoute:function(t,e){var i=e.x-t.x,s=e.y-t.y,a=Math.abs(i),n=Math.abs(s),r=n>a&&this.MARGIN>=a,o=a>n&&this.MARGIN>=n;return r?{direction:0>s?"up":"down",distance:n,startX:t.x,startY:t.y,endX:e.x,endY:e.y}:o?{direction:0>i?"left":"right",distance:a,startX:t.x,startY:t.y,endX:e.x,endY:e.y}:!1}}});
//*******************
//LOGICAL-PATH:aria/touch/Tap.js
//*******************
Aria.classDefinition({$singleton:!0,$classpath:"aria.touch.Tap",$extends:"aria.touch.Gesture",$statics:{MARGIN:10},$prototype:{_getInitialListenersList:function(){return[{evt:this.touchEventMap.touchstart,cb:{fn:this._tapStart,scope:this}}]},_getAdditionalListenersList:function(){return[{evt:this.touchEventMap.touchmove,cb:{fn:this._tapMove,scope:this}},{evt:this.touchEventMap.touchend,cb:{fn:this._tapEnd,scope:this}}]},_getFakeEventsMap:function(){return{start:"tapstart",end:"tap",cancel:"tapcancel"}},_tapStart:function(t){var e=this._gestureStart(t);return null==e?null!=t.returnValue?t.returnValue:!t.defaultPrevented:e},_tapMove:function(t){var e=aria.touch.Event.getPositions(t);if(this.MARGIN>=this._calculateDistance(this.startData.positions[0].x,this.startData.positions[0].y,e[0].x,e[0].y)){var i=this._gestureMove(t);return null==i?this._gestureCancel(t):i}return this._gestureCancel(t)},_tapEnd:function(t){var e=this._gestureEnd(t);return null==e?this._gestureCancel(t):null!=t.returnValue?t.returnValue:!t.defaultPrevented}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/DoubleSliderCSS.tpl.css
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.DoubleSliderCSS",$extends:"aria.templates.CSSTemplate",$constructor:function(){this.$CSSTemplate.constructor.call(this)},$destructor:function(){this.$CSSTemplate.$destructor.call(this)},$prototype:{macro_main:function(){try{with(this)this.__$write("\n\ndiv.touchLibSlider {\nbackground: none repeat scroll 0 0 #EFF9FF;\nborder: 2px solid #999999;\nborder-radius: 1.5em;\nheight: 17px;\n}\ndiv.touchLibSlider span {\nposition: absolute;\n}\ndiv.touchLibSlider span.sliderButton {\nbackground: none repeat scroll 0 0 #ffffff;\nborder: 2px solid #4776A7;\nborder-radius: 32px 32px 32px 32px;\nwidth: 14px;\n}\ndiv.touchLibSlider span.firstPoint {\nborder: 2px solid #4776A7;\nbackground-color:#4776A7;\nborder-radius: 1.5em 2px 2px 1.5em;\nwidth: 15px;\nheight: 24px;\nz-index: 3;\nmargin: 0;\n}\ndiv.touchLibSlider span.secondPoint {\nborder: 2px solid #4776A7;\nbackground-color: #4776A7;\nborder-radius: 2px 1.5em 1.5em 2px;\nwidth: 15px;\nheight: 24px;\nz-index: 3;\nmargin: 0;\n}\ndiv.touchLibSlider span.touchContainer {\nz-index: 2;\nheight: 28px;\nmargin: -6px 0 0 0;\n}\ndiv.touchLibSlider span.sliderHighLight {\nz-index: 1;\nheight: 17px;\nwidth: 0px;\nbackground-color: #E3E3E3;\nmargin: 6px 0 0;\n}\n\n",22)}catch(_ex){this.$logError(this.EXCEPTION_IN_MACRO,["main",this["aria:currentLineNumber"]],_ex)}},$init:function(t){t.__$csslibs={},t.__$prefix=!0},__$initTemplate:function(){return!0}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/SliderCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.touch.widgets.SliderCfgBeans",$namespaces:{json:"aria.core.JsonTypes",common:"aria.widgetLibs.CommonBeans"},$beans:{SliderCfg:{$type:"json:Object",$properties:{id:{$type:"json:String"},width:{$type:"json:Integer",$default:100},bindValue:{$type:"json:Object",$properties:{inside:{$type:"json:ObjectRef",$mandatory:!0},to:{$type:"json:String",$mandatory:!0}}}}},DoubleSliderCfg:{$type:"json:Object",$properties:{id:{$type:"json:String"},width:{$type:"json:Integer",$default:100},bind:{$type:"json:Object",$properties:{value:{$type:"json:Object",$properties:{inside:{$type:"json:ObjectRef",$mandatory:!0},to:{$type:"json:String",$mandatory:!0}}}}},onchange:{$type:"common:Callback"}}}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/DoubleSlider.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.DoubleSlider",$extends:"aria.widgetLibs.BaseWidget",$css:["aria.touch.widgets.DoubleSliderCSS"],$statics:{INVALID_CONFIGURATION:"Invalid configuration for the slider!"},$dependencies:["aria.touch.widgets.SliderCfgBeans","aria.utils.Dom","aria.utils.Type","aria.utils.Mouse"],$constructor:function(t,e){if(this.$BaseWidget.constructor.apply(this,arguments),this._cfgOk=aria.core.JsonValidator.validateCfg("aria.touch.widgets.SliderCfgBeans.DoubleSliderCfg",t),this._cfgOk){this._firstWidth=0,this._secondWidth=0,this._railWidth=0,this.value=[0,0],this._oldValue=[0,0],this._readValue(),this._firstSlider=null,this._secondSlider=null,this._domElt=null,this._hightlight=null,this._geometry=null,this._initialDrag=0;var i=this._cfg.bind?this._cfg.bind.value:null;this._binding=i,i&&(this._bindingCallback={fn:this._notifyDataChange,scope:this},aria.utils.Json.addListener(i.inside,i.to,this._bindingCallback,!1)),this._savedX1=0,this._savedX2=0,this._domId=t.id?e.$getId(t.id):this._createDynamicId(),this._firstDomId=this._domId+"_first",this._secondDomId=this._domId+"_second",this._draggable=[]}},$destructor:function(){if(this._binding){var t=this._binding;aria.utils.Json.removeListener(t.inside,t.to,this._bindingCallback,!1),this._bindingCallback=null}if(this._draggable)for(var e=0,i=this._draggable.length;i>e;e++)this._draggable[e].$dispose();this._draggable=null,this._firstSlider=null,this._secondSlider=null,this._domElt=null,this.$BaseWidget.$destructor.call(this)},$prototype:{getId:function(){return this._cfg.id},getDom:function(){return this._domElt.parentNode},writeMarkup:function(t){return this._cfgOk?(t.write(['<div class="touchLibSlider" style="width:',this._cfg.width,'px;">','<span class="touchContainer" style="width:',this._cfg.width,'px;" id="',this._domId,'">','<span id="',this._secondDomId,'" class="sliderButton secondPoint" style="left:0px;"></span>','<span id="',this._firstDomId,'" class="sliderButton firstPoint" style="left:0px;"></span>','<span class="sliderHighLight" id="',this._domId+"_hightlight",'"></span>',"</span></div>"].join("")),void 0):(this.initWidget=Aria.empty,t.write(this.INVALID_CONFIGURATION))},initWidget:function(){this._readValue(),this._firstSlider=aria.utils.Dom.getElementById(this._firstDomId),this._secondSlider=aria.utils.Dom.getElementById(this._secondDomId),this._domElt=aria.utils.Dom.getElementById(this._domId),this._hightlight=aria.utils.Dom.getElementById(this._domId+"_hightlight"),this._firstWidth=parseInt(aria.utils.Dom.getStyle(this._firstSlider,"width"),10),this._secondWidth=parseInt(aria.utils.Dom.getStyle(this._secondSlider,"width"),10),this._secondWidth+=parseInt(aria.utils.Dom.getStyle(this._secondSlider,"border-left-width"),10)||0,this._secondWidth+=parseInt(aria.utils.Dom.getStyle(this._secondSlider,"border-right-width"),10)||0,this._railWidth=this._cfg.width-this._firstWidth-this._secondWidth,this._geometry=aria.utils.Dom.getGeometry(this._domElt),this._setLeft(),this._updateDisplay(),this._loadAndCreateDraggable()},_readValue:function(){var t,e=this._binding;e&&(t=e.inside[e.to],aria.utils.Type.isArray(t)&&(this.value[0]=Math.max(0,Math.min(t[0],t[1],1)),this.value[1]=Math.min(1,Math.max(t[0],t[1],0))),aria.utils.Json.setValue(e.inside,e.to,this.value,this._bindingCallback))},_setLeft:function(){var t=Math.max(0,Math.min(this.value[0],this.value[1],1)),e=Math.min(1,Math.max(this.value[0],this.value[1],0));this._savedX1=Math.floor(t*this._railWidth),this._savedX2=Math.ceil(e*this._railWidth+this._firstWidth)},_updateDisplay:function(){this._firstSlider.style.left=this._savedX1+"px",this._secondSlider.style.left=this._savedX2+"px",this._updateHighlight()},_updateHighlight:function(){var t=this._savedX1+this._firstWidth,e=this._savedX2-t;this._hightlight.style.left=t+"px",this._hightlight.style.width=e+"px"},_notifyDataChange:function(){this._readValue(),this._setLeft(),this._updateDisplay()},_loadAndCreateDraggable:function(){aria.utils.dragdrop&&aria.utils.dragdrop.Drag?this._createSliderDrag():Aria.load({classes:["aria.utils.dragdrop.Drag"],oncomplete:{fn:this._createSliderDrag,scope:this}})},_createSliderDrag:function(){if(this._cfg)for(var t=[this._firstSlider,this._secondSlider],e=0,i=t.length;i>e;e++)this._draggable[e]=new aria.utils.dragdrop.Drag(t[e],{handle:t[e],proxy:null,axis:"x",constrainTo:this._domElt}),this._draggable[e].$on({dragstart:{fn:this._onDragStart,scope:this},move:{fn:this._onDragMove,scope:this},dragend:{fn:this._onDragEnd,scope:this}})},_onDragStart:function(t){this._oldValue=[this.value[0],this.value[1]],this._initialDrag=t.src.posX},_onDragMove:function(t){this._move(t.src)},_onDragEnd:function(t){this._move(t.src),this._initialDrag=null,(this._oldValue[0]!==this.value[0]||this._oldValue[1]!==this.value[1])&&this._cfg.onchange&&this._context.evalCallback(this._cfg.onchange)},_move:function(t){var e=t.posX-this._initialDrag;if(t.id===this._firstDomId){var i=this._savedX2-this._firstWidth;this._savedX1+e>=i?this._savedX1=i:(this._savedX1+=e,this._initialDrag=t.posX)}else{var i=this._savedX1+this._firstWidth;i>=this._savedX2+e?this._savedX2=i:(this._savedX2+=e,this._initialDrag=t.posX)}this._updateHighlight(),this._setValue()},_setValue:function(){var t=this._savedX1,e=this._savedX2,i=Math.max(t/this._railWidth,0),s=Math.min((e-this._firstWidth)/this._railWidth,1);if(this.value[0]!==i||this.value[1]!==s){this.value=[i,s];var a=this._binding;aria.utils.Json.setValue(a.inside,a.to,this.value)}else this._notifyDataChange()}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/SliderCSS.tpl.css
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.SliderCSS",$extends:"aria.templates.CSSTemplate",$constructor:function(){this.$CSSTemplate.constructor.call(this)},$destructor:function(){this.$CSSTemplate.$destructor.call(this)},$prototype:{macro_main:function(){try{with(this)this.__$write("\n\ndiv.touchLibSlider {\nbackground: none repeat scroll 0 0 #EFF9FF;\nborder: 2px solid #999999;\nborder-radius: 32px 32px 32px 32px;\nheight: 17px;\n}\n\ndiv.touchLibSlider span {\nposition: absolute;\n}\n\ndiv.touchLibSlider span.sliderButton {\nbackground: none repeat scroll 0 0 #ffffff;\nborder: 2px solid #4776A7;\nborder-radius: 32px 32px 32px 32px;\nwidth: 14px;\n}\n\n",22)}catch(_ex){this.$logError(this.EXCEPTION_IN_MACRO,["main",this["aria:currentLineNumber"]],_ex)}},$init:function(t){t.__$csslibs={},t.__$prefix=!0},__$initTemplate:function(){return!0}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/Slider.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.Slider",$extends:"aria.widgetLibs.BaseWidget",$css:["aria.touch.widgets.SliderCSS"],$statics:{BUTTON_WIDTH:14},$dependencies:["aria.touch.widgets.SliderCfgBeans","aria.touch.Swipe"],$constructor:function(t){if(this.$BaseWidget.constructor.apply(this,arguments),this._cfgOk=aria.core.JsonValidator.validateCfg("aria.touch.widgets.SliderCfgBeans.SliderCfg",t),this._cfgOk){this._maxLeftPosition=this._cfg.width-this.BUTTON_WIDTH,10>this._maxLeftPosition&&(this._maxLeftPosition=10);var e=this._cfg.bindValue;e&&(this._bindingCallback={fn:this._notifyDataChange,scope:this},aria.utils.Json.addListener(e.inside,e.to,this._bindingCallback,!1)),this._value=null,this._readValue(),this._leftPosition=null,this._setLeftPosition(this._value*this._maxLeftPosition),this._domId=this._createDynamicId(),this._parentDomId=this._createDynamicId(),this._domElt=null,this._savedX=null,this._needUpdate=!1;var i=aria.utils.AriaWindow;i.$on({attachWindow:this._attachBodyEvents,detachWindow:this._detachBodyEvents,scope:this}),i.isWindowUsed&&this._attachBodyEvents()}},$destructor:function(){if(this._detachBodyEvents(),this._bindingCallback){var t=this._cfg.bindValue;aria.utils.Json.removeListener(t.inside,t.to,this._bindingCallback,!1),this._bindingCallback=null}this._domElt=null,this._cfgOk=null,this._maxLeftPosition=null,this._cfg=null,this._value=null,this._leftPosition=null,this._domId=null,this._savedX=null,this._needUpdate=null,this.$BaseWidget.$destructor.call(this)},$prototype:{writeMarkup:function(t){if(this._cfgOk){var e=['<div class="touchLibSlider" style="width:',this._maxLeftPosition+this.BUTTON_WIDTH,'px;" id="',this._parentDomId,'"><span id="',this._domId,'" class="sliderButton" style="left:',this._leftPosition,'px;">&nbsp;</span></div>'];t.write(e.join(""))}},_attachBodyEvents:function(){aria.touch.Swipe.$on({swipestart:{fn:this._dom_onswipestart,scope:this},swipecancel:{fn:this._dom_onswipecancel,scope:this}})},_detachBodyEvents:function(){aria.touch.Swipe.$unregisterListeners(this)},_dom_onswipestart:function(t){var e=this.getButtonDom(),i=t.originalEvent.target?t.originalEvent.target:t.originalEvent.srcElement;i.id===e.id&&(t.originalEvent.preventDefault?t.originalEvent.preventDefault():t.originalEvent.returnValue=!1,this._savedX=t.startX,this._updateDisplay(),aria.touch.Swipe.$on({swipemove:{fn:this._dom_onswipemove,scope:this},swipeend:{fn:this._dom_onswipeend,scope:this}}))},_dom_onswipemove:function(t){var e=this.getButtonDom(),i=t.originalEvent.target?t.originalEvent.target:t.originalEvent.srcElement;if(i.id===e.id||e.parentNode.id&&i.id===e.parentNode.id){t.originalEvent.preventDefault?t.originalEvent.preventDefault():t.originalEvent.returnValue=!1;var s=t.route.endX-this._savedX,a=this._leftPosition;this._setLeftPosition(this._leftPosition+s),this._savedX+=this._leftPosition-a,this._updateDisplay(),this._setValue(this._leftPosition/this._maxLeftPosition)}},_dom_onswipeend:function(t){this._dom_onswipecancel();var e=this.getButtonDom(),i=t.originalEvent.target?t.originalEvent.target:t.originalEvent.srcElement;i.id===e.id&&(t.originalEvent.preventDefault?t.originalEvent.preventDefault():t.originalEvent.returnValue=!1,this._updateDisplay(),this._setValue(this._leftPosition/this._maxLeftPosition))},_dom_onswipecancel:function(){this._detachBodyEvents(),this._attachBodyEvents()},_setLeftPosition:function(t){t>this._maxLeftPosition?t=this._maxLeftPosition:0>t&&(t=0),this._leftPosition=t},_setValue:function(t){if(t!==this._value){this._value=t;var e=this._cfg.bindValue;e&&aria.utils.Json.setValue(e.inside,e.to,t)}},_readValue:function(){var t=this._value,e=this._cfg.bindValue;e&&(t=e.inside[e.to]),null===t&&(t=0),0>t&&(t=0),t>1&&(t=1),this._value=t},_notifyDataChange:function(){this._readValue(),this._setLeftPosition(this._value*this._maxLeftPosition),this._updateDisplay()},_updateDisplay:function(){var t=this.getButtonDom();if(!t)return this._needUpdate=!0,void 0;var e="sliderButton";e+=" down",t.className!=e&&(t.className=e);var i=this._leftPosition+"px";t.style.left!=i&&(t.style.left=i)},initWidget:function(){this._needUpdate&&this._updateDisplay()},getButtonDom:function(){var t=this._domElt;return null===t&&(t=aria.utils.Dom.getElementById(this._domId),this._domElt=t),t},getDom:function(){var t=this.getButtonDom();return t.parentNode}}});
//*******************
//LOGICAL-PATH:aria/touch/widgets/TouchWidgetLib.js
//*******************
Aria.classDefinition({$classpath:"aria.touch.widgets.TouchWidgetLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{Slider:"aria.touch.widgets.Slider",DoubleSlider:"aria.touch.widgets.DoubleSlider"}}});