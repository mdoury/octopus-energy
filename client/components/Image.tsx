import { ImgHTMLAttributes } from "react";
import cls from "utils/cls";
import styles from "./Image.module.css";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

export default function Image({
  className,
  wrapperClassName,
  ...props
}: Props) {
  return (
    <div className={cls(styles.imageWrapper, wrapperClassName)}>
      <img className={cls(styles.image, className)} {...props} />
    </div>
  );
}
