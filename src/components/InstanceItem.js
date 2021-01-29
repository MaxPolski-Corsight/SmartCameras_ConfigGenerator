import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  h: {
    fontWeight: "bold",
  },
  switch: {
    position: "absolute",
    marginLeft: "94%",
  },
  textField: {
    display: "flex",
  },
});

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
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
    padding: theme.spacing(6),
    display: "inline",
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
    setLastInstanceId(lastInstanceId - 1);
    setInstances( updatdedInstances);
  };

  const handleAddInstance = () => {
    let newInstance = {};
    newInstance["instance_id"] = lastInstanceId + 1;
    if (withDeviceContext) {
      newInstance["DeviceContext"] = { device_id: 0, device_type: "GPU" };
    }
    const updatdedInstances = [...instances, newInstance];
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

  const updateInstances2 = (ins) => {
    const path = ["INSTANCES", props.name];
    const change = {
      active: active,
      instances: ins,
    };
    console.log("the changes");
    props.setChange({ path, value: change });
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
          {props.name}
          <Switch
            color="primary"
            className={classes.switch}
            checked={active}
            onClick={handleSwitch}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={handleAddInstance}>Add Instate</Button>
          <Button onClick={handleRemoveInstance}>Remove Instate</Button>
          <h1></h1>
          {instances != null
            ? instances.map((i, index) =>
                "DeviceContext" in i ? (
                  <div className={classes.textField}>
                    <InputLabel>instance_id {i["instance_id"]}</InputLabel>
                    <Select value={i['DeviceContext']['device_id']} onClick={(e) => handleGpuSelect(index, e)}>
                      {[...Array(props.gpu).keys()].map((i) => (
                        <MenuItem value={i}>device_id {i}</MenuItem>
                      ))}
                    </Select>

                    <br />
                  </div>
                ) : (
                  <Typography>instance_id {i["instance_id"]}</Typography>
                )
              )
            : null}
          <Button onClick={() => console.log(instances)}>test instances</Button>
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (path,change) => dispatch(setChange(path,change)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstanceItem);
