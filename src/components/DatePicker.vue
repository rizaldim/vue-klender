<template>
	<div class="calendar">
		<div class="calendar__month-indicator">{{ monthString() }}</div>
		<button type="button" class="calendar__prev" @click="onClickPrev()">
			<img src="@/assets/arrow-back.svg" />
		</button>
		<button type="button" class="calendar__next" @click="onClickNext()">
			<img src="@/assets/arrow-forward.svg" />
		</button>
		<div class="calendar__day-of-week">
			<div v-for="name in dayNames" :key="name">{{ name }}</div>
		</div>
		<div class="calendar__date-grid">
			<date-cell v-for="cell in cells"
				:key="cell.dateTime"
				:dateTime="cell.dateTime"
				:date="cell.date"
				:initial-selected="isCellSelected(cell.dateTime, cell.differentMonth)"
				:different-month="cell.differentMonth"
				@click="onClickDate(cell.dateTime)"
				/>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import DateCell from './DateCell'

export default {
	components: {
		DateCell
	},
	data () {
		return {
			firstDayOfCurrentMonth: dayjs().set('date', 1),
			dayNames: [],
			selectedDates: []
		}
	},
	created () {
		var names = []
		const startOfWeek = dayjs().startOf('week')
		for (var i = 0; i < 7; i++) {
			names.push(startOfWeek.add(i, 'day').format('dd'))
		}
		this.dayNames = names
	},
	computed: {
		cells () {
			const firstDayOfCurrentMonth = this.firstDayOfCurrentMonth
			const startOfFirstWeekOfCurrentMonth = firstDayOfCurrentMonth.startOf('week')
			const endOfLastWeekOfCurrentMonth = firstDayOfCurrentMonth.endOf('month').endOf('week')
			const daysShownCount = endOfLastWeekOfCurrentMonth.diff(startOfFirstWeekOfCurrentMonth, 'day') + 1

			let day = startOfFirstWeekOfCurrentMonth
			const cells = []
			const currentMonth = firstDayOfCurrentMonth.get('month')
			for (var i = 0; i < daysShownCount; i++) {
				cells.push({
					date: day.format('D'),
					dateTime: day.format('YYYY-MM-DD'),
					differentMonth: day.get('month') != currentMonth
				})
				day = day.add(1, 'day')
			}
			return cells
		}
	},
	methods: {
		monthString () {
			return this.firstDayOfCurrentMonth.format('MMMM YYYY')
		},
		onClickPrev () {
			this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.subtract(1, 'month')
		},
		onClickNext () {
			this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.add(1, 'month')
		},
		onClickDate (dateTime) {
			const index = this.selectedDates.indexOf(dateTime)
			if (index > -1) {
				this.selectedDates.splice(index, 1)
			} else {
				this.selectedDates.push(dateTime)
			}
		},
		isCellSelected (day, differentMonth) {
			if (differentMonth) return false
			return this.selectedDates.indexOf(day) > -1
		}
	}
}
</script>

<style lang="scss" src="@/assets/style.scss"></style>
