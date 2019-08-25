import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import DefaultPropsSample from './DefaultPropsSample'
import WithMaxDateSetSample from './WithMaxDateSetSample'
import InitialSelectedDates from './InitialSelectedDates'

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
		},
		{
			path: '/initial-selected',
			component: InitialSelectedDates
		}
	]
})

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
