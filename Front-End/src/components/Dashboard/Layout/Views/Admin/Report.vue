<template>
  <div>
    <card>
      <div slot="header">
        <h4>Search Date Report</h4>
      </div>
      <div class="row">
        <fg-input class="col-sm-12 col-md-3" label="Agent">
          <el-select class="select-default"
                     placeholder="Select agent"
                     v-model="search.agent_id">
            <el-option v-for="option in selects.agents"
                       class="select-default"
                       :value="option.value"
                       :label="option.label"
                       :key="option.label">
            </el-option>
          </el-select>
        </fg-input>
        <fg-input class="col-sm-12 col-md-3" placeholder="Name" v-model="search.name" label="Name"></fg-input>
        <fg-input class="col-sm-12 col-md-3" placeholder="Username" v-model="search.username"
                  label="Username"></fg-input>
        <fg-input class="col-sm-12 col-md-3" placeholder="Email" v-model="search.email" label="Email"></fg-input>
      </div>
      <card>
        <h5 class="card-title">Date range</h5>
        <div class="card-body">
          <fg-input>
            <el-date-picker v-model="search.update"
                            type="daterange"
                            start-placeholder="Start date"
                            end-placeholder="End date">
            </el-date-picker>
          </fg-input>
        </div>
        <div slot="footer">
          <p-button @click="GetSearch" type="primary">Search</p-button>
          <p-button @click="ResetSearch" type="danger">Reset</p-button>
        </div>
      </card>
    </card>
    <div>
      <card>
        <div slot="header">
          <h4>Report</h4>
        </div>
        <TotalBoxReport :loading="load_data" :data="total_box"/>
        <div class="row" style="padding: 15px">
          <div class="row col-sm-2 ml-auto">
            <p-button type="info" icon class="col-sm-6" @click="getData('export')">Export</p-button>
          </div>
        </div>
        <div>
          <el-table
            stripe
            border
            v-loading="load_data"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="convertData">
            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="customer" label="Customer"/>
            <el-table-column label="Deposit">
              <div slot-scope="props">
                <div><strong>Total: </strong>{{ props.row.totalDeposit }}</div>
                <div><strong>Total MDR: </strong>{{ props.row.totalDepositMdr }}</div>
              </div>
            </el-table-column>
            <el-table-column label="Withdraw">
              <div slot-scope="props">
                <div><strong>Total: </strong>{{ props.row.totalWithdraw }}</div>
                <div><strong>Total MDR: </strong>{{ props.row.totalWithdrawMdr }}</div>
              </div>
            </el-table-column>
            <el-table-column label="Settlement">
              <div slot-scope="props">
                <div><strong>Total: </strong>{{ props.row.totalSettlement }}</div>
                <div><strong>Total MDR: </strong>{{ props.row.totalSettlementMdr }}</div>
                <div><strong>Total FEE: </strong>{{ props.row.totalSettlementFee }}</div>
              </div>
            </el-table-column>
            <el-table-column prop="avgMdr" label="AVG MDR"/>
          </el-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import TotalBoxReport from "../../../CustomComponent/TotalBoxReport";

export default {
  name: "Report",
  components: {
    TotalBoxReport
  },
  data() {
    return {
      search: {
        name: '',
        username: '',
        email: '',
        agent_id: null,
        update: []
      },
      data: [],
      total_box: {
        deposit: 0,
        withdraw: 0,
        settlement: 0,
        mdr: 0
      },
      load_data: false,
      selects: {
        agents: []
      }
    }
  },
  mounted() {
    this.getData()
    this.getSelectAgent()
  },
  computed: {
    convertData() {
      return this.data.length > 0 ?
        this.data.map(value => {
          value.totalDeposit = isNaN(Number(value.total_deposit)) ? Number(value.total_deposit.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_deposit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalDepositMdr = isNaN(Number(value.total_deposit_mdr)) ? Number(value.total_deposit_mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_deposit_mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalWithdraw = isNaN(Number(value.total_withdraw)) ? Number(value.total_withdraw.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_withdraw).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalWithdrawMdr = isNaN(Number(value.total_withdraw_mdr)) ? Number(value.total_withdraw_mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_withdraw_mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalSettlement = isNaN(Number(value.total_settlement)) ? Number(value.total_settlement.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_settlement).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalSettlementMdr = isNaN(Number(value.total_settlement_mdr)) ? Number(value.total_settlement_mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_settlement_mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalSettlementFee = isNaN(Number(value.total_settlement_fee)) ? Number(value.total_settlement_fee.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_settlement_fee).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.totalMdr = isNaN(Number(value.total_mdr)) ? Number(value.total_mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.total_mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          value.avgMdr = isNaN(Number(value.avg_mdr)) ? Number(value.avg_mdr.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Number(value.avg_mdr).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          return value
        })
        : []
    }
  },
  methods: {
    async getData(exportData) {
      this.load_data = true
      const queryString = {
        from_update: null,
        to_update: null
      }
      if (this.search.name) {
        queryString.name = this.search.name
      }
      if (this.search.username) {
        queryString.username = this.search.username
      }
      if (this.search.email) {
        queryString.email = this.search.email
      }
      if (this.search.agent_id) {
        queryString.agent_id = this.search.agent_id
      }
      if (this.search.update && this.search.update.length === 2) {
        queryString.from_update = this.$moment(this.search.update[0]).format('YYYY-MM-DD')
        queryString.to_update = this.$moment(this.search.update[1]).format('YYYY-MM-DD')
      }
      if (exportData == "export") {
        const Result = await this.$callapi.callAPIHandler(
          this.axios.get(this.$api.report.export, {params: queryString})
        );
        if (Result.data) {
          this.$notify({
            message: `Export Report ID ${Result.data.id}`,
            type: 'info'
          })
        }
      } else {
        const Result = await this.$callapi.callAPIHandler(
          this.axios.get(this.$api.report.get, {params: queryString})
        );
        if (Result.data) {
          this.data = Result.data.data;
          this.total_box = Result.data.total_box
        }
      }
      this.load_data = false
    },
    GetSearch() {
      this.getData()
    },
    ResetSearch() {
      this.search.update = null
      this.search.update = []
    },
    async getSelectAgent() {
      const result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.select.agent))
      if (result.data) {
        this.selects.agents = result.data
      }
    }
  }
}
</script>

<style scoped>

</style>
