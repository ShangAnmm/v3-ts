<!-- 模板 -->
<template>
    <div class="post-list">
        <article v-for="item in list" :key="item.id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>{{item.title}}</h4>
                <div class="row my-3 align-items-center">
                    <div v-if="item.image" class="col-3">
                        <img :src="item.image && item.image.url" :alt="item.title" style="max-width:150px">
                    </div>
                    <p :class="{'col-9':item.image}">{{item.excerpt}}</p>
                </div>
                <span class="text-muted">{{item.createdAt}}</span>
            </div>
        </article>
    </div>
</template>
<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { IPostProps } from '../utils/interfaceDefinition'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      require: true,
      type: Array as PropType<IPostProps[]>
    }
  }
})
</script>
<style scoped>

</style>
