class Tooltip extends HTMLElement{
    constructor() {
        super();
        // const tooltipIcon =document.createElement('span');
        // tooltipIcon.textContent= ' (?)';
        // this.appendChild(tooltipIcon);         ---> This will not work because element is not attached to DOM
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = 'Some dummy tooltip text.';


        //using Shadow DOM for preventing accessing the tooltip html from normal DOM
        this.attachShadow({mode: 'open'}); //will put all elements inside shadow DOM

        //Adding template
        this.shadowRoot.innerHTML = `
        <style>
        div {
            background-color: black;
            color: white;
            position: absolute;
            top: 1.5rem;
            left: 0.75rem;
            z-index: 10;
            border-radius: 15px;
            padding: 0.2rem 0.5rem;
            width: max-content;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0, 0.26);
            font-size: 0.8rem;

        }

        /* :host is used to style the whole custom element (cp-tooltip)*/
        :host {
            position: relative;
            background-color: #ccc;
        }
        
        /* conditional styling, when any specific class is added*/
        :host(.specific-class) {
            color : var(--color-primary, red); /* using variables, after comma is default value when variable fails or not found*/
        }

        /* if custom element has specific parent element (p tag here)*/
        :host-context(p) {
            background-color : lightblue;
        }

        /* if custom element has specific parent element (p tag with hello class)*/
        :host-context(p.hello) {
            background-color : lightblue;
        }
        /* if custom element has specific parent element (p tag with nested hello class)*/
        :host-context(p .hello) {
            background-color : lightblue;
        }

        /* this will not work*/
        .highlight {   
            background-color: orange;
        }
        /*this will work, but if we have any other element inside span and we want to target that using ::slotted(span a) then it will not work*/
        ::slotted(.highlight) {
            border-bottom: 3px dotted black;
        }

        .icon {
            background-color: black;
            color: white;
            padding: 0.15rem 0.5rem;
            text-align: center;
            border-radius: 50%;
        }


        </style>
        <slot>Some Default</slot>
        <span class="icon">?</span>
        `;

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
        
        // const tooltipIcon =document.createElement('span');
        // tooltipIcon.textContent= ' (?)';
        this._tooltipIcon =this.shadowRoot.querySelector('span'); //take from template
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        // this.appendChild(tooltipIcon); // since we are using shadow DOM element now, we need to append the tooltip to shadow DOM, instead of normal HTMLElement element
        // this.shadowRoot.appendChild(tooltipIcon);
        // this.style.position = 'relative';   //in :host style selector
    }


    //to listen to chnages in the attributes of custom element.
    attributeChangedCallback(nameOfAttr, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }
        if(nameOfAttr === 'text') {
            this._tooltipText = newValue;
        }
    }

    //attributeChangedCallback does not get call automatically for performance reasons, we need to tell it which tag to watch for changes
    static get observedAttributes() {
        return ['text']; //Attribute name you want to Listen to changes.
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        if(this._tooltipVisible) {
            this._tooltipContainer = document.createElement('div');
            this._tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(this._tooltipContainer);
        } else {
            if(this._tooltipContainer) {
                this.shadowRoot.removeChild(this._tooltipContainer);
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();

        // this._tooltipContainer = document.createElement('div');   //handled in _render method
        // this._tooltipContainer.textContent = this._tooltipText;       //handled in _render method

        // this._tooltipContainer.style.backgroundColor = 'black';
        // this._tooltipContainer.style.color = 'white';
        // this._tooltipContainer.style.position = 'absolute';      // take from style of shadowRoot innerHTML
        // this._tooltipContainer.style.zIndex = '10';

        // this.appendChild(this._tooltipContainer); // append the tooltip in shadowRoot
        // this.shadowRoot.appendChild(this._tooltipContainer); //handled in _render method
    }
    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();

        // this.shadowRoot.removeChild(this._tooltipContainer); //handled in _render method
    }
}
customElements.define('cp-tooltip',Tooltip)