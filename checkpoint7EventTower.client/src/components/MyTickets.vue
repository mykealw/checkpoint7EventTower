<template>
  <div class="component">
    <h1>HELLO</h1>
  </div>
</template>


<script>
export default {
  props: {
    myTicket: {
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
  margin-top: 0em;
  margin-left: 8em;
}
.ec {
  margin-top: 0vh;
  margin-left: 5vw;
}
.so {
  margin-top: -1.2em;
  margin-left: 15vw;
}
</style>