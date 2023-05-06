'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-164b6fc6.js');

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["cp-spinner_3.cjs",[[1,"cp-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"cp-stock-price",{"stockUserInput":[1537,"stock-user-input"],"validStockInput":[32],"fetchedPrice":[32],"error":[32],"loading":[32]},[[16,"symbolEmitter","onStockSymbolSelected"]]],[1,"cp-spinner"]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map