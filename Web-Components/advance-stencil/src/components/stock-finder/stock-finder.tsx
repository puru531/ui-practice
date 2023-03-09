import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cp-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
