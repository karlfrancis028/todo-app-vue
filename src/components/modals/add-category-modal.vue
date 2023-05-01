<template>
  <modal-container>
    <div class="modal__body">
      <text-field-with-label label="Category"
                             field-placeholder="Add your own Category"
                             :initial-value="newCategory"/>
    </div>
  </modal-container>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    name: "add-category-modal.vue",
    data() {
      return {
        newCategory: '',
      }
    },
    methods: {
      ...mapActions({ addCategories: 'addCategory' }),
      addCategory(value) {
        this.$emit('confirm-add-category', value);
        this.$modal.close();
      }
    }
  }
</script>