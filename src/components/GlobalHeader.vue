<!-- 头部 -->
<template>
<nav class="mb-4 navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <a class="navbar-brand mb-0 h1" href="#">AA专栏</a>
    <div v-if="!list.status">
        <button class="btn btn-primary mx-2" type="submit" @click="gotoNewPage('/login')">登录</button>
        <button type="button" class="btn btn-outline-primary">注册</button>
    </div>
    <div v-else>
        <Dropdown :title="`你好${list.name}`">
          <dropdown-item><router-link class="dropdown-item" to='/createPost'>新建文章</router-link></dropdown-item>
          <dropdown-item isDisable><a class="dropdown-item" href="#">注销账号</a></dropdown-item>
          <dropdown-item><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
        </Dropdown>
    </div>
  </div>
</nav>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { IUserProps } from '../utils/interfaceDefinition'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    list: {
      type: Object as PropType<IUserProps>,
      required: true
    }

  },
  setup () {
    const router = useRouter()
    const gotoNewPage = (path:string) => {
      router.push({
        path: path
      })
    }
    return {
      gotoNewPage
    }
  }
})
</script>
<style scoped>

</style>
