import {CHANGE_GPU_NUMBER,SET_PERCISION,SET_FRAMEWORK,SET_MODEL,SET_SC_VERSION} from './constants/actionTypes'
import { combineReducers, createStore } from 'redux';
import _ from "lodash";


const sysInfoInitState = {
    gpuCount : 0,
    framework: '',
    model:'',
    precision: '',
    scVersion: '',
  }
  
  const sysInfo = ( state = sysInfoInitState, action) => {
    switch (action.type) {
      case CHANGE_GPU_NUMBER:
        return {
          ...state,
          gpuCount : action.payload,
        };
      case SET_PERCISION:
        return {
          ...state,
          precision:action.payload,
        }
      case SET_FRAMEWORK:
        return{
          ...state,
          framework:action.payload,
        }
      case SET_MODEL:
        return{
          ...state,
          model:action.payload,
        }
      case SET_SC_VERSION:
        return {
          ...state,
          scVersion:action.payload,
        }
      default:
        return state;
    }
  };
  
  
  const configurationInitState = {
    configurationName :'',
    configurationChanges : {},
  }
  
  const configurationChanges = ( state = configurationInitState, action) => {
    switch (action.type) {
      case 'SET_CONFIGURATION_NAME':
        return {
          ...state,
          configurationName : action.payload,
        };
      case 'ADD_CHANGES':
        console.log(action);
        const temp_changes = _.set(state.configurationChanges,action.payload.path,action.payload.value)
        return{
          ...state,
          configurationChanges : temp_changes
        }
      default:
        return state;
    }
  };
  
  const appStore = combineReducers({
    sysInfo,
    configurationChanges
  });
  
  
  export const store = createStore(appStore)