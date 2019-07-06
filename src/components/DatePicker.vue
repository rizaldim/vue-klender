<template>
	<div class="calendar">
		<div class="month-indicator">{{ monthString() }}</div>
		<div class="day-of-week">
			<div v-for="name in dayNames()" :key="name">{{ name }}</div>
		</div>
		<div class="date-grid">
			<date-cell v-for="cell in cells"
				:key="cell.dateTime"
				:dateTime="cell.dateTime"
				:date="cell.date"
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
	data() {
		return {
		}
	},
	computed: {
		cells() {
			const now = dayjs()
			const startOfWeekOfStartOfMonth = now.startOf('month').startOf('week')
			const endOfWeekOfEndOfMonth = now.endOf('month').endOf('week')
			const cells = []
			var day = startOfWeekOfStartOfMonth
			while (day.diff(endOfWeekOfEndOfMonth) < 0) {
				cells.push({
					dateTime: day.format('YYYY-MM-DD'),
					date: day.format('D')
				})
				day = day.add(1, 'day')
			}
			return cells
		}
	},
	methods: {
		monthString() {
			return dayjs().format('MMMM YYYY')
		},
		dayNames() {
			var names = []
			const startOfWeek = dayjs().startOf('week')
			for (var i = 0; i < 7; i++) {
				names.push(startOfWeek.add(i, 'day').format('dd'))
			}
			return names
		}
	}
}
</script>

<style>
.calendar {
	width: 300px;
}
.day-of-week, .date-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
}
.day-of-week {
	height: 40px;
}
.date-grid button {
	height: 40px;
}
</style>
