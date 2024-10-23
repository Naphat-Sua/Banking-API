<template>
  <div class="row" v-if="dataDash && dataDash.length > 0">
    <div
      v-for="(item, i) in dataDash"
      :key="`dash_${i}`"
      :class="`${!!dclass ? dclass : 'col-sm-12 col-md-4'}`"
    >
      <stats-card
        :type="item.type"
        :title="
          item.title
            ? new Number(parseFloat(item.title).toFixed(2)).toLocaleString()
            : '0'
        "
        :small-title="item.smalltitle"
        :icon="item.icon"
      >
        <template v-if="item.smalltitle == 'Total Withdraw'" slot="footer">
          <div>*Include Settlement</div>
        </template>
        <template v-if="item.smalltitle == 'Balance'" slot="footer">
          <div>*Last update {{ convertDate }}</div>
        </template>
      </stats-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSum",
  props: ["dataDash", "dclass", "lastUpdate"],
  computed: {
    convertDate() {
      return this.$moment(this.lastUpdate).format('YYYY-MM-DD HH:mm:ss')
    }
  }
};
</script>

<style lang="scss">
.card-stats .card-body .numbers {
  font-size: 1.5em;
}

.card-footer {
  div {
    font-size: small;
    margin-top: -15px;
    margin-bottom: -5px;
  }
}

.col-md-2dot5 {
  -ms-flex: 0 0 20%;
  flex: 0 0 20%;
  max-width: 20%;
}
</style>
