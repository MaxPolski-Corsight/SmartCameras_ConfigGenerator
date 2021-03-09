import React , {useState} from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';


import { SC_VERSIONS , MODELS_NAMES , DEFAULT_MODEL } from "../constants/InitSettingsConstant";

const useStyles = makeStyles((theme) => ({
  headder: {
    marginTop: theme.spacing(1),
  },
  nextBtn :{
    marginTop : '10px',
  },
  divider: {},
}));

function InitSettings(props) {
  const [showOvType,setShowOvType] = useState(false);
  const [showPrecision,setShowPrecision] = useState(true);
  const [ovType,setOvType] = useState('');
  const classes = useStyles(); 


  
  
  const handleFrameworkChange = (event) =>{
    if(event.target.value =='OpenVino'){
      setShowOvType(true);
      setShowPrecision(false);
    } else {
      setShowOvType(false);
      setShowPrecision(true);

    }
    props.setFramework(event.target.value);

  }
  const handleOpenVinoType = (event) => {
    props.setOpenVinoType(event.target.value);
  }
  const handleFrameworModelChange = (event) =>{
    props.setModel(event.target.value);
    
  }
  const handlePercisionChange = (event) =>
    props.setPrecision(event.target.value);
  const handleScVersionChange = (event) =>{
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
            value="TRT"
            control={<Radio color="primary" />}
            label="TRT"
          />
          <FormControlLabel
            value="OpenVino"
            control={<Radio color="primary" />}
            label="OpenVino"
          />
        </RadioGroup>
      </FormControl>
      {showOvType &&
      <>
      <Typography variant="h6" gutterBottom>
      OpenVino Type
      </Typography>
      <Divider />
      <FormControl>
        <RadioGroup onChange={handleOpenVinoType}>
          <FormControlLabel
            value="_OPENVINO_CPU_"
            control={<Radio color="primary" />}
            label="CPU"
          />
          <FormControlLabel
            value="_OPENVINO_GPU_"
            control={<Radio color="primary" />}
            label="IntetGPU"
          />
        </RadioGroup>
      </FormControl>
      </>
      }
      <Typography className={classes.headder} variant="h6" gutterBottom>
        Framework addional settings
      </Typography>
      <Divider className={classes.divider} />
      <FormControl fullWidth>
        <InputLabel>Model</InputLabel>
        <Select  native onChange={handleFrameworModelChange} defualtvalue={DEFAULT_MODEL}>
          {MODELS_NAMES.map(i=><option value={i}>{i}</option> )}
        </Select>
      </FormControl>
      {showPrecision && <>
      <FormControl fullWidth>
        <InputLabel>Precision</InputLabel>
        <Select native  onChange={handlePercisionChange} defualtvalue={"fp16"}>
          <option value={"fp16"}>fp16</option>
          <option value={"fp32"}>fp32</option>
        </Select>
      </FormControl> </>}
      <Typography className={classes.headder} variant="h6" gutterBottom>
        System settings
      </Typography>
      <Divider className={classes.divider} />
      <FormControl fullWidth>
        <InputLabel>Smart Cameras version</InputLabel>
        <Select onChange={handleScVersionChange}>
          {SC_VERSIONS.map(i=><option value={i.folderName}>{i.name}</option> )}
        </Select>
      </FormControl>
      {showPrecision && 
      <>
      <FormControl fullWidth>
        <InputLabel>Video cards in the system</InputLabel>
        <Select onChange={handleGpuNumberChange} defualtvalue={0}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </Select>
      </FormControl>
      </>
      }
      <Button className={classes.nextBtn}  color="primary"  variant="outlined" fullWidth onClick={props.testConfig}>
        Next
      </Button>
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
const setOpenVinoType = (ovType) => ({
  type: "SET_OPENVINOTYPE",
  payload: ovType,
});
const setModel = (model) => ({ type: "SET_MODEL", payload: model });
const setScVersion = (sc_version) => ({
  type: "SET_SC_VERSION",
  payload: sc_version,
});

const mapStateToProps = function (state) {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrecision: (precision) => dispatch(setPrecision(precision)),
    setGPUNumber: (gpuNumber) => dispatch(setGPUNumber(gpuNumber)),
    setFramework: (framework) => dispatch(setFramework(framework)),
    setModel: (model) => dispatch(setModel(model)),
    setScVersion: (sc_version) => dispatch(setScVersion(sc_version)),
    testConfig: ()=>dispatch({type:'LOAD_INITIAL_CONFIGURATION'}),
    setOpenVinoType:(ovType) => dispatch(setOpenVinoType(ovType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitSettings);
