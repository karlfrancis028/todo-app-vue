import Vue from 'vue'
import Vuex from 'vuex'
import { httpRequest } from '@/services';

Vue.use(Vuex)

const todoApiEndpoint = 'https://63e618ca83c0e85a868c9732.mockapi.io/tasks';
const categoriesApiEndpoint = 'https://644f87f0b61a9f0c4d24c4d8.mockapi.io/todo-categories';

export default new Vuex.Store({
  state: {
    todos: [],
    todoCategories: [],
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
    async addTodo({commit}, todo) {
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
      }
    },
    async setTodoStatus({commit}, todo) {
      try {
        const payload = await httpRequest('put', `${todoApiEndpoint}/${todo.id}`, {
          status: todo.status === 'Active' ? 'Completed' : 'Active',
        });
        commit('SET_TODO_STATUS', payload);
      } catch (error) {
        console.log(error);
      }
    },  
    async editTodo({commit}, todo) {
      try {
        const payload = await httpRequest('put', `${todoApiEndpoint}/${todo.todoId}`, {
          todo: todo.newTodo,
        })
        commit('EDIT_TODO', payload)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo({commit}, todoId) {
      try {
        await httpRequest('delete', `${todoApiEndpoint}/${todoId}`);
        commit('DELETE_TODO', todoId);
      } catch (error) {
        console.log(error);
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
    async addCategory({commit}, category) {
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
      }
    },
    async deleteCategory({commit}, categoryId) {
      try {
        await httpRequest('delete', `${categoriesApiEndpoint}/${categoryId}`);
        commit('DELETE_CATEGORY', categoryId);
      } catch (error) {
        console.log(error);
      }
    }
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
    EDIT_TODO(state, todo) {
      const index = state.todos.findIndex((item) => item.id === todo.id);
      if(index !== -1) {
        state.todos[index].todo = todo.todo;
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
    DELETE_CATEGORY(state, categoryId) {
      const index = state.todoCategories.findIndex(category => category.id === categoryId);
      state.todoCategories.splice(index, 1);
    }
  },
})
