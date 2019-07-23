<template>
  <button type="button"
    class="prev"
    :class="{ 'prev--is-disabled': !enabled }"
    @click="$emit('click')"
  >
    <svg viewBox="0 0 24 24">
      <g data-name="Layer 2">
        <g data-name="arrow-back">
          <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
          <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
        </g>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'PrevButton',
  props: {
    enabled: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.prev {
  width: 36px;
  height: 36px;

  background-color: transparent;
}

.prev--is-disabled {
  cursor: default;
}

.prev--is-disabled svg {
  fill: #aaaaaa;
}
</style>
