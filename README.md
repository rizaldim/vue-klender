# vue-klender

Yet another date picker for [vuejs](https://vuejs.org).

## Installation

```
npm install --save vue-klender
```

## Usage

```vue
<template>
  <div id="app">
    <date-picker @change-selected-dates="onChangeSelectedDates" />
    <ol>
      <li v-for="date in dates" :key="date">{{ date }}</li>
    </ol>
  </div>
</template>

<script>
import DatePicker from 'vue-klender'

export default {
  name: 'app',
  components: {
    DatePicker
  },
  data () {
    return {
      dates: []
    }
  },
  methods: {
    onChangeSelectedDates (dates) {
      this.dates = dates
    }
  }
}
</script>
```

## Samples

Run `npm run serve` to run app in `example` folder.

## To Do

- [x] Return selected dates to parent component.
- [x] Can set minimal and maximal selectable dates. Default to today and a year from now respectively.
- [ ] Single date, multiple dates, or range of dates.
- [ ] Array of selectable dates. For example: can only select July 20, July 27, and Aug 1.
- [ ] Slide in and out animation when changing month.
- [ ] Shows more than 1 month at once.
- [ ] Show calendar in vertical instead of horizontal.
- [ ] Configurable month name and date number format.
- [ ] Configurable css styling (color, width, etc).
- [ ] Show holidays.
- [ ] Localization.
- [ ] Add CI to build and publish.
