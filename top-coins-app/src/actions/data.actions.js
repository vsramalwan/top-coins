import axios from 'axios';
import dataConstants from "./../constants/data.constants";

export const dataAction = () => {
  return {
    type: dataConstants.FETCH_REQUEST,
  }
}

export const dataActionSuccess = (data) => {
  return {
    data,
    type: dataConstants.FETCH_SUCCESS,
  }
}

export const dataActionError = () => {
  return {
    type: dataConstants.FETCH_ERROR,
  }
}

export function  getTopCoinsData() {
  return (dispatch) => {
    dispatch(dataAction());
    return axios.get('https://api.coinmarketcap.com/v2/ticker/?sort=rank', {
      responseType: 'json'
    }).then(response => {
      dispatch(dataActionSuccess(Object.values(response.data.data)));
    }).catch(error => {
      console.error(error);
      dispatch(dataActionError());
    });
  }
}

export default getTopCoinsData;
