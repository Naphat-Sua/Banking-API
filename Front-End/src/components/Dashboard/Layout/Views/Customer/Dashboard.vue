<template>
  <div>
    <div class="row">
      <div class="col-12">
        BankTransfer(TH)
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12" v-for="stats in statsCards">
            <stats-card :type="stats.type"
                        :icon="stats.icon"
                        :small-title="stats.title"
                        :title="stats.value">
              <div class="stats" slot="footer">
                <i :class="stats.footerIcon"></i>
                {{ stats.footerText }}
              </div>
            </stats-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        FPX
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-12" v-for="stats in statsCardsMc">
            <stats-card :type="stats.type"
                        :icon="stats.icon"
                        :small-title="stats.title"
                        :title="stats.value">
              <div class="stats" slot="footer">
                <i :class="stats.footerIcon"></i>
                {{ stats.footerText }}
              </div>
            </stats-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  beforeMount() {
    this.getData()
    this.getMcpayment()
  },
  data() {
    return {
      statsCards: [
        {
          type: 'success',
          icon: 'fi flaticon-deposit',
          title: 'Total Deposit',
          value: '0.00',
          footerText: '',
          footerIcon: ''
        },
        {
          type: 'danger',
          icon: 'fi flaticon-withdrawal',
          title: 'Total Withdraw',
          value: '0.00',
          footerText: '*Include settlement',
          footerIcon: ''
        },
        {
          type: 'warning',
          icon: 'fi flaticon-taxes',
          title: 'Total MDR',
          value: '0.00',
          footerText: '*Include fee',
          footerIcon: ''
        },
        {
          type: 'info',
          icon: 'fi flaticon-money-bag',
          title: 'Balance',
          value: '0.00',
          footerText: '*Last update',
          footerIcon: ''
        },
      ],
      statsCardsMc: [
        {
          type: 'success',
          icon: 'fi flaticon-deposit',
          title: 'Total Deposit',
          value: '0.00',
          footerText: '',
          footerIcon: ''
        },
        {
          type: 'danger',
          icon: 'fi flaticon-withdrawal',
          title: 'Total Withdraw',
          value: '0.00',
          footerText: '*Include settlement',
          footerIcon: ''
        },
        {
          type: 'warning',
          icon: 'fi flaticon-taxes',
          title: 'Total MDR',
          value: '0.00',
          footerText: '*Include fee',
          footerIcon: ''
        },
        {
          type: 'info',
          icon: 'fi flaticon-money-bag',
          title: 'Balance',
          value: '0.00',
          footerText: '*Last update',
          footerIcon: ''
        },
      ],
    }
  },
  methods: {
    async getData() {
      const rawdata = await this.$callapi.callAPIHandler(this.axios.get(this.$api.dashboard.total))
      if (rawdata.data) {
        this.statsCards[0].value = !isNaN(Number(rawdata.data.total_deposit)) ? Number(rawdata.data.total_deposit).toFixed(2) : "0.00"
        this.statsCards[1].value = !isNaN(Number(rawdata.data.total_withdraw)) ? Number(rawdata.data.total_withdraw).toFixed(2) : "0.00"
        this.statsCards[2].value = !isNaN(Number(rawdata.data.total_mdr + rawdata.data.total_fee)) ? Number(rawdata.data.total_mdr + rawdata.data.total_fee).toFixed(2) : "0.00"
        this.statsCards[3].value = !isNaN(Number(rawdata.data.balance)) ? Number(rawdata.data.balance).toFixed(2) : "0.00"
        this.statsCards[3].footerText = this.$moment(rawdata.data.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    async getMcpayment() {
      const rawdata = await this.$callapi.callAPIHandler(this.axios.get(this.$api.mcpayment_dashboard.total))
      if (rawdata.data) {
        this.statsCardsMc[0].value = ''
        this.statsCardsMc[1].value = ''
        this.statsCardsMc[2].value = ''
        this.statsCardsMc[3].value = ''
        for (const x of rawdata.data) {
          this.statsCardsMc[0].value += `${new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: x.currency
          }).format(x.deposit)}\n`
          this.statsCardsMc[1].value += `${new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: x.currency
          }).format(x.withdraw)}\n`
          this.statsCardsMc[2].value += `${new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: x.currency
          }).format(x.mdr)}\n`
          this.statsCardsMc[3].value += `${new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: x.currency
          }).format(x.balance)}\n`
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
