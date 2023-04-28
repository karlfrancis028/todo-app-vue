<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="(label, index) in dataLabels"
            :key="index">
          <p>{{ label }}</p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in dataSet"
          :key="data.id">
        <td>
          <p>{{ data.id }}</p>
        </td>
        <td>
          <p>{{ data.todo }}</p>
        </td>
        <td>
          <p>{{ data.status }}</p>
        </td>
        <td>
          <p>
            <ph-magnifying-glass :size="32" weight="bold" />
          </p>
        </td>
        <td>
          <p>
            <ph-note-pencil :size="32" weight="bold" />
          </p>
        </td>
        <td>
          <p>
            <ph-trash-simple :size="32" weight="bold" />
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
      viewData(data) {
        console.log(data);
      },
      editData(data) {
        console.log(data);
      },
      deleteData(data) {
        console.log(data);
      },
    },
    components: {
      PhMagnifyingGlass,
      PhNotePencil,
      PhTrashSimple,
    }
  }
</script>

<style>

</style>