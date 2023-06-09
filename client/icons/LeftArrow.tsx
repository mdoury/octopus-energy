import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<SVGElement>, "width" | "height" | "viewBox">;
export default function LeftArrow(props: Props) {
  return (
    <svg width="800px" height="800px" viewBox="0 0 556.424 556.424" {...props}>
      <path
        fill="currentColor"
        d="M508.094,13.5C511.82,6.043,508.087,0,499.749,0c0,0-205.77,0-205.773,0c-19.045,0.006-44.079,38.363-56.512,52.262
			C215.594,76.711,50.874,259.809,49.681,262.196c-3.727,7.458-3.727,19.544,0,27.001l222.456,253.726
			c3.727,7.458,13.507,13.501,21.843,13.501h205.77c8.335,0,12.071-6.043,8.345-13.501L285.638,289.197
			c-3.728-7.457-3.728-19.544,0-27.001L508.094,13.5z"
      />
    </svg>
  );
}
