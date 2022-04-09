<!-- 专栏列表 -->
<template>
    <div class="container">
      <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h2 class="font-weight-light">随心写作</h2>
              <p>
                <router-link class="btn my-2 btn-primary" to='/createPost'>开始写文章</router-link>
              </p>
            </div>
          </div>
      </section>
      <column-list :list="list"></column-list>
    </div>
</template>
<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { IGlobalData } from '../config/store'
export default defineComponent({
  name: 'Column',
  components: {
    ColumnList
  },
  props: {

  },
  setup () {
    // 从store实例中读取数据最快最简单的 方法就是通过computer返回某个状态
    const store = useStore<IGlobalData>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>
<style scoped>

</style>
