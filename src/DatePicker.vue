<template>
  <div class="cal">
    <div class="month-indicator">{{ monthString() }}</div>
    <button type="button"
      class="prev"
      :class="{ 'prev--is-disabled': !this.prevIsEnabled }"
      @click="onClickPrev()"
      >
      <svg viewBox="0 0 24 24">
        <g data-name="Layer 2">
          <g data-name="arrow-back">
            <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
            <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
          </g>
        </g>
      </svg>
    </button>
    <button type="button"
      class="next"
      :class="{ 'next--is-disabled': !this.nextIsEnabled }"
      @click="onClickNext()"
      >
      <svg viewBox="0 0 24 24">
        <g data-name="Layer 2">
          <g data-name="arrow-forward">
            <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/>
            <path d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"/>
          </g>
        </g>
      </svg>
    </button>
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
import DateCell from './DateCell'

export default {
  components: {
    DateCell
  },
  data () {
    return {
      firstDayOfCurrentMonth: dayjs().set('date', 1).startOf('day'),
      selectedDates: []
    }
  },
  props: {
    minDate: {
      type: Object,
      default () {
        return dayjs().startOf('day')
      }
    },
    maxDate: {
      type: Object,
      default () {
        return dayjs().startOf('day').add(1, 'year')
      }
    }
  },
  computed: {
    prevIsEnabled () {
      return this.firstDayOfCurrentMonth.isAfter(this.minDate)
    },
    nextIsEnabled () {
      const lastDayOfCurrentMonth = this.firstDayOfCurrentMonth.endOf('month')
      return lastDayOfCurrentMonth.isBefore(this.maxDate)
    },
    cells () {
      const firstDayOfCurrentMonth = this.firstDayOfCurrentMonth
      const startOfFirstWeekOfCurrentMonth = firstDayOfCurrentMonth.startOf('week')
      const endOfLastWeekOfCurrentMonth = firstDayOfCurrentMonth.endOf('month').endOf('week')
      const daysShownCount = endOfLastWeekOfCurrentMonth.diff(startOfFirstWeekOfCurrentMonth, 'day') + 1

      let day = startOfFirstWeekOfCurrentMonth
      const cells = []
      const currentMonth = firstDayOfCurrentMonth.get('month')
      for (var i = 0; i < daysShownCount; i++) {
        const date = day
        const differentMonth = day.get('month') != currentMonth
        const selected = this.isCellSelected(day, differentMonth)
        const selectable = !day.isBefore(this.minDate) && !day.isAfter(this.maxDate)
        cells.push({
          date,
          differentMonth,
          selectable,
          selected
        })
        day = day.add(1, 'day')
      }
      return cells
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
