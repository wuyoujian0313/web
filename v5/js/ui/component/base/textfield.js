/*!
 * textfield component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(n,e,l){"use strict";if(n&&"undefined"==typeof n.TextField){var t=l.createElement("input"),i="oninput"in t;t=null;var d=n.os.phone||!0===n.ratioPhone,s=/[\[\]\{\}"\/\\]+/,a=/[\[\]\{\}"\/\\]*/g,o=function(){return""==this.value||!s.test(""+this.value)||(this.value=(""+this.value).replace(a,""),!1)},u=function(e){if((13==e.keyCode||108==e.keyCode)&&!1===n.event.trigger("enterAction",null,this))return!1},r=function(e,t){var i=this;i.el=e&&1==e.nodeType?e:l.getElementById(e),i.el&&i.el.nodeType&&(i.id=n.attr(i.el,"id"))&&(t&&n.isObject(t)&&n.extend(i,t),n.attr(i.el,"x-wade-uicomponent")||n.attr(i.el,"x-wade-uicomponent","textfield"),i._init(),i.constructor.call(i))};r.prototype=n.extend(new n.UIComponent,{getDisabled:function(){return this.disabled},setDisabled:function(e){var t=this;t.el&&t.el.nodeType&&(t.disabled=!!e,t.el.disabled=t.disabled,setTimeout(function(){var e=t.el.className?t.el.className:"";t.disabled?(" "+e+" ").indexOf(" e_dis ")<0&&(t.el.className=n.trim(e+" e_dis")):(e=n.trim((" "+e+" ").replace(/ e_dis /gi," ")),t.el.className=e)},0))},destroy:function(){this.el=null},_init:function(){var e=this;e.disabled&&e.setDisabled(!0),i?n(e.el).bind("input",o):n(e.el).bind("keyup",o),d||n.os.pad||n(e.el).bind("keydown",u)}}),e.TextField=n.TextField=r}}(window.Wade,window,document);