<template>
  <div>
    <card>
      <div slot="header">
        <h4>List Customer Balance</h4>
      </div>
      <el-table stripe border v-loading="load_data" element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="convertData">
        <el-table-column min-width="80" prop="customer.id" label="ID"/>
        <el-table-column min-width="150" prop="customer.name" label="Name"/>
        <el-table-column min-width="150" prop="customer.username" label="Username"/>
        <el-table-column min-width="150" label="Deposit">
          <div slot-scope="props">
            <div><strong>Total: </strong>{{ props.row.total.deposit }}</div>
            <div><strong>MDR: </strong>{{ props.row.total.mdr_deposit }}</div>
          </div>
        </el-table-column>
        <el-table-column min-width="150" label="Withdraw">
          <div slot-scope="props">
            <div><strong>Total: </strong>{{ props.row.total.withdraw }}</div>
            <div><strong>MDR: </strong>{{ props.row.total.mdr_withdraw }}</div>
          </div>
        </el-table-column>
        <el-table-column min-width="170" label="Settlement">
          <div slot-scope="props">
            <div><strong>Total: </strong>{{ props.row.total.settlement }}</div>
            <div><strong>MDR: </strong>{{ props.row.total.mdr_settlement }}</div>
            <div><strong>FEE: </strong>{{ props.row.total.fee_settlement }}</div>
          </div>
        </el-table-column>
        <el-table-column min-width="150" prop="balance" label="balance"/>
      </el-table>
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
  name: "Balance",
  mounted() {
    this.getData()
  },
  computed: {
    convertData() {
      const mapData = this.data.map(value => {
        value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
        value.total = {
          deposit: value.total.deposit ? Number(value.total.deposit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          mdr_deposit: value.total.mdr_deposit ? Number(value.total.mdr_deposit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          withdraw: value.total.withdraw ? Number(value.total.withdraw).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          mdr_withdraw: value.total.mdr_withdraw ? Number(value.total.mdr_withdraw).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          settlement: value.total.settlement ? Number(value.total.settlement).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          mdr_settlement: value.total.mdr_settlement ? Number(value.total.mdr_settlement).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
          fee_settlement: value.total.fee_settlement ? Number(value.total.fee_settlement).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0,
        }
        value.balance = value.balance ? Number(value.balance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
        return value
      })
      return mapData
    }
  },
  data() {
    return {
      load_data: false,
      data: [],
      totalRows: 1000,
      perPage: 20,
      page: 1,
    }
  },
  methods: {
    async getData() {
      this.load_data = true
      const queryString = {
        rows: this.perPage,
        page: this.page
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.balance, {params: queryString}))
      if (Result.data) {
        this.data = Result.data.data
        this.totalRows = Result.data.count
      }

      this.load_data = false
    },
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
