import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const cpSpinnerCss = ":host{display:block}.lds-ellipsis{display:inline-block;position:relative;width:80px;height:40px}.lds-ellipsis div{position:absolute;top:20px;width:13px;height:13px;border-radius:50%;background:#3b013b;animation-timing-function:cubic-bezier(0, 1, 1, 0)}.lds-ellipsis div:nth-child(1){left:8px;animation:lds-ellipsis1 0.6s infinite}.lds-ellipsis div:nth-child(2){left:8px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(3){left:32px;animation:lds-ellipsis2 0.6s infinite}.lds-ellipsis div:nth-child(4){left:56px;animation:lds-ellipsis3 0.6s infinite}@keyframes lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(24px, 0)}}";

const CpSpinner = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("div", { class: "lds-ellipsis" }, h("div", null), h("div", null), h("div", null), h("div", null))));
  }
  static get style() { return cpSpinnerCss; }
}, [1, "cp-spinner"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["cp-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "cp-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CpSpinner);
      }
      break;
  } });
}

export { CpSpinner as C, defineCustomElement as d };

//# sourceMappingURL=cp-spinner2.js.map