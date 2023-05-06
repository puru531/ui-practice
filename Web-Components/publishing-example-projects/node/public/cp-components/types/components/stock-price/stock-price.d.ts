export declare class StockPrice {
  stockInput: HTMLInputElement;
  validStockInput: boolean;
  fetchedPrice: number;
  error: string;
  loading: boolean;
  stockUserInput: string;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentWillUpdate(): void;
  componentDidUpdate(): void;
  onStockSymbolSelected(event: CustomEvent): void;
  stockSymbolChanged(newValue: string, oldValue: string): void;
  disconnectedCallback(): void;
  private onUserInput;
  private onFetchStockPrice;
  private fetchStockPrice;
  render(): any;
}
