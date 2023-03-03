class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if(!confirm('Do you really want to leave?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('cp-confirm-link', ConfirmLink, {extends :  'a' }); //whenever we extend only specific element and not the HTMLElement, we need to pass third argument, in which we pass the tag name which we are extending.