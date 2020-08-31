<template>
  <div id="app">
    <app-header></app-header>

    <app-main>
      <router-view/>
    </app-main>

    <app-footer></app-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  }
}
</script>

<style lang="scss">

</style>
