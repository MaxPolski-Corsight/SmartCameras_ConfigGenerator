import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import AccordionDetails from "@material-ui/core/AccordionDetails";

function InstancesList(props) {
  const [instances,setInstances] = useState(props.instances)
  const handleAddInstances = () => setInstances([...instances,{"instance_id": 0, "DeviceContext": {"device_id": 7, "device_type": "GPU"}}])
  return (
    <React.Fragment>
      {instances.map((i) => (
        <AccordionDetails>
          <FormControlLabel
            control={<Switch  color="primary" />}
            label={'instance_id: '+i["instance_id"]}
            labelPlacement="start"
          />
        </AccordionDetails>
      ))}
      <Button onClick={handleAddInstances} variant="contained">Add Instance</Button>
      <Button variant="contained">Remove Instance</Button>
    </React.Fragment>
  );
}

export default InstancesList;
