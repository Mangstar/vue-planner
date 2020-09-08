<template>
  <div class="app-planner-cell-header-wr">
    <div class="app-planner-cell-header">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-planner-cell-header',

  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
.app-planner-cell-header {
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #EEEEEE;
  text-align: center;
  font-weight: bold;
  background-color: #EEEEEE;
}
</style>