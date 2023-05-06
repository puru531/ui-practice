'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-164b6fc6.js');

/*
 Stencil Client Patch Browser v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('advance-stencil.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["cp-spinner_3.cjs",[[1,"cp-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"cp-stock-price",{"stockUserInput":[1537,"stock-user-input"],"validStockInput":[32],"fetchedPrice":[32],"error":[32],"loading":[32]},[[16,"symbolEmitter","onStockSymbolSelected"]]],[1,"cp-spinner"]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=advance-stencil.cjs.js.map