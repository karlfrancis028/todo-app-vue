<template>
  <table class="data-table">
    <thead class="data-table__header">
      <tr class="data-table__header__row">
        <th v-for="(label, index) in dataLabels"
            :key="index"
            class="data-table__header__col">
          <p>{{ label }}</p>
        </th>
      </tr>
    </thead>
    <tbody class="data-table__item">
      <tr v-for="data in dataSet"
          :key="data.id"
          class="data-table__item__row">
        <td class="data-table__item__col">
          <p>{{ data.id }}</p>
        </td>
        <td class="data-table__item__col">
          <p>{{ data.todo }}</p>
        </td>
        <td class="data-table__item__col">
          <p>{{ data.status }}</p>
        </td>
        <td class="data-table__item__col--view">
          <p>
            <ph-magnifying-glass :size="24" weight="bold" />
          </p>
        </td>
        <td class="data-table__item__col--edit">
          <p>
            <ph-note-pencil :size="24" weight="bold" />
          </p>
        </td>
        <td class="data-table__item__col--del">
          <p>
            <ph-trash-simple :size="24" weight="bold" />
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { PhMagnifyingGlass, PhNotePencil, PhTrashSimple } from 'phosphor-vue';
  export default {
    name: "data-table",
    props: {
      dataLabels: {
        type: Array,
        default: () => [],
      },
      dataSet: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      viewItem(item) {
        console.log(item);
      },
      editItem(item) {
        console.log(item);
      },
      deleteItem(item) {
        console.log(item);
      },
    },
    components: {
      PhMagnifyingGlass,
      PhNotePencil,
      PhTrashSimple,
    }
  }
</script>

<style lang="scss" scoped>
  .data-table {
    width: 100%;

    &__header {

      &__col {
        text-align: left;
      }
    }

    &__item {

      &__row {
        
      }

      &__col {

        &--view,
        &--edit,
        &--del {

          & > p {
            height: 34px;
            width: fit-content;
            padding: 6px;
            border-radius: 8px;
            background-color: gray;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
              background-color: rgb(92, 92, 92);
            }
          }
        }
      }
    }

  }
</style>