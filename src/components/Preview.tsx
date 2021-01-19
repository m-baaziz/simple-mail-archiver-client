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
    root: {},
  });

interface PreviewProps extends WithStyles<typeof styles> {
  className?: string;
}

function Preview(props: PreviewProps) {
  const { classes, className } = props;
  return <div className={classNames(classes.root, className)}>Preview</div>;
}

export default withStyles(styles)(Preview);
