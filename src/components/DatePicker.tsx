import React from "react";
import "react-dates/initialize";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { DateRangePicker } from "react-dates";

import "react-dates/lib/css/_datepicker.css";
import moment, { Moment } from "moment";
import { SvgIcon } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { ReactComponent as CalendarIcon } from "../icons/icon_calendar.svg";
import { ReactComponent as SearchIcon } from "../icons/icon_search.svg";
import "./date-picker.css";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginLeft: 50,
      marginTop: 50,
      paddingLeft: 5,
      width: 400,
      border: "2px solid #ccc",
      borderRadius: 8,
      borderColor: grey[300],
      backgroundColor: "white",
      justifyContent: "space-between",
    },
    searchContainer: {
      display: "flex",
      backgroundColor: grey[200],
      width: 60,
      borderLeft: "2px solid #ccc",
      borderRadius: "0px 8px 8px 0px",
      cursor: "pointer",
    },
    searchIcon: {
      margin: "auto",
    },
  });

interface DatePickerProps extends WithStyles<typeof styles> {
  onSearchClick: (start: Moment | null, end: Moment | null) => void;
}

function DatePicker(props: DatePickerProps) {
  const { classes, onSearchClick } = props;

  const [startDate, setStartDate] = React.useState<Moment | null>(moment());
  const [endDate, setEndDate] = React.useState<Moment | null>(moment());
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
    onSearchClick(startDate, endDate);
  };

  return (
    <div className={classes.root}>
      {/* <Button onClick={handleBtnClick}> DEBUG </Button> */}
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
      <div className={classes.searchContainer} onClick={handleSearchClick}>
        <SvgIcon
          className={classes.searchIcon}
          component={SearchIcon}
          viewBox="0 0 17.9803 18"
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(DatePicker);
