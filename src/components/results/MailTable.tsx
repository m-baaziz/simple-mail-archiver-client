import React from "react";
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
  Checkbox,
  SvgIcon,
  Divider,
} from "@material-ui/core";
import classNames from "classnames";

import Header, { HeaderInfo } from "./Header";
import Recipient from "./Recipient";
import Subject from "./Subject";
import From from "./From";
import Clip from "./Clip";
import { ReactComponent as MailIcon } from "../../assets/mail_sp.svg";
import { ReactComponent as CarretIcon } from "../../assets/carret.svg";

import { Mail, SortKey, SortOrder, sortMails } from "../../models/Mail";
import { shortDateFormat } from "../../utils/date";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    table: {},
    tableHead: { backgroundColor: theme.palette.grey[200] },
    bold: {
      fontWeight: "bold",
    },
    toContainer: {},
    rowHover: {
      "&:hover": {
        color: "blue",
        cursor: "pointer",
      },
    },
    tableBodyCell: {
      color: "inherit",
    },
    smTableHeadCell: {
      paddingLeft: 2,
      paddingRight: 2,
      justifyContent: "space-between",
    },
    smTableBodyCell: {
      paddingLeft: 0,
      paddingRight: "5px !important",
    },
    cellV: {
      display: "flex",
      flexDirection: "column",
    },
    cellH: {
      display: "flex",
      flexDirection: "row",
    },
    smV1: { flexGrow: 2 },
    smH1: { justifyContent: "space-between" },
    mailIcon: {
      margin: "auto",
    },
    carretIcon: {
      fontSize: 8,
      margin: "auto",
      marginLeft: 5,
    },
    smClip: {
      marginRight: 5,
    },
    smSubject: {
      marginLeft: 5,
    },
    smRecipient: {
      paddingRight: 5,
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
  isDesktop?: boolean;
}

function MailTable(props: MailTableProps) {
  const {
    classes,
    className,
    mails,
    selectedMails,
    onSelectionChange,
    isDesktop = true,
  } = props;

  const [sortKey, setSortKey] = React.useState<SortKey | null>("date");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc");
  const [sortedMails, setSortedMails] = React.useState<Mail[]>(mails);

  React.useEffect(() => {
    if (sortKey === null) {
      setSortedMails([...mails]);
      return;
    }
    const transform = (value: any) => {
      if (sortKey === "to") {
        return (value as string[]).join(", ").toLowerCase();
      }
      if (["from", "subject"].includes(sortKey)) {
        return (value as string).toLowerCase();
      }
      return value;
    };
    setSortedMails(sortMails([...mails], sortKey, sortOrder, transform));
  }, [mails, sortKey, sortOrder]);

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

  const headers: HeaderInfo[] = [
    { id: "from", label: "From" },
    { id: "to", label: "To" },
    { id: "subject", label: "Subject" },
    { id: "date", label: "Date" },
  ];

  const sortBy = (key: SortKey) => (): void => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder(DEFAULT_SORT_ORDER);
    } else {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

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
              {isDesktop ? (
                headers.map((header) => (
                  <TableCell
                    key={header.id}
                    align="left"
                    sortDirection={sortKey === header.id ? sortOrder : false}
                    classes={{
                      root: classNames(
                        !isDesktop ? classes.smTableHeadCell : null
                      ),
                    }}
                  >
                    <Header
                      header={header}
                      onClick={sortBy}
                      selected={sortKey === header.id}
                      sortOrder={sortOrder}
                    />
                  </TableCell>
                ))
              ) : (
                <TableCell
                  align="left"
                  classes={{
                    root: classNames(
                      !isDesktop
                        ? classNames(classes.smTableHeadCell, classes.cellH)
                        : null
                    ),
                  }}
                >
                  {headers.map((header, i) => (
                    <React.Fragment key={header.id}>
                      <Header
                        header={header}
                        onClick={sortBy}
                        selected={sortKey === header.id}
                        sortOrder={sortOrder}
                      />
                      {i < headers.length - 1 ? (
                        <Divider orientation="vertical" flexItem />
                      ) : null}
                    </React.Fragment>
                  ))}
                </TableCell>
              )}
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
                {isDesktop ? (
                  <>
                    <TableCell
                      classes={{ root: classes.tableBodyCell }}
                      align="left"
                      onClick={handleCellClick(mail.id)}
                    >
                      <From from={mail.from} labelMaxWidth={150} />
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.tableBodyCell }}
                      align="left"
                      onClick={handleCellClick(mail.id)}
                    >
                      <Recipient recipient={mail.to} labelMaxWidth={150} />
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.tableBodyCell }}
                      align="left"
                      onClick={handleCellClick(mail.id)}
                    >
                      <Subject
                        subject={mail.subject}
                        attachments={mail.attachments}
                        showAttachments
                        labelMaxWidth={420}
                      />
                    </TableCell>
                    <TableCell
                      classes={{ root: classes.tableBodyCell }}
                      align="left"
                      onClick={handleCellClick(mail.id)}
                    >
                      {shortDateFormat(mail.date)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell
                      classes={{
                        root: classNames(
                          classes.tableBodyCell,
                          classes.smTableBodyCell
                        ),
                      }}
                      align="left"
                      onClick={handleCellClick(mail.id)}
                    >
                      <div className={classes.cellH}>
                        <div className={classes.cellV}>
                          <SvgIcon
                            className={classes.mailIcon}
                            component={MailIcon}
                            viewBox="0 0 11.35144 26.35693"
                          />
                        </div>
                        <div
                          className={classNames(classes.cellV, classes.smV1)}
                        >
                          <div
                            className={classNames(classes.cellH, classes.smH1)}
                          >
                            <From
                              className={classes.bold}
                              from={mail.from}
                              labelMaxWidth={150}
                            />
                            <div className={classes.cellH}>
                              {mail.attachments.length > 0 ? (
                                <Clip className={classes.smClip} />
                              ) : null}
                              {shortDateFormat(mail.date)}
                              <SvgIcon
                                className={classes.carretIcon}
                                component={CarretIcon}
                                viewBox="0 0 2.9882 6"
                              />
                            </div>
                          </div>
                          <div className={classes.cellH}>
                            <Recipient
                              className={classes.smRecipient}
                              recipient={mail.to}
                              labelMaxWidth={200}
                            />
                          </div>
                        </div>
                      </div>
                      <Subject
                        className={classes.smSubject}
                        subject={mail.subject}
                        attachments={mail.attachments}
                        showAttachments={false}
                        labelMaxWidth={300}
                      />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(MailTable);
