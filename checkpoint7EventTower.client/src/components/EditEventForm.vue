<template>
  <form @submit.prevent="editEvent()">
    <div class="justify-content-center">
      <div class="row">
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Name">Name:</label>
          <input v-model="edit.name" maxlength="20" type="text" />
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Date">Date:</label
          ><input v-model="edit.startDate" type="date" />
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Location">Location:</label>
          <input v-model="edit.location" type="text" />
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Type of Event">Type of Event:</label
          ><select v-model="edit.type" name="Type of Event" id="">
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event description">Description:</label>
          <textarea
            v-model="edit.description"
            class="form-control"
            name="ProjectDescription"
            id="ProjectDescription"
            rows="3"
          ></textarea>
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Capacity">Capacity:</label>
          <input v-model="edit.capacity" min="1" max="9999" type="number" />
        </div>
        <div class="col-md-12 p-1">
          <label class="p-1" for="Event Cover Image">Cover Image:</label>
          <input v-model="edit.coverImg" type="text" />
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
      async editEvent() {
        try {
          edit.value.id = AppState.activeEvent.id
          await eventsService.editEvent(edit.value)
          router.push({
            name: 'Event',
            params: { id: AppState.activeEvent.id }
          }
          )
          Modal.getOrCreateInstance(document.getElementById('edit-event')).toggle()
          edit.value = {}
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