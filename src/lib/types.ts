export type IconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

export interface IconProps {
  /** Icon stroke/fill color. Accepts any CSS color string or `currentColor`. @default "currentColor" */
  color?: string;
  /** Icon size in pixels (sets both width and height). @default 24 */
  size?: number | string;
  /** Icon weight / style variant. @default "regular" */
  weight?: IconWeight;
  /** Flip the icon horizontally – useful for RTL layouts. @default false */
  mirrored?: boolean;
  /** Accessible label rendered as `<title>` inside the SVG. */
  alt?: string;
  /** Additional CSS class names forwarded to the `<svg>` element. */
  class?: string;
  [key: string]: unknown;
}

/** A map of each weight variant to its raw inner SVG markup (no `<svg>` wrapper). */
export type IconWeights = Map<IconWeight, string>;

export interface IconContextValue {
  color: string;
  size: number | string;
  weight: IconWeight;
  mirrored: boolean;
}

export const DEFAULT_CONTEXT: IconContextValue = {
  color: "currentColor",
  size: 24,
  weight: "regular",
  mirrored: false,
};
