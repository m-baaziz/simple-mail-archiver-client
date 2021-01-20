import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { SvgIcon } from "@material-ui/core";
import classNames from "classnames";

import { ReactComponent as ClipIcon } from "../../assets/clip.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: "auto",
      marginRight: 0,
    },
    icon: { margin: "auto", fontSize: 15 },
  });

interface ClipProps extends WithStyles<typeof styles> {
  className?: string;
}

function Clip(props: ClipProps) {
  const { classes, className } = props;
  return (
    <div className={classNames(classes.root, className)}>
      <SvgIcon
        className={classes.icon}
        component={ClipIcon}
        viewBox="0 0 13.93083 15"
      />
    </div>
  );
}

export default withStyles(styles)(Clip);
