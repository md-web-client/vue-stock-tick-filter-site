<template>
    <div
        class="dropdown"
        :class="{ 'is-active' : active, 'is-right' : rightAligned }"
        @click="toggle"
        ref="dropdown"
    >

        <div class="dropdown-trigger">
            <button class="button" :class="clazz" aria-haspopup="true" aria-controls="dropdown-menu" >
                <span v-if="value">
                    {{value.name}}
                </span>
                <span class="icon is-small">
                    <i class="m-r-xs m-l-xs" :class="active ? icons.active_class : icons.inactive_class" aria-hidden="true"></i>
                </span>
            </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">

                <div v-for="selection in selections" :key="selection.id">
                    <a
                        class="dropdown-item"
                        :class="{'is-active' : isSelected(selection), 'is-disabled' : selection.disabled }"
                        @click="select(selection)"
                    >
                        {{selection.name}}
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name : 'DropdownSelection',
  data () {
    return {
      active : false,
    };
  },
  props : {
    selections : {
      type : Array,
      required : true,
    },
    clazz : {
      type : String,
      required : false,
      default : ''
    },
    rightAligned : {
      type : Boolean,
      default : false,
    },
    value : null
  },
  computed : {
    icons(){
      return {
        active_class : 'fa fa-angle-up',
        inactive_class : 'fa fa-angle-down'
      }
    }
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
    },
    select(selection){
      this.$emit('input', selection);
      this.$emit('change', selection);
    },
    isSelected(selection){
      if(this.value && selection){
        return this.value.id === selection.id;
      }
      return false;
    },
  },
};
</script>
