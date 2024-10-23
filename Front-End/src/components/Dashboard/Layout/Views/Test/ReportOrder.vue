<template>
  <div>
    <card>
      <div slot="header">
        <h4>Orders</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
       
      </div>
      <Order :data.sync="data" :load_data="load_data" />
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
 
  </div>
</template>

<script>
import Order from "../../../Dashboard/Views/Test/Order";


export default {
  name: "Orders",
  components: {
    Order,
   
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      totalRows: 1000,
      perPage: 20,
      page: 1,
      data: [],
      load_data: false,
     
    }
  },
  methods: {
    async getData() {
      this.load_data = true
      const queryString = {
        rows: this.perPage,
        page: this.page
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.order.get, {params: queryString}))
      console.log(Result.data);
      if (Result.data) {
         this.data = Result.data
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
