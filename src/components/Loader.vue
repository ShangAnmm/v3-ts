<!-- 遮罩层 -->
<template>
    <teleport to='#back'>
    <div
    class="d-flex justify-content-center align-item-center h-100 loadin-container"
    :style="{backgroundColor: background || ''}"
    >
        <div class="loadin-content">
            <div class="spinner-border text-primary" role="status">
            </div>
            <p v-if="text" class="text-primary small">{{text}}</p>
        </div>
    </div>
    </teleport>
</template>
<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Loader',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>
<style scoped>
.loadin-content {
    background: rgba(255, 255, 255, .5);
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
}
</style>
