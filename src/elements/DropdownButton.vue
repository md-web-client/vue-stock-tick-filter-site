<template>
    <div
        class="dropdown"
        @click="toggle"
        :class="{ 'is-active' : active, 'is-right' : rightAligned }"
        ref="dropdown"
    >

        <div class="dropdown-trigger">
            <button class="button" :class="this.buttonClass" aria-haspopup="true" aria-controls="dropdown-menu" >
                <span class="icon is-small">
                    <i :class="toggleClass" aria-hidden="true"></i>
                </span>
                <span v-if="headingText">
                    {{headingText}}
                </span>
            </button>
        </div>


        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name : 'DropdownButton',
  data () {
    return {
      active : false,
      active_icon_class : "fa fa-angle-up",
      inactive_icon_class : "fa fa-angle-down",
    };
  },
  props : {
    headingText : {
      type : String,
      required : false,
    },
    iconClass : {
      type : String,
      required : false,
    },
    buttonClass : {
      type : String,
      required : false,
    },
    rightAligned : {
      type : Boolean,
      default : false,
    },
  },
  computed : {
    toggleClass () {
      if(this.iconClass){
        return this.iconClass;
      }
      return this.active ? this.active_icon_class : this.inactive_icon_class;
    },
  },
  methods : {
    toggle () {
      if(!this.active){
        this.active = true;
        window.addEventListener('click', this.close, { passive : true })
      } else {
        this.active = false;
        window.removeEventListener('click', this.close);
      }
    },
    close (event) {
      if(!this.$refs.dropdown.contains(event.target)){
        this.active = false;
        window.removeEventListener('click', this.close);
      }
    }
  },
};
</script>

<style scoped lang="scss">
    @import '@/assets/css/_theme.scss';
    .dropdown-content {
        padding:0;
        text-align:left;
        /deep/ & > a {
            display:block;
            padding:8px 10px;
            border-bottom:1px solid $grey-lighter;
            color:$grey-dark;
            font-size:12px;
            line-height:12px;
            &:hover {
                background-color:$white-bis;
                color:$black-bis;
            }
            &:last-child {
                border-bottom:none;
            }
        }
    }
</style>
