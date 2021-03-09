import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { connect } from "react-redux";

function lcm_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
   return false;
 return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
 x = Math.abs(x);
 y = Math.abs(y);
 while(y) {
   var t = y;
   y = x % y;
   x = t;
 }
 return x;
}





const Summary = (props) => {
    //const IndexerInstancesNumber = props.configuration.['INSTANCES']['instances'].length;
    const FinalConfig = {
        '_id' : props.configurationName,
        'sc' : props.newConfiguration,
        "ui" : {},
        "dev" : {
        }
    }
  const DataFromConfig = JSON.stringify(FinalConfig, null, 4);
  return (
    <div>{
      <CopyBlock
      language={"json"}
      text={DataFromConfig}
      showLineNumbers={true}
      wrapLines={true}
      theme={dracula}
      codeBlock
      />
    }
    </div>
  );
};


  const mapStateToProps = function (state) {
    return {
      state : state.sysInfo,
      newConfiguration: state.sysInfo.configurationChanges,
      configurationName: state.sysInfo.configurationName,
    };
  };
  
  
  export default connect(mapStateToProps)(Summary);
  