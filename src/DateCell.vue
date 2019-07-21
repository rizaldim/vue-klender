<template>
  <button :class="cssClass" @click="onClick">
    <time v-if="!differentMonth" :datetime="dateTime">{{ date }}</time>
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
        'date-cell': !this.differentMonth,
        'date-cell--is-selected': !this.differentMonth && this.selected,
        'empty-cell': this.differentMonth
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
