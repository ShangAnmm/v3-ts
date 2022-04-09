<!-- 列表详情 -->
<template>
<div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
        <div class="col-3 text-center">
            <img :src="column.avatar && column.avatar.url" :alt="column.title" style="max-width:300px" class="rounded-circle">
        </div>
        <div class="col-9 text-center">
            <h4>{{column.title}}</h4>
            <p class="text-muted">{{column.description}}</p>
        </div>
    </div>
    <post-list :list="columnDetailList"></post-list>
</div>
</template>
<script lang='ts'>
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IGlobalData } from '../config/store'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'columnDetail',
  components: {
    PostList
  },
  props: {

  },
  setup (props) {
    const route = useRoute()
    const store = useStore<IGlobalData>()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    console.log(store.state.columns)
    const column = computed(() => store.getters.getColumnById(currentId))
    console.log(column)
    const columnDetailList = computed(() => store.getters.getPostById(currentId))
    return {
      column,
      columnDetailList
    }
  }
})
</script>
<style scoped>

</style>
