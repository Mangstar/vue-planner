<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="8">
        <app-planner></app-planner>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { AppPlanner } from '../components/Planner'

export default {
  name: 'Home',

  components: {
    AppPlanner
  }
}
</script>
