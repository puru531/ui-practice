import { p as promiseResolve, b as bootstrapLazy } from './index-aa05f894.js';
export { s as setNonce } from './index-aa05f894.js';

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["cp-spinner_3",[[1,"cp-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"cp-stock-price",{"stockUserInput":[1537,"stock-user-input"],"validStockInput":[32],"fetchedPrice":[32],"error":[32],"loading":[32]},[[16,"symbolEmitter","onStockSymbolSelected"]]],[1,"cp-spinner"]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map