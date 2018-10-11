import axios from 'axios';
import dataConstants from "./../_constants/data.constants";

export const dataAction = () => {
  return {
    data: getTopCoinsData(),
    type: dataConstants.DATA_FETCH,
  }
}

function getTopCoinsData() {
  let tableData = [];
  axios.get('https://api.coinmarketcap.com/v2/ticker/?sort=rank', {
    responseType: 'json'
  }).then(response => {
    for (var prop in response.data['data']) { tableData.push(response.data['data'][prop]);}
    return tableData;
  });
}

export default dataAction;