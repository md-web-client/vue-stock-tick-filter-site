<template>
  <div>
      <div class="page-content-con has-text-centered m-lg">
          <h1 class="heading is-size-1">The exciting Vue Stuff can he found <a href="/Symbols">(here)</a></h1>
          <div class="m-t-lg">
            <router-link
                :to="{ name : $ROUTES.SYMBOLS }"
                exact
                class="item tooltip is-tooltip-right"
                data-tooltip="Symbols"
            >
              <img src="../assets/image/get-ready.gif"/>
            </router-link>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name : 'home',
    data () {
        return {
        };
    },

}
</script>

<style lang="scss" scoped>
</style>
