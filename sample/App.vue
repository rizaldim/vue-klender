<template>
  <div id="app">
    <h1>vue-klender Samples</h1>
    <default-props-sample />
  </div>
</template>

<script>
import DefaultPropsSample from './DefaultPropsSample'
import MultipleSelectedPropsInSingleSelectDatePicker from './MultipleSelectedPropsInSingleSelectDatePicker'

export default {
  name: 'app',
  components: {
    DefaultPropsSample,
    MultipleSelectedPropsInSingleSelectDatePicker
  }
}
</script>

<style lang="scss" src="./style.scss">
</style>
