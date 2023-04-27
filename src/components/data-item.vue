<template>
  <div class="data-item">
    <div class="data-item__id">
      <b>{{ data.id }}</b>
    </div>
    <div class="data-item__todo">
      <p>{{ data.todo }}</p>
    </div>
    <div class="data-item__status">
      <p>{{ data.status }}</p>
    </div>
    <div class="data-item__actions">
      <div @click="viewDataItem" class="data-item__actions__view">
        <ph-magnifying-glass :size="24" weight="bold"/>
      </div>
      <div @click="editDataItem" class="data-item__actions__edit">
        <ph-note-pencil :size="24" weight="bold"/>
      </div>
      <div @click="deleteDataItem" class="data-item__actions__delete">
        <ph-trash-simple :size="24" weight="bold"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { PhMagnifyingGlass, PhNotePencil, PhTrashSimple } from 'phosphor-vue';
  export default {
    name: "data-item",
    props: {
      data: {
        type: Object,
        default: () => {}
      },
    },
    components: {
      PhMagnifyingGlass,
      PhNotePencil,
      PhTrashSimple,
    },
    methods: {
      viewDataItem() {
        this.$emit("view-item");
      },
      editDataItem() {
        this.$emit("edit-item");
      },
      deleteDataItem() {
        this.$emit("delete-item");
      },
    }
  }
</script>

<style scoped lang="scss">
  .data-item {
    display: flex;
    align-items: center;
    
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    
    &__id {
      flex-basis: 40px;
    }

    &__todo {
      flex-grow: 1;
    }

    &__status {
      flex-basis: 200px;
      
      & > p {
        margin: 0 auto;
        border-radius: 120px;
        width: fit-content;
        font-size: 0.8rem;
        padding: 2px 6px;
        border: 2px solid gray;
      }
    }

    &__actions {
      flex-basis: 140px;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__view,
      &__edit,
      &__delete {
        height: 34px;
        color: white;
        padding: 4px;
        border-radius: 6px;
        cursor: pointer;
        background-color: gray;

        &:hover {
          background-color: rgb(91, 91, 91);
        }
      }

      // &__view {
      //   background-color: blue;
      // }

      // &__edit {
      //   background-color: green;
      // }

      // &__delete {
      //   background-color: red;
      // }
    }
  }
</style>