'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-164b6fc6.js');

const cpSpinnerCss = ":host{display:block}.lds-ellipsis{display:inline-block;position:relative;width:80px;height:40px}.lds-ellipsis div{position:absolute;top:20px;width:13px;height:13px;border-radius:50%;background:#3b013b;animation-timing-function:cubic-bezier(0, 1, 1, 0)}.lds-ellipsis div:nth-child(1){left:8px;animation:lds-ellipsis1 0.6s infinite}.lds-ellipsis div:nth-child(2){left:8px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(3){left:32px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(4){left:56px;animation:lds-ellipsis3 0.6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(24px, 0)}}";

const CpSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "lds-ellipsis" }, index.h("div", null), index.h("div", null), index.h("div", null), index.h("div", null))));
  }
};
CpSpinner.style = cpSpinnerCss;

const AV_API_KEY = 'FMKPL2P1JCFI986S';

const stockFinderCss = ":host{display:block;font-family:sans-serif;margin:2rem;border:2px solid var(--color-primary, black);padding:1rem;width:max-content}.form-container{display:flex}.form-container #stock-symbol:focus,.form-container .search-button:focus{outline:none}.form-container #stock-symbol{font:inherit;color:var(--color-primary, black);margin-right:1rem;padding:0.1rem 0.25rem}.form-container .search-button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:white;cursor:pointer}.form-container .search-button:hover,.form-container .search-button:active{background:#750175}.form-container .search-button:disabled{background:#ccc;border:#ccc;color:grey;cursor:not-allowed}ul{margin:15px 0 0 0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover{background:var(--color-primary, black);color:white}";

const StockFinder = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.symbolEmitter = index.createEvent(this, "symbolEmitter", 7);
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches'].map(match => {
        return { symbol: match['1. symbol'], name: match['2. name'] };
      });
      this.loading = false;
    })
      .catch(err => {
      console.error(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.symbolEmitter.emit(symbol);
  }
  render() {
    return (index.h(index.Host, null, index.h("form", { class: "form-container", onSubmit: this.onFindStocks.bind(this) }, index.h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), index.h("button", { type: "submit", class: "search-button" }, "Find!")), this.loading ? (index.h("cp-spinner", null)) : (index.h("ul", null, this.searchResults.map(result => (index.h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, index.h("strong", null, result.symbol), " - ", result.name)))))));
  }
};
StockFinder.style = stockFinderCss;

const stockPriceCss = ":host{display:block;font-family:sans-serif;margin:2rem;border:2px solid var(--color-primary, black);padding:1rem;width:max-content}:host(.error){border-color:rgb(249, 86, 4)}.form-container{display:flex}.form-container #stock-symbol:focus,.form-container .search-button:focus{outline:none}.form-container #stock-symbol{font:inherit;color:var(--color-primary, black);margin-right:1rem;padding:0.1rem 0.25rem}.form-container .search-button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:white;cursor:pointer}.form-container .search-button:hover,.form-container .search-button:active{background:var(--color-primary, black)}.form-container .search-button:disabled{background:#ccc;border:#ccc;color:grey;cursor:not-allowed}";

const StockPrice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, { class: this.error ? 'error' : '' }, index.h("form", { class: "form-container", onSubmit: this.onFetchStockPrice.bind(this) }, index.h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), " ", index.h("button", { type: "submit", class: "search-button", disabled: !this.validStockInput || this.loading }, "Fetch")), index.h("div", null, this.loading ? (index.h("cp-spinner", null)) : (index.h("span", null, this.error ? index.h("p", null, this.error) : index.h("p", null, "Price: ", this.fetchedPrice && '$' + this.fetchedPrice))))));
  }
  static get watchers() { return {
    "stockUserInput": ["stockSymbolChanged"]
  }; }
};
StockPrice.style = stockPriceCss;

exports.cp_spinner = CpSpinner;
exports.cp_stock_finder = StockFinder;
exports.cp_stock_price = StockPrice;

//# sourceMappingURL=cp-spinner_3.cjs.entry.js.map