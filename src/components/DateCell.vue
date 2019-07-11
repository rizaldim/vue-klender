<template>
	<button class="calendar__date-cell"
		:class="{ 'calendar__date-cell--different-month': !isCurrentMonth }">
		<time :datetime="dateTime">{{ date }}</time>
	</button>
</template>

<script>
export default {
	name: 'DateCell',
	props: {
		dateTime: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		isCurrentMonth: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style>
</style>
