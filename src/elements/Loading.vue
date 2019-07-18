<template>
    <div class="center-on-page">
        <slot></slot>
        <div class="icon" :class="size">
            <i class="fa fa-circle-o-notch fa-spin fa-fw" :class="fa"></i>
        </div>
    </div>
</template>

<script>
export default {
  name : 'Loading',
  props : {
    size : {
      type : String,
      default : 'is-large'
    },
    fa : {
      type : String,
      default : 'fa-2x'
    }
  }
}
</script>
