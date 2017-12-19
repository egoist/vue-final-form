import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: {
      name: 'Home',
      render: h => h(App)
    }
  }]
})
