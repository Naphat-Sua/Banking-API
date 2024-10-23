<template>
  <div>
    <card>
      <div slot="header">
        <h4>
          Search Transaction
        </h4>
        <div class="row">
          <fg-input class="col-sm-2" label="Merchant ID">
            <el-select class="select-default" placeholder="Please select Merchant ID"  v-model="search.merchantId">
              <el-option
                v-for="merchantIdOption in merchantIdOptions"
                :key="merchantIdOption.value"
                :value="merchantIdOption.value"
                :label="merchantIdOption.label"
              />
            </el-select>
         </fg-input>
         <fg-input class="col-sm-2" label="Currency">
          <el-select class="select-default" placeholder="Please currency"
                     v-model="search.currency">
            <el-option v-for="option in select.currency"
                       :value="option.value"
                       :label="option.label"
                       :key="option.value">
            </el-option>
          </el-select>
        </fg-input>
         <fg-input class="col-sm-2" label="Status">
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
            <h4 class="card-title">Select Date</h4>
            <div class="card-body">
              <fg-input>
                <el-date-picker v-model="search.createDate"
                                type="daterange"
                                start-placeholder="Start date"
                                end-placeholder="End date">
                </el-date-picker>
              </fg-input>
            </div>
          </card>
        </div>
        <!-- <div class="col-sm-6">
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
        </div> -->
      </div>
        <div>
          <p-button @click.native="getSearch" type="primary">Search</p-button>
          <p-button @click.native="resetSearch" type="danger">Reset</p-button>
        </div>
      </div>
    </card>
    <card>
      <div slot="header">
        <h4>Orders</h4>
      </div>
      <div class="row" style="padding: 15px">
        <fg-input label="Rows" v-model="perPage" class="col-sm-2" type="number"></fg-input>
       
      </div>
      <Order :data="data" :load_data="load_data" />
      <div class="row">
        <div class="ml-auto mr-auto">
          <p-pagination :total="totalRows" :per-page="perPage" v-model="page"></p-pagination>
        </div>
      </div>
    </card>
 
  </div>
</template>

<script>
import Order from '../../../CustomComponent/CreditCard/Order.vue'


export default {
  name: "OrderReport",
  components: {
    Order,
   
  },
  mounted() {
    this.getData();
    this.getMerchantIDs();
  },
  data() {
    return {
      totalRows: 1000,
      perPage: 20,
      page: 1,
      data: [],
      merchantList: [],
      search: {
        merchantId: '',
        currency: '',
        status: '',
        orderId: '',
        createDate: ''
      },
      load_data: false,
      select: {
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
      if(this.search.merchantId){
        queryString.merchantId = this.search.merchantId;
      }
      if(this.search.currency){
        queryString.currency = this.search.currency
      }
      if(this.search.status){
        queryString.status = this.search.status
      }
      if(this.search.orderId){
        queryString.orderId = this.search.orderId
      }
      console.log('date=',this.search.createDate);
      if (this.search.createDate && this.search.createDate.length === 2) {
        queryString.fromCreateDate = this.$moment(this.search.createDate[0]).format('YYYY-MM-DD')
        queryString.toCreateDate = this.$moment(this.search.createDate[1]).format('YYYY-MM-DD')
      }
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.creditcard.getOrders, {params: queryString}))
      if (Result.data) {
         this.data = Result.data.data;
         this.totalRows = Result.data.count;
      }
      this.load_data = false
    },
   async getMerchantIDs() {
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.get(this.$api.creditcard.getMerchantIDs))
      if(ResutlApi.data){
        this.merchantList= ResutlApi.data;
      }
    
    },
    getSearch(){
      this.getData();
    },
    resetSearch(){
      this. search = {
        merchantId: '',
        currency: '',
        status: '',
        orderId: '',
        createDate: ''
      }
      this.getData();
    }
  },
  computed: {
    merchantIdOptions() {
      return this.merchantList.map(merchant => ({
      value: merchant.merchantId,
      label: merchant.merchantId,
      key:   merchant.merchantId,
      }));
  }
},
watch: {
        page(New) {
            this.getData();
        },
        perPage(New) {
            this.getData();
        }
    },
}
</script>

<style scoped>

</style>
