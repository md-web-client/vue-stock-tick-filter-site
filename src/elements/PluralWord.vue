<template>
    <span>{{word}}</span>
</template>

<script>
export default {
  name : "PluralWord",
  props : {
    value : {
      required : true,
      type : String,
    },
    count : {
      required : true,
      type : Number,
    },
  },
  computed : {
    word () {
      return this.value + (this.count === 1 ? '' : 's');
    }
  },
}
</script>
