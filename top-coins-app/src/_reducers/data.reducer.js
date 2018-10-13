import dataActions from '../_actions/data.actions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const dataReducer = (state = initialState, action)  => {
  switch (action.type) {
    case dataActions.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case dataActions.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.data
      };
    case dataActions.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      };
    default:
      return state;
  }
};

export default dataReducer;