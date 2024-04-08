<template>
  <modal-container>
    <div class="modal__body">
      <form-container @click:submit="addCategory" for-editing>
        <input-with-label-and-error v-model="newCategory"
                                    label="Add Category"
                                    field-placeholder="Add your own Category"
                                    :error="error"
                                    :error-message="errorMessage"/>
      </form-container>
    </div>
  </modal-container>
</template>

<script>
  import { mapActions, } from 'vuex';

  export default {
    name: "add-category-modal",
    props: {
      categories: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        newCategory: '',
        error: false,
        errorMessage: null,
      }
    },
    methods: {
      ...mapActions({ addCategories: 'addCategory' }),
      addCategory() {
        const regex = /[^a-zA-Z]/;
        const isCategoryExisting = this.categories.some((category) => category.category.toLowerCase().includes(this.newCategory.toLowerCase()));

        if (this.newCategory.trim().length > 0) {
          if (isCategoryExisting) {
            this.error = true;
            this.errorMessage = 'Category already exists.';
          } else {
            if (!regex.test(this.newCategory)) {
              this.$emit('confirm-add-category', this.newCategory);
              this.$modal.close();
            } else {
              this.error = true;
              this.errorMessage = 'Numbers and symbols are not allowed.';
            }
          }
        } else {
          this.error = true;
          this.errorMessage = 'Please add a category.';
        }
      }
    }
  }
</script>