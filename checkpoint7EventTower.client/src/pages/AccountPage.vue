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
        @click="editing = true"
        title="Edit Account"
      >
        Edit Account
        <i class="ms-2 mdi mdi-pencil"></i>
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
        <button class="btn bg-danger" @click="editing = false" title="Cancel">
          Cancel
        </button>
        <button class="btn bg-success ms-2" title="Submit">Submit</button>
      </div>
    </form>
  </div>
  <div class="about row" v-for="e in myEvents" :key="e.id" :myEvent="e">
    <div class="col-md-3">
      <MyEvents />
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
export default {
  name: 'Account',
  setup() {
    const editing = ref(false);
    const edit = ref({});
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
      myEvents: computed(() => AppState.events.filter(e => e.creatorId.toString() !== account.id.toString())),
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

    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
