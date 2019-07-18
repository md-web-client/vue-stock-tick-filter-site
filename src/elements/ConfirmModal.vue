<template>
    <modal v-if="active" :active="active" :close="closeWrapper">
        <div v-if="!showAfterSuccessMessage">
            <slot></slot>
            <div class="m-t-md" v-show="!hideButtons">
                <loading v-if="loading"></loading>
                <div class="buttons is-centered" v-show="!loading">
                    <button class="button" @click="callback(false)">
                        {{this.noText}}
                    </button>
                    <button class="button is-primary" @click="callback(true)">
                        {{this.yesText}}
                    </button>
                </div>
            </div>
        </div>
        <slot v-else name="success-message">
        </slot>
    </modal>
</template>

<script>
export default {
  name : "ConfirmModal",
  props : {
    active : {
      type : Boolean,
      required : true,
    },
    close : {
      type : Function,
      required : true
    },
    callback : {
      type : Function,
      required : true,
    },
    loading : {
      type : Boolean,
      required : true,
    },
    yesText : {
      type : String,
      required : false,
      default : 'YES',
    },
    noText : {
      type : String,
      required : false,
      default : 'NO',
    },
    hideButtons : {
      type : Boolean,
      required : false,
      default : false,
    },
    showAfterSuccessMessage : {
      type : Boolean,
      required : false,
      default : false,
    },
  },
  methods : {
    closeWrapper () {
      if(this.loading){
        return;
      }
      this.close();
    },
  },
}
</script>

<style lang="scss" scoped>
    .button {
        min-width:180px;
    }
</style>
