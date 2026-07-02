export function filterAccess(
  data: any[],
  selectedAccess: string | null,
): any[] {
  if (selectedAccess === "Для участников") {
    return data.filter((item) => item.isFree === false);
  }
  return data;
}
