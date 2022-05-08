<template>
  <div class="component">
    <h2>{{ myEvent.name }}</h2>
  </div>
</template>


<script>
export default {
  props: {
    myEvent: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>