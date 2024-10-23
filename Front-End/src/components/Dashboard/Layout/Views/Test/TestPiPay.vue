<template>
    <div>
      <card>
        <div slot="header">
          <h4>Pipay Transaction</h4>
        </div>
  
        <AddOrderMastercard :orderData.sync="orderData"/>
  
        <div slot="footer">
          <p-button @click="startTransaction" type="primary">Add</p-button>
        </div>
      </card>
      <!-- action="https://onlinepayment-uat.pipay.com/starttransaction"  -->
      <!-- <form ref="paymentForm">
      <input type="hidden" name="mid" v-bind:value="formData.mid" />
      <input type="hidden" name="lang" v-bind:value="formData.lang" />
      <input type="hidden" name="orderid" v-bind:value="formData.orderid" />
      <input type="hidden" name="orderDesc" v-bind:value="formData.orderDesc" />
      <input type="hidden" name="orderAmount" v-bind:value="formData.orderAmount" />
      <input type="hidden" name="currency" v-bind:value="formData.currency" />
      <input type="hidden" name="sid" v-bind:value="formData.sid" />
      <input type="hidden" name="did" v-bind:value="formData.did" />
      <input type="hidden" name="orderDate" v-bind:value="formData.orderDate" />
      <input type="hidden" name="payMethod" v-bind:value="formData.payMethod" />
      <input type="hidden" name="trType" v-bind:value="formData.trType" />
      <input type="hidden" name="confirmURL" v-bind:value="formData.confirmURL" />
      <input type="hidden" name="cancelURL" v-bind:value="formData.cancelURL" />
      <input type="hidden" name="description" v-bind:value="formData.description" />
      <input type="hidden" name="digest" v-bind:value="formData.digest" />
      <input type="hidden" name="cancelTimer" v-bind:value="formData.cancelTimer" />
      <input type="hidden" name="successScreenDelay" v-bind:value="formData.successScreenDelay" />
     
    </form> -->
     
     
    </div>
  </template>
  
  <script>

  export default {
   
    data() {
        return {
        orderData: {
        orderid: '',
        description: '',
        amount: 100, // Replace with the actual order amount
        currency: 'USD', // Replace with the desired currency
      },
      // formData: {
      //     mid: "",
      //     lang: "en",
      //     orderid: "",
      //     orderDesc: "Order.20171013",
      //     orderAmount: "100",
      //     currency: "USD",
      //     sid: "",
      //     did: "24095",
      //     orderDate: "2023-07-28T17:34:58.516+07:00",
      //     payMethod: "wallet",
      //     trType: "2",
      //     confirmURL: "http://192.168.1.5:8080/",
      //     cancelURL: "http://192.168.1.5:8080/",
      //     description: "Extra information",
      //     digest: "6a487d8e4203661c1e14e0bba32d5625",
      //     cancelTimer: "300",
      //     successScreenDelay: "0"
      //   }
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
    methods: {
      async startTransaction() {
        // this.orderData.amount = Number(this.orderData.amount);
        // console.log('orderID=========='+this.orderData.orderid);
        // console.log('amount=========='+this.orderData.amount);
        // console.log('currency=========='+this.orderData.currency);
        //get info from backend Nestjs
        this.orderData.amount = Number(this.orderData.amount);
        const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.pipay_startTransaction, this.orderData))
       // console.log('ResutlApi='+ResutlApi.data.url);
        //console.log('ResutlApi='+ResutlApi.data.reqPipayData.mid);
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

        // this.$refs.paymentForm.action = url; // Set the action URL
        // this.$refs.paymentForm.method = 'POST'; // Set the method to POST
        // this.$refs.paymentForm.enctype = 'application/x-www-form-urlencoded'; // Set the enctype
        // this.$refs.paymentForm.acceptCharset = 'UTF-8'; // Set the accept-charset
        //  // Set the values for hidden fields in the form
        // this.$refs.paymentForm.mid.value = pipayOrderData.mid;
        // this.$refs.paymentForm.lang.value = pipayOrderData.lang;
        // this.$refs.paymentForm.orderid.value = pipayOrderData.orderid;
        // this.$refs.paymentForm.orderDesc.value = pipayOrderData.orderDesc;
        // this.$refs.paymentForm.orderAmount.value = pipayOrderData.orderAmount;
        // this.$refs.paymentForm.currency.value = pipayOrderData.currency;
        // this.$refs.paymentForm.sid.value = pipayOrderData.sid;
        // this.$refs.paymentForm.did.value = pipayOrderData.did;
        // this.$refs.paymentForm.orderDate.value = pipayOrderData.orderDate;
        // this.$refs.paymentForm.payMethod.value = pipayOrderData.payMethod;
        // this.$refs.paymentForm.trType.value = pipayOrderData.trType;
        // this.$refs.paymentForm.confirmURL.value = pipayOrderData.confirmURL;
        // this.$refs.paymentForm.cancelURL.value = pipayOrderData.cancelURL;
        // this.$refs.paymentForm.description.value = pipayOrderData.description;
        // this.$refs.paymentForm.digest.value = pipayOrderData.digest;
        // this.$refs.paymentForm.cancelTimer.value = pipayOrderData.cancelTimer;
        // this.$refs.paymentForm.successScreenDelay.value = pipayOrderData.successScreenDelay;
        
        // // Submit the form
        
        // this.$refs.paymentForm.submit();
      //   const pipayOrderPost = await this.axios.post(url, this.formData, {
      //   headers: {
      //       'Access-Control-Allow-Origin': '*',
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Accept-Charset': 'UTF-8',
      //   },
      // });
      //  console.log(pipayOrderPost);
        // if(ResutlApi.data){
        //     this.sessionId = ResutlApi.data;
        //     this.isLoading = false;
        //     this.startEmbeddedCheckout();
        //   }
      },
     
     
      
    },
  };
  </script>
  