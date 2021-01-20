import React from "react";
import { v4 as uuidv4 } from "uuid";
import { render, screen, fireEvent } from "@testing-library/react";

import MailCard from "./MailCard";
import { Mail } from "../models/Mail";

const mail: Mail = {
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
};

test("renders MailCard", () => {
  render(<MailCard mail={mail} onClose={jest.fn()} />);

  const elements = [
    screen.getByText(mail.from),
    screen.getByText(`To: ${mail.to.join(", ")}`),
    ...mail.attachments.map((attachment) => screen.getByText(attachment.name)),
    screen.getByText(mail.subject),
    screen.getByText(mail.content),
  ];

  elements.forEach((elmt) => {
    expect(elmt).toBeInTheDocument();
  });
});

test("closes MailCard", () => {
  const spy = jest.fn();

  render(<MailCard mail={mail} onClose={spy} />);

  expect(spy).not.toBeCalled();

  fireEvent(
    screen.getByRole("close"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(spy).toBeCalled();
});
