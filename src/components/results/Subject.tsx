import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import classNames from "classnames";

import Clip from "./Clip";

import { Attachment } from "../../models/Mail";

const styles = (theme: Theme) =>
  createStyles({
    root: { display: "flex", justifyContent: "space-between" },
    subject: { margin: "auto", marginLeft: 0 },
    attachmentIconContainer: { margin: "auto", marginRight: 0 },
    attachmentIcon: { fontSize: 15 },
  });

interface SubjectProps extends WithStyles<typeof styles> {
  className?: string;
  subject: string;
  attachments: Attachment[];
  showAttachments: boolean;
}

function Subject(props: SubjectProps) {
  const { classes, className, subject, attachments, showAttachments } = props;
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.subject}>{subject}</div>
      {showAttachments && attachments.length > 0 ? <Clip /> : null}
    </div>
  );
}

export default withStyles(styles)(Subject);
