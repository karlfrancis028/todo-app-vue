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
        <span>
          <ph-note-pencil :size="22" weight="bold" />
        </span>
      </div>
      <div @click.stop="deleteItem"
           class="data-item__actions__del">
        <span>
          <ph-trash-simple :size="22" weight="bold" />
        </span>
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
  @import "~@/scss/global.scss";

  .data-item {
    @extend %flex-row--center-xy;
    padding: space(s);
    transition: background-color 0.3s ease;
    gap: space(xs);
    margin: space(xs)-2;
    background-color: white;

    &:not(:last-child) {
      margin-bottom: space(xs);
    }

    &.completed {
      text-decoration: line-through;
    }

    &:hover {
      background-color: #f2f2f2;
    }

    &__info {
      @extend %flex-row--center-y;
      gap: space(s);
      flex-grow: 1;
      width: 100px;

      &__todo {

        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: break-word;

          @media only screen and (max-width: 400px) {
            max-width: 130px;
          }
        }
      }
    }

    &__actions {
      @extend %flex-row--center-y;
      gap: space(s);

      &__edit,
      &__del {
        --size: 34px;
        border-radius: 8px;
        height: var(--size);
        width: fit-content;
        padding: space(xs)-2;
        border-radius: 8px;
        color: white;

        svg {
          --size: 20px;
          height: var(--size);
          width: var(--size);

          @media only screen and (max-width: 400px) {
            --size: 16px;
          }
        }

        @media only screen and (max-width: 400px) {
          --size: 32px;
        }
      }

      &__edit {
        background-color: color(primary);

        &:hover {
          background-color: color(primary-hover);
        }
      }

      &__del {
        background-color: color(warning);

        &:hover {
          background-color: color(warning-hover);
        }
      }
    }
  }
</style>