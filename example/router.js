import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: {
      name: 'Home',
      render: () => h(App)
    }
  }]
})
