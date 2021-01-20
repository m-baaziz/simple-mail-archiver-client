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
import { createStyles, Paper, Divider, useMediaQuery } from "@material-ui/core";
import subYears from "date-fns/subYears";

import DatePicker from "./components/date-picker/DatePicker";
import MailTable from "./components/results/MailTable";
import ResultsCount from "./components/ResultsCount";
import Logo from "./components/Logo";
import MailCard from "./components/MailCard";

import mails from "./data";
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
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      padding: "50px 20px 50px 20px",
    },
    datePicker: {},
    resultsCount: { marginTop: 30, marginBottom: 10 },
    table: { marginTop: 5 },
    logo: { flexGrow: 2, marginTop: 10, paddingBottom: "15%" },
    mailCards: { marginTop: 40 },
  });

interface AppProps extends WithStyles<typeof styles> {}

function App(props: AppProps) {
  const { classes } = props;
  const endDate = new Date();
  const startDate = subYears(endDate, 1);
  const [start, setStart] = React.useState<Date | null>(startDate);
  const [end, setEnd] = React.useState<Date | null>(endDate);
  const [filteredMails, setFilteredMails] = React.useState<Mail[]>([]);
  const [selectedMails, setSelectedMails] = React.useState<Mail[]>([]);
  const isDesktop = useMediaQuery("(min-width:900px)");

  const search = (start: Date | null, end: Date | null) => {
    setStart(start);
    setEnd(end);
  };

  React.useEffect(() => {
    setFilteredMails(
      mails.filter(
        (mail: Mail) =>
          (!start || mail.date >= start) && (!end || mail.date <= end)
      )
    );
  }, [start, end]);

  const handleCloseMail = (id: string) => {
    setSelectedMails(selectedMails.filter((mail) => mail.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.root}>
        {/* initStart initEnd */}
        <DatePicker
          className={classes.datePicker}
          initStart={start}
          initEnd={end}
          onSearchClick={search}
          orientation={isDesktop ? "horizontal" : "vertical"}
        />
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
          <>
            <MailTable
              className={classes.table}
              mails={filteredMails}
              start={start}
              end={end}
              selectedMails={selectedMails}
              onSelectionChange={setSelectedMails}
              isDesktop={isDesktop}
            />
            <div className={classes.mailCards}>
              {selectedMails.map((mail) => (
                <MailCard key={mail.id} mail={mail} onClose={handleCloseMail} />
              ))}
            </div>
          </>
        )}
      </Paper>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
