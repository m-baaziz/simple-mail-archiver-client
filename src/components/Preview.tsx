import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

interface PreviewProps extends WithStyles<typeof styles> {}

function Preview(props: PreviewProps) {
  const { classes } = props;
  return <div className={classes.root}>Preview</div>;
}

export default withStyles(styles)(Preview);
