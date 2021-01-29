import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InstancesList from "./InstancesList";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InstanceItem from "./InstanceItem";

const handleChane = (path, value, fun) => {
  const change = { path: path, value: value };
  fun(change);
};

function createInstances(instances,gpu) {
  return Object.entries(instances).map(([key, value]) => 
    <InstanceItem 
    name={key}
    active={value.active}
    instances={value.instances}
    />

  )
}

function createTree(root, path, changeFunc,gpu) {
  return Object.entries(root).map(([key, value]) => {
    if (key == "INSTANCES") {
      return (
        <>
          <Accordion>
            <AccordionSummary>INSTANCES</AccordionSummary>
            {createInstances(value,gpu)}
          </Accordion>
        </>
      );
    }
    if (value != null && typeof value == "object") {
      let new_path = [...path, key];
      return (
        <Accordion>
          <AccordionSummary>{key}</AccordionSummary>
          {createTree(root[key], new_path, changeFunc)}
        </Accordion>
      );
    }
    if (
      value != null &&
      (typeof value == "number" ||
        typeof value == "string" ||
        typeof value == "boolean")
    ) {
      let new_path = [...path, key];
      return (
        <AccordionDetails>
          <TextField
            fullWidth
            label={key}
            onChange={(e) => handleChane(new_path, e.target.value, changeFunc)}
            variant="outlined"
            defaultValue={value}
          />
        </AccordionDetails>
      );
    }
  });
}

export const SetUpServices = (props) => {
  const DataFromConfig = require("../configs/default_config.json");
  return (
    <div>
      {createTree(DataFromConfig, [], props.setChange,props.gpu)}
      <button onClick={() => console.log(props)}>test state</button>
    </div>
  );
};

//ACTIONS
const setChange = (change) => ({
  type: "ADD_CHANGES",
  payload: change,
});

const mapStateToProps = (state) => ({
  gpu: state.sysInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (change) => dispatch(setChange(change)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUpServices);
