import { ButtonHTMLAttributes } from "react";
import cls from "utils/cls";
import styles from "./Button.module.css";

type ButtonStyle = "small" | "large";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonStyle;
};

export default function Button({
  size = "large",
  className: classNameProps = "",
  ...props
}: Props) {
  return (
    <button
      className={cls(styles.button, styles[size], classNameProps)}
      {...props}
    />
  );
}
