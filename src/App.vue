<template>
  <div class="container py-5" id="app">
    <SimpleWizard></SimpleWizard>
  </div>
</template>

<script>
import SimpleWizard from './demos/SimpleWizard.vue'

export default {
  name: 'app',
  components: {
    SimpleWizard
  }
}
</script>

<style lang="scss">
    // main application scss
    @import "@/assets/scss/thoriumData";

    // wizard scss
    @import "@/assets/scss/components/wizard";

</style>
