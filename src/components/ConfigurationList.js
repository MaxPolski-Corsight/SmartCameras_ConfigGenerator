import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

function ConfigurationList(props) {
  const configurationlist = [
    ["Default Configuration",''],
    ["Mask Mode","mask_config.json"],
    ["Crowd Mode",''],
    ["Increased detection mode",''],
    ["Extreme mode",''],
  ];
  const handleConfigutaionListChange = (event) => {
    const [name,configurationFile] = (event.target.value.split(','));
    const DataFromConfig = require("../configs/"+configurationFile);
    //props.setConfigurationName(event.target.value)};
    console.log(DataFromConfig);
    props.setConfigurationName2(name,DataFromConfig)
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select the configuration from the list
      </Typography>
      <Divider />
      <FormControl>
        <RadioGroup onChange={handleConfigutaionListChange}>
          {configurationlist.map((i) => (
            <FormControlLabel
              value={i}
              control={<Radio color="primary" />}
              label={i[0]}
              key={i[0]}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <p></p>
      {props.configurationName}
    </div>
  );
}

//ACTIONS
const setConfigurationName = (configurationName) => ({
  type: "SET_CONFIGURATION_NAME",
  payload: configurationName,
});

const setConfigurationName2 = (configurationName,configuration) => ({
  type: "SET_CONFIGURATION_NAME2",
  payload: {'newConfig' : configuration },
});

const mapStateToProps = function (state) {
  return {
    configurationName: state.configurationChanges.configurationName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfigurationName: (configurationName) =>
      dispatch(setConfigurationName(configurationName)),
      setConfigurationName2: (configurationName,configuration) =>
      dispatch(setConfigurationName2(configurationName,configuration)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ConfigurationList);
