import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import { Badge } from "@material-ui/core";
import { InView } from "react-intersection-observer";

const styles = (theme: Theme) =>
  createStyles({
    root: { display: "flex", justifyContent: "space-between" },
    content: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    hiddenCount: { zIndex: 0 },
    hiddenCountBadge: {
      backgroundColor: theme.palette.grey[500],
      color: "white",
      borderRadius: 5,
      fontWeight: "bold",
    },
  });

interface WithEllipsisProps extends WithStyles<typeof styles> {
  maxWidth: number;
  title?: string;
  separator?: string | React.ReactElement;
  showHiddenCount?: boolean;
}

function WithEllipsis(props: React.PropsWithChildren<WithEllipsisProps>) {
  const {
    classes,
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
    <div className={classes.root}>
      <div className={classes.content} style={{ maxWidth }} title={title}>
        {renderChildren()}
      </div>
      {showHiddenCount && Array.isArray(children) && hiddenCount > 0 ? (
        <div className={classes.hiddenCount} title={title}>
          <Badge
            classes={{ badge: classes.hiddenCountBadge }}
            badgeContent={`+${hiddenCount}`}
          ></Badge>
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(WithEllipsis);
