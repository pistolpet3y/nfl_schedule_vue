import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHashHistory(), // <--- detta är nyckeln!
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/info', name: 'Info', component: InfoView }
  ]
})

export default router
