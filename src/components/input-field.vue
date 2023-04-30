<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <div class="input-field__body">
      <input type="text"
             v-model="value"
             :placeholder="fieldPlaceholder"
             @keydown.enter="submitData"/>
      <div v-if="!forEditing"
           class="input-field__body--add">
        <button type="submit"
                @click="submitData">
          {{ buttonText }}
        </button>
      </div>
      <div v-else
           class="input-field__body--edit">
        <button type="submit"
                @click="submitData">
          Edit
        </button>
        <button type="button"
                @click="closeModal">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "input-field",
    data() {
      return {
        value: '',
      }
    },
    props: {
      label: {
        type: String,
        default: 'Add Todo',
      },
      fieldPlaceholder: {
        type: String,
        default: 'Add a New Todo'
      },
      buttonText: {
        type: String,
        default: 'Add',
      },
      showButton: {
        type: Boolean,
        default: true,
      },
      forEditing: {
        type: Boolean,
        default: false,
      },
      initialValue: {
        type: String,
        default: '',
      },
    },
    created() {
      if (this.forEditing) {
        this.value = this.initialValue;
      }
    },
    methods: {
      submitData() {
        this.$emit('click:submit', this.value);
        this.value = '';
      },
      closeModal() {
        this.$modal.close();
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

    label {
      margin-bottom: 2px;
      font-size: 20px;
      margin-left: 4px;
    }

    &__body {
      display: flex;
      align-items: center;
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

      &--add {

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

      &--edit {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 10px;

        button {
          padding: 6px 20px;
          width: 100px;
          border: none;
          font-size: 16px;
          border-radius: 4px;
          color: #fff;
          transition: background-color 0.3s ease-in-out;

          &[type="submit"] {
            background-color: rgba(86, 86, 255);

            &:hover {
              background-color: rgb(52, 52, 255);
            }
          }

          &[type="button"] {
            background-color: #fd5b5b;

            &:hover {
              background-color: #f93838;
            }
          }
        }
      }
    }
  }
</style>