<template>
  <button :class="cssClass" @click="onClick">
    <time v-if="!differentMonth" :datetime="dateTime">{{ dateNumber }}</time>
  </button>
</template>

<script>
export default {
  name: 'DateCell',
  data () {
    return {
      dateNumber: this.date.format('D'),
      dateTime: this.date.format('YYYY-MM-DD'),
      selected: this.initialSelected
    }
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    differentMonth: {
      type: Boolean,
      default: true
    },
    initialSelected: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cssClass () {
      return {
        'date-cell': !this.differentMonth,
        'date-cell--is-selectable': this.selectable,
        'date-cell--is-selected': !this.differentMonth && this.selected,
        'empty-cell': this.differentMonth
      }
    }
  },
  methods: {
    onClick () {
      if (!this.differentMonth && this.selectable) {
        this.selected = !this.selected
        this.$emit('click')
      }
    }
  }
}
</script>
