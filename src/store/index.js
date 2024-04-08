import Vue from 'vue'
import Vuex from 'vuex'
import { httpRequest } from '@/services';

Vue.use(Vuex)

const todoApiEndpoint = 'https://660437ad2393662c31d0f2cc.mockapi.io/todos';
const categoriesApiEndpoint = 'https://644f87f0b61a9f0c4d24c4d8.mockapi.io/todo-categories';

export default new Vuex.Store({
  state: {
    todos: [],
    todoCategories: [],
    loading: false,
  },
  getters: {
    //TODOS
    getTodos: state => state.todos,
    getSortedTodos: (state) => (category) => {
      if(category !== 'All') {
        const filterByCategory = state.todos.filter(todo => todo.category === category);
        const sortById = filterByCategory.sort((a, b) => a.id - b.id);
        
        return sortById.sort((a, b) => {
          return a.status === 'Active' && b.status === 'Completed' ? -1 :
                  a.status === 'Completed' && b.status === 'Active' ? 1 : 0;
        });
      }

      const sortById = state.todos.sort((a, b) => a.id - b.id);
        
        return sortById.sort((a, b) => {
          return a.status === 'Active' && b.status === 'Completed' ? -1 :
                  a.status === 'Completed' && b.status === 'Active' ? 1 : 0;
      });

    },
    //TODO CATEGORIES
    getCategories: state => state.todoCategories,
    getLoadingState: state => state.loading,
  },
  actions: {
    //TODOS
    async fetchTodos({commit}) {
      try {
        const payload = await httpRequest('get', todoApiEndpoint);
        commit('SET_TODOS', payload);
      } catch (error) {
        console.log(error);
      } 
    },
    async addTodo({commit, state}, todo) {
      state.loading = true;
      try {
        const capitalizedTodo = todo.todo.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const payload = await httpRequest('post', todoApiEndpoint, {
          todo: capitalizedTodo,
          category: todo.category,
          status: 'Active',
        });
        commit('ADD_TODO', payload);
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
    async setTodoStatus({commit, state}, todo) {
      state.loading = true;
      try {
        const payload = await httpRequest('put', `${todoApiEndpoint}/${todo.id}`, {
          status: todo.status === 'Active' ? 'Completed' : 'Active',
        });
        commit('SET_TODO_STATUS', payload);
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },  
    async editTodo({dispatch, state}, todo) {
      state.loading = true;
      try {
        await httpRequest('put', `${todoApiEndpoint}/${todo.todoId}`, {
          todo: todo.newTodo,
          category: todo.newCategory,
        })
      } catch (error) {
        console.log(error);
      } finally {
        await dispatch('fetchTodos');
        state.loading = false;
      }
    },
    async deleteTodo({commit, state}, todoId) {
      state.loading = true;
      try {
        await httpRequest('delete', `${todoApiEndpoint}/${todoId}`);
        commit('DELETE_TODO', todoId);
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
    //TODO CATEGORIES
    async fetchTodoCategories({commit}) {
      try {
        const payload = await httpRequest('get', categoriesApiEndpoint);
        commit('SET_TODO_CATEGORIES', payload);
      } catch (error) {
        console.log(error);
      }
    },
    async addCategory({commit, state}, category) {
      state.loading = true;
      try {
        if (category !== undefined) {
          const capitalizedCategory = category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          const payload = await httpRequest('post', categoriesApiEndpoint, {
            category: capitalizedCategory,
          });
          commit('ADD_CATEGORY', payload);
        }
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
    async editCategory({commit, state}, category) {
      state.loading = true;
      try {
        const payload = await httpRequest('put', `${categoriesApiEndpoint}/${category.categoryid}`, {
          category: category.category,
        })
        commit('EDIT_CATEGORY', payload);
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
    async deleteCategory({commit, state}, category) {
      state.loading = true;
      try {
        const matchedTodos = state.todos.filter(todo => todo.category === category.category);
        await httpRequest('delete', `${categoriesApiEndpoint}/${category.id}`);
        commit('DELETE_CATEGORY', category.id);
        for(const todo of matchedTodos) {
          await httpRequest('delete', `${todoApiEndpoint}/${todo.id}`);
          commit('DELETE_TODO', todo.id);
          console.log('success');
        }
      } catch (error) {
        console.log(error);
      } finally {
        state.loading = false;
      }
    },
  },
  mutations: {
    //TODOS
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SET_TODO_STATUS(state, todo) {
      const index = state.todos.findIndex((item) => item.id === todo.id);
      if (index !== -1) {
        state.todos[index].status = state.todos[index].status === 'Active' ? 'Completed' : 'Active';
      } else throw new Error;
    },
    DELETE_TODO(state, todoId) {
      const index = state.todos.findIndex(todo => todo.id === todoId);
      state.todos.splice(index, 1);
    },
    //TODO CATEGORIES
    SET_TODO_CATEGORIES(state, categories) {
      state.todoCategories = categories;
    },
    ADD_CATEGORY(state, category) {
      state.todoCategories.push(category);
    },
    EDIT_CATEGORY(state, category) {
      const index = state.todoCategories.findIndex((item) => item.id === category.id);
      if(index !== -1) {
        state.todoCategories[index].category = category.category;
      } else throw new Error;
    },
    DELETE_CATEGORY(state, categoryId) {
      const index = state.todoCategories.findIndex(category => category.id === categoryId);
      state.todoCategories.splice(index, 1);
    },
  },
})
