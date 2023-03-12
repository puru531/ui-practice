import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'cp-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @Event({ bubbles: true, composed: true }) symbolEmitter: EventEmitter<string>;

  @State() searchResults: { symbol: string; name: string }[] = [];
  // @State() searchResults = [{name:'Puru', symbol: 'PS'}, {name:'Shweta', symbol: 'PS'}];

  @State() loading = false;

  onFindStocks(event: Event) {
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

  onSelectSymbol(symbol: string) {
    this.symbolEmitter.emit(symbol);
  }

  render() {
    return (
      <Host>
        <form class="form-container" onSubmit={this.onFindStocks.bind(this)}>
          <input id="stock-symbol" ref={el => (this.stockNameInput = el)} />
          <button type="submit" class="search-button">
            Find!
          </button>
        </form>
        {this.loading ? (
          <cp-spinner></cp-spinner>
        ) : (
          <ul>
            {this.searchResults.map(result => (
              <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
                <strong>{result.symbol}</strong> - {result.name}
              </li>
            ))}
          </ul>
        )}
      </Host>
    );
  }
}
