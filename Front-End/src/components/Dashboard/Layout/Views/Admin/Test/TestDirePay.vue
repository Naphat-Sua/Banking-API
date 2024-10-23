<template>
  <div>
    <card>
      <div slot="header">
        <h4>Payment</h4>
      </div>

      <AddDirePay :orderData.sync="orderData"/>
     
      <div slot="footer">
        <p-button @click="createPayment" type="primary">Payment</p-button>
      </div>
    </card>
    <card v-if="paymentInfo">
      <div>
        <p>Transaction ID: {{ paymentInfo.txid }}</p>
        <p>Amount: {{ paymentInfo.payment_amount }}</p>
        <p>Currency: {{ paymentInfo.invoice_currency }}</p>
        <p>Token: {{ paymentInfo.payment_token }}</p>
        <p>Address: {{ paymentInfo.payment_address }}<br>Please deposit to this address</p>
     
      </div>
    </card>
    <card v-if="error">
      <p>{{ error }}</p>
    </card>
    </div>
</template>

<script>
import AddDirePay from '../../../../CustomComponent/DirePay/AddDirePay.vue'
export default {
  components: {
    AddDirePay,
},
  data() {
      return {
        orderData: {
        amount: '', // Replace with the actual order amount
        currency: '', // Replace with the desired currency
        token: '',
        description: ''
       // merchantId: ''
      },
      merchantList: [],
      paymentInfo: null,
      error: null,
     };
  },
  computed: {
    formattedAmount: {
      get() {
        return this.orderData.amount.toString(); // Convert to string to show in the input
      },
      set(newValue) {
        // Convert back to number when the user enters a new value
        this.orderData.amount = Number(newValue);
      },
    },
},
// mounted() {
//   this.getMerchantIDs(); // Gọi hàm để lấy dữ liệu merchantInfo
// },
  methods: {
    async createPayment() {
      this.orderData.amount = Number(this.orderData.amount);
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.direpay.createPaymentApi, this.orderData))
    // console.log('message: ',ResutlApi.data);
      if (ResutlApi.data) {
        if(ResutlApi.data.message.indexOf('Successfully') > -1){
          this.paymentInfo = ResutlApi.data;
        }else{
          this.error = ResutlApi.data.message
        }
          
      }

    },
  
 },
};
</script>
