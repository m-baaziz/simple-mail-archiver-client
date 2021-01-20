import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { SvgIcon } from "@material-ui/core";
import classNames from "classnames";

import { ReactComponent as ArrowUpIcon } from "../../assets/arrow_up.svg";

import { SortKey, SortOrder } from "../../models/Mail";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      cursor: "pointer",
    },
    tableHeadCellLabel: {
      color: theme.palette.text.secondary,
      fontWeight: "bold",
      display: "inline-block",
      margin: "auto",
      marginLeft: 0,
      marginRight: 10,
    },
    sortIconContainer: { margin: "auto", marginLeft: 0 },
    sortIcon: { fontSize: 10 },
    selectedHeaderLabel: { color: theme.palette.text.primary },
    flip: {
      "-webkit-transform": "scaleY(-1)",
      transform: "scaleY(-1)",
    },
  });

export interface HeaderInfo {
  id: SortKey;
  label: string | React.ReactElement;
}

interface HeaderProps extends WithStyles<typeof styles> {
  className?: string;
  header: HeaderInfo;
  onClick: (id: SortKey) => () => void;
  selected: boolean;
  sortOrder: SortOrder;
}

function Header(props: HeaderProps) {
  const { classes, className, header, onClick, selected, sortOrder } = props;

  return (
    <div
      className={classNames(classes.root, className)}
      onClick={onClick(header.id)}
    >
      <div
        className={classNames(
          classes.tableHeadCellLabel,
          selected ? classes.selectedHeaderLabel : null
        )}
      >
        {header.label}
      </div>
      {selected ? (
        <div className={classes.sortIconContainer}>
          <SvgIcon
            className={classNames(
              classes.sortIcon,
              sortOrder === "desc" ? classes.flip : null
            )}
            component={ArrowUpIcon}
            viewBox="0 0 8 5"
          />
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(Header);
