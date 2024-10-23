<template>
  <div>
    <card>
      <div slot="header">
        <h4>Search</h4>
      </div>
      <div class="row">
        <fg-input class="col-sm-3" label="Currency">
          <el-select class="select-default" placeholder="Please currency"
                     v-model="search.currency">
            <el-option v-for="option in select.currency"
                       :value="option.value"
                       :label="option.label"
                       :key="option.value">
            </el-option>
          </el-select>
        </fg-input>
        <fg-input class="col-sm-3" label="TypePayment">
          <el-select class="select-default" placeholder="Please type payment"
                     v-model="search.type_payment">
            <el-option v-for="option in select.type_payment"
                       :value="option.value"
                       :label="option.label"
                       :key="option.value">
            </el-option>
          </el-select>
        </fg-input>
        <fg-input class="col-sm-3" label="Status">
          <el-select class="select-default" placeholder="Please status"
                     v-model="search.status">
            <el-option v-for="option in select.status"
                       :value="option.value"
                       :label="option.label"
                       :key="option.value">
            </el-option>
          </el-select>
        </fg-input>
        <fg-input class="col-sm-3"
                  label="OrderId"
                  placeholder="Input orderid"
                  v-model="search.orderid"
                  type="text"/>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <card>
            <h4 class="card-title">Create</h4>
            <div class="card-body">
              <fg-input>
                <el-date-picker v-model="search.create"
                                type="daterange"
                                start-placeholder="Start date"
                                end-placeholder="End date">
                </el-date-picker>
              </fg-input>
            </div>
          </card>
        </div>
        <div class="col-sm-6">
          <card>
            <h4 class="card-title">Update</h4>
            <div class="card-body">
              <fg-input>
                <el-date-picker v-model="search.update"
                                type="daterange"
                                start-placeholder="Start date"
                                end-placeholder="End date">
                </el-date-picker>
              </fg-input>
            </div>
          </card>
        </div>
      </div>
      <div slot="footer">
        <p-button @click="getData" type="primary">Search</p-button>
        <p-button @click="resetSearch" type="danger">Reset</p-button>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>List Order</h4>
      </div>
      <div class="row" style="padding: 15px">
        <div class="row col-sm-2 ml-auto">
          <p-button type="info" icon class="col-sm-5" @click="getData">Refresh</p-button>
          <p-button type="info" icon class="col-sm-4" @click="getData('export')">Export</p-button>
        </div>
      </div>
      <TotalAmount :data="total_box"/>
      <div class="row">
        <el-table
          stripe
          v-loading="load_data"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="convert_data"
        >
          <el-table-column min-width="100" prop="id" label="ID"/>
          <el-table-column min-width="150" prop="orderid" label="Order ID"/>
          <el-table-column min-width="150" prop="customer.name" label="Customer"/>
          <el-table-column min-width="120" label="Amount">
            <div slot-scope="props">
              <div><strong>Amount:</strong></div>
              <div>{{ props.row.amount }}</div>
              <div><strong>Currency:</strong></div>
              <div>{{ props.row.currency }}</div>
              <div><strong>MDR:</strong></div>
              <div>{{ props.row.mdr }}</div>
            </div>
          </el-table-column>
          <el-table-column min-width="100" prop="type_payment" label="TypePay"/>
          <el-table-column min-width="100" label="Status">
            <div slot-scope="props">
              <badge v-if="props.row.status === 'success'" type="success">
                Success
              </badge>
              <badge v-if="props.row.status === 'cancel' || props.row.status === 'refund'" type="danger">
                {{ props.row.status }}
              </badge>
              <badge v-if="props.row.status === 'wait' || props.row.status === 'edit'" type="warning">
                {{ props.row.status }}
              </badge>
            </div>
          </el-table-column>
          <el-table-column min-width="200" label="Date">
            <div slot-scope="props">
              <span>Create:</span><br/>
              <span>{{ props.row.createdAt }}</span><br/>
              <span>Update:</span><br/>
              <span>{{ props.row.updatedAt }}</span><br/>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="total" :per-page="perpage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  name: "CustomerMcpayment",
  beforeMount() {
    this.getData()
  },
  computed: {
    convert_data() {
      return this.main_data.map(value => {
        value.createdAt = this.$moment(value.created_at).format('YYYY-MM-DD HH:mm:ss')
        value.updatedAt = this.$moment(value.updated_at).format('YYYY-MM-DD HH:mm:ss')
        return value
      })
    }
  },
  data() {
    return {
      load_data: false,
      perpage: 20,
      total: 0,
      page: 1,
      search: {
        customer: '',
        currency: null,
        type_payment: null,
        status: null,
        orderid: '',
        create: [],
        update: []
      },
      total_box: {
        totalAmount: 0,
        totalMdr: 0,
        totalNetamount: 0,
        status: false
      },
      main_data: [],
      select: {
        customer: [],
        status: [
          {
            value: 'wait',
            label: 'wait'
          },
          {
            value: 'cancel',
            label: 'cancel'
          },
          {
            value: 'success',
            label: 'success'
          }
        ],
        currency: [
          {
            value: 'SGD',
            label: 'SGD'
          },
          {
            value: 'HKD',
            label: 'HKD'
          },
          {
            value: 'MYR',
            label: 'MYR'
          },
          {
            value: 'BRD',
            label: 'BRD'
          },
          {
            value: 'KRW',
            label: 'KRW'
          },
          {
            value: 'USD',
            label: 'USD'
          },
          {
            value: 'AUD',
            label: 'AUD'
          },
          {
            value: 'EUR',
            label: 'EUR'
          },
          {
            value: 'GBP',
            label: 'GBP'
          },
          {
            value: 'JPY',
            label: 'JPY'
          }
        ],
        type_payment: [
          {
            value: 'FPX',
            label: 'FPX'
          },
          {
            value: 'CARD',
            label: 'CARD'
          }
        ]
      }
    }
  },
  methods: {
    async getTotal() {
      this.total_box.status = true
      const queryString = {}
      if (this.search.customer) {
        queryString.customer_id = this.search.customer
      }
      if (this.search.currency) {
        queryString.currency = this.search.currency
      }
      if (this.search.orderid) {
        queryString.orderid = this.search.orderid
      }
      if (this.search.type_payment) {
        queryString.type_payment = this.search.type_payment
      }
      if (this.search.status) {
        queryString.status = this.search.status
      }
      if (this.search.create && this.search.create.length === 2) {
        queryString.from_create = this.$moment(this.search.create[0]).format('YYYY-MM-DD')
        queryString.to_create = this.$moment(this.search.create[1]).format('YYYY-MM-DD')
      }
      if (this.search.update && this.search.update.length === 2) {
        queryString.from_update = this.$moment(this.search.update[0]).format('YYYY-MM-DD')
        queryString.to_update = this.$moment(this.search.update[1]).format('YYYY-MM-DD')
      }
      const Result = await this.$callapi.callAPIHandler(
        this.axios.get(this.$api.mcpayment.total, {params: queryString})
      );
      if (Result.data) {
        this.total_box.totalAmount = Result.data.total_amount
        this.total_box.totalMdr = Result.data.total_mdr
        this.total_box.totalNetamount = Result.data.total_netamount
      }
      this.total_box.status = false
    },
    async getData(exportData) {
      this.getTotal()
      this.load_data = true
      const queryString = {
        rows: this.perpage,
        page: this.page
      }
      if (this.search.customer) {
        queryString.customer_id = this.search.customer
      }
      if (this.search.currency) {
        queryString.currency = this.search.currency
      }
      if (this.search.orderid) {
        queryString.orderid = this.search.orderid
      }
      if (this.search.type_payment) {
        queryString.type_payment = this.search.type_payment
      }
      if (this.search.status) {
        queryString.status = this.search.status
      }
      if (this.search.create && this.search.create.length === 2) {
        queryString.from_create = this.$moment(this.search.create[0]).format('YYYY-MM-DD')
        queryString.to_create = this.$moment(this.search.create[1]).format('YYYY-MM-DD')
      }
      if (this.search.update && this.search.update.length === 2) {
        queryString.from_update = this.$moment(this.search.update[0]).format('YYYY-MM-DD')
        queryString.to_update = this.$moment(this.search.update[1]).format('YYYY-MM-DD')
      }
      if (exportData === "export") {
        const Result = await this.$callapi.callAPIHandler(
          this.axios.get(this.$api.mcpayment.export, {params: queryString})
        );
        if (Result.data) {
          this.$notify({
            message: `Export Deposti ID ${Result.data.id}`,
            type: 'info'
          })
        }
      } else {
        const Result = await this.$callapi.callAPIHandler(
          this.axios.get(this.$api.mcpayment.get, {params: queryString})
        );
        if (Result.data) {
          this.main_data = Result.data.data;
          this.total = Result.data.count;
        }
      }

      this.load_data = false
    },
    resetSearch() {
      this.search = {
        customer: '',
        currency: null,
        type_payment: null,
        orderid: '',
        create: [],
        update: []
      }
      this.getData()
    }
  },
  watch: {
    page() {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
