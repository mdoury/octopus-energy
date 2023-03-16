export default function cls(
  ...classNames: Array<string | null | undefined | Boolean>
) {
  return classNames.filter(Boolean).join(" ");
}
