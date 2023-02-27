class Tooltip extends HTMLElement{
    constructor() {
        super();
        // const tooltipIcon =document.createElement('span');
        // tooltipIcon.textContent= ' (?)';
        // this.appendChild(tooltipIcon);         ---> This will not work because element is not attached to DOM

        this._tooltipContainer;
        this._tooltipText = 'Some dummy tooltip text.';
    }
//   --------------------------> WEBCOMPONENT LIFECYCLE <----------------------------
    //1) a constructor() in starting of class execution and it only gets called once.
        //It is basic initialization of vaiables, elemts is created this time. but not attached to the dom.

    //2) connectedCallback() is for DOM initialization and it is called when element is attached to the dom

    //3) disconnectedCallback() for cleanup work and it is executed when element is detached from the element.

    //4) attributechangedCallback() is for updating data + DOM, it is executed when observed attribute updated.


    connectedCallback() {
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon =document.createElement('span');
        tooltipIcon.textContent= ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.appendChild(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.appendChild(this._tooltipContainer);
    }
    _hideTooltip() {
        this.removeChild(this._tooltipContainer);
    }
}
customElements.define('cd-tooltip',Tooltip)