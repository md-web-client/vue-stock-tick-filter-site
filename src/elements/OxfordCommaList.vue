<template>
    <span>{{list}}</span>
</template>

<script>
export default {
  name : "OxfordCommaList",
  props : {
    value : {
      required : true,
      type : Array,
    },
  },
  computed : {
    list () {
      if(this.value.length === 0){
        return '';
      }
      if(this.value.length === 1){
        return this.value[0];
      }
      if(this.value.length === 2){
        return `${this.value[0]} and ${this.value[1]}`;
      }
      return this.value.slice(0, this.value.length - 1).join(', ') + ' and ' + this.value[this.value.length - 1];
    },
  },
}
</script>
