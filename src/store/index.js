import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        const response = await axios.get(todoApiEndpoint);
        commit('SET_TODOS', response.data);
      } catch (error) {
        console.log(error);
      } 
    },
    async addTodo({commit}, todo) {
      try {
        const capitalizedTodo = todo.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const response = await axios.post(todoApiEndpoint, {
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
        const response = await axios.put(`${todoApiEndpoint}/${todo.id}`, {
          status: todo.status === 'Active' ? 'Completed' : 'Active',
        });
        commit('SET_TODO_STATUS', response.data);
      } catch (error) {
        console.log(error);
      }
    },  
    async editTodo({commit}, todo) {
      try {
        const response = await axios.put(`${todoApiEndpoint}/${todo.todoId}`, {
          todo: todo.newTodo,
        })
        commit('EDIT_TODO', response.data)
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo({commit}, todoId) {
      try {
        await axios.delete(`${todoApiEndpoint}/${todoId}`);
        commit('DELETE_TODO', todoId);
      } catch (error) {
        console.log(error);
      }
    },
    //TODO CATEGORIES
    async fetchTodoCategories({commit}) {
      try {
        const response = await axios.get(categoriesApiEndpoint);
        commit('SET_TODO_CATEGORIES', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async addCategory({commit}, category) {
      try {
        if (category !== undefined) {
          const capitalizedCategory = category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          console.log('2', capitalizedCategory);
          const response = await axios.post(categoriesApiEndpoint, {
            category: capitalizedCategory,
          });
          commit('ADD_CATEGORY', response.data);
        }
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
      console.log(index);
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
  },
})
