import React, { ReactElement } from "react";
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SvgIcon,
  Checkbox,
} from "@material-ui/core";
import classNames from "classnames";

import WithEllipsis from "../hoc/WithEllipsis";
import { Mail, SortKey, SortOrder, sortMails } from "../models/Mail";
import { shortDateFormat } from "../utils/date";

import { ReactComponent as ArrowUpIcon } from "../assets/arrow_up.svg";
import { ReactComponent as ClipIcon } from "../assets/clip.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    table: {},
    tableHead: { backgroundColor: theme.palette.grey[200] },
    tableHeadCell: {
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
    toContainer: {},
    subjectContainer: { display: "flex", justifyContent: "space-between" },
    subject: { margin: "auto", marginLeft: 0 },
    attachmentIconContainer: { margin: "auto", marginRight: 0 },
    attachmentIcon: { fontSize: 15 },
    rowHover: {
      "&:hover": {
        color: "blue",
        cursor: "pointer",
      },
    },
    tableBodyCell: {
      color: "inherit",
    },
  });

const DEFAULT_SORT_ORDER: SortOrder = "asc";

interface MailTableProps extends WithStyles<typeof styles> {
  className?: string;
  mails: Mail[];
  start: Date | null;
  end: Date | null;
  selectedMails: Mail[];
  onSelectionChange: (selectedMails: Mail[]) => void;
}

interface HeadTableCell {
  id: SortKey;
  label: string | ReactElement;
}

function MailTable(props: MailTableProps) {
  const { classes, className, mails, selectedMails, onSelectionChange } = props;

  const [sortKey, setSortKey] = React.useState<SortKey | null>("date");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc");
  const [sortedMails, setSortedMails] = React.useState<Mail[]>(mails);

  React.useEffect(() => {
    if (sortKey === null) {
      setSortedMails([...mails]);
      return;
    }
    setSortedMails(sortMails([...mails], sortKey, sortOrder));
  }, [mails, sortKey, sortOrder]);

  const sortBy = (key: SortKey) => (): void => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder(DEFAULT_SORT_ORDER);
    } else {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMails.length === 0) {
      onSelectionChange([...mails]);
      return;
    }
    onSelectionChange([]);
  };

  const handleCheckboxClick = (id: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mailToAdd = mails.find((mail) => mail.id === id);
    if (!mailToAdd) return;
    if (selectedMails.find((mail) => mail.id === id)) {
      onSelectionChange([...selectedMails.filter((mail) => mail.id !== id)]);
      return;
    }
    onSelectionChange([...selectedMails, mailToAdd]);
  };

  const handleCellClick = (id: string) => (
    event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
  ) => {
    const mailToAdd = mails.find((mail) => mail.id === id);
    if (!mailToAdd) return;
    onSelectionChange([mailToAdd]);
  };

  const headers: HeadTableCell[] = [
    { id: "from", label: "From" },
    { id: "to", label: "To" },
    { id: "subject", label: "Subject" },
    { id: "date", label: "Date" },
  ];

  return (
    <div className={classNames(classes.root, className)}>
      <TableContainer className={classes.table} component={Paper}>
        <Table size="small" aria-label="mails table">
          <TableHead classes={{ root: classes.tableHead }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedMails.length > 0 &&
                    selectedMails.length < sortedMails.length
                  }
                  checked={
                    sortedMails.length > 0 &&
                    selectedMails.length === sortedMails.length
                  }
                  onChange={handleSelectAllClick}
                  color="default"
                  inputProps={{ "aria-label": "select all mails" }}
                />
              </TableCell>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  align="left"
                  sortDirection={sortKey === header.id ? sortOrder : false}
                >
                  <div
                    className={classes.tableHeadCell}
                    onClick={sortBy(header.id)}
                  >
                    <div
                      className={classNames(
                        classes.tableHeadCellLabel,
                        sortKey === header.id
                          ? classes.selectedHeaderLabel
                          : null
                      )}
                    >
                      {header.label}
                    </div>
                    {sortKey === header.id ? (
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
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMails.map((mail) => (
              <TableRow
                key={mail.id}
                classes={{ hover: classes.rowHover }}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedMails.findIndex((m) => m.id === mail.id) !== -1
                    }
                    inputProps={{ "aria-labelledby": mail.subject }}
                    onChange={handleCheckboxClick(mail.id)}
                    color="default"
                  />
                </TableCell>
                <TableCell
                  classes={{ root: classes.tableBodyCell }}
                  align="left"
                  onClick={handleCellClick(mail.id)}
                >
                  {mail.from}
                </TableCell>
                <TableCell
                  classes={{ root: classes.tableBodyCell }}
                  align="left"
                  onClick={handleCellClick(mail.id)}
                >
                  <WithEllipsis
                    maxWidth={150}
                    title={mail.to.join(", ")}
                    separator=", "
                    showHiddenCount
                  >
                    {mail.to}
                  </WithEllipsis>
                </TableCell>
                <TableCell
                  classes={{ root: classes.tableBodyCell }}
                  align="left"
                  onClick={handleCellClick(mail.id)}
                >
                  <div className={classes.subjectContainer}>
                    <div className={classes.subject}>{mail.subject}</div>
                    {mail.attachments.length > 0 ? (
                      <div className={classes.attachmentIconContainer}>
                        <SvgIcon
                          className={classes.attachmentIcon}
                          component={ClipIcon}
                          viewBox="0 0 13.93083 15"
                        />
                      </div>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell
                  classes={{ root: classes.tableBodyCell }}
                  align="left"
                  onClick={handleCellClick(mail.id)}
                >
                  {shortDateFormat(mail.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(MailTable);
