import { Host, h } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
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
  static get is() { return "cp-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["stock-price.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["stock-price.css"]
    };
  }
  static get properties() {
    return {
      "stockUserInput": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "stock-user-input",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "validStockInput": {},
      "fetchedPrice": {},
      "error": {},
      "loading": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "stockUserInput",
        "methodName": "stockSymbolChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "symbolEmitter",
        "method": "onStockSymbolSelected",
        "target": "body",
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=stock-price.js.map
