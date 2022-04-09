// 抽离的自定义函数、是否在点击外部option项时取消显示
import { Ref, ref, onMounted, onUnmounted } from 'vue'
function useClickOutside (elementRef:Ref<null|HTMLElement>):Ref<boolean> {
  const isClickOutSide = ref(false)
  const listenerOutSide = (e:MouseEvent) => {
    if (elementRef.value) {
      // 这里的e.target如果不用 类型断言 会报错 因为e.target不一定是html类型的
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = false
      } else {
        isClickOutSide.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', listenerOutSide)
  })
  onUnmounted(() => {
    document.removeEventListener('click', listenerOutSide)
  })
  return isClickOutSide
}
export default useClickOutside
