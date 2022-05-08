<template>
  <form @submit.prevent="createEvent()">
    <div class="justify-content-center">
      <div class="row">
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Name">Name:</label>
          <input required v-model="edit.name" type="text" />
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Date">Date:</label
          ><input required v-model="edit.startDate" type="date" />
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Location">Location:</label>
          <input required v-model="edit.location" type="text" />
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Type of Event">Type of Event:</label
          ><select required v-model="edit.type" name="Type of Event" id="">
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event description">description:</label>
          <input
            required
            v-model="edit.description"
            type="text"
            name=""
            id=""
          />
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Capacity">Capacity:</label>
          <input required v-model="edit.capacity" min="1" type="number" />
        </div>
        <div class="col-md-12 p-2">
          <label class="p-2" for="Event Cover Image">Cover Image:</label>
          <input required v-model="edit.coverImg" type="text" />
        </div>
        <button class="btn btn-success">Submit</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
import { eventsService } from '../services/EventsService.js'

export default {
  setup() {
    const edit = ref({})
    const router = useRouter()
    return {
      edit,
      async createEvent() {
        try {
          await eventsService.createEvent(edit.value)
          router.push({
            name: 'Event',
            params: { id: AppState.activeEvent.id }
          })
          Modal.getOrCreateInstance(document.getElementById('create-event')).toggle()
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }

      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>