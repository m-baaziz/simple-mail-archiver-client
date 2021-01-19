import React from "react";
import {
  Theme,
  createMuiTheme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { grey } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, Paper, Divider } from "@material-ui/core";

import DatePicker from "./components/DatePicker";
import MailTable from "./components/MailTable";
import ResultsCount from "./components/ResultsCount";
import Logo from "./components/Logo";

import { Mail } from "./models/Mail";

const theme = createMuiTheme({
  palette: {
    grey: grey,
    text: {
      secondary: grey[700],
    },
  },
});

const styles = (theme: Theme) =>
  createStyles({
    root: { height: "100%", padding: 50 },
    datePicker: {},
    resultsCount: { marginTop: 30, marginBottom: 10 },
    table: { marginTop: 5 },
    logo: { marginTop: 10, height: "60%" },
  });

const mails: Mail[] = [
  {
    from: "aaa@example.com",
    to: ["zzz.zzz@example.com"],
    subject: "[ HR-888 ] Notice of official announcement",
    attachment: "https://link-to-attachment-1.com",
    content: "MAIL 1",
    date: new Date("2021-01-19T15:20:00Z"),
  },
  {
    from: "bbb.bbbb@example.com",
    to: ["yyy@example.com"],
    subject: '[web:333] "Web Contact"',
    content: "MAIL 2",
    date: new Date("2021-01-12T15:10:00Z"),
  },
  {
    from: "cc.bbbb@example.com",
    to: ["xxx@example.com", "aaa@example.com", "bbb@example.com"],
    subject: '[web:333] "Web Contact"',
    content: "MAIL 2",
    date: new Date("2019-03-25T17:10:00Z"),
  },
];

interface AppProps extends WithStyles<typeof styles> {}

function App(props: AppProps) {
  const { classes } = props;
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);

  const search = (start: Date | null, end: Date | null) => {
    console.log("start = ", start, " end = ", end);
    setStart(start);
    setEnd(end);
  };

  const filterMail = (mail: Mail) =>
    (!start || mail.date >= start) && (!end || mail.date <= end);

  const filteredMails = [...mails].filter(filterMail);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.root}>
        {/* initStart initEnd */}
        <DatePicker className={classes.datePicker} onSearchClick={search} />
        <ResultsCount
          className={classes.resultsCount}
          count={filteredMails.length}
        />
        {filteredMails.length === 0 ? (
          <>
            <Divider />
            <Logo className={classes.logo} />
          </>
        ) : (
          <MailTable
            className={classes.table}
            mails={filteredMails}
            start={start}
            end={end}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
