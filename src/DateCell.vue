<template>
  <button :class="cssClass" @click="onClick">
    <time v-if="!differentMonth" :datetime="dateTime">{{ dateNumber }}</time>
  </button>
</template>

<script>
export default {
  name: 'DateCell',
  props: {
    date: {
      type: Object,
      required: true
    },
    differentMonth: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dateNumber () {
      return this.date.format('D')
    },
    dateTime () {
      return this.date.format('YYYY-MM-DD')
    },
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
        this.$emit('click')
      }
    }
  }
}
</script>
