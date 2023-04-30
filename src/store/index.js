import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiEndpoint = 'https://63e618ca83c0e85a868c9732.mockapi.io/tasks';

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    getSortedTodos: (state) => {
      const sortById = state.todos.sort((a, b) => a.id - b.id);
      
      return sortById.sort((a, b) => {
        return a.status === 'Active' && b.status === 'Completed' ? -1 :
               a.status === 'Completed' && b.status === 'Active' ? 1 : 0;
      });
    },
  },
  actions: {
    async fetchTodos({commit}) {
      try {
        const response = await axios.get(apiEndpoint);
        commit('SET_TODOS', response.data);
      } catch (error) {
        console.log(error);
      } 
    },
    async addTodo({commit}, todo) {
      try {
        const capitalizedTodo = todo.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const response = await axios.post(apiEndpoint, {
          todo: capitalizedTodo,
          status: 'Active',
        });
        commit('ADD_TODO', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async setTodoStatus({commit}, todo) {
      try {
        const response = await axios.put(`${apiEndpoint}/${todo.id}`, {
          status: todo.status === 'Active' ? 'Completed' : 'Active',
        });
        commit('SET_TODO_STATUS', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo({commit}, todoId) {
      try {
        await axios.delete(`${apiEndpoint}/${todoId}`);
        commit('DELETE_TODO', todoId);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    SET_TODO_STATUS(state, todo) {
      const index = state.todos.findIndex((item) => item.id === todo.id);
      if (index !== -1) {
        Vue.set(state.todos[index],
                'status',
                state.todos[index].status === 'Active' ? 'Completed' : 'Active');
      } else console.log('No such item');
    },
    DELETE_TODO(state, todoId) {
      const index = state.todos.findIndex(todo => todo.id === todoId);
      state.todos.splice(index, 1);
    },
  },
})
