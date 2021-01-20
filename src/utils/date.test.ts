import subYears from "date-fns/subYears";
import subDays from "date-fns/subDays";
import { shortDateFormat } from "./date";

test("build short dates", () => {
  const now = new Date("2021-01-20T05:40:00");

  expect(shortDateFormat(now)).toEqual("05:40");
  expect(shortDateFormat(subDays(now, 4))).toEqual("Jan 16");
  expect(shortDateFormat(subYears(now, 2))).toEqual("2019/01/20");
});
