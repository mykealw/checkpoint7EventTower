<template>
  <div class="TowerEvent p-1 bg-dark rounded position-relative my-2 selectable">
    <img class="rounded eI" :src="event.coverImg" :alt="event.name" />
    <div class="position-absolute z3">
      <h4 class="text-light tt">{{ event.name }}</h4>
      <h6 class="text-light ts ms-2">
        {{ event.location }} <br />
        {{ new Date(event.startDate).toDateString() }}
      </h6>
      <h4 class="ts tr">Tickets: {{ event.capacity }}</h4>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    event: {
      type: Object,
      requried: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.eI {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
.z3 {
  z-index: 3;
}
.z2 {
  z-index: 2;
}
.z1 {
  z-index: 1;
}
.tt {
  text-shadow: 1px 1px 0 #141414, -1px -1px 0 #141414, 1px -1px 0 #141414,
    -1px 1px 0 #141414, 1px 1px 0 #141414;
  margin-top: -19vh;
  margin-left: 1vw;
}
.ts {
  text-shadow: 1px 1px 0 #141414, -1px -1px 0 #141414, 1px -1px 0 #141414,
    -1px 1px 0 #141414, 1px 1px 0 #141414;
}
.tr {
  margin-top: 8vh;
  margin-left: 15vw;
}
</style>