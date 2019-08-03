<template>
  <div class="sample">
    <h2>Single select date picker but with multiple selected dates props</h2>
    <p>
      We can set date picker as single select. But when provided with multiple selected
      dates props it will only select the first element of that props.
    </p>
    <div class="sample__wrapper">
      <div>
        <date-picker
          ref="datePicker"
          :multi-select="false"
          :initial-selected-dates="selectedDates"
          @change-selected-dates="onChangeSelectedDates"
        />
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '../src/DatePicker'

export default {
  name: 'MultipleSelectedPropsInSingleSelectDatePicker',
  components: {
    DatePicker
  },
  data () {
    return {
      selectedDates: [
        '2019-08-01', '2019-08-08'
      ]
    }
  },
  methods: {
    onChangeSelectedDates () {

    }
  }
}
</script>
