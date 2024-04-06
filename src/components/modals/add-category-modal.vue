<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="addCategory" for-editing>
        <text-field-with-label v-model="newCategory"
                               label="Add Category"
                               field-placeholder="Add your own Category"/>
      </form-container>
    </div>
  </modal-container>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "add-category-modal",
    data() {
      return {
        newCategory: '',
      }
    },
    methods: {
      ...mapActions({ addCategories: 'addCategory' }),
      addCategory() {
        this.$emit('confirm-add-category', this.newCategory);
        this.$modal.close();
      }
    }
  }
</script>