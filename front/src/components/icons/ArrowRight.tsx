import { SVGProps } from "react";

const ArrowRight = ({ fill, ...rest }: SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill={fill || "none"}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M6 12H18M18 12L13 7M18 12L13 17"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRight;
