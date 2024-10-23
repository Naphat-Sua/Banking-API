<template>
  <div>
    <card>
      <div slot="header">
        <h4>List Account Bank</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
        <p-button @click="ChangeModal({type: 'add'})" type="info" icon class="col-sm-1 ml-auto"><i
          class="nc-icon nc-simple-add"></i>
        </p-button>
      </div>
      <AccountBank :data="data" :load_data="load_data" @update="ChangeModal"/>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <modal :show.sync="modal.show" headerClasses="justify-content-center" @close="CloseModal">
      <h4 slot="header" class="title title-up">{{modal.title}}</h4>
      <div>
        <AddAccountBank :value.sync="modal.data" :select="modal.select" @UpdateData="UpdateData"/>
      </div>
      <div slot="footer">
        <p-button @click.native="onSubmit" type="info">Submit</p-button>
        <p-button type="danger" @click.native="ChangeModal">Close</p-button>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "ManagerAccountBankPage",
    mounted() {
      this.getData()
      this.getBank()
      this.getCustomer()
    },
    data() {
      return {
        data: [],
        load_data: false,
        totalRows: 1000,
        perPage: 20,
        page: 1,
        modal: {
          title: '',
          type: '',
          show: false,
          select: {
            banktype: [],
            customer: []
          },
          data: {
            account: '',
            name: '',
            promptpay: '',
            use: true,
            banktypeId: null,
            customerId: null
          }
        }
      }
    },
    methods: {
      async getData() {
        this.load_data = true
        const queryString = {
          rows: this.perPage,
          page: this.page
        }
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.accountbank.get, {params: queryString}))
        if (Result.data) {
          this.totalRows = Result.data.count
          this.data = Result.data.data
        }
        this.load_data = false
      },
      async getCustomer() {
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.customer))
        if (Result.data) {
          this.modal.select.customer = Result.data
          this.modal.select.customer.unshift({
            label: 'Not Match Customer',
            value: null
          })
        }
      },
      async getBank() {
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.bank))
        if (Result.data) {
          this.modal.select.banktype = Result.data
        }
      },
      async onDelete(id) {
        const Result = await this.$callapi.callAPIHandler(this.axios.delete(this.$api.accountbank.delete + `/${id}`))
        if (Result.data === '') {
          this.$notify({
            message: 'Delete Manage success',
            type: 'success'
          })
          this.getData()
        }
      },
      CloseModal() {
        this.modal.show = false
        this.modal.data = {
          id: '',
          account: '',
          name: '',
          promptpay: '',
          username: '',
          password: '',
          use: true,
          banktypeId: null,
          customerId: null
        }
      },
      onSubmit() {
        if (this.modal.type === 'add') {
          this.onSubmitAdd()
        }
        if (this.modal.type === 'edit') {
          this.onSubmitEdit()
        }
      },
      async onSubmitAdd() {
        const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.accountbank.add, this.modal.data))
        if (Result.data) {
          this.$notify({
            message: 'Add AccountBank Success',
            type: 'success'
          })
        }
        this.getData()
        this.CloseModal()
      },
      async onSubmitEdit() {
        const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.accountbank.edit, this.modal.data))
        if (Result.data) {
          this.$notify({
            message: 'Edit AccountBank Success',
            type: 'success'
          })
        }
        this.getData()
        this.CloseModal()
      },
      ChangeModal(data) {
        this.modal.show = !this.modal.show && (data && data.type === 'delete') ? false : true
        this.modal.type = data && data.type ? data.type : null
        this.modal.title = data && data.type === 'add' ? 'Add Account Bank' : data && data.type === 'edit' ? 'Edit Account Bank' : ''
        if (data && data.type === 'edit') {
          this.modal.data = data.data
          this.modal.data.banktypeId = data.data && data.data.banktype ? data.data.banktype.id : null
          this.modal.data.customerId = data.data && data.data.customer ? data.data.customer.id : null
          this.modal.data.use = data.data.use ? true : false
        } else if (data && data.type === 'add') {
          delete this.modal.data.id
        } else if (data && data.type === 'delete') {
          this.onDelete(data.data.id)
        } else {
          this.$notify({
            message: 'Error not type',
            type: 'danger'
          })
        }
      },
      UpdateData(data) {
        if (data) {
          if (data.type === 'typebank') {
            this.modal.data.banktypeId = data.banktype_id
          }
          if (data.type === 'customer') {
            this.modal.data.customerId = data.customerId
          }
        }
      }
    },
    watch: {
      page(New) {
        this.getData()
      },
      perPage(New) {
        this.getData()
      }
    }
  }
</script>

<style scoped>

</style>
