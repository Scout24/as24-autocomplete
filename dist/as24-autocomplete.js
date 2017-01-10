function elementAttached(){var e=this,t=e.getAttribute("empty-list-message")||"---",n=$("[type=text]",e),i=$("[type=hidden]",e),r=$(".as24-autocomplete__list",e),s=this.querySelector("[role=data-source]");if(!s)throw new Error("The DataSource has not been found");var o=fetchList(s,n,r,t,e);e.isDirty=!1,setTimeout(function(){i.value&&getInitialValueByKey(s,i.value).then(function(t){return t&&(n.value=t.value,dirtifyInput(e)),!0})}),on("click",componentClicked(o,n,i,r,e),document),on("keyup",onKeyUp(s,i,n,r,t,e),n,!0),on("keydown",onKeyDown(s,i,n,r,t,e),window,!0),on("mouseover",onItemMouseOver(r),r,!0)}function elementDetached(){}function onAttributeChanged(e,t,n){var i=$("[type=text]",this),r=$(".as24-autocomplete__list",this);"disabled"===e&&(i.disabled="true"===n||"disabled"===n,this.classList[i.disabled?"add":"remove"]("as24-autocomplete--disabled"),hideList(r,this)())}function registerInput(){try{return document.registerElement("as24-autocomplete",{prototype:Object.assign(Object.create(HTMLElement.prototype,{attachedCallback:{value:elementAttached},detachedCallback:{value:elementDetached},attributeChangedCallback:{value:onAttributeChanged}}),{selectedValue:function(){return $("[type=hidden]",this).value},userQuery:function(){return $("[type=text]",this).value},dataSourceElement:function(){return this.querySelector("[role=data-source]")},reset:function(){var e=$("[type=text]",this),t=$("[type=hidden]",this);return reset(t,e,this)}})})}catch(e){if(window&&window.console)return window.console.warn('Failed to register CustomElement "as24-autocomplete".',e),null}return!0}function registerDS(){try{return document.registerElement("as24-tags-data-source",DataSource)}catch(e){return null}}var closestByClassName=function(e){return function(t){return"HTML"===t.tagName?null:t.classList.contains(e)?t:closestByClassName(e)(t.parentNode)}},closestByTag=function(e){return function(t){return null===t?null:t===e?e:closestByTag(e)(t.parentNode)}},$=function(e,t){return t.querySelector(e)},on=function(e,t,n,i){return void 0===i&&(i=!1),n.addEventListener(e,t,i)},appendTo=function(e){return function(t){return e.appendChild(t),e}},getSelectedSuggestionItem=function(e){return $(".as24-autocomplete__list-item--selected",e)},followSelectedItem=function(e,t){var n=e.getBoundingClientRect().height,i=t.offsetTop,r=t.offsetHeight;e.scrollTop=-1*(n-(i+r))},moveSelection=function(e,t){var n=1===e?"nextSibling":"previousSibling",i=getSelectedSuggestionItem(t),r=null===i?$(".as24-autocomplete__list-item",t):null!==i[n]?i[n]:i;return i&&i.classList.remove("as24-autocomplete__list-item--selected"),r.classList.add("as24-autocomplete__list-item--selected"),followSelectedItem(t,r),!1},showList=function(e){return e.classList.add("as24-autocomplete__list--visible"),moveSelection(1,e),!1},hideList=function(e,t){return function(){return t.classList.remove("as24-autocomplete--active"),e.classList.remove("as24-autocomplete__list--visible"),!1}},isListVisible=function(e){return e.classList.contains("as24-autocomplete__list--visible")},removeInputError=function(e){var t=$(".as24-autocomplete__input",e);t.classList.remove("error")},cleanup=function(e,t,n){e.value="",t.value="",n.isDirty=!1,n.classList.remove("as24-autocomplete--user-input"),removeInputError(n)},dirtifyInput=function(e){e.isDirty=!0,e.classList.add("as24-autocomplete--user-input")},renderLI=function(e){return function(t){var n=document.createElement("li"),i=e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");return n.classList.add("as24-autocomplete__list-item"),n.dataset.key=t.key,n.innerHTML=t.value.replace(new RegExp("("+i+")","ig"),"<strong>$1</strong>"),n}},setInputError=function(e){var t=$(".as24-autocomplete__input",e);t.classList.add("error")},renderEmptyListItem=function(e,t){setInputError(t);var n=document.createElement("li");return n.dataset.unselectable=!0,["as24-autocomplete__list-item","as24-autocomplete__list-item--empty"].forEach(n.classList.add.bind(n.classList)),n.dataset.key="",n.innerText=e,n},renderList=function(e,t,n,i){return function(r){t.innerHTML="";var s=document.createDocumentFragment();(r.length?r.map(renderLI(n.value)):[renderEmptyListItem(e,i)]).forEach(appendTo(s)),appendTo(t)(s),showList(t)}},fetchList=function(e,t,n,i,r){return function(s){s.stopPropagation(),r.classList.add("as24-autocomplete--active"),removeInputError(r),e.fetchItems(t.value).then(renderList(i,n,t,r))}},triggerChangeEvent=function(e,t){var n=document.createEvent("Event");n.initEvent(e,!0,!0),t.dispatchEvent(n)},selectItem=function(e,t,n,i,r){if(!n){if(n=getSelectedSuggestionItem(r),n.classList.contains("as24-autocomplete__list-item--empty"))return;hideList(r,i)()}e.value=n.dataset.key,t.value=n.innerText,triggerChangeEvent("change",e),dirtifyInput(i)},onItemMouseOver=function(e){return function(t){t.stopPropagation();var n=$(".as24-autocomplete__list-item--preselected",e);"LI"===t.target.tagName&&(n&&n.classList.remove("as24-autocomplete__list-item--preselected"),t.target.classList.add("as24-autocomplete__list-item--preselected"))}},onKeyDown=function(e,t,n,i,r,s){return function(o){if(o.target===n){if([38,40,27].indexOf(o.which)>=0&&(o.stopPropagation(),o.preventDefault()),9===o.which&&isListVisible(i)&&hideList(i,s)(o),38===o.which)return moveSelection(-1,i);if(40===o.which)return isListVisible(i)?moveSelection(1,i):fetchList(e,n,i,r,s)(o);27===o.which&&(n.value?(cleanup(t,n,s),fetchList(e,n,i,r,s)(o)):(hideList(i,s)(),cleanup(t,n,s),n.blur()))}return null}},onKeyUp=function(e,t,n,i,r,s){return function(o){return n.value?dirtifyInput(s):cleanup(t,n,s),!isListVisible(i)||13!==o.which&&9!==o.which?[38,40,27].indexOf(o.which)===-1?(o.stopPropagation(),fetchList(e,n,i,r,s)(o)):null:(o.stopPropagation(),o.preventDefault(),selectItem(t,n,null,s,i),!1)}},reset=function(e,t,n){return cleanup(e,t,n),triggerChangeEvent("change",e),!0},getInitialValueByKey=function(e,t){return e.getSuggestionByKey(t)},componentClicked=function(e,t,n,i,r){return function(s){var o=closestByClassName("as24-autocomplete__input")(s.target),a=closestByClassName("as24-autocomplete__icon-wrapper")(s.target),u=closestByClassName("as24-autocomplete__list")(s.target);if(!t.disabled)if(closestByTag(r)(s.target)===r){if(o)e(s);else if(a){if(!t.disabled){if(r.isDirty)return reset(n,t,r),void(isListVisible(i)&&(e(s),t.focus()));isListVisible(i)?hideList(i,r)(s):(t.focus(),e(s))}}else if(u){var l=closestByClassName("as24-autocomplete__list-item")(s.target);if(l.dataset.unselectable)return void s.stopPropagation();selectItem(n,t,l,r),r.classList.add("as24-autocomplete--user-input"),hideList(i,r)(s)}}else t.classList.contains("error")&&(n.value="",triggerChangeEvent("change",n)),hideList(i,r)(s)}},Suggestion=function(e,t){this.key=e,this.value=t};Suggestion.prototype.toString=function(){return"Suggestion("+this.key+": "+this.value+")"};var valuePredicate=function(e){return function(t){return null!==t.value.match(e)}},DataSource=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.fetchItems=function(e){var t=this;return new Promise(function(n){var i=t.extractKeyValues(),r=e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),s=i.filter(valuePredicate(new RegExp("^"+r,"ig"))),o=i.filter(function(e){return s.indexOf(e)===-1}).filter(valuePredicate(new RegExp(""+r,"ig")));return n(s.concat(o))})},t.prototype.getSuggestionByKey=function(e){var t=this;return new Promise(function(n,i){var r=t.extractKeyValues();return e&&r?n(r.filter(function(t){return t.key===e})[0]):i(null)})},t.prototype.extractKeyValues=function(){return Array.prototype.slice.call(this.querySelectorAll("item")).map(function(e){return new Suggestion(e.getAttribute("key"),e.getAttribute("value"))})},t}(HTMLElement);registerInput(),registerDS();

//# sourceMappingURL=as24-autocomplete.js.map
