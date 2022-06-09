<template>
  <div class="row">
    <div class="col-md-12 p-0 mt-2 position-relative">
      <img
        class="img1 border border-primary d-flex mx-auto"
        src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt=""
      />
      <h3 class="text-primary position-absolute marginT picfont ts text-start">
        Get ahead of the scalpers.<br />Reserve your seat now with<br />real
        events for real people.
      </h3>
    </div>
  </div>
  <div class="row justify-content-center my-5 center-text">
    <div
      class="
        col-md-2
        d-flex
        pt-3
        pb-2
        bg-dark
        justify-content-center
        selectable
        roundleft
      "
      @click.prevent="getAllEvents('')"
    >
      <h3 class="picfont text-primary" title="All Events">All</h3>
    </div>
    <div
      class="
        col-md-2
        d-flex
        pt-3
        pb-2
        bg-dark
        justify-content-center
        selectable
      "
      @click.prevent="filterEvents('concert')"
    >
      <h3 class="picfont text-primary" title="Concerts">Concerts</h3>
    </div>
    <div
      class="
        col-md-2
        d-flex
        pt-3
        pb-2
        bg-dark
        justify-content-center
        selectable
      "
      @click.prevent="filterEvents('convention')"
    >
      <h3 class="picfont text-primary" title="Conventions">Conventions</h3>
    </div>
    <div
      class="
        col-md-2
        d-flex
        pt-3
        pb-2
        bg-dark
        justify-content-center
        selectable
      "
      @click.prevent="filterEvents('sport')"
    >
      <h3 class="picfont text-primary" title="Sports">Sports</h3>
    </div>
    <div
      class="
        col-md-2
        d-flex
        pt-3
        pb-2
        bg-dark
        justify-content-center
        selectable
        roundright
      "
      @click.prevent="filterEvents('digital')"
    >
      <h3 class="picfont text-primary" title="Digital">Digital</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3" :title="e.name" v-for="e in events" :key="e.id">
      <TowerEvent :event="e" @click="goTo(e.id)" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    watchEffect(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.towerEvents),
      async getAllEvents() {
        try {
          await eventsService.getAllEvents()

        }
        catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async filterEvents(eventType) {
        try {
          await eventsService.filterEvents(eventType)
        }
        catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async goTo(id) {
        try {
          await eventsService.getActiveEvent(id)
          router.push({
            name: 'Event',
            params: { id: AppState.activeEvent.id }
          })
        }
        catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
  }
}
.img1 {
  height: 25vh;
  width: 95vw;
  object-fit: cover;
  border: 5px;
}
.marginT {
  margin-top: -7rem;
  margin-left: 5vw;
}
.picfont {
  font-family: "Alegreya Sans", sans-serif;
}
.ts {
  text-shadow: 1px 1px 0 #141414, -1px -1px 0 #141414, 1px -1px 0 #141414,
    -1px 1px 0 #141414, 1px 1px 0 #141414;
}
@media only screen and (min-width: 767.98px) {
  .roundleft {
    border-radius: 15px 0px 0px 15px;
  }
  .roundright {
    border-radius: 0px 15px 15px 0px;
  }
}
</style>
