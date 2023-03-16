export function formatCurrency(amount: number) {
  const pound = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });
  return pound.format(amount);
  // return "£" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
