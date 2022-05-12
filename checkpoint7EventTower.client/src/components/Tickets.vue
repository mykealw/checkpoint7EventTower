<template>
  <img
    class="img-fluid avatar p-1"
    :src="ticket.account.picture"
    :alt="ticket.account.name"
    :title="ticket.account.name"
  />
</template>


<script>
export default {
  props: {
    ticket: {
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
.avatar {
  height: 8vh;
  width: 7vw;
  border-radius: 50%;
  border: 3px;
  border-color: black;
  object-fit: cover;
}
</style>