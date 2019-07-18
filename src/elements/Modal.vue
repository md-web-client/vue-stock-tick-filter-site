<template>
    <div v-if="active" class="modal"  v-bind:class="{ 'is-active' : active }">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="close"></button>
    </div>
</template>

<script>
export default {
  name : 'modal',
  props : {
    active : {
      type : Boolean,
      required : true,
    },
    close : {
      type : Function,
      required : false,
    },
  },
}
</script>
