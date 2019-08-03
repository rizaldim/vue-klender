<template>
  <div class="sample">
    <h2>Using default props</h2>
    <p>
      With default props date picker will use today as minimal date and 1 year
      from now as maximal date.
    </p>
    <div class="sample__wrapper">
      <div>
        <date-picker
          ref="datePicker"
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
import DatePicker from '../src/DatePicker'

export default {
  name: 'DefaultPropsSample',
  components: {
    DatePicker
  },
  data () {
    return {
      dates: []
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
