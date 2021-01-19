import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import classNames from "classnames";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontWeight: "bold",
      color: theme.palette.text.secondary,
      fontSize: 18,
    },
    count: {
      fontSize: 25,
    },
  });

interface ResultsCountProps extends WithStyles<typeof styles> {
  className?: string;
  count: number;
}

function ResultsCount(props: ResultsCountProps) {
  const { classes, className, count } = props;
  return (
    <div className={classNames(classes.root, className)}>
      Results : <span className={classes.count}>{count}</span> mail(s)
    </div>
  );
}

export default withStyles(styles)(ResultsCount);
