<template>
	<div class="calendar">
		<div class="calendar__month-indicator">{{ monthString() }}</div>
		<button type="button" class="calendar__prev" @click="onClickPrev()">&lt;</button>
		<button type="button" class="calendar__next" @click="onClickNext()">&gt;</button>
		<div class="calendar__day-of-week">
			<div v-for="name in dayNames" :key="name">{{ name }}</div>
		</div>
		<div class="calendar__date-grid">
			<date-cell v-for="cell in cells"
				:key="cell.dateTime"
				:dateTime="cell.dateTime"
				:date="cell.date"
				:is-current-month="cell.isCurrentMonth"
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
			firstDayOfCurrentMonth: dayjs().set('date', 1),
			dayNames: []
		}
	},
	created() {
		var names = []
		const startOfWeek = dayjs().startOf('week')
		for (var i = 0; i < 7; i++) {
			names.push(startOfWeek.add(i, 'day').format('dd'))
		}
		this.dayNames = names
	},
	computed: {
		cells() {
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
					isCurrentMonth: day.get('month') == currentMonth
				})
				day = day.add(1, 'day')
			}
			return cells
		}
	},
	methods: {
		monthString() {
			return this.firstDayOfCurrentMonth.format('MMMM YYYY')
		},
		onClickPrev() {
			this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.subtract(1, 'month')
		},
		onClickNext() {
			this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.add(1, 'month')
		}
	}
}
</script>

<style lang="scss">
.calendar {
	box-sizing: border-box;
	font-family: sans-serif;
	position: relative;
	width: 300px;

	*, *:before, *:after {
		box-sizing: inherit;
	}

	&__month-indicator {
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	&__prev {
		position: absolute;
		top: 0;
		left: 0;
	}

	&__next {
		position: absolute;
		top: 0;
		right: 0;
	}

	&__day-of-week,
	&__date-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	&__day-of-week {
		height: 40px;
	}

	&__date-cell {
		background-color: white;
		border: 0;
		border-radius: 25%;
		font-size: 16px;
		height: 40px;
		padding: 0;

		&:hover {
			background-color: #add8e6	;
			color: white;
		}

		&--different-month {
			color: #aaaaaa;

			&:hover {
				background-color: white;
				color: #aaaaaa;
			}
		}
	}

}
</style>
