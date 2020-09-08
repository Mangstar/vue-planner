<template>
  <div class="app-planner-cell-wr">
    <div class="app-planner-cell"
         :class="{
           'is-active': isActive
         }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-planner-cell',

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
.app-planner-cell {
  box-sizing: border-box;
  padding: 15px;
  text-align: center;
  border: 1px solid #EEEEEE;
  cursor: pointer;
  will-change: color, background-color, border-color;
  transition: color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease;

  &:hover,
  &.is-active {
    background-color: #2196f3;
    color: #fff;
    border-color: #2196f3;
  }
}
</style>