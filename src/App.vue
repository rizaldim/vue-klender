<template>
	<div id="app">
		<date-picker @change-selected-dates="onChangeSelectedDates" />
		<ol>
			<li v-for="date in dates" :key="date">{{ date }}</li>
		</ol>
	</div>
</template>

<script>
import DatePicker from './components/DatePicker'

export default {
	name: 'app',
	components: {
		DatePicker
	},
	data () {
		return {
			dates: []
		}
	},
	methods: {
		onChangeSelectedDates (dates) {
			this.dates = dates
		}
	}
}
</script>
