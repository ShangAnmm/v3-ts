<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup () {
    const a = 5
    return {
      a
    }
  }
})
</script>

<style>

</style>
