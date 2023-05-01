<template>
  <modal-container>
    <div class="modal__body">
      <input-field label="Category"
                   field-placeholder="Add your own Category"
                   @click:submit="addCategory"
                   for-editing/>
    </div>
  </modal-container>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name: "add-category-modal.vue",
    methods: {
      ...mapActions({ addCategories: 'addCategory' }),
      addCategory(value) {
        this.$emit('confirm-add-category', value);
      }
    }
  }
</script>