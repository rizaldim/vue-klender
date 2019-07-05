<template>
	<div class="calendar">
		<div class="month-indicator">July 2019</div>
		<div class="day-of-week">
			<div>Su</div>
			<div>Mo</div>
			<div>Tu</div>
			<div>We</div>
			<div>Th</div>
			<div>Fr</div>
			<div>Sa</div>
		</div>
		<div class="date-grid">
			<button v-for="index in 30" :key="index+1">{{ index }}</button>
		</div>
	</div>
</template>

<script>
</script>

<style>
.calendar {
	width: 640px;
}
.day-of-week, .date-grid {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
}
.day-of-week {
	height: 40px;
}
.date-grid button {
	height: 40px;
}
</style>
