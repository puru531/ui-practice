import { Component, Host, h, State } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'cp-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  //Referencing an element
  stockInput: HTMLInputElement;

  // @Element() el: HTMLElement; //To access host element

  @State() stockUserInput: string;
  @State() validStockInput= false;
  @State() fetchedPrice: number;

  private onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.validStockInput = this.stockUserInput.trim() !== '' ? true : false; //can be used for check brfore fetching from API
  }

  private fetchStockPrice(event: Event) {
    event.preventDefault();
    //accessing value of input
    // console.log(this.el.shadowRoot.querySelector('#stock-symbol'));
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;

    //refrenced element
    // console.log(this.stockInput);
    // const stockSymbol = this.stockInput.value;
    // fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.stockUserInput}&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Host>
        <form class="form-container" onSubmit={this.fetchStockPrice.bind(this)}>
          <input id="stock-symbol" 
            ref={el => (this.stockInput = el)} 
            value={this.stockUserInput}
            onInput={this.onUserInput.bind(this)} /> {/* Referencing the element */} 
            {/* Setting up two way binding for stockUserInput variable */}
            {/* updating stockUserInput variable on every key stroke */}
          <button type="submit" class="search-button" disabled={!this.validStockInput}>
            Fetch
          </button>
        </form>
        <div>
          <p>Price: {this.fetchedPrice && '$' + this.fetchedPrice}</p>
        </div>
      </Host>
    );
  }
}
