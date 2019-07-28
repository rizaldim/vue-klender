<template>
  <div class="cal">
    <div class="month-indicator">{{ monthString }}</div>
    <prev-button :enabled="prevIsEnabled" @click="onClickPrev" />
    <next-button :enabled="nextIsEnabled" @click="onClickNext" />
    <div class="day-of-week">
      <div v-for="name in dayNames" :key="name">{{ name }}</div>
    </div>
    <div class="date-grid">
      <date-cell v-for="(cell, index) in cells"
        :key="cell.date.valueOf()"
        :cell="cell"
        @click="onClickDate(cell, index)"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import DateCell from './DateCell'
import PrevButton from './PrevButton'
import NextButton from './NextButton'

dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

export default {
  components: {
    DateCell,
    PrevButton,
    NextButton
  },
  data () {
    const dayNames = []
    const startOfWeek = dayjs().startOf('week')
    for (var i = 0; i < 7; i++) {
      dayNames.push(startOfWeek.add(i, 'day').format('dd'))
    }

    return {
      dayNames,
      firstDayOfCurrentMonth: dayjs(this.minDate, dateFormat).set('date', 1).startOf('day'),
      selectedDates: [...this.initialSelectedDates],
      minDateInDayJs: dayjs(this.minDate, dateFormat),
      maxDateInDayJs: dayjs(this.maxDate, dateFormat),
      cells: []
    }
  },
  created () {
    this.cells = this.calculateCells()
  },
  props: {
    minDate: {
      type: String,
      default () {
        return dayjs().startOf('day').format(dateFormat)
      }
    },
    maxDate: {
      type: String,
      default () {
        return dayjs().startOf('day').add(1, 'year').format(dateFormat)
      }
    },
    initialSelectedDates: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    prevIsEnabled () {
      return this.firstDayOfCurrentMonth.isAfter(this.minDateInDayJs)
    },
    nextIsEnabled () {
      const lastDayOfCurrentMonth = this.firstDayOfCurrentMonth.endOf('month')
      return lastDayOfCurrentMonth.isBefore(this.maxDateInDayJs)
    },
    monthString () {
      return this.firstDayOfCurrentMonth.format('MMMM YYYY')
    }
  },
  methods: {
    calculateCells () {
      const firstDayOfCurrentMonth = this.firstDayOfCurrentMonth
      const startOfFirstWeekOfCurrentMonth = firstDayOfCurrentMonth.startOf('week')
      const endOfLastWeekOfCurrentMonth = firstDayOfCurrentMonth.endOf('month').endOf('week')
      const daysShownCount = endOfLastWeekOfCurrentMonth.diff(startOfFirstWeekOfCurrentMonth, 'day') + 1

      let day = startOfFirstWeekOfCurrentMonth
      const result = []
      const currentMonth = firstDayOfCurrentMonth.get('month')
      for (var i = 0; i < daysShownCount; i++) {
        const date = day
        const differentMonth = (day.get('month') != currentMonth)

        const selected = !differentMonth &&
          (this.selectedDates.indexOf(day.format('YYYY-MM-DD')) != -1)

        const selectable = !differentMonth &&
          !day.isBefore(this.minDateInDayJs) &&
          !day.isAfter(this.maxDateInDayJs)

        result.push({
          date,
          differentMonth,
          selectable,
          selected
        })
        day = day.add(1, 'day')
      }
      return result
    },
    onClickPrev () {
      if (this.prevIsEnabled) {
        this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.subtract(1, 'month')
        this.cells = this.calculateCells()
      }
    },
    onClickNext () {
      if (this.nextIsEnabled) {
        this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.add(1, 'month')
        this.cells = this.calculateCells()
      }
    },
    onClickDate (cell, index) {
      const date = cell.date
      const dateTime = date.format('YYYY-MM-DD')
      const indexInSelectedDates = this.selectedDates.indexOf(dateTime)
      if (indexInSelectedDates > -1) {
        this.selectedDates.splice(indexInSelectedDates, 1)
      } else {
        this.selectedDates.push(dateTime)
      }
      this.$emit('change-selected-dates', this.selectedDates)
      this.cells.splice(index, 1, Object.assign(cell, { selected: !cell.selected }))
    },
    clear () {
      this.selectedDates = [...this.initialSelectedDates]
      this.cells = this.calculateCells()
    }
  }
}
</script>

<style lang="scss" scoped>
*, *:before, *:after {
  box-sizing: inherit;
}

button {
  width: 100%;
  height: 100%;
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

.prev {
  position: absolute;
  left: 0;
  top: 0;
}

.next {
  position: absolute;
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
</style>
