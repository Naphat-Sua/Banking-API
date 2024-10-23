<template>
  <div>
    <div class="row">
      <card class="col-sm-12">
        <div slot="header">
          <h4>List Customer Balance</h4>
        </div>
        <el-table stripe border v-loading="load_data" element-loading-text="Loading..."
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="convertData">
          <el-table-column min-width="80" prop="customer.id" label="ID"/>
          <el-table-column min-width="150" prop="customer.name" label="Name"/>
          <el-table-column min-width="150" prop="customer.username" label="Username"/>
          <el-table-column min-width="150" prop="total.deposit" label="Deposit"/>
          <el-table-column min-width="150" prop="total.mdr_deposit" label="Mdr Deposit"/>
          <el-table-column min-width="150" prop="total.withdraw" label="Withdraw"/>
          <el-table-column min-width="170" prop="total.mdr_withdraw" label="Mdr Withdraw"/>
          <el-table-column min-width="170" prop="total.fee_settlement" label="Fee settlement"/>
          <el-table-column min-width="150" prop="balance" label="balance"/>
        </el-table>
        <div class="row">
          <div class="ml-auto mr-auto">
            <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import DashboardSum from "@/components/CustomComponent/DashboardSum";
import ChartCard from "@/components/UIComponents/Cards/ChartCard";
export default {
  name: "CustomerDashboardPage",
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
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.customer.balance, {params: queryString}))
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
};
</script>

<style scoped>
</style>
