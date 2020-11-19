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
  border: 1px solid #FF9800;
  text-align: center;
  font-weight: bold;
  background-color: #FF9800;
  color: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>