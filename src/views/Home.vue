<!-- 主页 -->
<template>
    <!-- 头部 -->
    <div class="container">
      <global-header :list='msg'></global-header>
      <loader v-if="isLoding" :text="'加载中'"></Loader>
      <router-view></router-view>
      <footer class="text-center py-4 text-secondary bg-ligh mt-6" style="background-color: #e3f2fd;">
        <small>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">AA专栏</li>
            <li class="list-inline-item">课程3</li>
            <li class="list-inline-item">文档</li>
            <li class="list-inline-item">联系</li>
            <li class="list-inline-item">更多</li>
          </ul>
        </small>
      </footer>
    </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import GlobalHeader from '../components/GlobalHeader.vue'
import { useStore } from 'vuex'
import Loader from '../components/Loader.vue'

export default defineComponent({
  name: 'Home',
  components: {
    GlobalHeader,
    Loader
  },
  props: {

  },
  setup (props) {
    const store = useStore()
    const msg = computed(() => store.state.user)
    const isLoding = computed(() => store.state.loding)
    return {
      msg,
      isLoding
    }
  }
})
</script>
<style scoped>

</style>
