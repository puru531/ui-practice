import { p as promiseResolve, b as bootstrapLazy } from './index-aa05f894.js';
export { s as setNonce } from './index-aa05f894.js';

/*
 Stencil Client Patch Browser v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["cp-spinner_3",[[1,"cp-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"cp-stock-price",{"stockUserInput":[1537,"stock-user-input"],"validStockInput":[32],"fetchedPrice":[32],"error":[32],"loading":[32]},[[16,"symbolEmitter","onStockSymbolSelected"]]],[1,"cp-spinner"]]]], options);
});

//# sourceMappingURL=advance-stencil.js.map