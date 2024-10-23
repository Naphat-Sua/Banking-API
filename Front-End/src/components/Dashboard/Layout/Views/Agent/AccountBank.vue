<template>
  <card>
    <div slot="header">
      <h4>List Account Bank</h4>
    </div>
    <div class="row" style="padding: 15px">
      <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
    </div>
    <AccountBank :data="data" :load_data="load_data"/>
    <div class="row">
      <div class="ml-auto mr-auto">
        <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
      </div>
    </div>
  </card>
</template>

<script>
  export default {
    name: "CustomerAccountBankPage",
    mounted() {
      this.getData()
    },
    data() {
      return {
        data: [],
        load_data: false,
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
        const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.accountbank.get, {params: queryString}))
        if (Result.data) {
          this.totalRows = Result.data.count
          this.data = Result.data.data
        }
        this.load_data = false
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
