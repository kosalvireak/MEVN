import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import DashBoardDetail from '../views/DashBoardDetail.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard
    }, {
      path: '/dashboard/:id',
      name: 'dashboard single',
      component: DashBoardDetail
    },
    {
      path: '/databoard',
      name: 'databoard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
