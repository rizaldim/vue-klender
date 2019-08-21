import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import DefaultPropsSample from './DefaultPropsSample'
import WithMaxDateSetSample from './WithMaxDateSetSample'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/default-props',
			component: DefaultPropsSample
		},
		{
			path: '/max-date-set',
			component: WithMaxDateSetSample
		}
	]
})

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
