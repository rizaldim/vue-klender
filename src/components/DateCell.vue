<template>
	<button class="calendar__date-cell"
		:class="cssClass"
		@click="onClick"
		>
		<time :datetime="dateTime">{{ date }}</time>
	</button>
</template>

<script>
export default {
	name: 'DateCell',
	data () {
		return {
			selected: this.initialSelected
		}
	},
	props: {
		dateTime: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		selectable: {
			type: Boolean,
			default: true
		},
		initialSelected: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		cssClass () {
			return {
				'calendar__date-cell--is-selectable': this.selectable,
				'calendar__date-cell--is-selected': this.selected
			}
		}
	},
	methods: {
		onClick () {
			if (this.selectable) {
				this.selected = !this.selected
				this.$emit('click')
			}
		}
	}
}
</script>
