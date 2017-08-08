function registerDS(){try{return document.registerElement("as24-autocomplete-input",AutocompleteInput)}catch(t){return null}}function registerDS$1(){try{return document.registerElement("as24-plain-data-source",PlainDataSource)}catch(t){return null}}function registerDS$2(){try{return document.registerElement("as24-grouped-items-data-source",GroupedItemsDataSource)}catch(t){return null}}function registerDS$3(){try{return document.registerElement("as24-plain-suggestions-list",PlainSuggestionsList)}catch(t){return null}}function registerDS$4(){try{return document.registerElement("as24-grouped-suggestions-list",GroupedSuggestionsList)}catch(t){return null}}function register(){try{return document.registerElement("as24-autocomplete",AutocompleteInput$1)}catch(t){return null}}var $=function(t,e){return e.querySelector(t)},$$=function(t,e){return e.querySelectorAll(t)},closestByTag=function(t){return function(e){return e?"HTML"===e.tagName?null:e===t?t:closestByTag(t)(e.parentNode):null}},on=function(t,e,i,o){return void 0===o&&(o=!1),i.addEventListener(t,e,o)},triggerEvent=function(t,e){var i=document.createEvent("Event");i.initEvent(t,!0,!0),e.dispatchEvent(i)},appendTo=function(t){return function(e){return t.appendChild(e),t}},closestByClassName=function(t){return function(e){return"HTML"===e.tagName?null:e.classList.contains(t)?e:closestByClassName(t)(e.parentNode)}},AutocompleteInput=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setValue=function(t){this.input.value=t},e.prototype.getValue=function(){return this.input.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},e.prototype.setDisabled=function(t){t?(triggerEvent("as24-autocomplete:input:cleanup",this.input),triggerEvent("as24-autocomplete:input:restore-placeholder",this.input),this.input.setAttribute("disabled","disabled")):this.input.removeAttribute("disabled")},e.prototype.isDisabled=function(){return this.input.hasAttribute("disabled")},e.prototype.setError=function(t){this.input.classList[t?"add":"remove"]("error")},e.prototype.renderInput=function(){return function(t){return this.setError(0===t.length),t}.bind(this)},e.prototype.onKeyDown=function(t){9===t.which&&triggerEvent("as24-autocomplete:input:focus-lost",this.input),40===t.which&&(triggerEvent("as24-autocomplete:input:go-down",this.input),t.preventDefault()),38===t.which&&(triggerEvent("as24-autocomplete:input:go-up",this.input),t.preventDefault())},e.prototype.onKeyUp=function(t){return!this.isVisible||13!==t.which&&9!==t.which?(13===t.which&&triggerEvent("as24-autocomplete:input:enter",this.input),27===t.which&&this.onCrossClick(),40!==t.which&&38!==t.which&&13!==t.which&&27!==t.which&&triggerEvent("as24-autocomplete:input:query",this.input),null):(t.stopPropagation(),t.preventDefault(),this.selectItem(),!1)},e.prototype.onInputFocus=function(){this.isOpened=!0,triggerEvent("as24-autocomplete:input:trigger-suggestions",this.input)},e.prototype.onCrossClick=function(t){this.input.disabled||(""===this.input.value?this.isOpened?(this.isOpened=!1,triggerEvent("as24-autocomplete:input:restore-placeholder",this.input),triggerEvent("as24-autocomplete:input:close",this.input)):(this.input.focus(),triggerEvent("as24-autocomplete:input:trigger-suggestions",this.input)):(this.eventFired=!0,this.input.value="",triggerEvent("as24-autocomplete:input:cleanup",this.input),this.input.focus()))},e.prototype.onBlur=function(){var t=this;setTimeout(function(){""===t.input.value?t.isOpened&&!t.eventFired?(t.isOpened=!1,triggerEvent("as24-autocomplete:input:restore-placeholder",t.input),triggerEvent("as24-autocomplete:input:close",t.input)):t.isOpened||triggerEvent("as24-autocomplete:input:restore-placeholder",t.input):triggerEvent("as24-autocomplete:input:close-list",t.input),t.eventFired=!1},150)},e.prototype.attachedCallback=function(){this.isOpened=!1,this.eventFired=!1,this.dropDown=$(".as24-autocomplete__icon-wrapper",this),this.input=$("input",this),on("focus",this.onInputFocus.bind(this),this.input),on("keyup",this.onKeyUp.bind(this),this.input,!0),on("keydown",this.onKeyDown.bind(this),this.input,!0),on("click",this.onCrossClick.bind(this),this.dropDown),on("blur",this.onBlur.bind(this),this.input,this.dropDown)},e}(HTMLElement),Suggestion=function(t,e){this.key=t,this.value=e};Suggestion.prototype.toString=function(){return"Suggestion("+this.key+": "+this.value+")"};var trimString=function(t){return t.split(String.fromCharCode(92)).join("").split("&nbsp").join("").trim()},matchValuePredicate=function(t){return function(e){return null!==trimString(e.value).match(t)}},PlainDataSource=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.fetchItems=function(t){var e=this;return new Promise(function(i){var o=trimString(t),n=e.extractKeyValues(),s=matchValuePredicate(new RegExp("^"+o,"ig")),r=matchValuePredicate(new RegExp(""+o,"ig")),u=n.filter(function(t){return s(t)}),a=n.filter(function(t){return-1===u.indexOf(t)}).filter(function(t){return r(t)});return i(u.concat(a))})},e.prototype.getSuggestionByKey=function(t){var e=this;return new Promise(function(i,o){var n=e.extractKeyValues();return t&&n?i(n.filter(function(e){return e.key===t})[0]):o(null)})},e.prototype.extractKeyValues=function(){return Array.prototype.slice.call(this.querySelectorAll("item")).map(function(t){return new Suggestion(t.getAttribute("key"),t.getAttribute("value"))})},e}(HTMLElement),Suggestion$1=function(t,e){this.key=t,this.value=e};Suggestion$1.prototype.toString=function(){return"Suggestion("+this.key+": "+this.value+")"};var SuggestionsGroup=function(t,e){this.label=t,this.items=e};SuggestionsGroup.prototype.toString=function(){return"SuggestionsGroup("+this.label+", "+this.items.length+" items)"};var valuePredicate=function(t,e){return function(i){return null!==t?null!==i.value.match(t):void 0===e||i.key===e}},GroupedItemsDataSource=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.fetchItems=function(t){var e=this;return new Promise(function(i){return i(e.buildGroups(t))})},e.prototype.getSuggestionByKey=function(t){var e=this;return new Promise(function(i,o){var n=Array.prototype.slice.call(e.querySelectorAll("item")).map(function(t){return new Suggestion$1(t.getAttribute("key"),t.getAttribute("value"))}).filter(valuePredicate(null,t));return n.length?i(n[0]):o(null)})},e.prototype.buildItems=function(t,e,i){var o=Array.prototype.slice.call(t.querySelectorAll("item")).map(function(t){return new Suggestion$1(t.getAttribute("key"),t.getAttribute("value"))}),n=o.filter(valuePredicate(new RegExp("^"+e,"ig"),i)),s=o.filter(function(t){return-1===n.indexOf(t)}).filter(valuePredicate(new RegExp(""+e,"ig"),i));return n.concat(s)},e.prototype.buildGroups=function(t,e){var i=this;return Array.prototype.slice.call(this.querySelectorAll("group")).reduce(function(o,n){var s=i.buildItems(n,t,e);return s.length?o.concat(new SuggestionsGroup(n.getAttribute("label"),s)):o},[])},e.prototype.extractKeyValues=function(){return Array.prototype.slice.call(this.querySelectorAll("item")).map(function(t){return new Suggestion$1(t.getAttribute("key"),t.getAttribute("value"))})},e}(HTMLElement),PlainSuggestionsList=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.show=function(){this.classList.add("as24-autocomplete__list--visible")},e.prototype.hide=function(){this.classList.remove("as24-autocomplete__list--visible")},e.prototype.isEmpty=function(){return $(".as24-autocomplete__list-item--empty",this)},e.prototype.isVisible=function(){return this.classList.contains("as24-autocomplete__list--visible")},e.prototype.getSelectedSuggestionItem=function(){return $(".as24-autocomplete__list-item--selected",this)},e.prototype.scrollToSelectedItem=function(t){var e=this.getBoundingClientRect().height,i=t.offsetTop,o=t.offsetHeight;this.scrollTop=-1*(e-(i+o))},e.prototype.moveSelection=function(t){var e=1===t?"nextSibling":"previousSibling",i=this.getSelectedSuggestionItem(this),o=null===i?$(".as24-autocomplete__list-item",this):null!==i[e]?i[e]:i;i&&i.classList.remove("as24-autocomplete__list-item--selected"),o.classList.add("as24-autocomplete__list-item--selected"),this.scrollToSelectedItem(o)},e.prototype.moveSelectionMultiple=function(t,e){var i=this;Array(e).fill(1).forEach(function(t){return i.moveSelection(1)})},e.prototype.onItemMouseOver=function(t){t.stopPropagation();var e=$(".as24-autocomplete__list-item--selected",this);"LI"===t.target.tagName&&(e&&e.classList.remove("as24-autocomplete__list-item--selected"),t.target.classList.add("as24-autocomplete__list-item--selected"))},e.prototype.selectItem=function(){var t=this.getSelectedSuggestionItem();t&&t.dataset.type&&"selectable"===t.dataset.type&&triggerEvent("as24-autocomplete:suggestion:selected",t)},e.prototype.onClick=function(t){var e=closestByClassName("as24-autocomplete__list-item")(t.target);e&&e.dataset.type&&"selectable"===e.dataset.type&&triggerEvent("as24-autocomplete:suggestion:selected",e)},e.prototype.renderItem=function(t){return function(e){var i=document.createElement("li");return i.classList.add("as24-autocomplete__list-item"),i.dataset.key=e.key,i.dataset.type="selectable",i.dataset.label=e.value,i.innerHTML=e.value.replace(new RegExp("("+t+")","ig"),"<strong>$1</strong>"),i}},e.prototype.renderEmptyListItem=function(t){var e=document.createElement("li");return["as24-autocomplete__list-item","as24-autocomplete__list-item--empty"].forEach(e.classList.add.bind(e.classList)),e.dataset.type="unselectable",e.dataset.key="",e.innerText=t,e},e.prototype.renderItems=function(t,e){return function(i){this.innerHTML="";var o=document.createDocumentFragment();(i.length?i.map(this.renderItem(t)):[this.renderEmptyListItem(e)]).forEach(appendTo(o)),appendTo(this)(o)}.bind(this)},e.prototype.attachedCallback=function(){on("mouseover",this.onItemMouseOver.bind(this),this),on("click",this.onClick.bind(this),this)},e}(HTMLElement),GroupedSuggestionsList=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.show=function(){this.classList.add("as24-autocomplete__list--visible")},e.prototype.hide=function(){this.classList.remove("as24-autocomplete__list--visible")},e.prototype.isEmpty=function(){return $(".as24-autocomplete__list-item--empty",this)},e.prototype.isVisible=function(){return this.classList.contains("as24-autocomplete__list--visible")},e.prototype.getSelectedSuggestionItem=function(){return $(".as24-autocomplete__list-item--selected",this)},e.prototype.scrollToSelectedItem=function(t){var e=this.getBoundingClientRect().height,i=t.offsetTop,o=t.offsetHeight;this.scrollTop=-1*(e-(i+o))},e.prototype.moveSelection=function(t){var e=this.getSelectedSuggestionItem(this),i=Array.prototype.slice.call($$(".as24-autocomplete__list-item",this)).filter(function(t){return"selectable"===t.dataset.type}),o=null===e?-1:i.indexOf(e),n=o+t>i.length-1?i.length-1:o+t<0?0:o+t,s=i[n];e&&e.classList.remove("as24-autocomplete__list-item--selected"),s&&(s.classList.add("as24-autocomplete__list-item--selected"),this.scrollToSelectedItem(s))},e.prototype.moveSelectionMultiple=function(t,e){var i=this;Array(e).fill(1).forEach(function(t){return i.moveSelection(1)})},e.prototype.onItemMouseOver=function(t){t.stopPropagation();var e=$(".as24-autocomplete__list-item--selected",this);"LI"===t.target.tagName&&(e&&e.classList.remove("as24-autocomplete__list-item--selected"),t.target.classList.add("as24-autocomplete__list-item--selected"))},e.prototype.selectItem=function(){var t=this.getSelectedSuggestionItem();t&&t.dataset.type&&"selectable"===t.dataset.type&&triggerEvent("as24-autocomplete:suggestion:selected",t)},e.prototype.onClick=function(t){var e=closestByClassName("as24-autocomplete__list-item")(t.target);e&&e.dataset.type&&"selectable"===e.dataset.type&&triggerEvent("as24-autocomplete:suggestion:selected",e)},e.prototype.renderItem=function(t){return function(e){var i=document.createElement("li");return i.classList.add("as24-autocomplete__list-item"),i.dataset.key=e.key,i.dataset.type="selectable",i.dataset.label=e.value,i.innerHTML=e.value.replace(new RegExp("("+t+")","ig"),"<strong>$1</strong>"),i}},e.prototype.renderSeparator=function(t){var e=document.createElement("div");return e.classList.add("as24-autocomplete__list-item"),e.classList.add("as24-autocomplete__separator"),e.dataset.type="unselectable",e.innerHTML=t.label,e},e.prototype.renderGroup=function(t){return function(e){var i=document.createDocumentFragment();return 0===t.length&&i.appendChild(this.renderSeparator(e)),e.items.map(this.renderItem(t)).forEach(appendTo(i)),i}},e.prototype.renderEmptyListItem=function(t){var e=document.createElement("li");return["as24-autocomplete__list-item","as24-autocomplete__list-item--empty"].forEach(e.classList.add.bind(e.classList)),e.dataset.type="unselectable",e.innerText=t,e},e.prototype.renderItems=function(t,e){return function(i){this.innerHTML="";var o=document.createDocumentFragment();(i.length?i.map(this.renderGroup(t).bind(this)):[this.renderEmptyListItem(e)]).forEach(appendTo(o)),appendTo(this)(o),this.show()}.bind(this)},e.prototype.attachedCallback=function(){on("mouseover",this.onItemMouseOver.bind(this),this),on("click",this.onClick.bind(this),this)},e}(HTMLElement),AutocompleteInput$1=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.selectedValue=function(){return this.valueInput.value},e.prototype.userQuery=function(){return this.userFacingInput.getValue()},e.prototype.userFacingInputElement=function(){return this.userFacingInput},e.prototype.dataSourceElement=function(){return this.dataSource},e.prototype.valueInputElement=function(){return this.valueInput},e.prototype.userQueryElement=function(){return this.userQueryEl},e.prototype.reset=function(){this.userFacingInput.setValue(""),this.valueInput.value="",this.list.hide(),this.classList.remove("as24-autocomplete--active"),this.classList.remove("as24-autocomplete--user-input")},e.prototype.fetchList=function(t){return this.dataSource.fetchItems(t).then(this.userFacingInput.renderInput()).then(this.list.renderItems(t,this.emptyListMessage))},e.prototype.getInitialValueByKey=function(){return this.dataSource.getSuggestionByKey(this.valueInput.value)},e.prototype.setValue=function(t){this.setKeyLabelPair(t,t)},e.prototype.setKeyLabelPair=function(t,e){this.valueInput.value=t,this.userFacingInput.setValue(e),this.userFacingInput.isOpened=!1,this.list.hide(),this.classList.remove("as24-autocomplete--active"),this.classList.add("as24-autocomplete--user-input"),triggerEvent("change",this)},e.prototype.showList=function(){this.userQueryEl.placeholder="",this.list.show()},e.prototype.restorePlaceholder=function(){this.userQueryEl.placeholder=this.placeholder},e.prototype.attachedCallback=function(){var t=this;if(this.emptyListMessage=this.getAttribute("empty-list-message")||"---",this.userFacingInput=$("as24-autocomplete-input",this),this.userQueryEl=$('[data-role="user-query"]',this),this.valueInput=$('input[data-role="value"]',this),this.list=$('[data-role="list"]',this),this.dataSource=this.querySelector("[role=data-source]"),this.placeholder=this.userQueryEl.placeholder,!this.dataSource)throw new Error("The DataSource has not been found");"autocomplete"in this.userQueryEl&&(this.userQueryEl.autocomplete="off"),setTimeout(function(){t.valueInput.value&&t.getInitialValueByKey().then(function(e){return e&&(t.userFacingInput.setValue(e.value),t.userQueryEl.placeholder="",t.classList.add("as24-autocomplete--user-input")),!0})}),on("keydown",function(e){"Tab"===e.key&&t.restorePlaceholder()},this),on("as24-autocomplete:suggestion:selected",function(e){e.stopPropagation(),t.setKeyLabelPair(e.target.dataset.key,e.target.dataset.label)},this),on("as24-autocomplete:input:restore-placeholder",function(e){e.stopPropagation(),t.restorePlaceholder()},this),on("as24-autocomplete:input:trigger-suggestions",function(e){e.stopPropagation(),t.list.isVisible()||t.showList();var i=t.selectedValue();t.classList.add("as24-autocomplete--active"),t.fetchList(i?"":t.userFacingInput.getValue()).then(function(){return i?t.dataSourceElement().extractKeyValues().findIndex(function(t){return t.key===i})+1:0}).then(function(e){return t.list.moveSelectionMultiple(1,e)})},this),on("as24-autocomplete:input:focus-lost",function(e){e.stopPropagation(),""===t.userFacingInput.getValue()||t.list.isEmpty()?(t.list.hide(),t.classList.remove("as24-autocomplete--active")):t.list.selectItem()},this),on("as24-autocomplete:input:close-list",function(e){e.stopPropagation(),t.list.hide(),t.userFacingInput.isOpened=!1,t.classList.remove("as24-autocomplete--active")},this),on("as24-autocomplete:input:enter",function(e){e.stopPropagation(),t.list.isVisible()?(t.list.selectItem(),t.list.hide(),t.classList.remove("as24-autocomplete--active")):(t.fetchList(t.userFacingInput.getValue()).then(function(){return t.list.moveSelection(1)}),t.classList.add("as24-autocomplete--active"))},this),on("as24-autocomplete:input:query",function(e){e.stopPropagation(),""!==t.userFacingInput.getValue()?(t.classList.add("as24-autocomplete--user-input"),t.classList.add("as24-autocomplete--active")):t.classList.remove("as24-autocomplete--user-input"),t.fetchList(t.userFacingInput.getValue()).then(function(){t.list.moveSelection(1),t.valueInput.value.length>0&&(""===t.userFacingInput.getValue()||t.list.isEmpty())&&(t.valueInput.value="",triggerEvent("change",t))})},this),on("as24-autocomplete:input:cleanup",function(e){e.stopPropagation(),t.classList.remove("as24-autocomplete--user-input"),t.classList.add("as24-autocomplete--active"),t.valueInput.value="",t.fetchList("").then(function(){return t.list.moveSelection(1)}),triggerEvent("change",t)},this),on("as24-autocomplete:input:close",function(e){e.stopPropagation(),t.classList.remove("as24-autocomplete--user-input"),t.classList.remove("as24-autocomplete--active"),t.list.hide()},this),on("as24-autocomplete:input:go-down",function(e){e.stopPropagation(),""!==t.userFacingInput.getValue()&&t.classList.add("as24-autocomplete--active"),t.list.isVisible()?t.list.moveSelection(1):t.fetchList(t.userFacingInput.getValue()).then(function(){return t.list.moveSelection(1)})},this),on("as24-autocomplete:input:go-up",function(e){e.stopPropagation(),t.list.isVisible()&&t.list.moveSelection(-1)},this),on("click",function(e){document.querySelector(".as24-autocomplete--active")&&closestByTag(t)(e.target)!==t&&t.list.isVisible()&&(""===t.userFacingInput.getValue()||t.list.isEmpty()||t.list.selectItem(),t.list.hide(),t.userFacingInput.isOpened=!1,t.classList.remove("as24-autocomplete--active"))},document)},e.prototype.onAttributeChanged=function(t,e,i){"disabled"===t&&(this.userFacingInput.setDisabled(e!==i&&("true"===i||"disabled"===i)),this.classList[this.userFacingInput.isDisabled()?"add":"remove"]("as24-autocomplete--disabled"),this.list.hide())},e}(HTMLElement);registerDS(),registerDS$1(),registerDS$2(),registerDS$3(),registerDS$4(),register();

//# sourceMappingURL=as24-autocomplete.js.map
