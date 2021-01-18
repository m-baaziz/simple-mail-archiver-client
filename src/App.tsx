import React from "react";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { grey } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Moment } from "moment";

import DatePicker from "./components/DatePicker";

const styles = {};

const theme = createMuiTheme({
  palette: {
    text: {
      secondary: grey[700],
    },
  },
});

function App() {
  const search = (start: Moment | null, end: Moment | null) => {
    console.log("start = ", start, " end = ", end);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <div>
          <DatePicker onSearchClick={search} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(App);
