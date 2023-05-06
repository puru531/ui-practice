import type { Components, JSX } from "../types/components";

interface CpStockFinder extends Components.CpStockFinder, HTMLElement {}
export const CpStockFinder: {
  prototype: CpStockFinder;
  new (): CpStockFinder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
