import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pixel-canvas": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "data-gap"?: string;
        "data-speed"?: string;
        "data-colors"?: string;
        "data-no-focus"?: boolean;
      };
    }
  }
}