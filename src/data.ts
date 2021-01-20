import { v4 as uuidv4 } from "uuid";

import { Mail } from "./models/Mail";

const mails: Mail[] = [
  {
    id: uuidv4(),
    from: "aaa@example.com",
    to: ["zzz.zzz@example.com"],
    subject: "[ HR-888 ] Notice of official announcement",
    attachments: [],
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
  {
    id: uuidv4(),
    from: "ccc@example.com",
    to: ["xxx@example.com", "aaa@example.com"],
    subject: "Happy New Year! Greetings for the New Year.",
    attachments: [
      { name: "file_one.pdf", url: "https://link-to-attachment-1.com" },
      { name: "file_two.png", url: "https://link-to-attachment-2.com" },
    ],
    content: "MAIL 2",
    date: new Date("2020-03-25T00:00:00"),
  },
  {
    id: uuidv4(),
    from: "ddd.dddd@example.com",
    to: ["xxx@example.com", "aaa@example.com"],
    subject:
      "[HR-887(Revised: Office Expansion Project Team)] Notice of official announcement",
    attachments: [],
    content: "MAIL 2",
    date: new Date("2020-01-01T00:00:00"),
  },
  {
    id: uuidv4(),
    from: "eee@example.com",
    to: ["sss@example.com", "aaa@example.com", "bbb@example.com"],
    subject: "[Github] Logout page",
    attachments: [],
    content: "MAIL 2",
    date: new Date("2020-01-01T02:00:00"),
  },
  {
    id: uuidv4(),
    from: "fff.ffff@example.com",
    to: ["qqq.qqq@example.com"],
    subject: "[dev] Postfix 3.1.12 / 3.2.9 / 3.3.4 / 3.4.5",
    attachments: [],
    content: "MAIL 2",
    date: new Date("2021-01-01T15:10:00"),
  },
  {
    id: uuidv4(),
    from: "ggg@example.com",
    to: ["ppp@example.com"],
    subject: "Re: [Github] Brush-up on loading animation",
    attachments: [],
    content: "MAIL 2",
    date: new Date("2021-01-01T16:10:00"),
  },
  {
    id: uuidv4(),
    from: "hhh.hhh@example.com",
    to: ["ooo.ooo@example.com"],
    subject: "Workplace Summary for sample, Inc.: Jun 2 - Jun 9",
    attachments: [
      { name: "file_one.pdf", url: "https://link-to-attachment-1.com" },
    ],
    content: "MAIL 2",
    date: new Date("2021-01-01T17:10:00"),
  },
  {
    id: uuidv4(),
    from: "iii@example.com",
    to: ["nnn@example.com"],
    subject: "I love you",
    attachments: [
      { name: "file_one.pdf", url: "https://link-to-attachment-1.com" },
    ],
    content: "MAIL 2",
    date: new Date("2019-12-31T17:10:00"),
  },
  {
    id: uuidv4(),
    from: "Pablo-Diego-Jose-Fransisco@example.com",
    to: ["Pablo-Diego-Jose-Fransisco@example.com"],
    subject: "[info:888] ABC EQUIPMENT COMPANY",
    attachments: [],
    content: "MAIL 2",
    date: new Date("2019-12-31T17:20:00"),
  },
];

export default mails;
