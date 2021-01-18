import React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {},
});

interface MailTableProps extends WithStyles<typeof styles> {}

function MailTable(props: MailTableProps) {
  const { classes } = props;
  return <div className={classes.root}>Mail Table</div>;
}

export default withStyles(styles)(MailTable);
