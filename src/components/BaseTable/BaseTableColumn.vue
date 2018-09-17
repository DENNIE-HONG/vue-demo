<template>
  <tr>
    <th>{{prop}}</th>
  </tr>
</template>
<script>
export default {
  name: 'BaseTableColumn',
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  }
}
</script>

