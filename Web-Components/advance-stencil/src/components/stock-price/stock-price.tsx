import { Component, Host, h, State, Prop, Watch } from '@stencil/core';

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

  @State() validStockInput= false;
  @State() fetchedPrice: number;
  @State() error: string;

  @Prop({mutable: true, reflect: true}) stockUserInput: string;

  //All lifecycles
  componentWillLoad() { //will run right before component is about to load.
    console.log('componentWillLoad');
  } 

  componentDidLoad() {
    console.log('componentDidLoad');
    if(this.stockUserInput) {
      this.validStockInput = true;
      this.fetchStockPrice(this.stockUserInput);
    }
  }

  componentWillUpdate() { //runs right before rerendering the component after any property change
    console.log('componentWillUpdate');
  }
  componentDidUpdate() { //runs after component rerendered
    console.log('componentDidUpdate');
    //handled by watchToChanges
    // if(this.stockSymbol !== this.stockUserInput) {  //used to run when prop is updated from outside 
    //   this.stockUserInput = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  @Watch('stockUserInput')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.fetchStockPrice(newValue);
    }
  }

  disconnectedCallback() { // after component is unloaded from the DOM
    console.log('disconnectedCallback');
  }

  private onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.validStockInput = this.stockUserInput.trim() !== '' ? true : false; //can be used for check brfore fetching from API
  }

  private onFetchStockPrice(event: Event) {
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

  private fetchStockPrice(stockUserInput: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockUserInput}&apikey=${AV_API_KEY}`)
      .then(res => {
        if(res.status !== 200) {
          throw new Error('Invalid');
        }
        return res.json();
      })
      .then(parsedRes => {
        if(!parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid symbol!')
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => this.error = err.message);
  }
  render() {
    return (
      <Host>
        <form class="form-container" onSubmit={this.onFetchStockPrice.bind(this)}>
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
          {this.error ? (
            <p>{this.error}</p>
          ):
          (
            <p>Price: {this.fetchedPrice && '$' + this.fetchedPrice}</p>
          )}
        </div>
      </Host>
    );
  }
}