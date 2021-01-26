import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { act } from 'react-dom/test-utils';
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
    case 'CHANGE_GPU_NUMBER':
      return {
        ...state,
        gpuCount : action.payload,
      };
    case 'SET_PERCISION':
      return {
        ...state,
        precision:action.payload,
      }
    case 'SET_FRAMEWORK':
      return{
        ...state,
        framework:action.payload,
      }
    case 'SET_MODEL':
      return{
        ...state,
        model:action.payload,
      }
    case 'SET_SC_VERSION':
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


const store = createStore(appStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
