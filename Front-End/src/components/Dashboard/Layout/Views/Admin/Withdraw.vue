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
        <div class="row col-sm-2 ml-auto">
          <p-button type="info" icon @click="modal_add.status = true"><i
            class="nc-icon nc-simple-add"></i></p-button>
          <p-button class="col-sm-5" icon type="info" @click="getData">Refresh</p-button>
          <p-button class="col-sm-4" icon type="info" @click="getData('export')">Export</p-button>
        </div>

      </div>
      <TotalAmount :data="total"/>
      <Withdraw :data="data" :load_data="load_data" @updateStatus="updateStatus" @GetLog="getLog"
                @ResendCallback="ResendCallback"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <div>
      <LogOrder :log.syn="log" @CloseLog="CloseLog"/>
    </div>
    <modal :show.sync="modal_add.status" :title="modal_add.title">
      <AddWithdraw :data.sync="modal_add.form_add" :search="search"/>
      <div slot="footer">
        <p-button type="success" @click.native="addWithdraw">Submit</p-button>
        <p-button type="danger" @click.native="CloseAdd">Cancel</p-button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "AdminWithdrawPage",
  mounted() {
    this.getData()
    this.getCustomer()
    this.getBank()
    this.getBankString()
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
        bank_string: [],
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
    async getLog(id) {
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.withdraw.log, {id}))
      if (Result.data) {
        this.log.modal = true
        this.log.data = Result.data
      }
    },
    async getBank() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.bank))
      if (Result.data) {
        this.search.bank = Result.data
      }
    },
    async getBankString() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.bank_string))
      if (Result.data) {
        this.search.bank_string = Result.data
      }
    },
    async ResendCallback(data) {
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.withdraw.resendcallback, data))
      if (Result.data) {
        this.$notify({
          message: `ResendCallback id: ${Result.data.id}`,
          type: 'success'
        })
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
    async addWithdraw() {
      this.modal_add.loading = true
      this.modal_add.form_add.customer_id = Number(this.modal_add.form_add.customerId)
      this.modal_add.form_add.name = this.modal_add.form_add.name ? this.modal_add.form_add.name : null
      this.modal_add.form_add.account = this.modal_add.form_add.account ? this.modal_add.form_add.account : null
      this.modal_add.form_add.no_fee = this.modal_add.form_add.no_fee ? true : false
      this.modal_add.form_add.no_mdr = this.modal_add.form_add.no_mdr ? true : false
      this.modal_add.form_add.price = Number(this.modal_add.form_add.price)
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.withdraw.add, this.modal_add.form_add))
      if (Result.data) {
        this.$notify({
          message: `Add new withdraw success`,
          type: 'success'
        })
        this.getData()
      }
      this.modal_add.loading = false
      this.CloseAdd()
    },
    async getCustomer() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer))
      this.search.customer = Result.data
    },
    async getAgent() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent))
      this.search.agent = Result.data
    },
    getSearch(){
      this.getTotal()
      this.getData()
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
      if (exportData == "export") {
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
