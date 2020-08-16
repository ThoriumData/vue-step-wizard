<template>
  <div class="container py-5" id="app">
    <SimpleStepper></SimpleStepper>
  </div>
</template>

<script>
import SimpleStepper from './demos/SimpleStepper.vue'

export default {
  name: 'app',
  components: {
    SimpleStepper
  }
}
</script>

<style lang="scss">
    // main application scss
    @import "@/assets/scss/thoriumData";

    // wizard scss
    @import "@/assets/scss/components/wizard";

</style>
