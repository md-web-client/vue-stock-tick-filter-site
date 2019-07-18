<template>
    <div id="app" class="app">
        <component :is="layout"></component>
        <notifications class="pop-notification" :max="1"></notifications>
    </div>
</template>

<script>

export default {
  name : 'app',
  computed : {
    layout () {
      return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout : 'AppLayout';
    }
  },
}
</script>

<style lang="scss">
    @import "assets/css/app.scss";
</style>
