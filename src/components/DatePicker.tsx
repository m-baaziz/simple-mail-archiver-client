import React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {},
});

interface DatePickerProps extends WithStyles<typeof styles> {}

function DatePicker(props: DatePickerProps) {
  const { classes } = props;
  return <div className={classes.root}>Date Picker</div>;
}

export default withStyles(styles)(DatePicker);
