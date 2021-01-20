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

interface FromProps extends WithStyles<typeof styles> {
  className?: string;
  from: string;
  labelMaxWidth: number;
}

function From(props: FromProps) {
  const { classes, className, from, labelMaxWidth } = props;
  return (
    <div className={classNames(classes.root, className)}>
      <WithEllipsis maxWidth={labelMaxWidth} title={from}>
        {from}
      </WithEllipsis>
    </div>
  );
}

export default withStyles(styles)(From);
