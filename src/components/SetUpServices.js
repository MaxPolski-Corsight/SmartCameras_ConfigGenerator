import React from "react";
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import InstanceItem from "./InstanceItem";
import ArrayServiceItem from "./ArrayServiceItem";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";

const ConfigRules = require("../configs/config_rules.json");

const handleChane = (path, value, fun) => {
  const change = { path: path, value: value };
  fun(change);
};

function createInstances(instances, gpu) {
  return Object.entries(instances).map(([key, value]) => (
    <InstanceItem
      name={key}
      active={value.active}
      instances={value.instances}
    />
  ));
}

function createTree(root, path, changeFunc, gpu,framework,ovType) {
  return Object.entries(root).map(([key, value]) => {
    if (key === "INSTANCES") {
      return (
        <>
          <Accordion>
            <AccordionSummary>INSTANCES</AccordionSummary>
            {createInstances(value, gpu,framework,ovType)}
          </Accordion>
        </>
      );
    }
    if (value != null && typeof value == "object") {
      let new_path = [...path, key];
      if (Array.isArray(value)) {
        return (
          <Accordion>
            <AccordionSummary>{key}</AccordionSummary>
            <ArrayServiceItem
              rules={_.get(ConfigRules, new_path)}
              keyName={key}
              array={value}
              fun={(newValue) => handleChane(new_path, newValue, changeFunc)}
            />
          </Accordion>
        );
      }
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
        <>
          <AccordionDetails>
            <TextField
              fullWidth
              label={key}
              onChange={(e) =>
                handleChane(new_path, e.target.value, changeFunc)
              }
              variant="outlined"
              defaultValue={value}
            />
          </AccordionDetails>
        </>
      );
    }
  });
}

export const SetUpServices = (props) => {
  const DataFromConfig = require("../configs/default_config.json");
    return (
      <div>
        {createTree(props.initialConfiguration, [], props.setChange, props.gpu)}
      </div>
    );


    
  

};

//ACTIONS
const setChange = (change) => ({
  type: "ADD_CHANGES",
  payload: change,
});
//STATES
const mapStateToProps = (state) => ({
  initialConfiguration : state.sysInfo.initialConfiguration,
  framework : state.sysInfo.framework,
  openVinoType : state.sysInfo.openVinoType,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (change) => dispatch(setChange(change)),
    loadInitConfig: ()=>dispatch({type:'LOAD_INITIAL_CONFIGURATION'}),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUpServices);
