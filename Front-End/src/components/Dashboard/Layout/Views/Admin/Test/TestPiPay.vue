<template>
    <div>
      <card>
        <div slot="header">
          <h4>Order PiPay</h4>
        </div>
  
        <AddOrderPiPay :orderData.sync="orderData" :merchantList="merchantList"/>
  
        <div slot="footer">
          <p-button @click="startTransaction" type="primary">Add</p-button>
        </div>
      </card>
      </div>
  </template>
  
  <script>
import AddOrderPiPay from '../../../../CustomComponent/PiPayWallet/AddOrder.vue'
  export default {
    components: {
      AddOrderPiPay,
  },
    data() {
        return {
          orderData: {
          amount: '', // Replace with the actual order amount
          currency: '', // Replace with the desired currency
          description: '',
          merchantId: ''
        },
        merchantList: [],
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
  mounted() {
    this.getMerchantIDs(); // Gọi hàm để lấy dữ liệu merchantInfo
  },
    methods: {
      async startTransaction() {
        this.orderData.amount = Number(this.orderData.amount);
        const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.pipay.startTransaction, this.orderData))
       const url = ResutlApi.data.url;
        const pipayOrderData = ResutlApi.data.reqPipayData;
       
        // Create a new payment form
        const newForm = document.createElement('form');
        newForm.action = url; // Set the action URL
        newForm.method = 'POST'; // Set the method to POST
        newForm.enctype = 'application/x-www-form-urlencoded'; // Set the enctype
        newForm.acceptCharset = 'UTF-8'; // Set the accept-charset

        // Loop through the pipayOrderData and add input fields to the new form
      for (const key in pipayOrderData) {
        if (Object.prototype.hasOwnProperty.call(pipayOrderData, key)) {
          const value = pipayOrderData[key];
          const inputField = document.createElement('input');
          console.log(key +': '+value) ;
          inputField.type = 'hidden';
          inputField.name = key;
          inputField.value = value;
          newForm.appendChild(inputField);
        }
      }

        // Append the new form to the DOM
        document.body.appendChild(newForm);

        // Submit the new form
        newForm.submit();

        // Clean up: remove the new form from the DOM after submitting
       document.body.removeChild(newForm);

      },
      async getMerchantIDs() {
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.get(this.$api.pipay.getMerchantIDs))
      console.log('ResutlApi='+ResutlApi.data);
      if(ResutlApi.data){
        this.merchantList= ResutlApi.data;
      }
     },
   },
  };
  </script>
  