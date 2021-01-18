import React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    "font-weight": "bold",
    color: theme.palette.text.secondary,
  },
});

interface ResultsCountProps extends WithStyles<typeof styles> {}

function ResultsCount(props: ResultsCountProps) {
  const { classes } = props;
  return <div className={classes.root}>Results : 0</div>;
}

export default withStyles(styles)(ResultsCount);
