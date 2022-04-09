<!-- 下拉 -->
<template>
    <div class="dropdown" ref="dropdownRef">
    <button @click.passive="changeOpen" class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      {{title}}
    </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" :style="{display:isOpen?'block':'none'}">
        <slot></slot>
      </ul>
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const isOpen = ref(false)
    // 是否显示
    const changeOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 调用工具函数 在内容区以为的地方点击 自动关闭
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      changeOpen,
      isOpen,
      dropdownRef
    }
  }
})
</script>
<style scoped>

</style>
