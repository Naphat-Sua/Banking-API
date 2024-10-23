<template>
  <div class="row" v-loading="loading">
    <stats-card
      class="col-sm-12 col-md-3"
      type="info"
      :title="covertData.deposit"
      small-title="Total Deposit"
      icon="fi flaticon-budget">
    </stats-card>
    <stats-card
      class="col-sm-12 col-md-3"
      type="danger"
      :title="covertData.withdraw"
      small-title="Total Withdraw"
      icon="fi flaticon-withdrawal">
    </stats-card>
    <stats-card
      class="col-sm-12 col-md-3"
      type="primary"
      :title="covertData.settlement"
      small-title="Total Settlement"
      icon="fi flaticon-deposit-1">
    </stats-card>
    <stats-card
      class="col-sm-12 col-md-3"
      type="default"
      :title="covertData.mdr"
      small-title="Total MDR"
      icon="fi flaticon-taxes">
    </stats-card>
  </div>
</template>

<script>
export default {
  name: "TotalBoxReport",
  props: ['data','loading'],
  computed: {
    covertData(){
      return {
        deposit: this.data.deposit ? this.data.deposit.toFixed(2) : '0.00',
        withdraw: this.data.withdraw ? this.data.withdraw.toFixed(2) : '0.00',
        settlement: this.data.settlement ? this.data.settlement.toFixed(2) : '0.00',
        mdr: this.data.mdr ? this.data.mdr.toFixed(2) : '0.00'
      }
    }
  }
}
</script>

<style scoped>

</style>
