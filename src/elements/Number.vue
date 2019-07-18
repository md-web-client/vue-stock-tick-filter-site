<template>
    <span>{{this.number}}</span>
</template>

<script>
import NumberUtil from '@/util/number_util';

export default {
  name : 'number',
  props : {
    value : Number,
    decimals : {
      type : Number,
      default : 0,
    },
    or : {
      type : String,
      default : 'Unknown',
    },
  },
  computed : {
    number () {
      if(this.value === null){
        return this.or;
      }
      return NumberUtil.withCommas(this.value, this.decimals);
    }
  }
}
</script>
