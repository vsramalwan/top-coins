import dataConstants  from './../constants/data.constants';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const dataReducer = (state = initialState, action)  => {
  switch (action.type) {
    case dataConstants.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case dataConstants.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.data
      };
    case dataConstants.FETCH_ERROR:
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