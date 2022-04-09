<!-- 表单验证 form -->
<template>
 <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
        <slot name="submitBtn">
            <button type="submit" class="btn btn-primary">提交</button>
        </slot>
    </div>
 </form>
</template>
<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
// 引入mitt自定义事件监听器，创建一个监听器 用于代替$on;导出供VaildateInput使用
import mitt from 'mitt'
export const emitter = mitt()

type VaildateFunction = () => boolean
export default defineComponent({
  name: 'VaildateForm',
  props: {

  },
  emits: ['form-submit'],
  setup (props, context) {
    let functionArr: VaildateFunction[] = []

    const submitForm = () => {
      const result = functionArr.map(func => func()).every(res => res)
      context.emit('form-submit', result)
    }
    const callback = (func:any) => {
      functionArr.push(func)
    }
    emitter.on('form-item-create', callback)
    onUnmounted(() => {
      emitter.off('form-item-create', callback)
      functionArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
<style scoped>

</style>
