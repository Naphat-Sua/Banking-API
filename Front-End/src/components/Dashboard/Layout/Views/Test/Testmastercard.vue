<template>
  <div>
    <card>
      <div slot="header">
        <h4>Create Order</h4>
      </div>

      <AddOrderMastercard :orderData.sync="orderData"/>

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
//  import { Message } from 'element-ui'; // Import Message từ Element UI
export default {
 
  data() {
    return {
      formOrder: {
        id: '',
        amount: '',
        currency: '',
        description: '',
      },
      orderData: {
        orderid: "",
        amount: null,
        currency: "",
        description: "",
      },
      isLoading: false,
      isPaymentStarted: false,
      sessionId: null,
    };
  },
  
  methods: {
   
    validateForm() {
      let isValid = true;

      if (!this.orderData.orderid.trim()) {
        Message.error("Order ID is required."); // Sử dụng Message.error() để hiển thị thông báo lỗi
        isValid = false;
        return;
      }

      // Kiểm tra các trường khác ở đây (ví dụ: amount, currency, description)

      if (this.orderData.amount <= 0) {
        Message.error("Amount must be greater than 0.");
        isValid = false;
        return;
      }

      if (!this.orderData.currency) {
        Message.error("Currency is required.");
        isValid = false;
        return;
      }

      if (!this.orderData.description.trim()) {
        Message.error("Description is required.");
        isValid = false;
        return;
      }

      return isValid;
    },
    
    async initiateCheckout() {
      if (!this.validateForm()) return;  
      this.isLoading = true;
      // Chuyển đổi giá trị amount thành số trước khi gửi
      this.orderData.amount = Number(this.orderData.amount);
      console.log('orderID=========='+this.orderData.orderid);
      console.log('amount=========='+this.orderData.amount);
      console.log('currency=========='+this.orderData.currency);
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.mastercard_checkout, this.orderData))
      console.log('ResutlApi='+ResutlApi.data);
      if(ResutlApi.data){
          this.sessionId = ResutlApi.data;
          console.log('SESSIONID========='+this.sessionId)
          this.isLoading = false;
          this.startEmbeddedCheckout();
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
      console.log('sessionID==='+this.sessionId);
      console.log('Checkout==='+Checkout);
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
