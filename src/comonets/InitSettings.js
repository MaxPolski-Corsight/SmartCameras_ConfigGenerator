import { useState, version } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  headder: {
    marginTop: theme.spacing(1),
  },
  divider: {},
}));

function InitSettings(props) {
  const classes = useStyles();
  const [framework, setFramework] = useState("");
  const [frameworkModel, setFrameworkModel] = useState("");
  const [precision, setPrecision] = useState("");
  const [scVersion, setScVersion] = useState("");
  const [gpuNumber, setGpuNumber] = useState(0);
  const handleFrameworkChange = (event) =>
    props.setFramework(event.target.value);
  const handleFrameworModelChange = (event) =>
    props.setModel(event.target.value);
  const handlePercisionChange = (event) =>
    props.setPrecision(event.target.value);
  const handleScVersionChange = (event) =>{
      console.log(event.target.value);
    props.setScVersion(event.target.value);
  }
  const handleGpuNumberChange = (event) =>
    props.setGPUNumber(event.target.value);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select the framework
      </Typography>
      <Divider />
      <FormControl>
        <RadioGroup onChange={handleFrameworkChange}>
          <FormControlLabel
            value="Tensorflow"
            control={<Radio color="primary" />}
            label="Tensorflow"
          />
          <FormControlLabel
            value="OpenVino"
            control={<Radio color="primary" />}
            label="OpenVino"
          />
        </RadioGroup>
      </FormControl>
      <Typography className={classes.headder} variant="h6" gutterBottom>
        Framework addional settings
      </Typography>
      <Divider className={classes.divider} />
      <FormControl fullWidth>
        <InputLabel>Framework Model</InputLabel>
        <Select onChange={handleFrameworModelChange} defualtvalue={""}>
          <option value={"Thalmus3"}>Thalmus3</option>
          <option value={"Thalmus4"}>Thalmus4</option>
          <option value={"Thalmus5"}>Thalmus5</option>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Precision</InputLabel>
        <Select onChange={handlePercisionChange} defualtvalue={""}>
          <option value={"fp16"}>fp16</option>
          <option value={"fp32"}>fp32</option>
        </Select>
      </FormControl>
      <Typography className={classes.headder} variant="h6" gutterBottom>
        System settings
      </Typography>
      <Divider className={classes.divider} />
      <FormControl fullWidth>
        <InputLabel>Smart Cameras version</InputLabel>
        <Select onChange={handleScVersionChange} defualtvalue={""}>
          <option value={"0.20.0"}>0.20.0</option>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Video cards in the system</InputLabel>
        <Select onChange={handleGpuNumberChange} defualtvalue={0}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </Select>
      </FormControl>
    </div>
  );
}

//ACTIONS
const setGPUNumber = (gpuNumber) => ({
  type: "CHANGE_GPU_NUMBER",
  payload: gpuNumber,
});
const setPrecision = (precision) => ({
  type: "SET_PERCISION",
  payload: precision,
});
const setFramework = (framework) => ({
  type: "SET_FRAMEWORK",
  payload: framework,
});
const setModel = (model) => ({ type: "SET_MODEL", payload: model });
const setScVersion = (sc_version) => ({
  type: "SET_SC_VERSION",
  payload: sc_version,
});

const mapStateToProps = function (state) {
  return {
    gpuCount: state.sysInfo.gpuCount,
    framework: state.sysInfo.framework,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrecision: (precision) => dispatch(setPrecision(precision)),
    setGPUNumber: (gpuNumber) => dispatch(setGPUNumber(gpuNumber)),
    setFramework: (framework) => dispatch(setFramework(framework)),
    setModel: (model) => dispatch(setModel(model)),
    setScVersion: (sc_version) => dispatch(setScVersion(sc_version)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitSettings);
