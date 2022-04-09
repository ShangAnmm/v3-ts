<!-- 专栏列表 -->
<template>
    <div class="row">
        <div v-for="(item) in ColumnList" :key="item._id" class="col-4 mb-4" >
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                <img :src="item.avatar && item.avatar.url" class="card-img-top rounded-circle border border-light my-3" :alt="item.title" style="max-width:300px">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text text-left">{{item.description}}</p>
                <router-link :to="{ name:'columnDetail',params:{id:item._id}}" class="btn btn-outline-primary">进入专栏</router-link>
            </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
import { IColumnProps } from '../utils/interfaceDefinition'
export default defineComponent({
  name: 'ColumnList',
  props: {
    // 如果要将一个array的数组（构造函数）断言成一个类型 要添加PropType
    list: {
      type: Array as PropType<IColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const ColumnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/logo.png')
          }
        }
        return item
      })
    })
    return {
      ColumnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 100px;
  height: 100px;
}
</style>
