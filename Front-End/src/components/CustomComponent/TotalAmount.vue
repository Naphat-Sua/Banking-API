<template>
  <div class="row">
    <stats-card
      v-loading="data.status"
      class="col-sm-12 col-md-4"
      type="info"
      :title="covertData.totalAmount"
      small-title="Total Amount"
      icon="fi flaticon-budget">
    </stats-card>
    <stats-card
      v-loading="data.status"
      class="col-sm-12 col-md-4"
      type="danger"
      :title="covertData.totalMdr"
      small-title="Total MDR"
      icon="fi flaticon-taxes">
    </stats-card>
    <stats-card
      v-loading="data.status"
      class="col-sm-12 col-md-4"
      type="primary"
      :title="covertData.totalNetamount"
      small-title="Total Netamount"
      icon="fi flaticon-deposit-1">
    </stats-card>
  </div>
</template>

<script>
  export default {
    name: "TotalAmount",
    props: ['data'],
    computed: {
      covertData() {
        return {
          totalAmount: this.data.totalAmount ? Number(this.data.totalAmount.toFixed(2)).toLocaleString() : '0',
          totalMdr: this.data.totalMdr ? Number(this.data.totalMdr.toFixed(2)).toLocaleString() : '0',
          totalNetamount: this.data.totalNetamount ? Number(this.data.totalNetamount.toFixed(2)).toLocaleString() : '0'
        }
      }
    }
  }
</script>

<style scoped>

</style>
