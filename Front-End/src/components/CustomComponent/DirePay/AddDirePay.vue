<template>
  <div>
    <div class="row">
      <!-- Input field cho Order ID -->
      <!-- <fg-input :class="conlumAccount" label="Order ID" placeholder="Input OrderID" v-model="orderData.orderid"></fg-input> -->

      <!-- Input field cho Amount -->
      <fg-input :class="conlumPrice" label="Amount" placeholder="Input Amount" v-model="orderData.amount" type="number"></fg-input>

      <!-- Input field cho Currency -->
      <fg-input :class="conlumAccount" label="Currency">
        <el-select class="select-default" placeholder="Please select currency" v-model="orderData.currency">
          <el-option
            v-for="currencyOption in currencyOptions"
            :key="currencyOption.value"
            :value="currencyOption.value"
            :label="currencyOption.label"
          />
        </el-select>
      </fg-input>

      <fg-input :class="conlumAccount" label="Token">
        <el-select class="select-default" placeholder="Please select Token" v-model="orderData.token">
          <el-option
            v-for="tokenOption in tokenOptions"
            :key="tokenOption.value"
            :value="tokenOption.value"
            :label="tokenOption.label"
          />
        </el-select>
      </fg-input>
       <!-- Input field cho Description -->
       <fg-input :class="conlumAccount" label="Description" placeholder="Input Description" v-model="orderData.description"></fg-input>
    </div>

  </div>
 </template>

<script>
export default {
  name: "AddOrderDirePay",
  props: ['orderData'],
  computed: {
    conlumAccount() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    },
    conlumPrice() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    },
    currencyOptions() {
      // Danh sách tùy chọn cho currency
      //MYR, IDR, THB, VND, KRW, BRL,,BDT)
      return [
        { value: 'MYR', label: 'MYR' },
        { value: 'IDR', label: 'IDR' },
        { value: 'THB', label: 'THB' },
        { value: 'VND', label: 'VND' },
        { value: 'KRW', label: 'KRW' },
        { value: 'BRL', label: 'BRL' },
        { value: 'BDT', label: 'BDT' },
        // Thêm các tùy chọn currency khác tại đây
      ];
    },
    tokenOptions() {
      // List of options for payment tokens
      return [
        { value: 'USDT', label: 'USDT' },
        { value: 'ERC20-USDT', label: 'ERC20-USDT' },
        { value: 'TRC20-USDT', label: 'TRC20-USDT' },
        { value: 'USDC', label: 'USDC' },
        { value: 'ERC20-USDC', label: 'ERC20-USDC' },
        { value: 'TRC20-USDC', label: 'TRC20-USDC' },
        { value: 'BTC', label: 'BTC' },
        { value: 'ETH', label: 'ETH' },
        { value: 'BSC-BNB', label: 'BSC-BNB' },
        { value: 'BEP20-DOGE', label: 'BEP20-DOGE' },
        { value: 'BEP20-EOS', label: 'BEP20-EOS' },
        { value: 'BEP20-BUSD', label: 'BEP20-BUSD' },
        { value: 'ERC20-DAI', label: 'ERC20-DAI' },
        { value: 'ERC20-SHIB', label: 'ERC20-SHIB' },
        { value: 'ERC20-BUSD', label: 'ERC20-BUSD' },
        { value: 'XRP', label: 'XRP' },
        { value: 'ADA', label: 'ADA' },
        // Add more token options here
      ];
    }

  }
}
</script>

<style scoped>

</style>
