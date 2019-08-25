<template>
	<div id="app">
		<h1>vue-klender Samples</h1>
		<select v-model="sampleSelected">
			<option value="" disabled>Select sample</option>
			<option value="default-props">Default props</option>
			<option value="max-date-set">With max date set</option>
			<option value="initial-selected">With initial selected dates</option>
		</select>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			sampleSelected: ""
		}
	},
	watch: {
		sampleSelected: function (value) {
			this.$router.push({ path: value})
		}
	}
}
</script>

<style lang="scss" src="./style.scss">
</style>
