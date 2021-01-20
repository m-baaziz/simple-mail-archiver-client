export type Attachment = {
  name: string;
  url: string;
};

export type Mail = {
  id: string;
  from: string;
  to: string[];
  subject: string;
  content: string;
  attachments: Attachment[];
  date: Date;
};

export type SortKey = "from" | "to" | "subject" | "date";
export type SortOrder = "asc" | "desc";

export function sortMails(
  mails: Mail[],
  key: SortKey,
  order: SortOrder,
  transform?: (value: any) => any
): Mail[] {
  return [...mails].sort((a, b) => {
    const val = transform
      ? transform(a[key]) < transform(b[key])
      : a[key] < b[key];
    const ret = (order === "asc" && val) || (order === "desc" && !val) ? -1 : 1;
    return ret;
  });
}
