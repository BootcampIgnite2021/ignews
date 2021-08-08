export function formatDate(date: string | Date) {
  const dateConverted = new Date(date);

  return Intl.DateTimeFormat("pt-bt", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateConverted);
}
