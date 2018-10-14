import { combineReducers } from 'redux';

import dataReducer from './data.reducer';

const AppReducer = combineReducers({
  dataReducer,
});

export default AppReducer;