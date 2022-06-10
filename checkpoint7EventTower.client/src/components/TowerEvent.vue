<template>
  <div class="TowerEvent p-1 bg-dark rounded position-relative my-2 selectable">
    <img class="rounded eI eI2" :src="event.coverImg" :alt="event.name" />
    <div class="position-absolute z3">
      <h5 class="text-light tt tt2">{{ event.name }}</h5>
      <h6 class="text-light ts ts2 ms-2">
        {{ event.location }} <br />
        {{ new Date(event.startDate).toDateString() }}
      </h6>
      <h5
        v-if="event.capacity >= 1 && event.isCanceled == false"
        class="ts ts2 tr tr2"
      >
        Tickets: {{ event.capacity }}
      </h5>
      <h3 v-if="event.isCanceled" class="text-warning ts ts2 ec ec2">
        Event Canceled
      </h3>
      <h4
        v-if="event.capacity == 0 && event.isCanceled == false"
        class="text-danger ts ts2 so so2"
      >
        SOLD OUT
      </h4>
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
.z3 {
  z-index: 3;
}
.z2 {
  z-index: 2;
}
.z1 {
  z-index: 1;
}
@media only screen and (min-width: 767.98px) {
  .eI {
    height: 20vh;
    width: 100%;
    object-fit: cover;
  }

  .tt {
    text-shadow: 1px 1px 0 #141414, -1px -1px 0 #141414, 1px -1px 0 #141414,
      -1px 1px 0 #141414, 1px 1px 0 #141414;
    margin-top: -19vh;
    margin-left: 1vw;
  }
  .ts {
    text-shadow: 2px 2px 0 #141414 !important;
  }
  .so {
    margin-left: 12vw;
  }
  .ec {
    margin-left: 6vw;
  }
  .tr {
    margin-left: 12vw;
  }
}

@media only screen and (max-width: 767px) {
  .eI2 {
    height: 20vh;
    width: 100%;
    object-fit: cover;
  }

  .tt2 {
    text-shadow: 1px 1px 0 #141414, -1px -1px 0 #141414, 1px -1px 0 #141414,
      -1px 1px 0 #141414, 1px 1px 0 #141414;
    margin-top: -19vh;
    margin-left: 1vw;
  }
  .ts2 {
    text-shadow: 2px 2px 0 #141414 !important;
  }
  .tr2 {
    margin-top: 0em;
    margin-left: 1em;
  }
  .ec2 {
    margin-top: 0vh;
    margin-left: 3vw;
  }
  .so2 {
    margin-top: 0em;
    margin-left: 3vw;
  }
}
</style>