import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './cp-spinner2.js';

const stockPriceCss = ":host{display:block;font-family:sans-serif;margin:2rem;border:2px solid var(--color-primary, black);padding:1rem;width:max-content}:host(.error){border-color:rgb(249, 86, 4)}.form-container{display:flex}.form-container #stock-symbol:focus,.form-container .search-button:focus{outline:none}.form-container #stock-symbol{font:inherit;color:var(--color-primary, black);margin-right:1rem;padding:0.1rem 0.25rem}.form-container .search-button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:white;cursor:pointer}.form-container .search-button:hover,.form-container .search-button:active{background:var(--color-primary, black)}.form-container .search-button:disabled{background:#ccc;border:#ccc;color:grey;cursor:not-allowed}";

const StockPrice = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.validStockInput = false;
    this.fetchedPrice = undefined;
    this.error = undefined;
    this.loading = false;
    this.stockUserInput = undefined;
  }
  //All lifecycles
  componentWillLoad() {
    //will run right before component is about to load.
    console.log('componentWillLoad');
  }
  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockUserInput) {
      this.validStockInput = true;
      this.fetchStockPrice(this.stockUserInput);
    }
  }
  componentWillUpdate() {
    //runs right before rerendering the component after any property change
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    //runs after component rerendered
    console.log('componentDidUpdate');
    //handled by watchToChanges
    // if(this.stockSymbol !== this.stockUserInput) {  //used to run when prop is updated from outside
    //   this.stockUserInput = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  //listening to event emitted by other components
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockUserInput) {
      this.stockUserInput = event.detail;
      // this.fetchStockPrice(event.detail);
    }
  }
  //keep watching on this attribute
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.validStockInput = true;
      this.fetchStockPrice(newValue);
    }
  }
  disconnectedCallback() {
    // after component is unloaded from the DOM
    console.log('disconnectedCallback');
  }
  // //hostData returns some metaData about the component.
  // hostData() {
  //   return {class: this.error ? 'error' : ''}; //this will add error class in tag of the component
  // } // <Host> should not be used for this
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    this.validStockInput = this.stockUserInput.trim() !== '' ? true : false; //can be used for check brfore fetching from API
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    //accessing value of input
    // console.log(this.el.shadowRoot.querySelector('#stock-symbol'));
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    //refrenced element
    // console.log(this.stockInput);
    // const stockSymbol = this.stockInput.value;
    // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
    this.fetchStockPrice(this.stockUserInput);
  }
  fetchStockPrice(stockUserInput) {
    this.loading = true;
    this.error = null;
    this.fetchedPrice = undefined;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockUserInput}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid');
      }
      return res.json();
    })
      .then(parsedRes => {
      if (!parsedRes['Global Quote'] || !parsedRes['Global Quote']['05. price']) {
        throw new Error('Invalid symbol!');
      }
      this.error = null;
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }
  render() {
    return (h(Host, { class: this.error ? 'error' : '' }, h("form", { class: "form-container", onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), " ", h("button", { type: "submit", class: "search-button", disabled: !this.validStockInput || this.loading }, "Fetch")), h("div", null, this.loading ? (h("cp-spinner", null)) : (h("span", null, this.error ? h("p", null, this.error) : h("p", null, "Price: ", this.fetchedPrice && '$' + this.fetchedPrice))))));
  }
  static get watchers() { return {
    "stockUserInput": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
}, [1, "cp-stock-price", {
    "stockUserInput": [1537, "stock-user-input"],
    "validStockInput": [32],
    "fetchedPrice": [32],
    "error": [32],
    "loading": [32]
  }, [[16, "symbolEmitter", "onStockSymbolSelected"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cp-stock-price", "cp-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "cp-stock-price":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockPrice);
      }
      break;
    case "cp-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const CpStockPrice = StockPrice;
const defineCustomElement = defineCustomElement$1;

export { CpStockPrice, defineCustomElement };

//# sourceMappingURL=cp-stock-price.js.map