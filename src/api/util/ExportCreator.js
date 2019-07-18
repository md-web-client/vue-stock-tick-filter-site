import axios from 'axios';
import qs from 'qs';

export default (endPoint) => {
  return (filename, queryParams) => {
    return axios({
      url : process.env.VUE_APP_API_URL + endPoint,
      params : queryParams,
      paramsSerializer : (params) => {
        return qs.stringify(params, { arrayFormat : 'repeat' });
      },
      method : 'GET',
      responseType : 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
}
