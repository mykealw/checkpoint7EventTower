<template>
  <div class="eventPage row coverImage bg-dark p-4">
    <div class="col-md-3 p-3">
      <img
        class="img-fluid rounded"
        :src="events.coverImg"
        :alt="events.name"
      />
    </div>
    <div class="col-md-6">
      <div>
        <h3 class="text-light picfont">{{ events.name }}</h3>
        <h3 class="text-light picfont">{{ events.location }}</h3>
      </div>
      <div>
        <h4 class="text-light picfont">
          {{ new Date(events.startDate).toDateString() }}
        </h4>
      </div>
      <h5 class="text-light picfont">{{ events.description }}</h5>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
      // try {
      //   if (route.name = 'Event') {
      //     if (route.params.id !== undefined) {
      //       await eventsService.getActiveEvent(route.params.id)
      //     }
      //   }
      // }
    })
    return {
      events: computed(() => AppState.activeEvent),
      coverImg: computed(() => AppState.activeEvent.coverImg)
    }
  }
}
</script>


<style lang="scss" scoped>
.coverImage {
  background-image: v-bind(coverImg) !important;
  background-position: center;
  backdrop-filter: blur(35px);
  background-size: cover;
}
.picfont {
  font-family: "Alegreya Sans", sans-serif;
}
</style>