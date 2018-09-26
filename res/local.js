/*----------------------- 公共方法 -----------------------*/
var isVirtualPhone;
function setVP (){
	if(top.document.body.offsetWidth < top.document.body.offsetHeight) {
		isVirtualPhone = true;
	} else {
		isVirtualPhone = false;
	}
	// alert(isVirtualPhone);
}
setTimeout(function(){setVP();},100)
window["onresize"] = function(){ setVP();}
// 外框业务部分显/隐
function openNav(url) {
	top.document.getElementById("mainFrame").style.display = "none";
	top.document.getElementById("loading").style.display = "";
	top.showPopup("popup","popup-main");
	setTimeout(function(){
		top.document.getElementById("mainFrame").src = url;
		top.document.getElementById("mainFrame").onload = function(){
			top.document.getElementById("loading").style.display = "none";
			top.document.getElementById("mainFrame").style.display = "";
		}
	},400)
}
function closeNav() {
	top.hidePopup("popup");
}
// 外框信息部分显/隐
// var frameInfoGroup = [];
// window.onload = function () {
// 	frameInfoGroup.push(get("UI-frameCust"));
// 	frameInfoGroup.push(get("UI-frameCart"));
// 	frameInfoGroup.push(get("UI-frameStaff"));
// }
// function hideFrameInfo() {
// 	for (var i = 0; i < frameInfoGroup.length; i++) {
// 		removeClass(frameInfoGroup[i],"m_main-show");
// 	}
// }
// function showFrameInfo(id) {
// 	hideFrameInfo();
// 	addClass(get(id),"m_main-show");
// 	get(id).style.zIndex = top.z + 1;
// 	top.z = top.z + 1;
// }
// 跨帧获取对象
function get(id) {
	if (document.getElementById(id)){ 
		return document.getElementById(id);
	} else if (parent.document.getElementById(id)) {
		return parent.document.getElementById(id);
	} else if (parent.parent.document.getElementById(id)) {
		return parent.parent.document.getElementById(id);
	} else {
		return false;
	}
}
function goto(url) {
	window.location.href = url;
}
function getNext(node) {
	if(node.nextSibling.nodeType == 3) {
		return node.nextSibling.nextSibling;
	} else {
		return node.nextSibling;
	}
}
function getPrev(node) {
	if(node.previousSibling.nodeType == 3) {
		return node.previousSibling.previousSibling;
	} else {
		return node.previousSibling;
	}
}
function show(el,str) {
	var o;
	typeof el == "object" ? o = el : o = get(el);
	o.style.display = "";
	if(str) {
		o.style.display = str;
	}
}
function hide(el) {
	var o;
	typeof el == "object" ? o = el : o = get(el);
	o.style.display = "none";
}
function toggle(els) {
	for (var i = 0; i < arguments.length; i++) {
		var o;
		var el = arguments[i];
		typeof el == "string" ? o = get(el) : o = el;
		// if(!display) {
			o.style.display == "none" ? o.style.display = "" : o.style.display = "none";
		// } else {
		// 	o.offsetHeight == 0 ? o.style.display = display : o.style.display = "none";
		// }
	};
}
function getDisTop(targetEl,scrollEl) {
	var targetO,scrollO;
	typeof targetEl == "object" ? targetO = targetEl : targetO = document.getElementById(targetEl);
	typeof scrollEl == "object" ? scrollO = scrollEl : scrollO = document.getElementById(scrollEl);
	var offset = targetO.getBoundingClientRect();
	var scrollOffset = scrollO.getBoundingClientRect();
	return offset.top - scrollOffset.top;
}
function toggleText(el,text1,text2) {
	var o;
	typeof el == "object" ? o = el : o = document.getElementById(el);
	if(o.innerText == text1) {
		o.innerText = text2;
	} else if (o.innerText == text2) {
		o.innerText = text1;
	} else {
		return false;
	}
}
function em2px(em) {
	
}
function resetChecks(el) {
	var o;
	typeof el == "object" ? o = el : o = document.getElementById(el);
	var checks = o.querySelectorAll("input[type='checkbox']");
	for (var i = 0; i < checks.length; i++) {
		checks[i].checked = false;
	};
}
function syncChecks(listId,contentId) {
	var list = get(listId);
	if(contentId) {
		var content = get(contentId);
	}
	var checks = list.querySelectorAll("input[type='checkbox']");
	var checkedList = [];
	for (var i = 0; i < checks.length; i++) {
		if(checks[i].checked == true) {
			checkedList.push(checks[i]);
		}
	};
	var str = [];
	for (var i = 0; i < checkedList.length; i++) {
		str.push(getPrev(checkedList[i].parentNode).innerHTML);
	};
	str = str.join(" / ")
	if(contentId) {
		content.innerHTML = str;
	}
}
function bind(el,ev,callback){
	var o;
	typeof el == "object" ? o = el : o = get(el);
	if(document.addEventListener){
		o.addEventListener(ev,callback);
	} else if (document.attachEvent){
		o.attachEvent("on" + ev,callback);
	}
}
function radios(listId) {
	var list = get(listId);
	for (var i = 0; i < list.children.length; i++) {
		list.children[i].addEventListener ("click",function(){
			for (var j = 0; j < list.children.length; j++) {
				removeClass(list.children[j],"checked")
			};
			addClass(this,"checked");
		})
	}
}
function setHeight(o) {
	var scroller = document.getElementById(o.id);
	var exceptHeight = (function(){
		var tempHeight = 0;
		for (var i = 0; i < o.except.length; i++) {
			tempHeight += document.getElementById(o.except[i]).offsetHeight;
		};
		return tempHeight;
	})();
	// alert(exceptHeight);
	scroller.style.height = document.body.offsetHeight - exceptHeight + "px";
}
function syncHeight(boxGroup,boxDis){
	if(boxDis){
		var boxDis = boxDis;
	} else {
		var boxDis = 0;
	}
	var heights = (function() {
		var temp = [];
		for (var i = 0; i < boxGroup.length; i++) {
			temp.push(get(boxGroup[i]).offsetHeight);
		}
		return temp;
	})();
	var maxHeight = Math.max.apply(null,heights);
	for (var i = 0; i < boxGroup.length; i++) {
		var dis = maxHeight - get(boxGroup[i]).offsetHeight;
		get(boxGroup[i]).style.height = px2rem(get(boxGroup[i]).offsetHeight + dis) - boxDis + "rem";
	}
}
function px2rem(value) {
	return value / (top.innerWidth / base * htmlSize);
}
//样式控制
function hasClass(el, cls) {
	var o;
	typeof el == "object" ? o = el : o = document.getElementById(el);
	return o.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(el,cls) {
	var o;
	typeof el == "string" ? o = get(el) : o = el;
	if (!this.hasClass(o,cls)) o.className += " " + cls;
}
function removeClass(el,cls) {
	var o;
	typeof el == "string" ? o = get(el) : o = el;
	if (hasClass(o,cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		o.className = o.className.replace(reg, ' ');
	}
}
function toggleClass(el,cls) {
	var o;
	typeof el == "string" ? o = get(el) : o = el;
	if (hasClass(o,cls)){
		removeClass(o,cls);
	} else {
		addClass(o,cls);
	}
}
function changeClass(el,cls1,cls2) {
	var o;
	typeof el == "object" ? o = el : o = document.getElementById(el);
	if (hasClass(o,cls1)){
		removeClass(o,cls1);
		addClass(o,cls2);
	} else {
		removeClass(o,cls2);
		addClass(o,cls1);
	}
}
function showData(msgId,loadingId) {
	var msg = document.getElementById(msgId);
	var loading = document.getElementById(loadingId);
	msg.style.display = "none";
	loading.style.display = "";
	setTimeout(function(){
		loading.style.display = "none";
	},1500)
}
function getIndexForArray(arr, value) {
	for (var i = 0; i < arr.length; i++){
		if (arr[i] == value) return i;
	}
	return -1;
}
tab = function(tabsId,pagesId) {
	var that = this;
	that.tabs = document.getElementById(tabsId).children;
	if(that.tabs[0].className == "on") {
		that.curTab = 0;
	} else {
		that.curTab = "noCur";
		that.mode = "noCurMode";
	}
	if(pagesId) { that.pages = document.getElementById(pagesId).children;}
	for ( i = 0; i < that.tabs.length ; i++ ) {
		that.tabs[i].setAttribute("idx",i);
		$(that.tabs[i]).bind("click",function(){
			var tempIdx = this.getAttribute("idx");
			if (that.curTab != tempIdx) {
				this.className = "on";
				if(pagesId) { that.pages[tempIdx].style.display = "";}
				if(that.curTab != "noCur"){
					that.tabs[that.curTab].className = "";
					if(pagesId) { that.pages[that.curTab].style.display = "none";}
				}
				that.curTab = tempIdx;
			} else if (that.mode = "noCurMode") {
				this.className = "";
				if(pagesId) { that.pages[that.curTab].style.display = "none";}
				that.curTab = "noCur";
			}
		})
	}
}














