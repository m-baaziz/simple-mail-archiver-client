import React from "react";
import "react-dates/initialize";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { DateRangePicker } from "react-dates";
import classNames from "classnames";

import "react-dates/lib/css/_datepicker.css";
import moment, { Moment } from "moment";
import { SvgIcon } from "@material-ui/core";

import { ReactComponent as CalendarIcon } from "../assets/calendar.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import "./date-picker.css";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingLeft: 5,
      width: 400,
      border: "2px solid #ccc",
      borderRadius: 8,
      borderColor: theme.palette.grey[300],
      backgroundColor: "white",
      justifyContent: "space-between",
    },
    searchContainer: {
      display: "flex",
      backgroundColor: theme.palette.grey[200],
      width: 60,
      border: "none",
      borderLeft: "1px solid #ccc",
      borderRadius: "0px 8px 8px 0px",
      cursor: "pointer",
      "&:focus": {
        outline: "none",
      },
    },
    searchIcon: {
      margin: "auto",
    },
  });

interface DatePickerProps extends WithStyles<typeof styles> {
  className?: string;
  initStart?: Date | null;
  initEnd?: Date | null;
  onSearchClick: (start: Date | null, end: Date | null) => void;
}

function DatePicker(props: DatePickerProps) {
  const { classes, className, initStart, initEnd, onSearchClick } = props;

  const [startDate, setStartDate] = React.useState<Moment | null>(
    moment(initStart)
  );
  const [endDate, setEndDate] = React.useState<Moment | null>(moment(initEnd));
  const [focusedInput, setFocusedInput] = React.useState<any>();

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }): void => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSearchClick = () => {
    onSearchClick(startDate?.toDate() || null, endDate?.toDate() || null);
  };

  return (
    <div className={classNames(classes.root, className)}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        displayFormat="yyyy/MM/DD"
        startDateId="start_date_id"
        endDateId="end_date_id"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        customInputIcon={
          <SvgIcon component={CalendarIcon} viewBox="0 0 19.86244 18" />
        }
        customArrowIcon={<div>-</div>}
        isDayBlocked={() => false}
        isOutsideRange={() => false}
        noBorder
      />
      <button className={classes.searchContainer} onClick={handleSearchClick}>
        <SvgIcon
          className={classes.searchIcon}
          component={SearchIcon}
          viewBox="0 0 17.9803 18"
        />
      </button>
    </div>
  );
}

export default withStyles(styles)(DatePicker);
