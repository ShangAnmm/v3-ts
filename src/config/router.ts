/** 路由配置类 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import Home from '../views/Home.vue'
const routes = [
// 路由映射组件，是component而不是components
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/column',
    component: Home,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { redirectAlreadyLogin: true }
      },
      {
        path: '/column',
        name: 'column',
        component: () => import('../views/Column.vue')
      },
      {
        path: '/columnDetail',
        name: 'columnDetail',
        component: () => import('../views/ColumnDetail.vue')
      },
      {
        path: '/createPost',
        name: 'createPost',
        component: () => import('../views/CreatePost.vue'),
        meta: { requiredLogin: true }
      }
    ]
  }
]

/** 创建路由 */
const router = createRouter({ history: createWebHashHistory(), routes })

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.status) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.status) {
    next('/')
  } else {
    next()
  }
})
/** 导出 */
export default router
