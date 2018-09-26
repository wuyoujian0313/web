/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
!function(){CKEDITOR.on("dialogDefinition",function(e){var t,n=e.data.name,r=e.data.definition;"link"==n?(r.removeContents("target"),r.removeContents("upload"),r.removeContents("advanced"),(t=r.getContents("info")).remove("emailSubject"),t.remove("emailBody")):"image"==n&&(r.removeContents("advanced"),(t=r.getContents("Link")).remove("cmbTarget"),(t=r.getContents("info")).remove("txtAlt"),t.remove("basic"))});var c={b:"strong",u:"u",i:"em",color:"span",size:"span",quote:"blockquote",code:"code",url:"a",email:"span",img:"span","*":"li",list:"ol"},m={strong:"b",b:"b",u:"u",em:"i",i:"i",code:"code",li:"*"},p={strong:"b",em:"i",u:"u",li:"*",ul:"list",ol:"list",code:"code",a:"link",img:"img",blockquote:"quote"},f={color:"color",size:"font-size"},h={url:"href",email:"mailhref",quote:"cite",list:"listType"},e=CKEDITOR.dtd,g=CKEDITOR.tools.extend({table:1},e.$block,e.$listItem,e.$tableContent,e.$list),r=/\s*(?:;\s*|$)/;function d(e){var t="";for(var n in e){t+=(n+":"+e[n]).replace(r,";")}return t}var b={smiley:":)",sad:":(",wink:";)",laugh:":D",cheeky:":P",blush:":*)",surprise:":-o",indecision:":|",angry:">:(",angel:"o:)",cool:"8-)",devil:">:-)",crying:";(",kiss:":-*"},a={},s=[];for(var t in b)a[b[t]]=t,s.push(b[t].replace(/\(|\)|\:|\/|\*|\-|\|/g,function(e){return"\\"+e}));s=new RegExp(s.join("|"),"g");var n=function(){var t=[],n={nbsp:" ",shy:"­"};for(var e in n)t.push(e);return t=new RegExp("&("+t.join("|")+");","g"),function(e){return e.replace(t,function(e,t){return n[t]})}}();CKEDITOR.BBCodeParser=function(){this._={bbcPartsRegex:/(?:\[([^\/\]=]*?)(?:=([^\]]*?))?\])|(?:\[\/([a-z]{1,16})\])/gi}},CKEDITOR.BBCodeParser.prototype={parse:function(e){for(var t,n,r=0;t=this._.bbcPartsRegex.exec(e);){var i=t.index;if(r<i){var a=e.substring(r,i);this.onText(a,1)}if(r=this._.bbcPartsRegex.lastIndex,!(n=(t[1]||t[3]||"").toLowerCase())||c[n])if(t[1]){var s=c[n],l={},o={},u=t[2];u&&("list"==n&&(isNaN(u)?/^[a-z]+$/.test(u)?u="lower-alpha":/^[A-Z]+$/.test(u)&&(u="upper-alpha"):u="decimal"),f[n]?("size"==n&&(u+="%"),o[f[n]]=u,l.style=d(o)):h[n]&&(l[h[n]]=CKEDITOR.tools.htmlDecode(u))),"email"!=n&&"img"!=n||(l.bbcode=n),this.onTagOpen(s,l,CKEDITOR.dtd.$empty[s])}else t[3]&&this.onTagClose(c[n]);else this.onText(t[0])}e.length>r&&this.onText(e.substring(r,e.length),1)}},CKEDITOR.htmlParser.fragment.fromBBCode=function(e){var l,o=new CKEDITOR.BBCodeParser,i=new CKEDITOR.htmlParser.fragment,u=[],c=0,f=i;function h(e){if(0<u.length)for(var t=0;t<u.length;t++){var n=u[t],r=n.name,i=CKEDITOR.dtd[r],a=f.name&&CKEDITOR.dtd[f.name];a&&!a[r]||e&&i&&!i[e]&&CKEDITOR.dtd[e]||((n=n.clone()).parent=f,f=n,u.splice(t,1),t--)}}function d(e,t){var n=f.children.length,r=0<n&&f.children[n-1],i=!r&&v.getRule(p[f.name],"breakAfterOpen"),a=r&&r.type==CKEDITOR.NODE_ELEMENT&&v.getRule(p[r.name],"breakAfterClose"),s=e&&v.getRule(p[e],t?"breakBeforeClose":"breakBeforeOpen");c&&(i||a||s)&&c--,c&&e in g&&c++;for(;c&&c--;)f.children.push(r=new CKEDITOR.htmlParser.element("br"))}function m(e,t){d(e.name,1);var n=(t=t||f||i).children.length,r=0<n&&t.children[n-1]||null;e.previous=r,(e.parent=t).children.push(e),e.returnPoint&&(f=e.returnPoint,delete e.returnPoint)}for(o.onTagOpen=function(e,t){var n=new CKEDITOR.htmlParser.element(e,t);if(CKEDITOR.dtd.$removeEmpty[e])u.push(n);else{var r=f.name,i=r&&(CKEDITOR.dtd[r]||(f._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span));if(i&&!i[e]){var a,s=!1;if(e==r?m(f,f.parent):s=(e in CKEDITOR.dtd.$listItem?(o.onTagOpen("ul",{}),a=f):(m(f,f.parent),u.unshift(f)),!0),f=a||(f.returnPoint||f.parent),s)return void o.onTagOpen.apply(this,arguments)}h(e),d(e),n.parent=f,n.returnPoint=l,l=0,n.isEmpty?m(n):f=n}},o.onTagClose=function(e){for(var t=u.length-1;0<=t;t--)if(e==u[t].name)return void u.splice(t,1);for(var n=[],r=[],i=f;i.type&&i.name!=e;)i._.isBlockLike||r.unshift(i),n.push(i),i=i.parent;if(i.type){for(t=0;t<n.length;t++){var a=n[t];m(a,a.parent)}m(f=i,i.parent),i==f&&(f=f.parent),u=u.concat(r)}},o.onText=function(e){var t=CKEDITOR.dtd[f.name];t&&!t["#"]||(d(),h(),e.replace(/(\r\n|[\r\n])|[^\r\n]*/g,function(n,e){if(e!==undefined&&e.length)c++;else if(n.length){var r=0;n.replace(s,function(e,t){m(new CKEDITOR.htmlParser.text(n.substring(r,t)),f),m(new CKEDITOR.htmlParser.element("smiley",{desc:a[e]}),f),r=t+e.length}),r!=n.length&&m(new CKEDITOR.htmlParser.text(n.substring(r,n.length)),f)}}))},o.parse(CKEDITOR.tools.htmlEncode(e));f.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT;){var t=f.parent;m(f,t),f=t}return i};var v=new(CKEDITOR.tools.createClass({$:function(){this._={output:[],rules:[]},this.setRules("list",{breakBeforeOpen:1,breakAfterOpen:1,breakBeforeClose:1,breakAfterClose:1}),this.setRules("*",{breakBeforeOpen:1,breakAfterOpen:0,breakBeforeClose:1,breakAfterClose:0}),this.setRules("quote",{breakBeforeOpen:1,breakAfterOpen:0,breakBeforeClose:0,breakAfterClose:1})},proto:{setRules:function(e,t){var n=this._.rules[e];n?CKEDITOR.tools.extend(n,t,!0):this._.rules[e]=t},getRule:function(e,t){return this._.rules[e]&&this._.rules[e][t]},openTag:function(e){e in c&&(this.getRule(e,"breakBeforeOpen")&&this.lineBreak(1),this.write("[",e))},openTagClose:function(e){"br"==e?this._.output.push("\n"):e in c&&(this.write("]"),this.getRule(e,"breakAfterOpen")&&this.lineBreak(1))},attribute:function(e,t){"option"==e&&this.write("=",t)},closeTag:function(e){e in c&&(this.getRule(e,"breakBeforeClose")&&this.lineBreak(1),"*"!=e&&this.write("[/",e,"]"),this.getRule(e,"breakAfterClose")&&this.lineBreak(1))},text:function(e){this.write(e)},comment:function(){},lineBreak:function(){!this._.hasLineBreak&&this._.output.length&&(this.write("\n"),this._.hasLineBreak=1)},write:function(){this._.hasLineBreak=0;var e=Array.prototype.join.call(arguments,"");this._.output.push(e)},reset:function(){this._.output=[],this._.hasLineBreak=0},getHtml:function(e){var t=this._.output.join("");return e&&this.reset(),t=(t=n(t)).replace(/\u00A0/gi," ")}}}));CKEDITOR.plugins.add("bbcode",{requires:"entities",beforeInit:function(e){var t=e.config;CKEDITOR.tools.extend(t,{enterMode:CKEDITOR.ENTER_BR,basicEntities:!1,entities:!1,fillEmptyBlocks:!1},!0),e.filter.disable(),e.activeEnterMode=e.enterMode=CKEDITOR.ENTER_BR},init:function(d){var i=d.config;var a=new CKEDITOR.htmlParser.filter;function e(e){var t=e.data.dataValue;e.data.dataValue=function r(e){var t=CKEDITOR.htmlParser.fragment.fromBBCode(e),n=new CKEDITOR.htmlParser.basicWriter;return t.writeHtml(n,a),n.getHtml(!0)}(t)}a.addRules({elements:{blockquote:function(e){var t=new CKEDITOR.htmlParser.element("div");t.children=e.children,e.children=[t];var n=e.attributes.cite;if(n){var r=new CKEDITOR.htmlParser.element("cite");r.add(new CKEDITOR.htmlParser.text(n.replace(/^"|"$/g,""))),delete e.attributes.cite,e.children.unshift(r)}},span:function(e){var t;(t=e.attributes.bbcode)&&("img"==t?(e.name="img",e.attributes.src=e.children[0].value,e.children=[]):"email"==t&&(e.name="a",e.attributes.href="mailto:"+e.children[0].value),delete e.attributes.bbcode)},ol:function(e){e.attributes.listType?"decimal"!=e.attributes.listType&&(e.attributes.style="list-style-type:"+e.attributes.listType):e.name="ul",delete e.attributes.listType},a:function(e){e.attributes.href||(e.attributes.href=e.children[0].value)},smiley:function(e){e.name="img";var t=e.attributes.desc,n=i.smiley_images[CKEDITOR.tools.indexOf(i.smiley_descriptions,t)],r=CKEDITOR.tools.htmlEncode(i.smiley_path+n);e.attributes={src:r,"data-cke-saved-src":r,title:t,alt:t}}}}),d.dataProcessor.htmlFilter.addRules({elements:{$:function(e){var t,n=e.attributes,r=CKEDITOR.tools.parseCssText(n.style,1),i=e.name;if(i in m)i=m[i];else if("span"==i){if(t=r.color)i="color",t=CKEDITOR.tools.convertRgbToHex(t);else if(t=r["font-size"]){var a=t.match(/(\d+)%$/);a&&(t=a[1],i="size")}}else if("ol"==i||"ul"==i){if(t=r["list-style-type"])switch(t){case"lower-alpha":t="a";break;case"upper-alpha":t="A"}else"ol"==i&&(t=1);i="list"}else if("blockquote"==i){try{var s=e.children[0],l=e.children[1],o="cite"==s.name&&s.children[0].value;o&&(t='"'+o+'"',e.children=l.children)}catch(h){}i="quote"}else if("a"==i){if(t=n.href)if(-1!==t.indexOf("mailto:"))i="email",e.children=[new CKEDITOR.htmlParser.text(t.replace("mailto:",""))],t="";else{var u=1==e.children.length&&e.children[0];u&&u.type==CKEDITOR.NODE_TEXT&&u.value==t&&(t=""),i="url"}}else if("img"==i){e.isEmpty=0;var c=n["data-cke-saved-src"]||n.src,f=n.alt;if(c&&-1!=c.indexOf(d.config.smiley_path)&&f)return new CKEDITOR.htmlParser.text(b[f]);e.children=[new CKEDITOR.htmlParser.text(c)]}return e.name=i,t&&(e.attributes.option=t),null},br:function(e){var t=e.next;if(t&&t.name in g)return!1}}},1),d.dataProcessor.writer=v,d.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?d.once("contentDom",function(){d.on("setData",e)}):d.on("setData",e)},afterInit:function(i){var e;i._.elementsPath&&(e=i._.elementsPath.filters)&&e.push(function(e){var t=e.getName(),n=p[t]||!1;if("link"==n&&0===e.getAttribute("href").indexOf("mailto:"))n="email";else if("span"==t)e.getStyle("font-size")?n="size":e.getStyle("color")&&(n="color");else if("img"==n){var r=e.data("cke-saved-src")||e.getAttribute("src");r&&0===r.indexOf(i.config.smiley_path)&&(n="smiley")}return n})}})}();