<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <div>
      <input type="text"
             v-model="value"
             :placeholder="fieldPlaceholder"
             @keydown.enter="submitData"/>
      <button type="submit"
              @click="submitData">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "input-field",
    data() {
      return {
        value: this.inputValue || '',
      }
    },
    props: {
      label: {
        type: String,
        default: 'Add Todo',
      },
      inputValue: {
        type: String,
        default: '',
      },
      fieldPlaceholder: {
        type: String,
        default: 'Add a New Todo'
      },
      buttonText: {
        type: String,
        default: 'Add',
      }
    },
    methods: {
      submitData() {
        this.$emit('click:submit', this.value);
        this.value = '';
      }
    }
  }
</script>

<style scoped lang="scss">
  .input-field {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    padding: 20px 10px;

    label {
      margin-bottom: 2px;
      font-size: 20px;
      margin-left: 4px;
    }

    & > div {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      input {
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 16px;
        border: 2px solid transparent;
        background-color: rgb(228, 228, 228);
        flex-grow: 1;
        width: 70%;

        &:focus {
          background-color: white;
          border: 2px solid black;
          outline: none;
        }
      }

      button {
        flex-basis: 10%;
        border: none;
        cursor: pointer;
        padding: 6px 20px;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
        background-color: rgb(86, 86, 255);
        transition: background-color 0.3s ease-in-out;

        &:hover {
          background-color: rgb(52, 52, 255);
        }
      }
    }
  }
</style>