<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ attrs, on }">
      <div class="app-planner-cell-wr"
           v-bind="attrs"
           v-on="on"
      >
        <div class="app-planner-cell"
            :class="{
              'is-active': isActive
            }"
        >
          <slot name="title"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
  </v-tooltip>
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
  border: 1px solid #E0E0E0;
  cursor: pointer;
  // box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  will-change: color, background-color, border-color;
  transition: color 0.4s ease, background-color 0.4s ease, border-color 0.4s ease;

  &:hover,
  &.is-active {
    background-color: #2196f3;
    color: #fff;
    border-color: #2196f3;
    box-shadow: none;
  }
}
</style>