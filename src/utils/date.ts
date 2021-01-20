import format from "date-fns/format";

export function shortDateFormat(date: Date): string {
  const now = new Date();
  if (date.getFullYear() === now.getFullYear()) {
    if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate())
      return format(date, "HH:mm");
    return format(date, "MMM dd");
  }
  return format(date, "yyyy/MM/dd");
}
