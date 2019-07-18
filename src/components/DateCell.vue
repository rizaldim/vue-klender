<template>
	<button :class="cssClass" @click="onClick">
		<time v-if="!differentMonth" :datetime="dateTime">{{ date }}</time>
	</button>
</template>

<script>
import dayjs from 'dayjs'

export default {
	name: 'DateCell',
	data () {
		return {
			timeCreated: dayjs().format(),
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
		differentMonth: {
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
				'calendar__date-cell': !this.differentMonth,
				'calendar__empty-cell': this.differentMonth,
				'calendar__date-cell--is-selected': !this.differentMonth && this.selected
			}
		}
	},
	methods: {
		onClick () {
			if (!this.differentMonth) {
				this.selected = !this.selected
				this.$emit('click')
			}
		}
	}
}
</script>
