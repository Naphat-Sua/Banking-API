<template>
  <div>
    <card>
      <div slot="header">
        <h4>
          Search Customer
        </h4>
        <div class="row">
          <fg-input class="col-sm-12 col-md-3" label="Agent">
            <el-select class="select-default"
                       placeholder="Select agent"
                       v-model="search.query.agent_id">
              <el-option v-for="option in selects.agents"
                         class="select-default"
                         :value="option.value"
                         :label="option.label"
                         :key="option.label">
              </el-option>
            </el-select>
          </fg-input>
          <fg-input class="col-sm-12 col-md-3" label="Name" placeholder="Name" v-model="search.query.name"/>
          <fg-input class="col-sm-12 col-md-3" label="Username" placeholder="Username" v-model="search.query.username"/>
          <fg-input class="col-sm-12 col-md-3" label="Email" placeholder="Name" v-model="search.query.email"/>
        </div>
        <div>
          <p-button @click.native="getSearch" type="primary">Search</p-button>
          <p-button @click.native="resetSearch" type="danger">Reset</p-button>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Customer</h4>
      </div>
      <div class="row" style="padding: 15px">
        <p-button type="info" icon class="col-sm-1 ml-auto" @click="showModal('add', null)"><i
          class="nc-icon nc-simple-add"></i></p-button>
      </div>
      <el-table stripe border v-loading="load_data"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="convertData">
        <el-table-column min-width="80" prop="id" label="ID"/>
        <el-table-column min-width="100" prop="name" label="Name"/>
        <el-table-column min-width="100" prop="username" label="Username"/>
        <el-table-column min-width="150" label="Mdr">
          <div slot-scope="props">
            <div><strong>Deposit: </strong>{{ props.row.mdr_deposit }}</div>
            <div><strong>QRcode: </strong>{{ props.row.mdr_qrcode }}</div>
            <div><strong>Withdraw: </strong>{{ props.row.mdr_withdraw }}</div>
            <div><strong>Settlement: </strong>{{ props.row.mdr_settlement }}</div>
            <div><strong>FeeSettlement: </strong>{{ props.row.fee_settlement }}</div>
          </div>
        </el-table-column>
        <el-table-column min-width="100" prop="ban" label="Ban">
          <div slot-scope="props">
            <p-switch v-model="props.row.ban" @input="updateBan(props.row)"></p-switch>
          </div>
        </el-table-column>
        <el-table-column min-width="100" prop="createdAt" label="CreatedAt"/>
        <el-table-column min-width="150">
          <div slot-scope="props">
            <p-button class="box_button" @click.native="showModal('edit',props.row)" type="warning">Edit</p-button>
            <p-button class="box_button" @click.native="deleteCustomer(props.row.id)" type="danger">Delete</p-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <modal :show.sync="modal.show.edit" @close="resetModal">
      <h5 slot="header" class="modal-title">{{ modal.title }}</h5>
      <div v-loading="modal.loading">
        <fg-input label="Name" placeholder="Name" v-model="modal.form.name"/>
        <fg-input label="Username" placeholder="Username" v-model="modal.form.username"/>
        <fg-input v-model="modal.form.password">
          <div slot="label">
            Password
            <p-button @click="random" size="sm" type="default">Random</p-button>
          </div>
        </fg-input>
        <fg-input label="Phone" placeholder="PHone number" v-model="modal.form.phone"/>
        <fg-input label="Email" placeholder="Email address" v-model="modal.form.email"/>
        <fg-input label="Mdr Deposit" type="number" placeholder="0" v-model="modal.form.mdr_deposit"/>
        <fg-input label="Mdr QRcode" type="number" placeholder="0" v-model="modal.form.mdr_qrcode"/>
        <fg-input label="Mdr Withdraw" type="number" placeholder="0" v-model="modal.form.mdr_withdraw"/>
        <fg-input label="Mdr Settlement" type="number" placeholder="0" v-model="modal.form.mdr_settlement"/>
        <fg-input label="Fee Settlement" type="number" placeholder="0" v-model="modal.form.fee_settlement"/>
        <fg-input label="Agent">
          <el-select collapse-tags v-model="modal.form.agent_id" placeholder="Select Agent">
            <el-option v-for="option in selects.agents" class="select-success"
                       :value="option.value"
                       :label="option.label"
                       :key="option.label">
            </el-option>
          </el-select>
        </fg-input>
        <p-checkbox v-model="modal.form.ban">Ban</p-checkbox>
        <p-checkbox v-model="modal.form.wishlist_ip">Wishlist ip</p-checkbox>
        <p-checkbox v-model="modal.form.encrypto">Encrypto</p-checkbox>
      </div>
      <div slot="footer" v-loading="modal.loading">
        <p-button @click.native="onSubmit" type="info">Submit</p-button>
        <p-button @click.native="resetModal" type="danger">Cancel</p-button>
      </div>
    </modal>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: "Customer",
  components: {
    VuePhoneNumberInput
  },
  mounted() {
    this.getData()
    this.getSelectAgent()
  },
  computed: {
    convertData() {
      const mapData = this.data.map(value => {
        value.ban = value.ban ? true : false
        value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return value
      })
      return mapData
    }
  },
  data() {
    return {
      phone: null,
      selects: {
        id: null,
        agents: [],
      },
      search: {
        query: {
          name: '',
          username: '',
          email: '',
          agent_id: null
        }
      },
      load_data: false,
      data: [],
      totalRows: 1000,
      perPage: 20,
      page: 1,
      modal: {
        loading: false,
        status: '',
        show: {
          edit: false,
        },
        title: '',
        form: {
          id: null,
          name: '',
          username: '',
          password: '',
          phone: '',
          email: '',
          mdr_deposit: 0,
          mdr_qrcode: 0,
          mdr_withdraw: 0,
          fee_settlement: 0,
          webhook: '',
          ban: false,
          wishlist_ip: false,
          encrypto: false
        },
      }
    }
  },
  methods: {
    random() {
      this.modal.form.password = this.$randtoken.generate(10)
    },
    getSearch() {
      this.getData()
    },
    resetSearch() {
      this.search.query = {
        name: '',
        username: '',
        email: '',
        agent_id: null
      }
      this.getData()
    },
    async getSelectAgent() {
      const agent = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent))
      if (agent.data) {
        this.selects.agents = agent.data
      }
    },
    async getData() {
      this.load_data = true
      const queryString = {
        rows: this.perPage,
        page: this.page
      }
      if (this.search.query.name) {
        queryString.name = this.search.query.name
      }
      if (this.search.query.username) {
        queryString.username = this.search.query.username
      }
      if (this.search.query.email) {
        queryString.email = this.search.query.email
      }
      if (this.search.query.agent_id) {
        queryString.agent_id = this.search.query.agent_id
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.customer.get, {params: queryString}))
      if (Result.data) {
        this.data = Result.data.data
        this.totalRows = Result.data.count
      }

      this.load_data = false
    },
    async updateBan(data) {
      const result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.customer.update, {
        id: data.id,
        ban: data.ban
      }))
      if (result.data) {
        this.$notify({
          message: `${data.ban ? 'Ban' : 'Unban'} customer success`,
          type: 'success'
        })
      }
    },
    showModal(type, data) {
      this.modal.title = type === 'add' ? 'Add Customer' : type === 'edit' ? 'Edit Customer' : ''
      this.modal.status = type
      if (type === 'edit') {
        this.modal.show.edit = true
        this.modal.form = {
          ...data,
          password: '',
          ban: data.ban ? true : false,
          agent_id: data.agent ? data.agent.id : null,
          wishlist_ip: data.wishlist_ip ? true : false,
          encrypto: data.encrypto ? true : false
        }
      }
      if (type === 'add') {
        this.modal.show.edit = true
        delete this.modal.form.id
      }
    },
    onSubmit() {
      if (this.modal.status === 'add') {
        this.addCustomer()
      }
      if (this.modal.status === 'edit') {
        this.editCustomer()
      }
    },
    async addCustomer() {
      this.modal.loading = true
      this.modal.form.mdr_withdraw = !isNaN(Number(this.modal.form.mdr_withdraw)) ? Number(this.modal.form.mdr_withdraw) : 0
      this.modal.form.mdr_deposit = !isNaN(Number(this.modal.form.mdr_deposit)) ? Number(this.modal.form.mdr_deposit) : 0
      this.modal.form.mdr_qrcode = !isNaN(Number(this.modal.form.mdr_qrcode)) ? Number(this.modal.form.mdr_qrcode) : 0
      this.modal.form.fee_settlement = !isNaN(Number(this.modal.form.fee_settlement)) ? Number(this.modal.form.fee_settlement) : 0
      this.modal.form.mdr_settlement = !isNaN(Number(this.modal.form.mdr_settlement)) ? Number(this.modal.form.mdr_settlement) : 0
      this.modal.form.agent_id = !isNaN(Number(this.modal.form.agent_id)) ? Number(this.modal.form.agent_id) : 0
      this.modal.form.ban = this.modal.form.ban ? true : false
      this.modal.form.encrypto = this.modal.form.encrypto ? true : false
      this.modal.form.wishlist_ip = this.modal.form.wishlist_ip ? true : false
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.customer.add, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Add Customer success',
          type: 'success'
        })
        this.getData()
      }
      this.modal.loading = false
      this.resetModal()
    },
    async editCustomer() {
      this.modal.loading = true
      this.modal.form.mdr_withdraw = !isNaN(Number(this.modal.form.mdr_withdraw)) ? Number(this.modal.form.mdr_withdraw) : 0
      this.modal.form.mdr_deposit = !isNaN(Number(this.modal.form.mdr_deposit)) ? Number(this.modal.form.mdr_deposit) : 0
      this.modal.form.mdr_qrcode = !isNaN(Number(this.modal.form.mdr_qrcode)) ? Number(this.modal.form.mdr_qrcode) : 0
      this.modal.form.fee_settlement = !isNaN(Number(this.modal.form.fee_settlement)) ? Number(this.modal.form.fee_settlement) : 0
      this.modal.form.mdr_settlement = !isNaN(Number(this.modal.form.mdr_settlement)) ? Number(this.modal.form.mdr_settlement) : 0
      this.modal.form.agent_id = !isNaN(Number(this.modal.form.agent_id)) ? Number(this.modal.form.agent_id) : 0
      this.modal.form.ban = this.modal.form.ban ? true : false
      this.modal.form.encrypto = this.modal.form.encrypto ? true : false
      this.modal.form.wishlist_ip = this.modal.form.wishlist_ip ? true : false
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.customer.update, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Edit Customer success',
          type: 'success'
        })
        this.getData()
      }
      this.modal.loading = false
      this.resetModal()
    },
    resetModal() {
      this.modal.show.edit = false
      this.modal.form = {
        id: null,
        name: '',
        username: '',
        password: '',
        phone: '',
        email: '',
        mdr_deposit: 0,
        mdr_qrcode: 0,
        mdr_withdraw: 0,
        fee_settlement: 0,
        webhook: '',
        ban: false,
        wishlist_ip: false,
        encrypto: false
      }
    },
    async deleteCustomer(id) {
      const Result = await this.$callapi.callAPIHandler(this.axios.delete(`${this.$api.customer.delete}/${id}`))
      this.$notify({
        message: 'Delete Customer success',
        type: 'success'
      })
    }
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
