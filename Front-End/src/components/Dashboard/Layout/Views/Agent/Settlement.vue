<template>
  <div>
    <card>
      <div slot="header">
        <h4>Search Settlement</h4>
      </div>
      <SearchWithdraw :search.sync="search"/>
      <div slot="footer">
        <p-button @click="getSearch" type="primary">Search</p-button>
        <p-button @click="ResetSearch" type="danger">Reset</p-button>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Settlement</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <div class="row col-sm-2 ml-auto">
          <p-button class="col-sm-5" icon type="info" @click="getData">Refresh</p-button>
           <p-button class="col-sm-4" icon type="info" @click="getData('export')">Export</p-button>
        </div>

      </div>
      <TotalAmount :data="total"/>
      <Withdraw :data.sync="data" :load_data="load_data"/>
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
    name: "CustomerSettlementPage",
    mounted() {
      this.getData()
      this.getCustomer()
      this.getTotal()
    },
    data() {
      return {
        data: [],
        modal_add: {
          status: false,
          title: 'Add Settlement',
          form_add: {
            customerId: null,
            to_banking: null,
            orderid: '',
            price: 0,
            account: '',
            name: ''
          },
        },
        total: {
          totalAmount: 0,
          totalMdr: 0,
          totalNetamount: 0,
          status: false
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
            customer: null,
            status: null,
            price: null,
            orderid: '',
            create: [],
            update: []
          },
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
      async getCustomer() {
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer))
        this.search.customer = Result.data
      },
      async getTotal() {
        this.total.status = true
        const queryString = {}
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
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.settlement.total, {params: queryString}))
        if (Result.data) {
          this.total.totalAmount = Result.data.total_amount
          this.total.totalMdr = Result.data.total_mdr
          this.total.totalNetamount = Result.data.total_netamount
        }
        this.total.status = false
      },
      getSearch(){
        this.getData()
        this.getTotal()
      },
      async getData(exportData) {
        this.load_data = true
        const queryString = {
          rows: this.perPage,
          page: this.page
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
          const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.settlement.export, {params: queryString}))
          if (Result.data) {
            this.$notify({
              message: `Export Settlement ID ${Result.data.id}`,
              type: 'info'
            })
          }
        } else {
          const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.settlement.get, {params: queryString}))
          if (Result.data) {
            this.data = Result.data.data
            this.totalRows = Result.data.count
          }
        }

        this.load_data = false
      },
      ResetSearch() {
        this.search.query = {
          customer: '',
          account: '',
          status: null,
          price: null,
          create: [],
          update: []
        }
        this.getData()
        this.getTotal()
      },
      CloseLog() {
        this.log.data = []
        this.log.modal = false
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
