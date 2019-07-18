<template>
    <div style="display:none;"></div>
</template>
<script>
export default {
  name : "DocumentTitle",
  props : {
    value : {
      type : String,
      required : true,
    },
  },
  mounted () {
    document.title = this.value;
  },
  watch : {
    value : function() {
      document.title = this.value;
    },
  },
}
</script>
