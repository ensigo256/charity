declare module "@splidejs/react-splide" {
  import type {
    ComponentType,
    HTMLAttributes,
    LiHTMLAttributes,
    PropsWithChildren,
  } from "react";

  type SplideOptions = Record<string, unknown>;

  export const Splide: ComponentType<
    PropsWithChildren<HTMLAttributes<HTMLElement> & { options?: SplideOptions }>
  >;
  export const SplideSlide: ComponentType<LiHTMLAttributes<HTMLLIElement>>;
}