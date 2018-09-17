<template>
  <div class="com-table">
    <table
      class="com-table-box">
      <thead>
        <tr>
          <th v-for="item in headers">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <div v-show="false"><slot v-show="false"></slot></div>
        <tr v-for="row in data">
          <td v-for="item in headers">{{row[item.prop]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'BaseTable',
  props: {
    data: {
      required: true
    }
  },
  data () {
    return {
      headers: []
    }
  },
  mounted () {
    this.$children.map((child) => {
      console.log(child);
      const data = {
        label: child.label,
        prop: child.prop
      };
      this.headers.push(data);
    })
  }
}
</script>
<style lang="scss">
.com-table {
  &-box {
    width: 100%;
    border-collapse: collapse;
    color: nth($fblack, 2);
    td,
    tr,
    th {
      border: 1px solid nth($fgray, 5);
      font-weight: normal;
    }
  }
}
</style>

