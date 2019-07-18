import Vue from 'vue';
import apiErrorFormatter from './ApiErrorFormatter';
export default {
  success (response) {
    return response;
  },
  error (error) {
    if (error.response.status >= 500) {
      Vue.prototype.$notify({
        text : apiErrorFormatter(error.response.data, 'Something went wrong and we were unable to process your request, if this keeps happening please contact us.'),
        type : 'error',
        duration : 150000
      })
    }
    // return error
    return Promise.reject(error.response);
  }
}
