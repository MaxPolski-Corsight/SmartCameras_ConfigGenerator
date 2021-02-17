import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InitSettings from './components/InitSettings';
import ConfigurationList from './components/ConfigurationList';
import SetUpServices from './components/SetUpServices';
import Summary from './components/Summary';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


function App(props) {
  const classes = useStyles();
  console.log(`props sysInfo -> ${JSON.stringify(props.sysInfo)}`);
  return (
    <div className="App">
      <CssBaseline />
      <Paper className={classes.paper}>
        <InitSettings/>
      </Paper>
      <Paper className={classes.paper} >
        <ConfigurationList/>
      </Paper>
      <Paper className={classes.paper} >
        <SetUpServices/>
      </Paper>
      <Paper className={classes.paper} >
        <Summary/>
      </Paper>
    </div>
  );
}


const mapStateToProps = function (state) {
  return {
    sysInfo : state.sysInfo,
  };
};

export default connect(mapStateToProps)(App);


