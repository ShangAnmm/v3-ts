<!-- 下拉 option项 -->
<template>
    <li class="dropdown-option" :class="{'disable':isDisable}">
        <slot></slot>
    </li>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const a = 55
    return {
      a
    }
  }
})
</script>
<style scoped>
.dropdown-option.disable,
.dropdown-option.disable .dropdown-item{
    color: gray;
    pointer-events: none;
    background-color: transparent;
}
</style>
