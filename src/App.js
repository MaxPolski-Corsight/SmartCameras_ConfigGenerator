import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InitSettings from "./components/InitSettings";
import SetUpServices from "./components/SetUpServices";
import Summary from "./components/Summary";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
}));

function App(props) {
  const classes = useStyles();
  return (
    <div className="App">
      <CssBaseline />
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <InitSettings />
          </Paper>
          <Paper className={classes.paper}>
            <SetUpServices />
          </Paper>
          <Paper className={classes.paper}>
            <Summary />
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default App;
