<template>
	<div class="sample">
		<h2>Set Max Date</h2>
		<p>
			Set <code>:max-date</code> 3 months from now.
		</p>
		<div class="cal-and-control-wrapper">
			<div>
				<date-picker
					ref="datePicker"
					:max-date="maxDate"
					@change-selected-dates="onChangeSelectedDates"
				/>
			</div>
			<div class="control-area">
				<button @click="clearSelected">Clear selected</button>
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
	name: 'WithMaxDateSetSample',
	components: {
		DatePicker
	},
	data () {
		return {
			dates: [],
			maxDate: dayjs().add(3, 'month').format('YYYY-MM-DD')
		}
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
		clearSelected () {
			this.dates = []
			this.$refs.datePicker.clear()
		}
	}
}
</script>
