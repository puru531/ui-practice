/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CpStockFinder {
    }
    interface CpStockPrice {
        "stockUserInput": string;
    }
}
declare global {
    interface HTMLCpStockFinderElement extends Components.CpStockFinder, HTMLStencilElement {
    }
    var HTMLCpStockFinderElement: {
        prototype: HTMLCpStockFinderElement;
        new (): HTMLCpStockFinderElement;
    };
    interface HTMLCpStockPriceElement extends Components.CpStockPrice, HTMLStencilElement {
    }
    var HTMLCpStockPriceElement: {
        prototype: HTMLCpStockPriceElement;
        new (): HTMLCpStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "cp-stock-finder": HTMLCpStockFinderElement;
        "cp-stock-price": HTMLCpStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface CpStockFinder {
    }
    interface CpStockPrice {
        "stockUserInput"?: string;
    }
    interface IntrinsicElements {
        "cp-stock-finder": CpStockFinder;
        "cp-stock-price": CpStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cp-stock-finder": LocalJSX.CpStockFinder & JSXBase.HTMLAttributes<HTMLCpStockFinderElement>;
            "cp-stock-price": LocalJSX.CpStockPrice & JSXBase.HTMLAttributes<HTMLCpStockPriceElement>;
        }
    }
}