import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import classNames from "classnames";

import LogoImg from "../assets/logo.png";

const styles = (theme: Theme) =>
  createStyles({
    root: { display: "flex" },
    img: { margin: "auto", height: 200 },
  });

interface LogoProps extends WithStyles<typeof styles> {
  className?: string;
}

function Logo(props: LogoProps) {
  const { classes, className } = props;
  return (
    <div className={classNames(classes.root, className)}>
      <img className={classes.img} src={LogoImg} alt="logo" />
    </div>
  );
}

export default withStyles(styles)(Logo);
