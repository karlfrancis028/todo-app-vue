<template>
  <card @click="viewItem(data)"
        class="data-item"
        :class="{'completed' : isTaskCompleted(data.status) }">
    <div class="data-item__info">
      <div class="data-item__info__status">
        <checkbox :status="data.status" 
                  @click="toggleItemStatus({id: data.id, status: data.status})"/>
      </div>
      <div class="data-item__info__todo">
        <p>{{ data.todo }}</p>
      </div>
    </div>
    <div class="data-item__actions">
      <div @click.stop="editItem"
           class="data-item__actions__edit">
        <p>
          <ph-note-pencil :size="22" weight="bold" />
        </p>
      </div>
      <div @click.stop="deleteItem"
           class="data-item__actions__del">
        <p>
          <ph-trash-simple :size="22" weight="bold" />
        </p>
      </div>
    </div>
  </card>
</template>

<script>
  import { PhMagnifyingGlass, PhNotePencil, PhTrashSimple } from 'phosphor-vue';
  import { mapActions } from 'vuex';

  export default {
    name: "data-item",
    props: {
      data: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      ...mapActions({
        setTodoStatus: 'setTodoStatus',
      }),
      viewItem() {
        this.$emit('click:view-item');
      },
      editItem() {
        this.$emit('click:edit-item');
      },
      deleteItem() {
        this.$emit('click:delete-item');
      },
      statusColorHandler(status) {
        return status === 'Completed' ? 'borderColor: rgb(50, 194, 50)' : 'borderColor: rgb(86, 86, 255)'
      },
      toggleItemStatus(item) {
        this.setTodoStatus(item);
      },
      isTaskCompleted(status) {
        return status === 'Completed';
      }
    },
    components: {
      PhMagnifyingGlass,
      PhNotePencil,
      PhTrashSimple,
    }
  }
</script>

<style lang="scss" scoped>
  .data-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    gap: 8px;

    &.completed {
      opacity: 0.7;
      text-decoration: line-through;
    }

    &:hover {
      background-color: #f2f2f2;
    }

    &__info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-grow: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: break-word;

      &__todo {
        flex: 1;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 6px;

      &__edit,
      &__del {
        border-radius: 8px;
        height: 34px;
        width: fit-content;
        padding: 6px;
        border-radius: 8px;
        color: white;
      }

      &__edit {
        background-color: rgb(86, 86, 255);

        &:hover {
          background-color: rgb(68, 68, 255);
        }
      }

      &__del {
        background-color: #fd5b5b;

        &:hover {
          background-color: #f93838;
        }
      }
    }
  }
</style>