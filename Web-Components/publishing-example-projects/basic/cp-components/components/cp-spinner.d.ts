import type { Components, JSX } from "../types/components";

interface CpSpinner extends Components.CpSpinner, HTMLElement {}
export const CpSpinner: {
  prototype: CpSpinner;
  new (): CpSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
