<template>
  <div>
    <card>
      <div slot="header">
        <h4>Create Order</h4>
      </div>

      <AddOrder :orderData.sync="orderData"  :merchantList="merchantList" :merchantInfo.sync="merchantInfo"/>

      <div slot="footer">
        <p-button @click="initiateCheckout" type="primary">Add</p-button>
      </div>
    </card>
  
    <card>
    <div id="embed-target"></div>
  </card>
     <div>
      <script type="application/javascript" defer src="https://test-gateway.mastercard.com/static/checkout/checkout.min.js"></script>
    </div> 
    
  </div>
</template>

<script>
import AddOrder from '../../../../CustomComponent/CreditCard/AddOrder.vue'
export default {
  components: {
    AddOrder,
  },
  data() {
    return {
     orderData: {
        amount: null,
        currency: "",
        description: "",
      },
      merchantList: [],
      isLoading: false,
      isPaymentStarted: false,
      sessionId: null,
      merchantInfo: '',
    };
  },
  mounted() {
    this.getMerchantIDs(); // Gọi hàm để lấy dữ liệu merchantInfo
  },
  methods: {
   async initiateCheckout() {
      this.isLoading = true;
      // Chuyển đổi giá trị amount thành số trước khi gửi
      this.orderData.amount = Number(this.orderData.amount);
      console.log('merchant info='+this.merchantInfo);
      const merchantId = this.merchantInfo.split(':')[0];
      const apiKey = this.merchantInfo.split(':')[1];
      const headers = {
      'Authorization': `Basic ${Buffer.from(`${merchantId}:${apiKey}`).toString('base64')}`,
      };
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.creditcard.checkout, this.orderData,{headers}))
      console.log('ResutlApi='+ResutlApi.data);
      if(ResutlApi.data){
          this.sessionId = ResutlApi.data;
          console.log('SESSIONID========='+this.sessionId)
          this.isLoading = false;
          this.startEmbeddedCheckout();
        }
    
    },
    async getMerchantIDs() {
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.get(this.$api.creditcard.getMerchantIDs))
      console.log('ResutlApi='+ResutlApi.data);
      if(ResutlApi.data){
        this.merchantList= ResutlApi.data;
      }
    
    },
    async loadCheckoutJS() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://test-gateway.mastercard.com/static/checkout/checkout.min.js';
        script.dataset.error = 'errorCallback';
        script.dataset.cancel = 'cancelCallback';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    async startEmbeddedCheckout() {
  // await this.loadCheckoutJS(); // Tải checkout.min.js trước khi gọi Checkout.configure()
      if (this.sessionId) {
        function errorCallback(error) {
                  console.log(JSON.stringify(error));
            }
            function cancelCallback() {
                  console.log('Payment cancelled');
            }
        
         // Call Checkout.configure() after fetching the session ID
        Checkout.configure({
          session: {
            id: this.sessionId,
          },
          // order: {
          //       amount: 100,
          //       currency: 'USD',
          //       description: 'Ordered goods',
          //      id: '1239000'
          //   },
          // interaction: {
          //   merchant: {
          //     name: 'PipaySub006',
          //     address: {
          //       line1: 'address 1',
          //       line2: 'address 2'
          //     }
          //   },
          //  // returnUrl: "http://192.168.1.5:8000/mastercard/confirmMastercard"
          // }
        });

        // Start the payment process by displaying the checkout interaction in an Embedded Page
      window.Checkout.showEmbeddedPage('#embed-target');
     // Checkout.showPaymentPage()
       // this.isPaymentStarted = true;
      }
    },
    
  },
  
};
</script>
