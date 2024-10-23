<template>
  <div>
    <card>
      <div slot="header">
        <h4>Search Withdraw</h4>
      </div>
      <SearchWithdraw :search.sync="search"/>
      <div slot="footer">
        <p-button @click="getSearch" type="primary">Search</p-button>
        <p-button @click="ResetSearch" type="danger">Reset</p-button>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Withdraw</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <p-button type="info" icon class="col-sm-1 ml-auto" @click="getData">Refresh</p-button>
        <p-button type="info" icon class="col-sm-1" @click="getData('export')">Export</p-button>
      </div>
      <TotalAmount :data="total"/>
      <Withdraw :data="data" :load_data="load_data" @updateStatus="updateStatus"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  name: "OperationWithdrawPage",
  mounted() {
    this.getData()
    this.getCustomer()
    this.getBank()
    this.getAgent()
    this.getTotal()
  },
  sockets: {
    update_withdraw(data) {
      const findIndex = this.data.findIndex(value => value.id === data.id)
      if (findIndex >= 0) {
        this.data[findIndex].status = data.status
        this.data[findIndex].price = data.price
        this.data[findIndex].mdr = data.mdr
        this.data[findIndex].updatedAt = data.updatedAt
      }
    }
  },
  data() {
    return {
      data: [],
      total: {
        totalAmount: 0,
        totalMdr: 0,
        totalNetamount: 0,
        status: false
      },
      modal_add: {
        title: 'Add Withdraw',
        status: false,
        form_add: {
          customerId: null,
          to_banking: null,
          orderid: '',
          price: 0,
          account: '',
          name: ''
        },
      },
      load_data: false,
      totalRows: 1000,
      perPage: 20,
      page: 1,
      log: {
        modal: false,
        data: []
      },
      search: {
        query: {
          agent: null,
          customer: null,
          status: null,
          price: null,
          orderid: '',
          create: [],
          update: []
        },
        agent: [],
        customer: [],
        account: [],
        bank: [],
        status: [
          {
            value: 'success', label: 'Success'
          },
          {
            value: 'wait', label: 'Wait'
          },
          {
            value: 'edit', label: 'Edit'
          },
          {
            value: 'cancel', label: 'Cancel'
          }
        ]
      }
    }
  },
  methods: {
    getSearch() {
      this.getData()
      this.getTotal()
    },
    async getBank() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.bank))
      if (Result.data) {
        this.search.bank = Result.data
      }
    },
    async updateStatus(data) {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.withdraw.update, data))
      if (Result.data) {
        this.$notify({
          message: `Update id: ${data.id} , status: ${data.status}`,
          type: 'success'
        })
        this.getData()
      }
    },
    async getCustomer() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer))
      this.search.customer = Result.data
    },
    async getAgent() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent))
      this.search.agent = Result.data
    },
    async getData(exportData) {
      this.load_data = true
      const queryString = {
        rows: this.perPage,
        page: this.page
      }
      if (this.search.query.agent) {
        queryString.agentId = this.search.query.agent
      }
      if (this.search.query.customer) {
        queryString.customerId = this.search.query.customer
      }
      if (this.search.query.status) {
        queryString.status = this.search.query.status
      }
      if (this.search.query.orderid) {
        queryString.orderid = this.search.query.orderid
      }
      if (this.search.query.price) {
        queryString.price = this.search.query.price
      }
      if (this.search.query.create && this.search.query.create.length === 2) {
        queryString.from_create = this.$moment(this.search.query.create[0]).format('YYYY-MM-DD')
        queryString.to_create = this.$moment(this.search.query.create[1]).format('YYYY-MM-DD')
      }
      if (this.search.query.update && this.search.query.update.length === 2) {
        queryString.from_update = this.$moment(this.search.query.update[0]).format('YYYY-MM-DD')
        queryString.to_update = this.$moment(this.search.query.update[1]).format('YYYY-MM-DD')
      }

      if (exportData == 'export') {

        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.withdraw.export, {params: queryString}))
        if (Result.data) {
          this.$notify({
            message: `Export Withdraw ID ${Result.data.id}`,
            type: 'info'
          })
        }

      } else {

        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.withdraw.get, {params: queryString}))
        if (Result.data) {
          this.data = Result.data.data
          this.totalRows = Result.data.count
        }

      }
      this.load_data = false
    },
    async getTotal() {
      this.total.status = true
      const queryString = {}
      if (this.search.query.agent) {
        queryString.agentId = this.search.query.agent
      }
      if (this.search.query.customer) {
        queryString.customerId = this.search.query.customer
      }
      if (this.search.query.status) {
        queryString.status = this.search.query.status
      }
      if (this.search.query.orderid) {
        queryString.orderid = this.search.query.orderid
      }
      if (this.search.query.price) {
        queryString.price = this.search.query.price
      }
      if (this.search.query.create && this.search.query.create.length === 2) {
        queryString.from_create = this.$moment(this.search.query.create[0]).format('YYYY-MM-DD')
        queryString.to_create = this.$moment(this.search.query.create[1]).format('YYYY-MM-DD')
      }
      if (this.search.query.update && this.search.query.update.length === 2) {
        queryString.from_update = this.$moment(this.search.query.update[0]).format('YYYY-MM-DD')
        queryString.to_update = this.$moment(this.search.query.update[1]).format('YYYY-MM-DD')
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.withdraw.total, {params: queryString}))
      if (Result.data) {
        this.total.totalAmount = Result.data.total_amount
        this.total.totalMdr = Result.data.total_mdr
        this.total.totalNetamount = Result.data.total_netamount
      }
      this.total.status = false
    },
    ResetSearch() {
      this.search.query = {
        agent: null,
        customer: '',
        account: '',
        status: null,
        price: null,
        create: [],
        update: []
      }
      this.getTotal()
      this.getData()
    },
    CloseLog() {
      this.log.data = []
      this.log.modal = false
    },
    CloseAdd() {
      this.modal_add.status = false
      this.modal_add.form_add = {
        customerId: null,
        to_banking: null,
        orderid: '',
        price: 0,
        account: '',
        name: ''
      }
    }
  },
  watch: {
    page(New) {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
