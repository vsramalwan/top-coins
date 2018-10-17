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

export function  getTopCoinsData(start, limit) {
  return (dispatch) => {
    dispatch(dataAction());
    let url= 'https://api.coinmarketcap.com/v2/ticker/?start=' +start+ '&limit=' +limit+ '&sort=rank';
    return axios.get(url, {
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
