import _ from 'underscore';
export default (response, defaultMessage) => {
  if(response.success === false && response.errors && response.errors.length){
    return _.pluck(response.errors, 'error').join('. ');
  }
  return defaultMessage;
};
