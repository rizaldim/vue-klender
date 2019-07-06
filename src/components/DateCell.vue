<template>
	<button>
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
		}
	}
}
</script>

<style>

</style>
