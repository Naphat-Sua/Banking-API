<template>
  <div>
    <card>
      <div slot="header">
        <h4>Search Deposit</h4>
      </div>

      <SearchDeposit :search.sync="search"/>

      <div slot="footer">
        <p-button @click="GetSearch" type="primary">Search</p-button>
        <p-button @click="ResetSearch" type="danger">Reset</p-button>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Deposit</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <!--        <p-button type="info" icon class="col-sm-1 ml-auto"><i class="nc-icon nc-simple-add"></i></p-button>-->
        <div class="col-sm-1 ml-auto">
          <p-button type="info" icon class="col-sm-1 ml-auto" @click="getData">Refresh</p-button>
          <p-button type="info" icon class="col-sm-1" @click="getData('export')">Export</p-button>
        </div>
      </div>
      <TotalAmount :data="total"/>
      <Deposit :data.sync="data" :load_data="load_data" @updateStatus="updateStatus"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <modal :show.sync="boxconfirm.show">
      <div slot="header" class="title title-up">Confirm Price</div>
      <fg-input placeholder="0" type="number" v-model="boxconfirm.price"></fg-input>
      <template slot="footer">
        <p-button type="success" @click.native="submitBoxConfirm">Submit</p-button>
        <p-button type="danger" @click.native="resetBoxConfirm">Close</p-button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  name: "OperationDepositPage",
  mounted() {
    this.getData()
    this.getCustomer()
    this.getAccountBank()
    this.getAgent()
    this.getTotal()
  },
  sockets: {
    update_deposit(data){
      const findIndex = this.data.findIndex(value => value.id === data.id)
      if(findIndex >= 0){
        this.data[findIndex] = data
      }
    }
  },
  data() {
    return {
      boxconfirm: {
        show: false,
        id: null,
        price: 0,
        data: null
      },
      modal: {
        status: false,
        title: '',
      },
      log: {
        modal: false,
        data: []
      },
      total: {
        totalAmount: 0,
        totalMdr: 0,
        totalNetamount: 0,
        status: false
      },
      totalRows: 1000,
      perPage: 20,
      page: 1,
      data: [],
      load_data: true,
      search: {
        query: {
          customer: null,
          account: null,
          status: null,
          price: null,
          orderid: '',
          create: [],
          update: []
        },
        customer: [],
        account: [],
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
            value: 'refund', label: 'Refund'
          },
          {
            value: 'cancel', label: 'Cancel'
          }
        ]
      }
    }
  },
  methods: {
    async getCustomer() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer))
      this.search.customer = Result.data
    },
    async getAgent() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent))
      this.search.agent = Result.data
    },
    async getAccountBank() {
      const queryString = {}
      if (this.search.query.customer) {
        queryString.customerId = this.search.query.customer
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.account, {params: queryString}))
      this.search.account = Result.data
    },
    GetSearch() {
      this.getData()
      this.getTotal()
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
      if (this.search.query.account) {
        queryString.accountId = this.search.query.account
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

        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.deposit.export, {params: queryString}))
        if (Result.data) {
          this.$notify({
            message: `Export Deposit ID ${Result.data.idd}`,
            type: 'info'
          })
        }

      } else {

        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.deposit.get, {params: queryString}))
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
      if (this.search.query.account) {
        queryString.accountId = this.search.query.account
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
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.deposit.total, {params: queryString}))
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
    updateStatus(data) {
      const findIndex = this.data.findIndex(value => data.id === value.id)
      if (data.status === 'success' && findIndex >= 0 && this.data[findIndex].customer.id === 6 && this.$env === 'shop2pay') {
        this.boxconfirm.show = true
        this.boxconfirm.data = data
        this.boxconfirm.id = data.id
      } else if (findIndex < 0) {
        this.$swal.fire('Error', 'Not have order id', 'error')
      } else {
        this.sendUpdateStatus(data)
      }
    },
    submitBoxConfirm() {
      const findIndex = this.data.findIndex(value => this.boxconfirm.id === value.id)
      const price = this.data[findIndex].price
      if (Number(price.replace(/,/g, '')).toFixed(2) === this.boxconfirm.price) {
        this.sendUpdateStatus(this.boxconfirm.data)
        this.boxconfirm.show = false
        this.boxconfirm.data = null
        this.boxconfirm.id = null
        this.boxconfirm.price = 0
      } else {
        this.$swal.fire('Error', 'Price do not match.', 'error')
      }
    },
    resetBoxConfirm() {
      this.boxconfirm.show = false
      this.boxconfirm.data = null
      this.boxconfirm.price = 0
      this.boxconfirm.id = null
    },
    async sendUpdateStatus(data) {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.deposit.update, data))
      if (Result.data) {
        this.$notify({
          message: `Update id: ${data.id} , status: ${data.status}`,
          type: 'success'
        })
        this.getData()
      }
    }
  },
  watch: {
    page(New) {
      this.getData()
    },
    'search.query.customer'(New) {
      this.getAccountBank()
    }
  }
}
</script>

<style scoped>

</style>
