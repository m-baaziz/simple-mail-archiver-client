export type Mail = {
  from: string,
  to: string[],
  subject: string,
  content: string,
  attachment?: string,
  date: Date
}

export type SortKey = "from" | "to" | "subject" | "date";
export type SortOrder = "asc" | "desc";

export function sortMails(mails: Mail[], key: SortKey, order: SortOrder): Mail[] {
  return mails.sort((a, b) => {
    const val = a[key] < b[key];
    const ret =
      (order === "asc" && val) || (order === "desc" && !val)
        ? -1
        : 1;
    return ret;
  })
}
