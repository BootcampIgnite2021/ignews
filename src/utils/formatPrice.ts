export function formatPrice(value: number): string {
  const priceValue = Number(value);

  return priceValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
