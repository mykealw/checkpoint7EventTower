<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3 d-flex jcsb">
    <div>
      <router-link
        class="navbar-brand d-flex selectable"
        aria-label="Go Home"
        id="go home"
        title="go home"
        :to="{ name: 'Home' }"
      >
        <label class="visually-hidden" for="go home"> go home</label>
        <div class="d-flex flex-column align-items-center">
          <h1>🌴Tower🦒</h1>
        </div>
      </router-link>
    </div>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button> -->
    <div class="d-flex" id="navbarText ">
      <button
        v-if="account.name"
        data-bs-toggle="modal"
        data-bs-target="#create-event"
        class="btn btn-success text-dark px-1 py-0"
        title="create event"
        max-height="fit-content"
      >
        Create Event
      </button>
      <ul class="navbar-nav me-auto">
        <!-- <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
        </li> -->
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <Modal id="create-event">
    <template #title> <h4>Create Event</h4> </template>
    <template #body> <CreateEventForm /> </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.jcsb {
  justify-content: space-between;
}
</style>
