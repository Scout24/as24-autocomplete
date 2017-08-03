import { $, on, triggerEvent } from './helper';

/**
 * @class
 * @typedef SeparatedItemsDataSource
 */
class AutocompleteInput extends HTMLElement {

    setValue(str) {
        this.input.value = str;
    }

    getValue() {
        return this.input.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    setDisabled(flag) {
        if (flag) {
            this.input.setAttribute('disabled', 'disabled');
        } else {
            this.input.removeAttribute('disabled');
        }
    }

    isDisabled() {
        return this.input.hasAttribute('disabled');
    }

    setError(flag) {
        this.input.classList[flag ? 'add' : 'remove']('error');
    }

    renderInput() {
        return function inputRenderer(suggestions) {
            this.setError(suggestions.length === 0);
            return suggestions;
        }.bind(this);
    }

    onKeyDown(e) {
        if (e.which === 9) {
            triggerEvent('as24-autocomplete:input:focus-lost', this.input);
        }
        if (e.which === 40) {
            triggerEvent('as24-autocomplete:input:go-down', this.input);
            e.preventDefault();
        }
        if (e.which === 38) {
            triggerEvent('as24-autocomplete:input:go-up', this.input);
            e.preventDefault();
        }
    }

    onKeyUp(e) {
        if (this.isVisible && (e.which === 13 || e.which === 9)) {
            e.stopPropagation();
            e.preventDefault();
            this.selectItem();
            return false;
        }
        if (e.which === 13) {
            triggerEvent('as24-autocomplete:input:enter', this.input);
        }
        if (e.which === 27) {
            this.onCrossClick();
        }
        if (e.which !== 40 && e.which !== 38 && e.which !== 13 && e.which !== 27) {
            triggerEvent('as24-autocomplete:input:query', this.input);
        }
        return null;
    }

    onInputFocus() {
        console.log('onInputFocus');
        this.isOpened = true;
        triggerEvent('as24-autocomplete:input:trigger-suggestions', this.input);
    }

    onCrossClick() {
        if (this.input.disabled) return;
        this.input.focus();

        if (this.input.value === '') {
            console.log(1);
            if (this.isOpened) {
                console.log(2);
                this.isOpened = false;
                // triggerEvent('as24-autocomplete:input:close', this.input);
            } else {
                console.log(3);
                this.isOpened = true;
                triggerEvent('as24-autocomplete:input:trigger-suggestions', this.input);
            }
        } else {
            console.log(4);
            this.input.value = '';
            this.isOpened = true;
            triggerEvent('as24-autocomplete:input:cleanup', this.input);
            // triggerEvent('as24-autocomplete:input:trigger-suggestions', this.input);
        }
    }

    onBlur() {
        console.log('onBlur');
        setTimeout(() => {
            if (this.input.value === '') {
                if (this.isOpened) { // for iOS buttons
                    this.isOpened = false;
                    triggerEvent('as24-autocomplete:input:restore-placeholder', this.input);
                    triggerEvent('as24-autocomplete:input:close', this.input);
                }
            } else {
                triggerEvent('as24-autocomplete:input:close-list', this.input);
            }
        }, 100)
    }

    onClick(e) {
        e.stopPropagation();
    }

    attachedCallback() {
        this.isOpened = false;
        this.isDirty = false;
        this.dropDown = $('.as24-autocomplete__icon-wrapper', this);
        this.input = $('input', this);
        on('focus', this.onInputFocus.bind(this), this.input);
        on('keyup', this.onKeyUp.bind(this), this.input, true);
        on('keydown', this.onKeyDown.bind(this), this.input, true);
        on('click', this.onCrossClick.bind(this), this.dropDown);
        on('click', this.onClick.bind(this), this.input);
        on('blur', this.onBlur.bind(this), this.input, this.dropDown);
    }

}

export default function registerDS() {
    try {
        return document.registerElement('as24-autocomplete-input', AutocompleteInput);
    } catch (e) {
        return null;
    }
}
