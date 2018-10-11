import dataActions from '../_actions/data.actions';

const initialState = {
  data: []
};

const dataReducer = (state = initialState, action)  => {
  switch (action.type) {
    case dataActions.DATA_FETCH:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default dataReducer;