<template>
  <div id="app">
    <date-picker
      min-date="2019-09-01"
      max-date="2019-12-31"
      @change-selected-dates="onChangeSelectedDates"
    />
    <ol>
      <li v-for="date in dates" :key="date">{{ date }}</li>
    </ol>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import DatePicker from '../src/DatePicker'

export default {
  name: 'app',
  components: {
    DatePicker
  },
  data () {
    return {
      dates: [],
      maxDate: dayjs().add(6, 'month').format('YYYY-MM-DD')
    }
  },
  methods: {
    onChangeSelectedDates (dates) {
      this.dates = dates
    }
  }
}
</script>
