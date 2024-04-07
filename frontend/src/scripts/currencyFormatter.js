export function currencyFormatter(num) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    currencySign: "accounting",
  }).format(num)
}
