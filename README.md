# vue-klender

Yet another date picker for [vuejs](https://vuejs.org). Currently still using
CSS Grid for layout so that it won't work in browser without
that feature. This component is still a work in progress so that it might not
suit your use case. See [to do section](#to-do) for planned features.

## Installation

```
npm install --save vue-klender
```

## Usage

Import and register in script.

```vue
<script>
import DatePicker from 'vue-klender'

export default {
	...
	components: {
		DatePicker
	},
	...
}
</script>
```

Then use it in template.

```vue
<template>
	<div id="app">
		<date-picker @change-selected-dates="onChangeSelectedDates" />
		// ...
	</div>
</template>
```

Everytime a date is clicked, it will emit `change-selected-dates` event
with string of selected dates in an array. Selected dates are in `YYYY-MM-DD`
format. In example above, we call `onChangeSelectedDates` method every time
`change-selected-dates` event occurred.

```javascript
export default {
	...
	methods: {
		onChangeSelectedDates (dates) {
			this.dates = dates
		}
	}
	...
}
```

You can use `min-date` and `max-date` to limit choosable time range. Use `YYYY-MM-DD`
format. It defaults to today for `min-date` and a year from now for `max-date`.

```vue
<date-picker
	min-date="2019-09-01"
	max-date="2019-12-31"
	@change-selected-dates="onChangeSelectedDates"
/>
```

## Samples

Run `npm run serve` to run app in `example` folder.

## To Do

- [x] Return selected dates to parent component.
- [x] Can set minimal and maximal selectable dates. Default to today and a year from now respectively.
- [ ] Set initial selected dates.
- [ ] Single date, multiple dates, or range of dates.
- [ ] Array of selectable dates. For example: can only select July 20, July 27, and Aug 1.
- [ ] Slide in and out animation when changing month.
- [ ] Shows more than 1 month at once.
- [ ] Show calendar in vertical instead of horizontal.
- [ ] Configurable month name and date number format.
- [ ] Configurable css styling (color, width, etc).
- [ ] Show holidays.
- [ ] Internationalization.
- [ ] Add CI to build and publish.
