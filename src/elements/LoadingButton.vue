<template>
    <button :class="{ 'is-loading' : this.loading }" @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name : "LoadingButton",
  props : {
    loading : {
      type : Boolean,
      required : true,
    },
  },
  methods : {
    onClick () {
      if(this.loading){
        return;
      }
      this.$emit('click');
    },
  },
}
</script>

<style scoped>
</style>
