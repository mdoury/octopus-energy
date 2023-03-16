import Link, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";
import cls from "utils/cls";
import styles from "./BackNav.module.css";
import LeftArrow from "icons/LeftArrow";

type Props = HTMLAttributes<HTMLElement> & {
  text: string;
  linkProps: LinkProps;
};

export default function BackNav({
  linkProps,
  text,
  className,
  ...props
}: Props) {
  return (
    <nav className={cls(styles.nav, className)} {...props}>
      <Link {...linkProps}>
        <a className={styles.link}>
          <LeftArrow className={styles.icon} />
          {/* <span>{text}</span> */}
          {text}
        </a>
      </Link>
    </nav>
  );
}
