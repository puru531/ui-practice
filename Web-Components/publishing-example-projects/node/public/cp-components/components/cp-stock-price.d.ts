import type { Components, JSX } from "../types/components";

interface CpStockPrice extends Components.CpStockPrice, HTMLElement {}
export const CpStockPrice: {
  prototype: CpStockPrice;
  new (): CpStockPrice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
