<template>
  <div class="comments p-1 bg-dark col-md-10 m-1 d-flex rounded">
    <div>
      <img
        class="rounded compic"
        :src="comment.creator.picture"
        :title="comment.creator.name"
        :alt="comment.creator.name"
      />
      <h6>{{ comment.creator.name }}</h6>
    </div>
    <div>
      <h4 class="p-2 bg-light text-dark m-2 rounded">{{ comment.body }}</h4>
    </div>
    <div>
      <button
        v-if="comment.creatorId == account.id"
        title="delete comment"
        class="btn btn-danger"
        @click="deleteComment(comment.id)"
      >
        Delete Comment
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteComment(id) {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(id)
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


<style lang="scss" scoped>
.compic {
  height: 150px;
}
</style>