import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as AV_API_KEY } from './global.js';
import { d as defineCustomElement$2 } from './cp-spinner2.js';

const stockFinderCss = ":host{display:block;font-family:sans-serif;margin:2rem;border:2px solid var(--color-primary, black);padding:1rem;width:max-content}.form-container{display:flex}.form-container #stock-symbol:focus,.form-container .search-button:focus{outline:none}.form-container #stock-symbol{font:inherit;color:var(--color-primary, black);margin-right:1rem;padding:0.1rem 0.25rem}.form-container .search-button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:white;cursor:pointer}.form-container .search-button:hover,.form-container .search-button:active{background:#750175}.form-container .search-button:disabled{background:#ccc;border:#ccc;color:grey;cursor:not-allowed}ul{margin:15px 0 0 0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover{background:var(--color-primary, black);color:white}";

const StockFinder = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.symbolEmitter = createEvent(this, "symbolEmitter", 7);
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
    return (h(Host, null, h("form", { class: "form-container", onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), h("button", { type: "submit", class: "search-button" }, "Find!")), this.loading ? (h("cp-spinner", null)) : (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)))))));
  }
  static get style() { return stockFinderCss; }
}, [1, "cp-stock-finder", {
    "searchResults": [32],
    "loading": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cp-stock-finder", "cp-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "cp-stock-finder":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, StockFinder);
      }
      break;
    case "cp-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const CpStockFinder = StockFinder;
const defineCustomElement = defineCustomElement$1;

export { CpStockFinder, defineCustomElement };

//# sourceMappingURL=cp-stock-finder.js.map