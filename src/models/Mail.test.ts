import { v4 as uuidv4 } from "uuid";
import { Mail, sortMails } from "./Mail";

const mails: Mail[] = [
  {
    id: uuidv4(),
    from: "aaa@example.com",
    to: ["zzz.zzz@example.com"],
    subject: "[ HR-888 ] Notice of official announcement",
    attachments: [
      { name: "file_one.pdf", url: "https://link-to-attachment-1.com" },
      { name: "file_two.png", url: "https://link-to-attachment-2.com" },
    ],
    content: "MAIL 1",
    date: new Date("2021-01-20T05:40:00"),
  },
  {
    id: uuidv4(),
    from: "bbb.bbbb@example.com",
    to: ["yyy@example.com"],
    subject: '[web:333] "Web Contact"',
    attachments: [],
    content: "MAIL 2",
    date: new Date("2021-01-12T15:10:00"),
  },
];

test("sort mails", () => {
  const sortedByFromAsc = sortMails(mails, "from", "asc");
  const sortedByFromDesc = sortMails(mails, "from", "desc");
  const sortedByDate = sortMails(mails, "date", "asc");
  const sortedByRecipient = sortMails(mails, "to", "desc", (value: any) =>
    (value as string[]).join(", ").toLowerCase()
  );

  expect(sortedByFromAsc).toEqual(mails);
  expect(sortedByFromDesc[0]).toEqual(mails[1]);
  expect(sortedByDate[0]).toEqual(mails[1]);
  expect(sortedByRecipient).toEqual(mails);
});
