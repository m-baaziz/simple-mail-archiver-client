import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { InView } from "react-intersection-observer";
import classNames from "classnames";

const styles = (theme: Theme) =>
  createStyles({
    root: { display: "flex", justifyContent: "space-between", width: "100%" },
    content: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    hiddenCount: {
      display: "flex",
      backgroundColor: theme.palette.grey[500],
      color: "white",
      borderRadius: 4,
      // height: 20,
      // width: 25,
    },
    hiddenCountLabel: {
      padding: "0px 3px 0px 3px",
      margin: "auto",
      fontWeight: "bold",
      fontSize: 13,
    },
  });

interface WithEllipsisProps extends WithStyles<typeof styles> {
  className?: string;
  maxWidth: number;
  title?: string;
  separator?: string | React.ReactElement;
  showHiddenCount?: boolean;
}

function WithEllipsis(props: React.PropsWithChildren<WithEllipsisProps>) {
  const {
    classes,
    className,
    children,
    maxWidth,
    title,
    separator,
    showHiddenCount,
  } = props;

  const [hiddenCount, setHiddenCount] = React.useState<number>(0);

  const onViewChange = (inView: boolean, entry: IntersectionObserverEntry) => {
    setHiddenCount(
      !inView
        ? hiddenCount + 1
        : hiddenCount > 0
        ? hiddenCount - 1
        : hiddenCount
    );
  };

  const addSeparator = (children: React.ReactNodeArray): React.ReactNodeArray =>
    separator
      ? children.map((child, i) => (
          <span key={i}>
            {child}
            {i < children.length - 1 ? separator : null}
          </span>
        ))
      : children;

  const addInView = (children: React.ReactNodeArray): React.ReactNodeArray =>
    showHiddenCount
      ? children.map((child, i) => (
          <InView key={i} as="span" threshold={0.2} onChange={onViewChange}>
            {child}
          </InView>
        ))
      : children;

  const renderChildren = () => {
    if (!Array.isArray(children)) {
      return children;
    }
    return addInView(addSeparator(children));
  };

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.content} style={{ maxWidth }} title={title}>
        {renderChildren()}
      </div>
      {showHiddenCount && Array.isArray(children) && hiddenCount > 0 ? (
        <div className={classes.hiddenCount} title={title}>
          <span className={classes.hiddenCountLabel}>+{hiddenCount}</span>
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(WithEllipsis);
