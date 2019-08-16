<template>
	<button :class="cssClass" @click="onClick">
		<time v-if="!cell.differentMonth" :datetime="dateTime">{{ dateNumber }}</time>
	</button>
</template>

<script>
export default {
	name: 'DateCell',
	props: {
		cell: {
			type: Object,
			default () {
				return {
					date: {},
					differentMonth: true,
					selected: false,
					selectable: true
				}
			}
		}
	},
	computed: {
		dateNumber () {
			return this.cell.date.format('D')
		},
		dateTime () {
			return this.cell.date.format('YYYY-MM-DD')
		},
		cssClass () {
			return {
				'date-cell': !this.cell.differentMonth,
				'date-cell--is-selectable': this.cell.selectable,
				'date-cell--is-selected': !this.cell.differentMonth && this.cell.selected,
				'empty-cell': this.cell.differentMonth
			}
		}
	},
	methods: {
		onClick () {
			if (!this.cell.differentMonth && this.cell.selectable) {
				this.$emit('click')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.empty-cell {
	background-color: white;
	cursor: default;
}

.date-cell {
	height: 36px;
	padding: 0;
	border-radius: 25%;

	background-color: white;
	color: #ccc;
	cursor: default;
	font-size: 16px;
}

.date-cell--is-selectable {
	color: black;
	cursor: pointer;

	&:hover {
		background-color: #add8e6	;
		color: white;
	}
}

.date-cell--is-selected {
	background-color: purple	;
	color: white;
	cursor: pointer;

	&:hover {
		background-color: purple	;
		color: white;
	}
}
</style>

