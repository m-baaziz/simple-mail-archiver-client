import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsCount from "./ResultsCount";

test("renders results count", () => {
  const count = 10;
  render(<ResultsCount count={count} />);
  const countElement = screen.getByText(`${count}`);
  expect(countElement).toBeInTheDocument();
});
