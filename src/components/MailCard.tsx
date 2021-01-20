import React from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Link,
  SvgIcon,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import classNames from "classnames";

import { Mail } from "../models/Mail";

import { ReactComponent as ClipIcon } from "../assets/clip.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: { marginBottom: 20 },
    headerIcon: {},
    body: {
      padding: 20,
      paddingTop: 0,
    },
    subject: { marginTop: 20 },
    attachmentsContainer: { fontSize: 12 },
    attachment: { cursor: "pointer" },
    attachmentIcon: { marginRight: 5, fontSize: 10 },
    content: { marginTop: 20 },
  });

interface MailCardProps extends WithStyles<typeof styles> {
  className?: string;
  mail: Mail;
  onClose: (id: string) => void;
}

function MailCard(props: MailCardProps) {
  const { classes, className, mail, onClose } = props;

  const handleCloseClick = () => {
    onClose(mail.id);
  };
  return (
    <Card className={classNames(classes.root, className)}>
      <CardHeader
        avatar={
          <Avatar aria-label="from" className={classes.headerIcon}>
            {mail.from[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="close" onClick={handleCloseClick}>
            <CloseIcon />
          </IconButton>
        }
        title={mail.from}
        subheader={`To: ${mail.to.join(", ")}`}
      />
      <CardContent classes={{ root: classes.body }}>
        <div className={classes.attachmentsContainer}>
          {mail.attachments.map((attachment, i) => (
            <div key={i} className={classes.attachment}>
              <Link
                // href={attachment.url}
                color="inherit"
                onClick={() => {}}
              >
                <SvgIcon
                  className={classes.attachmentIcon}
                  component={ClipIcon}
                  viewBox="0 0 13.93083 15"
                />
                {attachment.name}
              </Link>
            </div>
          ))}
        </div>
        <Typography
          className={classes.subject}
          variant="h5"
          color="textSecondary"
          component="p"
        >
          {mail.subject}
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {mail.content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(MailCard);
