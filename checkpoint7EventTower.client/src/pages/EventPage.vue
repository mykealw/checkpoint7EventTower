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
      <div class="d-flex jcsb">
        <h3 class="text-light picfont">{{ events.name }}</h3>
        <h3 class="text-light picfont">{{ events.location }}</h3>
      </div>
      <div>
        <h4 class="text-light picfont">
          {{ new Date(events.startDate).toDateString() }}
        </h4>
      </div>
      <h5 class="text-light picfont">{{ events.description }}</h5>
      <div class="d-flex jcsb">
        <div>
          <h4
            v-if="events.capacity >= 1 && events.isCanceled == false"
            class="text-light picfont mt-auto"
          >
            {{ events.capacity }} spots left
          </h4>
          <h4
            v-if="events.capacity == 0 && events.isCanceled == false"
            class="text-danger"
          >
            Sold Out
          </h4>
          <h4 v-if="events.isCanceled" class="text-danger">EVENT CANCELED</h4>
        </div>
        <button
          v-if="events.capacity > 0 && events.isCanceled == false && !stonks"
          class="btn btn-warning"
          @click="createTicket(events.id)"
        >
          Attend <i class="mdi mdi-moped"></i>
        </button>
      </div>
    </div>
    <div
      v-if="events.creatorId == account.id && events.isCanceled == false"
      class="col-md-6"
    >
      <button class="btn btn-danger" @click="cancelEvent(events.id)">
        Cancel Event
      </button>
    </div>
  </div>
  <div class="row mt-4 d-flex justify-content-center">
    <div class="col-md-11 bg-dark rounded p-3">
      <Tickets v-for="t in ticket" :key="t.id" :ticket="t" />
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { ticketsService } from '../services/TicketsService.js'
import { accountService } from '../services/AccountService.js'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
      try {
        if (route.name == 'Event') {
          await eventsService.getActiveEvent(route.params.id)
          await accountService.getMyTickets()
          await ticketsService.getAllTickets(route.params.id)

        }
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.activeEvent),
      coverImg: computed(() => AppState.activeEvent.coverImg),
      ticket: computed(() => AppState.tickets),
      stonks: computed(() => AppState.myTickets.find(s => s.eventId == AppState.activeEvent.id)),
      account: computed(() => AppState.account),

      async createTicket(eventId) {
        try {
          let ticket = {
            accountId: AppState.account.id,
            eventId: eventId
          }
          // logger.log(ticket, "this is ticket to be made")
          await ticketsService.createTicket(ticket)

        }
        catch (error) {
          logger.log(error);
          Pop.toast(error.message, "error");
        }
      },
      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm()) {
            await eventsService.cancelEvent(eventId)
          }
        }
        catch (error) {
          logger.log(error)
          Pop.toast(error.message, "error");
        }
      }
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
.jcsb {
  justify-content: space-between;
}
</style>