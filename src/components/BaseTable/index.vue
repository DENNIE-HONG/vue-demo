<template>
  <div class="com-table">
    <table class="com-table-box">
      <thead>
        <tr>
          <template
            v-for="(item, index) in headers">
            <th
              v-if="item.label"
              :key="item.prop + index">{{item.label}}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
        <tr v-for="row in list">
          <td v-for="val in headers">{{row[val.prop].toString()}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'BaseTable',
  props: {
    list: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      headers: []
    }
  },
  mounted () {
    this.getHeaders();
  },
  methods: {
    getHeaders () {
      this.$children.map((child) => {
        const data = {
          label: child.label,
          prop: child.prop
        };
        this.headers.push(data);
      });
    }
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
