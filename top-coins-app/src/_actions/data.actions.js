import axios from 'axios';
import dataConstants from "./../_constants/data.constants";

const dataAction = () => {
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

const dataActionError = () => {
  return {
    type: dataConstants.FETCH_ERROR,
  }
}

export function  getTopCoinsData() {
  return (dispatch) => {
    let tableData = [];
    return axios.get('https://api.coinmarketcap.com/v2/ticker/?sort=rank', {
      responseType: 'json'
    }).then(response => {
      // console.log("response type", response.data.data);
      for (var prop in response.data['data']) { tableData.push(response.data['data'][prop]);}
      // console.log("tableData", tableData);
      dispatch(dataActionSuccess(tableData));
      return tableData;
    }).catch(error => {
      console.error(error);
      dispatch(dataActionError());
    });
  }
}

export default getTopCoinsData;
// ----------------------------
//   return dispatch => {
//     dispatch(dataAction());
//     return fetch("https://api.coinmarketcap.com/v2/ticker/?sort=rank", {method:"GET"})
//       .then(handleErrors)
//       .then(response => response.json())
//       .then(json => {
//         for (var prop in response.data['data']) { tableData.push(response.data['data'][prop]);}
//         dispatch(dataActionSuccess(tableData));
//         return tableData;
//       })
//       .catch(error => dispatch(fetchProductsFailure(error)));
//   };

// }
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
  // ----------------------------
	// return (dispatch) => {
  // 	dispatch(dataAction());
  //   return fetchData().then(([response, json]) =>{
  //   	if(response.status === 200){
  //     	dispatch(dataActionSuccess(json));
  //     }
  //     else{
  //     	dispatch(dataActionError());
  //     }
  //   })
  // }  


// export function fetchData() {
//   const URL = "https://api.coinmarketcap.com/v2/ticker/?sort=rank";
//   return fetch(URL, { method: 'GET'})
//      .then( response => Promise.all([response, response.json()]));
// }

