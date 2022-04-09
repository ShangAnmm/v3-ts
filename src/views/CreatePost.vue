<!-- 添加文章 -->
<template>
    <div class="create-post-page">
        <h4>新建文章</h4>
        <validate-form @form-submit='onSubmit'>
            <div class="mb-3">
                <label for="validationServer03" class="form-label">文章标题:</label>
                <vaildate-input ref="inputRef" type='text' placeholder='请输入文章标题' v-model="createForm.title" :rules="rulesProp"></vaildate-input>
            </div>
            <div class="mb-3">
                <label for="validationServer03" class="form-label">文章详情:</label>
                <vaildate-input ref="inputRef" :tag="'textarea'" type='text' placeholder='请输入文章详情' v-model="createForm.detail" :rules="rulesProp"></vaildate-input>
            </div>
            <template #submitBtn>
                <button class="btn btn-primary">发表文章</button>
            </template>
        </validate-form>
    </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import ValidateForm from '../components/VaildateForm.vue'
import VaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { IGlobalData } from '../config/store'
import { IPostProps } from '../utils/interfaceDefinition'
const rules: RulesProp = [
  { type: 'required', message: '不能为空' }
]
export default defineComponent({
  name: 'Model',
  components: {
    ValidateForm,
    VaildateInput
  },
  props: {

  },
  setup (props) {
    const router = useRouter()
    const store = useStore<IGlobalData>()
    const createForm = reactive({
      title: 'biaoti',
      detail: 'xianq'
    })
    const { columnId } = store.state.user
    const inputRef = ref<any>(null)
    const onSubmit = (result:boolean) => {
      if (columnId) {
        const newPost:IPostProps = {
          _id: (new Date().getTime()).toString(),
          title: createForm.title,
          content: createForm.detail,
          column: '5',
          createdAt: new Date().toLocaleString()
        }
        store.commit('cratePost', newPost)
        console.log(columnId)
        // 用params得方式传递参数,跳转方式要用name
        router.push({
          name: 'columnDetail',
          params: {
            id: columnId
          }
        })
      }
    }
    return {
      rulesProp: rules,
      createForm,
      inputRef,
      onSubmit
    }
  }
})
</script>
<style scoped>

</style>
