import { Host, h } from '@stencil/core';
export class CpSpinner {
  render() {
    return (h(Host, null, h("div", { class: "lds-ellipsis" }, h("div", null), h("div", null), h("div", null), h("div", null))));
  }
  static get is() { return "cp-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["cp-spinner.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["cp-spinner.css"]
    };
  }
}
//# sourceMappingURL=cp-spinner.js.map
