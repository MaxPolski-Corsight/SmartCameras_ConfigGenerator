import {
  CHANGE_GPU_NUMBER,
  SET_PERCISION,
  SET_FRAMEWORK,
  SET_MODEL,
  SET_SC_VERSION,
  LOAD_INITIAL_CONFIGURATION,
} from "./constants/actionTypes";
import { combineReducers, createStore } from "redux";
import _ from "lodash";

const sysInfoInitState = {
  gpuCount: 1,
  framework: '',
  openVinoType : '',
  frameworkModel: '',
  precision: 'fp16',
  scVersion: '',
  initialConfiguration : {},
  configurationName: '',
  configurationChanges: {},
};

const sysInfo = (state = sysInfoInitState, action) => {
  switch (action.type) {
    case CHANGE_GPU_NUMBER:
      return {
        ...state,
        gpuCount: action.payload,
      };
    case SET_PERCISION:
      return {
        ...state,
        precision: action.payload,
      };
    case SET_FRAMEWORK:
      return {
        ...state,
        framework: action.payload,
      };
    case 'SET_OPENVINOTYPE':
      return {
        ...state,
        openVinoType: action.payload,
        configurationChanges : {},
      };
    case SET_MODEL:
      return {
        ...state,
        model: action.payload,
      };
    case SET_SC_VERSION:
      return {
        ...state,
        scVersion: action.payload,
      };
    case LOAD_INITIAL_CONFIGURATION:
      let newChanges = {};
      let initialConfiguration =  require(`./configs/${state.scVersion}/default_config.json`);
      if (state.precision === 'fp32' && state.framework !== 'OpenVino'){
        console.log('what???');
        _.set(newChanges,['Services', 'Indexer','precision'],'fp32');
        _.set(newChanges,['Services', 'Indexer', 'lm_detector','precision'],'fp32');
        _.set(newChanges,['Services', 'StreamFaceDetector','precision'],'fp32');
        _.set(newChanges,['Services', 'POIFaceDetector','precision'],'fp32');
        initialConfiguration = (_.merge(initialConfiguration,newChanges));
        return {
          ...state,
          initialConfiguration: initialConfiguration,
          configurationChanges : newChanges
        };
      }
      if (state.framework === 'OpenVino'){
        let openVinoChanges =  require(`./configs/${state.scVersion}/OV/${state.openVinoType}.json`);
        initialConfiguration = (_.merge(initialConfiguration,openVinoChanges.sc));
        console.log(_.merge(initialConfiguration,openVinoChanges.sc));
        return {
          ...state,
          initialConfiguration: initialConfiguration,
          configurationChanges : openVinoChanges['sc']
        };   
      }
      else {
        return {
          ...state,
          initialConfiguration: initialConfiguration,
          configurationChanges : {}
        };        
      }

    case "SET_CONFIGURATION_NAME":
      return {
        ...state,
        configurationName: action.payload,
      };
    case "SET_CONFIGURATION_NAME2":
      return {
        ...state,
        configurationChanges: action.payload.newConfig,
      };
    case "ADD_CHANGES":
      console.log('work?');
      const temp_changes = _.set(
        state.configurationChanges,
        action.payload.path,
        action.payload.value
        );
      return {
        ...state,
        configurationChanges: temp_changes,
      };
    case "TEST_STATE":
      console.log(state);
      return state;
    default:

      return state;
  }
};

const configurationInitState = {
};

const configurationChanges = (state = configurationInitState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const appStore = combineReducers({
  sysInfo,
  configurationChanges,
});

export const store = createStore(appStore);
