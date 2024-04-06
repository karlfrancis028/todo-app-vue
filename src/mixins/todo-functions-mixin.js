  import { mapActions } from "vuex"
  import AddCategoryModal from '@/components/modals/add-category-modal';
  import ViewTodoModal from '@/components/modals/view-todo-modal';
  import EditTodoModal from '@/components/modals/edit-todo-modal';
  import DeleteTodoModal from '@/components/modals/delete-todo-modal';
  import DeleteCategoryModal from '@/components/modals/delete-category-modal';

export const fetchData = {
  mounted() {
    this.fetchTodos();
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      fetchTodos: 'fetchTodos',
      fetchCategories: 'fetchTodoCategories',
    }),
  }
}

export const addTodo = {
  data() {
    return {
      newTodo: '',
      selectedCategory: '',
      error: false,
      errorMessage: '',
      categoryError: false,
      categoryErrorMessage: '',
    }
  },
  methods: {
    ...mapActions({
      addTask: 'addTodo',
    }),
    addTodo() {
      const queryCategory = Object.values(this.$route.query)[0];
      const isCategoryAll = queryCategory.toLowerCase() === 'all';
      const isNewTodoEmpty = this.newTodo.trim().length === 0;
      const isSelectedCategoryEmpty = this.selectedCategory.trim().length === 0;
      
      if (!isNewTodoEmpty) {
        this.error = false;
        this.errorMessage = '';
      }
      
      if (!isSelectedCategoryEmpty) {
        this.categoryError = false;
        this.categoryErrorMessage = '';
      }

      if (isNewTodoEmpty || isSelectedCategoryEmpty && isCategoryAll) {
        if (isNewTodoEmpty) {
          this.error = true;
          this.errorMessage = 'Please add a todo.'
        }

        if (isSelectedCategoryEmpty) {
          this.categoryError = true;
          this.categoryErrorMessage = 'Please select a category.';
        }
      } else {
        this.addTask({
          todo: this.newTodo,
          category: isCategoryAll ? this.selectedCategory : queryCategory,
        });
        this.resetFields();
      }
    },
    resetFields() {
      this.newTodo = '';
      this.selectedCategory = '';
    },
  },
}

export const handleTodoData = {
  methods: {
    ...mapActions({
      deleteTodo: 'deleteTodo',
      editTodo: 'editTodo',
    }),
    handleData(action, data) {
      switch (action) {
        case 'view':
          this.$modal.open({
            component: ViewTodoModal,
            props: {
              data: data,
            }
          });
          break;
        case 'edit':
          this.$modal.open({
            component: EditTodoModal,
            props: {
              data: data,
            },
            events: {
              'confirm-todo-editing': (newTodo, todoId) => {
                this.editTodo({newTodo, todoId});
              }
            }
          })
          break;
        case 'delete':
          this.$modal.open({
            component: DeleteTodoModal,
            props: {
              data: data,
            },
            events: {
              'confirm-todo-deletion': (todoId) => {
                this.deleteTodo(todoId);
              }
            }
          });
          break;
        default:
          break;
      }
    }
  },
}

export const addCategory = {
  methods: {
    ...mapActions({
      addCategories: 'addCategory',
    }),
    addCategory(value) {
      this.$modal.open({
        component: AddCategoryModal,
        events: {
          'confirm-add-category': (category) => {
            this.addCategories(category);
          }
        }
      })
      this.addCategories(value);
    },
    deleteCategory(category) {
      this.$modal.open({
        component: DeleteCategoryModal,
        props: {
          data: category,
        },
        events: {
          'confirm-category-deletion': (categoryId) => {
            this.deleteCategories(categoryId);
          }
        }
      })
    },
  }
}

export const deleteCategory = {
  methods: {
    ...mapActions({
      deleteCategories: 'deleteCategory',
    }),
    deleteCategory(category) {
      this.$modal.open({
        component: DeleteCategoryModal,
        props: {
          data: category,
        },
        events: {
          'confirm-category-deletion': (categoryId) => {
            this.deleteCategories(categoryId);
          }
        }
      })
    },
  }
}
