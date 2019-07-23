<template>
  <div class="cal">
    <div class="month-indicator">{{ monthString() }}</div>
    <prev-button :enabled="prevIsEnabled" @click="onClickPrev" />
    <next-button :enabled="nextIsEnabled" @click="onClickNext" />
    <div class="day-of-week">
      <div v-for="name in dayNames()" :key="name">{{ name }}</div>
    </div>
    <div class="date-grid">
      <date-cell v-for="cell in cells"
        :key="cell.date.valueOf()"
        :date="cell.date"
        :initial-selected="cell.selected"
        :different-month="cell.differentMonth"
        :selectable="cell.selectable"
        @click="onClickDate(cell.date)"
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
    return {
      firstDayOfCurrentMonth: dayjs(this.minDate, dateFormat).set('date', 1).startOf('day'),
      selectedDates: [],
      minDateInDayJs: dayjs(this.minDate, dateFormat),
      maxDateInDayJs: dayjs(this.maxDate, dateFormat)
    }
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
    cells () {
      const firstDayOfCurrentMonth = this.firstDayOfCurrentMonth
      const startOfFirstWeekOfCurrentMonth = firstDayOfCurrentMonth.startOf('week')
      const endOfLastWeekOfCurrentMonth = firstDayOfCurrentMonth.endOf('month').endOf('week')
      const daysShownCount = endOfLastWeekOfCurrentMonth.diff(startOfFirstWeekOfCurrentMonth, 'day') + 1

      let day = startOfFirstWeekOfCurrentMonth
      const result = []
      const currentMonth = firstDayOfCurrentMonth.get('month')
      for (var i = 0; i < daysShownCount; i++) {
        const date = day
        const differentMonth = day.get('month') != currentMonth
        const selected = this.isCellSelected(day, differentMonth)
        const selectable = !day.isBefore(this.minDateInDayJs) && !day.isAfter(this.maxDateInDayJs)
        result.push({
          date,
          differentMonth,
          selectable,
          selected
        })
        day = day.add(1, 'day')
      }
      return result
    }
  },
  methods: {
    dayNames () {
      var names = []
      const startOfWeek = dayjs().startOf('week')
      for (var i = 0; i < 7; i++) {
        names.push(startOfWeek.add(i, 'day').format('dd'))
      }
      return names
    },
    monthString () {
      return this.firstDayOfCurrentMonth.format('MMMM YYYY')
    },
    onClickPrev () {
      if (this.prevIsEnabled) {
        this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.subtract(1, 'month')
      }
    },
    onClickNext () {
      if (this.nextIsEnabled) {
        this.firstDayOfCurrentMonth = this.firstDayOfCurrentMonth.add(1, 'month')
      }
    },
    onClickDate (date) {
      const dateTime = date.format('YYYY-MM-DD')
      const index = this.selectedDates.indexOf(dateTime)
      if (index > -1) {
        this.selectedDates.splice(index, 1)
      } else {
        this.selectedDates.push(dateTime)
      }
      this.$emit('change-selected-dates', this.selectedDates)
    },
    isCellSelected (date, differentMonth) {
      if (differentMonth) return false
      const day = date.format('YYYY-MM-DD')
      return this.selectedDates.indexOf(day) > -1
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
