<template>
	<div id="app">
		<h1>vue-klender Samples</h1>
		<default-props-sample />
		<with-max-date-set-sample />
	</div>
</template>

<script>
import DefaultPropsSample from './DefaultPropsSample'
import WithMaxDateSetSample from './WithMaxDateSetSample'

export default {
	name: 'app',
	components: {
		DefaultPropsSample,
		WithMaxDateSetSample
	}
}
</script>

<style lang="scss" src="./style.scss">
</style>
