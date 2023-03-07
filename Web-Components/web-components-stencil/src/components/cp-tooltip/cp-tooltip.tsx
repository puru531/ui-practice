import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'cp-tooltip',
  styleUrl: 'cp-tooltip.css',
  shadow: true,
})
export class CpTooltip {
  @Prop() content: string;
  @State() showTooltip: boolean;

  private toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }

  render() {
    return (
      <Host>
        <div class="main"><slot>Let's test this new tooltip</slot> <span class="tooltip-icon" onClick={this.toggleTooltip.bind(this)}>?</span></div>
        {this.showTooltip &&<div class="tooltip-content">{this.content}</div>}
      </Host>
    );
  }

}
