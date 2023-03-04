class Modal extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.5);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([opened]) #modal {
                    top: 15vh;
                }
                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 7px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }
                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }
                #main {
                    padding: 1rem;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                #actions button{
                    margin: 0 0.75rem;
                    padding: 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Please confirm payment</slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id='cancel-btn'>Cancel</button>
                    <button id='okay-btn'>Okay</button>
                </section>
            </div>
        `;
                //we can also access the slots
        // const slots = this.shadowRoot.querySelectorAll('slot');
        // slots[1].addEventListener('slotchange', event =>{
        //     console.dir(slots[1].assignedNodes());
        // })
        const backdrop = this.shadowRoot.querySelector('#backdrop');
        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('#okay-btn');

        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._okay.bind(this));
        backdrop.addEventListener('click', this._cancel.bind(this));

        //listening to custom events
        // cancelButton.addEventListener('cancel', () => {
        //     console.log('cancelled inside the component');
        // })
    }

//changing style on attribute change --> can be handled in css
    // //listening to events on attribute change
    // attributeChangedCallback(attrName, oldValue, newValue) {
    //     // if(attrName === 'opened') {
    //     //     if(this.hasAttribute('opened')) {
    //     //         this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
    //     //         this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
    //     //         this.shadowRoot.querySelector('#modal').style.opacity = 1;
    //     //         this.shadowRoot.querySelector('#madal').style.pointerEvents = 'all';
    //     //     }
    //     // }


    // }

    // //observing specific attribute change
    // static get observedAttributes(){
    //     return ['opened'];
    // }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    hide() {
        if(this.hasAttribute('opened')){
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('cancel', { bubbles: true, composed: true });  // Event is built is JS , we are creating cutom event form it
                        //2nd parameter bubble is used to listen to events by parent element if it is not already listened.
                        // composed confirms that this event may leave the shadowDOM if true, and if false, it confirm it will not go out of the shadow DOM.
        event.target.dispatchEvent(cancelEvent)  //Emitting custom event
    }
    _okay(event) {
        this.hide();
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent); // we don't need bubble and composed here because, our component is is extending HTMLElement and and we are emitting from our custom element and not from shadow DOM, thus listeners of HTML can access to it.
    }
}
customElements.define('cp-modal', Modal);