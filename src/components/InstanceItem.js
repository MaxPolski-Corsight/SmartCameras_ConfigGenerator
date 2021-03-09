import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';



const useStyles = makeStyles({
  h: {
    fontWeight: "bold",
  },
  instanceDiv:{
  },
  accordionSummary:{
    display:'flex',

  },
  switch: {
    position: 'absolute',
    right:4,
  },
  selectItem :{
    paddingLeft: '20px'
  },
  textField_container: {
    display:'flex',
    justifyContent: 'space-between'

  },
});

const Accordion = withStyles({
  root: {
    border: '2px solid #EBEBEB',
    borderRadius: '89px',
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),

    fontWeight: "bold",
  },
}))(MuiAccordionDetails);

function InstanceItem(props) {
  const classes = useStyles();
  const [active, setActive] = useState(props.active);
  const [firstUpdate, setfirstUpdate] = useState(true);
  const [instances, setInstances] = useState(props.instances);
  const [lastInstanceId, setLastInstanceId] = useState();
  const [withDeviceContext, setWithDeviceContext] = useState("");
  const [disableRemoveBtn, setDisableRemoveBtn] = useState(false);

  useEffect(() => {
    setWithDeviceContext("DeviceContext" in instances[0]);
    setfirstUpdate(false);
  }, []);

  useEffect(() => {
    setLastInstanceId(instances[instances.length - 1]["instance_id"]);
    if(!firstUpdate){
        updateInstances();
    }
  }, [instances,active]);

  const handleSwitch = () => setActive(!active);

  const handleRemoveInstance = () => {
    const updatdedInstances = [...instances];
    updatdedInstances.pop();
    setDisableRemoveBtn(updatdedInstances.length === 1);
    setLastInstanceId(lastInstanceId - 1);
    setInstances( updatdedInstances);
  };

  const handleAddInstance = () => {
    let newInstance = {};
    console.log(props);
    newInstance["instance_id"] = lastInstanceId + 1;
    if (withDeviceContext) {
      const device_type = props.framework2 === 'TRT' ? 'GPU' : props.openVinoType === '_OPENVINO_CPU_' ? 'CPU' : 'IntelGPU' ;
      newInstance["DeviceContext"] = { device_id: 0, device_type: device_type };
    }
    const updatdedInstances = [...instances, newInstance];
    setDisableRemoveBtn(!(updatdedInstances.length !== 1));
    setInstances(updatdedInstances);
    setLastInstanceId(lastInstanceId + 1);
    updateInstances();

  };

  const updateInstances = () => {
    const path = ["INSTANCES", props.name];
    const change = {
      active: active,
      instances: instances,
    };
    props.setChange(path,change);
  };

  const handleGpuSelect = (index, e) => {
    let updateInstances = [...instances];
    updateInstances[index]["DeviceContext"]["device_id"] = e.target.value;
    setInstances(updateInstances);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <div className={classes.accordionSummary}>
            <div>
              {props.name}
            </div>
            <div className={classes.switch} >
          <Switch
            color="primary"
            className={classes.switch}
            checked={active}
            onClick={handleSwitch}
          />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.instanceDiv}>
          <Button variant="outlined" color="primary" onClick={handleAddInstance}>Add Instate</Button>
          <Button disabled={disableRemoveBtn} variant="outlined" color="secondary" onClick={handleRemoveInstance}>Remove Instate</Button>
          <h1></h1>
          {instances != null
            ? instances.map((i, index) =>
                "DeviceContext" in i ? (
                    <FormGroup  row>
                    <FormControlLabel
                    labelPlacement="start"
                    label={`Instance Id ${i["instance_id"]}`}
                    control={
                      <Select  value={i['DeviceContext']['device_id']} onClick={(e) => handleGpuSelect(index, e)}>
                      {[...Array(props.gpu).keys()].map((i) => (
                        <MenuItem value={i}>device_id {i}</MenuItem>
                      ))}
                    </Select>
                    }
                    />
                    </FormGroup>
                ) : (
                  <Typography>instance_id {i["instance_id"]}</Typography>
                )
              )
            : null}
          <Button onClick={() => props.testState()}>test instances</Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
//ACTIONS
const setChange = (path,change) => ({
  type: "ADD_CHANGES",
  payload: {path,value:change},
});

const mapStateToProps = (state) => ({
  gpu: state.sysInfo.gpuCount,
  openVinoType : state.sysInfo.openVinoType,
  framework2: state.sysInfo.framework,
  });

const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (path,change) => dispatch(setChange(path,change)),
    testState : () => dispatch({type:'TEST_STATE'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstanceItem);
