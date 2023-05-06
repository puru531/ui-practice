import { Host, h } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
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
  static get is() { return "cp-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["stock-finder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["stock-finder.css"]
    };
  }
  static get states() {
    return {
      "searchResults": {},
      "loading": {}
    };
  }
  static get events() {
    return [{
        "method": "symbolEmitter",
        "name": "symbolEmitter",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=stock-finder.js.map
