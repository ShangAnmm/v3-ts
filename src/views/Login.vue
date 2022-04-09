<!-- 登录模块 -->
<template>
    <!-- 表单控件 -->
    <div class="container">
      <vaildate-form @form-submit='onSubmit'>
        <div class="mb-3">
            <label for="validationServer03" class="form-label">账号</label>
            <vaildate-input ref="inputRef" type='text' placeholder='请输入用户名' v-model="loginForm.userName" :rules="rulesProp"></vaildate-input>
        </div>
        <div class="mb-3">
             <label for="validationServer03" class="form-label">密码</label>
            <vaildate-input type='text' placeholder='请输入密码' v-model="loginForm.email" :rules="rulesProp"></vaildate-input>
        </div>
        <template #submitBtn>
          <span class="btn btn-primary">提交2</span>
        </template>
      </vaildate-form>
    </div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive } from 'vue'
import VaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import VaildateForm from '../components/VaildateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const rules: RulesProp = [
  { type: 'required', message: '不能为空' },
  { type: 'email', message: '请输入6位数字' }
]
export default defineComponent({
  name: 'Login',
  components: {
    VaildateInput,
    VaildateForm
  },
  props: {

  },
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const loginForm = reactive({
      userName: 'zjj',
      email: ''
    })
    const inputRef = ref<any>(null)
    const onSubmit = (result:boolean) => {
      console.log('验证结果：', result)
      if (result) {
        store.dispatch('login', loginForm).then(res => {
          router.push({
            path: '/column'
          })
        })
      }
    }
    return {
      inputRef,
      onSubmit,
      rulesProp: rules,
      loginForm
    }
  }
})
</script>
<style scoped>

</style>
