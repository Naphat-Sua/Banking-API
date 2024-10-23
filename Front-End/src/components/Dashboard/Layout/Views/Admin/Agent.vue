<template>
  <div>
    <card>
      <div slot="header">
        <h4>
          Search Agent
        </h4>
        <div class="row">
          <fg-input class="col-sm-12 col-md-4" label="Name" placeholder="Name" v-model="search.query.name"/>
          <fg-input class="col-sm-12 col-md-4" label="Username" placeholder="Username" v-model="search.query.username"/>
          <fg-input class="col-sm-12 col-md-4" label="Email" placeholder="Name" v-model="search.query.email"/>
        </div>
        <div>
          <p-button @click.native="getSearch" type="primary">Search</p-button>
          <p-button @click.native="resetSearch" type="danger">Reset</p-button>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Agent</h4>
      </div>

      <div class="row" style="padding: 15px">
        <p-button type="info" icon class="col-sm-1 ml-auto" @click="showModal('add', null)"><i
          class="nc-icon nc-simple-add"></i></p-button>
      </div>
      <el-table stripe border v-loading="load_data" element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="convertData">
        <el-table-column min-width="80" prop="id" label="ID"/>
        <el-table-column min-width="100" prop="name" label="Name"/>
        <el-table-column min-width="150" prop="username" label="Username"/>
        <el-table-column min-width="150" prop="email" label="Email"/>
        <el-table-column min-width="150" label="Customer">
          <div slot-scope="props">
            <p-button @click="detailAgent(props.row.id)">Manage customer</p-button>
          </div>
        </el-table-column>
        <el-table-column min-width="100" prop="ban" label="Ban">
          <div slot-scope="props">
            <p-switch v-model="props.row.ban" @input="update_ban(props.row)"></p-switch>
          </div>
        </el-table-column>
        <el-table-column min-width="120" prop="createdAt" label="CreatedAt"/>
        <el-table-column min-width="150">
          <div slot-scope="props">
            <badge @click.native="showModal('edit',props.row)" type="warning">Edit</badge>
            <badge type="danger">Delete</badge>
          </div>
        </el-table-column>
      </el-table>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
    <div>
      <modal :show="modal.show" showHeader @close="resetModal">
        <h5 slot="header" class="modal-title">{{ modal.title }}</h5>
        <div v-loading="modal.loading">
          <fg-input label="Name" placeholder="Name" v-model="modal.form.name"/>
          <fg-input v-if="modal.status == 'add'" label="Username" placeholder="Username"
                    v-model="modal.form.username"/>
          <fg-input v-model="modal.form.password">
            <div slot="label">
              Password
              <p-button @click="random_password" size="sm" type="default">Random</p-button>
            </div>
          </fg-input>
          <fg-input label="Email" placeholder="Email address" v-model="modal.form.email"/>
          <p-checkbox v-model="modal.form.ban">Ban</p-checkbox>
        </div>
        <div slot="footer">
          <p-button @click.native="onSubmit" type="info">Submit</p-button>
          <p-button @click.native="resetModal" type="danger">Cancel</p-button>
        </div>
      </modal>
    </div>
    <div>
      <modal :show="manage_customer.show" type="notice" @close="close_customer">
        <h5 slot="header" class="modal-title">Manage Customer</h5>
        <card v-loading="manage_customer.loading">
          <div slot="header">
            <h6>Add Customer</h6>
            <div>
              <el-select class="select-default"
                         placeholder="Single Select"
                         v-model="manage_customer.customer_id">
                <el-option v-for="option in select_customer"
                           class="select-default"
                           :value="option.value"
                           :label="option.label"
                           :key="option.label">
                </el-option>
              </el-select>
            </div>
            <div slot="footer">
              <p-button @click.native="addCustomerInAgent" type="info">Submit</p-button>
              <p-button @click.native="resetCustomerInAgent" type="danger">Cancel</p-button>
            </div>
          </div>
        </card>
        <el-table stripe border
                  v-loading="manage_customer.loading"
                  element-loading-text="Loading..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="manage_customer.customer">
          <el-table-column prop="name" label="Name"/>
          <el-table-column>
            <div slot-scope="props">
              <p-button type="danger" @click="removeCustomerInAgent(props.row.id)">Delete</p-button>
            </div>
          </el-table-column>
        </el-table>
      </modal>
    </div>

  </div>
</template>

<script>
export default {
  name: "Agent",
  mounted() {
    this.getData()
    this.getCustomer()
  },
  computed: {
    convertData() {
      const mapData = this.data.map(value => {
        value.ban = value.ban ? true : false
        value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return value
      })
      return mapData
    },
    select_customer() {
      const result = []
      for (const x of this.customer) {
        const findIndex = this.manage_customer.customer.findIndex(value => value.id === x.id)
        if (findIndex < 0) {
          result.push(x)
        }
      }
      return result
    }
  },
  data() {
    return {
      load_data: false,
      data: [],
      totalRows: 1000,
      perPage: 20,
      page: 1,
      customer: [],
      modal: {
        loading: false,
        status: '',
        show: false,
        title: '',
        form: {
          id: null,
          name: '',
          email: '',
          password: '',
          ban: false,
          customer_id: []
        }
      },
      manage_customer: {
        loading: false,
        show: false,
        agent_id: null,
        customer_id: null,
        customer: []
      },
      search: {
        query: {
          account: null,
          status: null,
          price: null,
          orderid: '',
          create: [],
          update: []
        },
      }
    }
  },
  methods: {
    random_password() {
      this.modal.form.password = this.$randtoken.generate(10)
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
      this.getData()
    },
    GetSearch() {
      this.getData()
    },
    async getCustomer() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent_customer))
      this.customer = Result.data
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
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.agent.get, {params: queryString}))
      if (Result.data) {
        this.data = Result.data.data
        this.totalRows = Result.data.count
      }
      this.load_data = false
    },
    showModal(type, data) {
      this.modal.show = true
      this.modal.title = type === 'add' ? 'Add Agent' : type === 'edit' ? 'Edit Agent' : ''
      this.modal.status = type
      if (type === 'edit') {
        this.modal.form.name = data.name
        this.modal.form.email = data.email
        this.modal.form.ban = data.ban ? true : false
      }
      if (type === 'add') {
        delete this.modal.form.id
      }
    },
    async detailAgent(id) {
      this.manage_customer.show = true
      this.manage_customer.loading = true
      this.manage_customer.agent_id = id
      const result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.agent.detail, {id: id}))
      if (result.data) {
        this.manage_customer.customer = result.data.customers
      }
      this.manage_customer.loading = false
    },
    close_customer() {
      this.manage_customer.customer = []
      this.manage_customer.agent_id = null
      this.manage_customer.show = false
      this.manage_customer.loading = false
    },
    async addCustomerInAgent() {
      const result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.agent.customer.add, {
        agent_id: this.manage_customer.agent_id,
        customer_id: this.manage_customer.customer_id
      }))
      if (result.data) {
        this.detailAgent(this.manage_customer.agent_id)
        this.getCustomer()
        this.manage_customer.customer_id = null
      }
    },
    async removeCustomerInAgent(customer_id) {
      const result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.agent.customer.remove, {
        agent_id: this.manage_customer.agent_id,
        customer_id
      }))
      this.detailAgent(this.manage_customer.agent_id)
      this.getCustomer()
    },
    resetCustomerInAgent() {
      this.manage_customer.customer_id = null
    },
    onSubmit() {
      if (this.modal.status === 'add') {
        this.addAgent()
      }
      if (this.modal.status === 'edit') {
        this.editAgent()
      }
    },
    async addAgent() {
      this.modal.loading = true
      this.modal.form.ban = this.modal.form.ban ? true : false
      const Result = await this.$callapi.callAPIHandler(this.axios.post(this.$api.agent.add, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Add Agent success',
          type: 'success'
        })
        this.getData()
      }
      this.modal.loading = false
      this.resetModal()
    },
    async update_ban(data) {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.agent.update, {
        id: data.id,
        ban: data.ban ? true : false
      }))
      if (Result.data) {
        this.$notify({
          message: `${data.ban ? 'Ban' : 'Unban'} Agent success`,
          type: 'success'
        })
      }
    },
    async editAgent() {
      this.modal.loading = true
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.agent.update, this.modal.form))
      if (Result.data) {
        this.$notify({
          message: 'Edit Agent success',
          type: 'success'
        })
        this.getData()
      }
      this.modal.loading = false
      this.resetModal()
    },
    resetModal() {
      this.modal.show = false
      this.modal.form = {
        id: '',
        name: '',
        email: '',
        password: '',
        ban: false,
        customer_id: [],
        createdAt: ''
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
