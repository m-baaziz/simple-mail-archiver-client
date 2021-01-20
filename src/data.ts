import { v4 as uuidv4 } from "uuid";

import { Mail } from "./models/Mail";

const mails: Mail[] = [
  {
    id: uuidv4(),
    from: "aaa@example.com",
    to: ["zzz.zzz@example.com"],
    subject: "[ HR-888 ] Notice of official announcement",
    attachments: [{name: "file_one.pdf", url: "https://link-to-attachment-1.com"}, {name: "file_two.png", url: "https://link-to-attachment-2.com"}],
    content: "MAIL 1",
    date: new Date("2021-01-19T23:50:00Z"),
  },
  {
    id: uuidv4(),
    from: "bbb.bbbb@example.com",
    to: ["yyy@example.com"],
    subject: '[web:333] "Web Contact"',
    attachments: [],
    content: "MAIL 2",
    date: new Date("2021-01-12T15:10:00Z"),
  },
  {
    id: uuidv4(),
    from: "cc.bbbb@example.com",
    to: ["xxx@example.com", "aaa@example.com", "bbb@example.com"],
    subject: '[web:333] "Web Contact"',
    attachments: [],
    content: "MAIL 2",
    date: new Date("2020-03-25T17:10:00Z"),
  },
];

export default mails;
