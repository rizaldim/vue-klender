<template>
  <div class="cal">
    <div class="month-indicator">{{ monthString() }}</div>
    <button type="button" class="prev" @click="onClickPrev()">
      <img src="./assets/arrow-back.svg" />
    </button>
    <button type="button" class="next" @click="onClickNext()">
      <img src="./assets/arrow-forward.svg" />
    </button>
    <div class="day-of-week">
      <div v-for="name in dayNames" :key="name">{{ name }}</div>
    </div>
    <div class="date-grid">
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
      this.$emit('change-selected-dates', this.selectedDates)
    },
    isCellSelected (day, differentMonth) {
      if (differentMonth) return false
      return this.selectedDates.indexOf(day) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
*, *:before, *:after {
  box-sizing: inherit;
}

button {
  border: 0;
  cursor: pointer;
}

.cal {
  box-sizing: border-box;
  width: 300px;

  position: relative;

  font-family: sans-serif;
}

.month-indicator {
  height: 40px;

  line-height: 40px;
  text-align: center;
}

.prev,
.next {
  width: 36px;
  height: 36px;

  position: absolute;

  background-color: transparent;
}

.prev {
  left: 0;
  top: 0;
}

.next {
  right: 0;
  top: 0;
}

.day-of-week,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;
}

.day-of-week {
  height: 40px;

  line-height: 40px;
  text-align: center;
}

.empty-cell {
  background-color: white;
  cursor: default;
}

.date-cell {
  height: 36px;
  padding: 0;
  border-radius: 25%;

  background-color: white;
  color: black;
  font-size: 16px;

  &:hover {
    background-color: #add8e6	;
    color: white;
  }
}

.date-cell--is-selected {
  background-color: purple	;
  color: white;

  &:hover {
    background-color: purple	;
    color: white;
  }
}
</style>
