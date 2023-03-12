import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cp-spinner',
  styleUrl: 'cp-spinner.css',
  shadow: true,
})
export class CpSpinner {
  render() {
    return (
      <Host>
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Host>
    );
  }
}
