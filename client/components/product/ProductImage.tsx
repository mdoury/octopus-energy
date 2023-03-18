import { ImgHTMLAttributes } from "react";
import cls from "utils/cls";
import styles from "./ProductImage.module.css";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  wrapperClassName?: string;
};

export default function Image({
  alt,
  className,
  wrapperClassName,
  ...props
}: Props) {
  return (
    <div className={cls(styles.imageWrapper, wrapperClassName)}>
      <img className={cls(styles.image, className)} alt={alt} {...props} />
    </div>
  );
}
