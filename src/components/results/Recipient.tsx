import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import classNames from "classnames";

import WithEllipsis from "../../hoc/WithEllipsis";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

interface RecipientProps extends WithStyles<typeof styles> {
  className?: string;
  recipient: string[];
  labelMaxWidth: number;
}

function Recipient(props: RecipientProps) {
  const { classes, className, recipient, labelMaxWidth } = props;
  return (
    <WithEllipsis
      className={classNames(classes.root, className)}
      maxWidth={labelMaxWidth}
      title={recipient.join(", ")}
      separator=", "
      showHiddenCount
    >
      {recipient}
    </WithEllipsis>
  );
}

export default withStyles(styles)(Recipient);
