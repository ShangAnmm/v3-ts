<!-- 表单规则验证 -->
<template>
    <div class="validate-input-container pd-3">
        <input
        v-if="tag==='input'"
         type="text"
         class="form-control"
         :class="{'is-invalid': inputRef.error}"
         :value="modelValue"
         @input="updataValue"
         @blur='validateInput'
         v-bind="$attrs"
         />

        <textarea
        v-else
         type="text"
         rows="10"
         class="form-control"
         :class="{'is-invalid': inputRef.error}"
         :value="modelValue"
         @input="updataValue"
         @blur='validateInput'
         v-bind="$attrs"
         />
        <span v-if='inputRef.error' id="validationServer03Feedback" class="invalid-feedback">
            {{inputRef.message}}
        </span>
    </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './VaildateForm.vue'
// rule规则的类型
interface IRuleProp {
    type: 'required' | 'email',
    message: string
}
// RulesProp实现了IRuleProp接口 并且只接受arr
export type RulesProp = IRuleProp[]
// 定义控件类型
export type TagType = 'input' | 'textarea'
const emailRef = /^\d{6}$/

export default defineComponent({
  name: 'VaildateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: {
      type: String,
      required: true
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // 禁用继承
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // 更新控件值
    const updataValue = (e:KeyboardEvent) => {
      const inputVal = (e.target as HTMLInputElement).value
      inputRef.val = inputVal
      context.emit('update:modelValue', inputVal)
    }
    // 验证
    const validateInput = () => {
      if (props.rules) {
        const allPass = props.rules.every(item => {
          let pass = true
          inputRef.message = item.message
          switch (item.type) {
            case 'required':
              pass = (inputRef.val.trim() !== '')
              break
            case 'email':
              pass = (emailRef.test(inputRef.val))
              break
            default:
              break
          }
          return pass
        })
        inputRef.error = !allPass
        return allPass
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-create', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updataValue
    }
  }
})
</script>
<style scoped>

</style>
