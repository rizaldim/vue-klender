<template>
  <button
    type="button"
    class="next"
    :class="{ 'next--is-disabled': !enabled }"
    @click="$emit('click')"
  >
    <svg viewBox="0 0 24 24">
      <g data-name="Layer 2">
        <g data-name="arrow-forward">
          <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
          <path
            d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
          />
        </g>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'NextButton',
  props: {
    enabled: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.next {
  width: 36px;
  height: 36px;

  background-color: transparent;
}

.next--is-disabled {
  cursor: default;
}

.next--is-disabled svg {
  fill: #aaaaaa;
}
</style>
