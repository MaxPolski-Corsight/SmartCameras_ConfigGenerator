import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { connect } from "react-redux";

const Summary = (props) => {
    const FinalConfig = {
        '_id' : props.configurationName,
        'sc' : props.configuration,
    }
  const DataFromConfig = JSON.stringify(FinalConfig, null, 5);
  return (
    <div>
      <CopyBlock
          language={"json"}
          text={DataFromConfig}
          showLineNumbers={true}
          wrapLines={true}
          theme={dracula}
          codeBlock
        />
    </div>
  );
};


  const mapStateToProps = function (state) {
    return {
      state : state,
      configuration: state.configurationChanges.configurationChanges,
      configurationName: state.configurationChanges.configurationName,
    };
  };
  
  
  export default connect(mapStateToProps)(Summary);
  