import * as React from "react";
import { animated } from "react-spring";

function SvgInstaWhite(props) {
  const { style, ...rest } = props;
  return (
    <svg width="100pt" height="100pt" viewBox="0 0 100 100" {...rest}>
      <animated.path
        d="M32 6C17.664 6 6 17.664 6 32v36c0 14.336 11.664 26 26 26h36c14.336 0 26-11.664 26-26V32C94 17.664 82.336 6 68 6zm0 4h36c12.172 0 22 9.828 22 22v36c0 12.172-9.828 22-22 22H32c-12.172 0-22-9.828-22-22V32c0-12.172 9.828-22 22-22zm42 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 6c-12.125 0-22 9.875-22 22s9.875 22 22 22 22-9.875 22-22-9.875-22-22-22zm0 4c9.965 0 18 8.035 18 18s-8.035 18-18 18-18-8.035-18-18 8.035-18 18-18zm0 0"
        fill={style.fill}
      />
      <style jsx>{`
        svg {
          width: 35px;
          height: 35px;
        }
      `}</style>
    </svg>
  );
}

export default SvgInstaWhite;
