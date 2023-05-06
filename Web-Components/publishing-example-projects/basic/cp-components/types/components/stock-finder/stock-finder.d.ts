import { EventEmitter } from '../../stencil-public-runtime';
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  symbolEmitter: EventEmitter<string>;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  loading: boolean;
  onFindStocks(event: Event): void;
  onSelectSymbol(symbol: string): void;
  render(): any;
}
