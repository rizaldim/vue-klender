<template>
	<div class="sample">
		<h2>With Initial Selected Dates</h2>
		<p>
			Use <code>initial-selected-dates</code> props.
			In the sampe below we use days one, two, and three weeks from now to be
			initial selected dates.
		</p>
		<div class="cal-and-control-wrapper">
			<div>
				<date-picker
					ref="datePicker"
					:initial-selected-dates="initialSelectedDates"
					@change-selected-dates="onChangeSelectedDates"
				/>
			</div>
			<div class="control-area">
				<button @click="reset">Reset</button>
				<p>Selected dates:</p>
				<p>{{ datesString }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import DatePicker from '../../src/DatePicker'


export default {
	name: 'InitialSelectedDates',
	components: {
		DatePicker
	},
	data () {
		return {
			dates: [],
			initialSelectedDates: [
				dayjs().add(1, 'week').format('YYYY-MM-DD'),
				dayjs().add(2, 'week').format('YYYY-MM-DD'),
				dayjs().add(3, 'week').format('YYYY-MM-DD')
			]
		}
	},
	created () {
		this.dates = [...this.initialSelectedDates]
	},
	computed: {
		datesString () {
			var result = ""
			for (let i = 0; i < this.dates.length; i++) {
				if (i > 0) {
					result += ", "
				}
				result += this.dates[i]
			}
			return result
		}
	},
	methods: {
		onChangeSelectedDates (dates) {
			this.dates = dates
		},
		reset () {
			this.dates = [...this.initialSelectedDates]
			this.$refs.datePicker.clear()
		}
	}
}
</script>
