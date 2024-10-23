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
        <div class="row col-sm-2 ml-auto">
          <p-button type="info" icon @click="modal_add.show = true"><i
            class="nc-icon nc-simple-add"></i></p-button>
          <p-button type="info" icon class="col-sm-5" @click="getData">Refresh</p-button>
          <p-button type="info" icon class="col-sm-4" @click="getData('export')">Export</p-button>
        </div>
      </div>
      <TotalAmount :data="total"/>
      <Deposit :data.sync="data" :load_data="load_data"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <div>
      <modal :show.sync="modal_add.show" headerClasses="justify-content-center" @close="closeModalAdd">
        <h4 slot="header" class="title title-up">{{ modal_add.title }}</h4>
        <div v-loading="modal_add.loading">
          <add-deposit :data.sync="modal_add.data" :selects="select"/>
        </div>
        <div slot="footer" v-loading="modal_add.loading">
          <p-button type="info" @click.native="addSubmit">Submit</p-button>
          <p-button type="danger" @click.native="closeModalAdd">Close</p-button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerDepositPage",
  mounted() {
    this.getData()
    this.getTypeBank()
    this.getTotal()
  },
  data() {
    return {
      modal_add: {
        show: false,
        title: 'Add Deposit',
        loading: false,
        data: {
          orderid: '',
          price: 0,
          from_account: '',
          from_name: '',
          from_bank: null,
          qrcode: false,
          callback: '',
          send_callback: false
        }
      },
      total: {
        totalAmount: 0,
        totalMdr: 0,
        totalNetamount: 0,
        status: false
      },
      select: {
        banktype_string: []
      },
      totalRows: 1000,
      perPage: 20,
      page: 1,
      data: [],
      load_data: true,
      search: {
        query: {
          status: null,
          price: null,
          orderid: '',
          create: [],
          update: []
        },
        customer: [],
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
    async addSubmit() {
      this.modal_add.loading = true
      this.modal_add.data.callback = this.modal_add.data.callback ? this.modal_add.data.callback : null
      this.modal_add.data.price = isNaN(Number(this.modal_add.data.price)) ? null : Number(this.modal_add.data.price)
      this.modal_add.data.qrcode = this.modal_add.data.qrcode ? true : false
      const result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.deposit.add, this.modal_add.data))
      if (result.data) {
        this.$swal.fire({
          title: '<strong>Detail Deposit</strong>',
          icon: 'success',
          html:
            `<div>ID: ${result.data.token}</div>` +
            `<div>You can to payment page <a href=${result.data.link}>Click</a></div>`
        })
      }
      this.modal_add.loading = false
      this.closeModalAdd()
      this.getData()
    },
    closeModalAdd() {
      this.modal_add.show = false
      this.modal_add.data = {
        orderid: '',
        price: 0,
        from_account: '',
        from_name: '',
        from_bank: null,
        callback: '',
        qrcode: false,
        send_callback: false
      }
    },
    async getTypeBank() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.bank_string))
      this.select.banktype_string = Result.data
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
      if (exportData == "export") {
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.deposit.export, {params: queryString}))
        if (Result.data) {
          this.$notify({
            message: `Export Deposti ID ${Result.data.id}`,
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
  },
  watch: {
    page(New) {
      this.getData()
    },
  }
}
</script>

<style scoped>

</style>
