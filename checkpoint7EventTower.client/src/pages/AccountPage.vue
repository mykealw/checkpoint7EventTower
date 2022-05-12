<template>
  <div class="row">
    <div v-if="editing !== true" class="col-md-12">
      <h5
        class="
          selectable
          p-2
          border border-dark
          m-2
          bg-primary
          rounded
          text-center
        "
        @click="editing = !editing"
        title="Edit Account"
      >
        Edit Account
        <i class="ms-2 mdi mdi-account-edit-outline"></i>
      </h5>
    </div>
    <form class="p-3" v-if="editing == true" @submit.prevent="editAccount()">
      <div class="m-2">
        <label for="name" class="form-label visually-hidden">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="helpId"
          placeholder="Name.."
          v-model="edit.name"
        />
      </div>
      <div class="m-2">
        <label for="picture" class="form-label visually-hidden">Picture</label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="picture url input"
          placeholder="picture URL..."
          v-model="edit.picture"
        />
      </div>
      <div>
        <button
          class="btn bg-danger"
          @click="editing = !editing"
          title="Cancel"
        >
          Cancel
        </button>
        <button class="btn bg-success ms-2" title="Submit">Submit</button>
      </div>
    </form>
  </div>
  <div class="about row">
    <h4 class="text-success picfont my-auto">My Events</h4>
    <div class="col-md-3" v-for="e in myEvents" :key="e.id">
      <MyEvents :myEvent="e" @click="goTo(e.id)" />
    </div>
  </div>
  <div class="row">
    <h4 class="text-success picfont my-auto">Upcoming Events</h4>
    <div class="col-md-6 d-flex jcsa" v-for="t in myTickets" :key="t.id">
      <div class="d-flex m-3 ticlen rounded bg-dark">
        <img
          @click="goTo(t.eventId)"
          class="ticpic rounded"
          :title="t.event.name"
          :src="t.event.coverImg"
          :alt="t.event.name"
        />
        <h4 class="picfont p-2">
          <b> {{ t.event.name }} </b><br />
          <span class="text-success"
            >{{ t.event.location }} <br />
            {{ new Date(t.event.startDate).toDateString() }}</span
          >
          <br />
          <button class="btn btn-danger" @click="deleteTicket(t.id)">
            Delete Ticket
          </button>
        </h4>
        <!-- <div class="bg-success position-absolulte hole"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { accountService } from '../services/AccountService.js'
import { eventsService } from '../services/EventsService.js'
import { ticketsService } from '../services/TicketsService.js'
import { useRouter } from 'vue-router'
export default {
  name: 'Account',
  setup() {
    const editing = ref(false);
    const edit = ref({});
    const router = useRouter()
    onMounted(async () => {
      try {
        await eventsService.getAllEvents()
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      edit,
      editing,
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents),
      myTickets: computed(() => AppState.myTickets),
      async editAccount() {
        try {
          if (!edit.value.name) {
            edit.value.name = AppState.account.name
          }
          if (!edit.value.picture) {
            edit.value.picture = AppState.account.picture
          }
          await accountService.editAccount(edit.value)
          Pop.toast("Account updated", "success")
        } catch (error) {
          logger.log("[error prefix]", error.message);
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
      },
      async deleteTicket(id) {
        try {
          if (await Pop.confirm()) {
            await ticketsService.deleteTicket(id)
          }
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

<style scoped>
img {
  max-width: 100px;
}
.picfont {
  font-family: "Alegreya Sans", sans-serif;
}
.ticpic {
  object-fit: cover;
  height: 26vh;
  width: 100%;
}
.jcsa {
  justify-content: space-around;
}
.ticlen {
  width: 500px;
}
.hole {
  height: 100px;
  border-radius: 50%;
  width: 100px;
  margin-left: 50%;
  margin-top: 25%;
}
</style>
