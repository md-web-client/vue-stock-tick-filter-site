export default {
  //rounding to two decimals in javascript is notorious for being broken and slow, here is a fix
  //taken from http://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
  roundToXDecimals (number, decimals) {
    return parseFloat((Math.round(number * 100) / 100).toFixed(decimals));
  },

  roundToTwoDecimals (number) {
    return this.roundToXDecimals(number, 2);
  },

  withCommas (x, decimals, padWithZeros) {
    if(!x){
      return x;
    }//if
    if(decimals){
      x = this.roundToXDecimals(x, decimals);
    }//if
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (padWithZeros) {
      parts[1] = parts[1] ? parts[1] : '0'.repeat(decimals);
      while (parts[1].length < decimals) {
        parts[1] += '0';
      }
    }
    return parts.join(".");
  },
};
