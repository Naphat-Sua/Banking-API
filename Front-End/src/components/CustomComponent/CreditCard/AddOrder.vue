<template>
  <div>
    <div class="row">
      <!-- Input field cho Order ID -->
      <!-- <fg-input :class="conlumAccount" label="Order ID" placeholder="Input OrderID" v-model="orderData.orderid"></fg-input> -->
       <!-- Input field cho Merchant ID -->
    <fg-input :class="conlumAccount" label="Merchant ID" style="width: 300px;">
      <el-select class="select-default" placeholder="Please select Merchant ID"  v-model="selectedMerchantId">
        <el-option
          v-for="merchantIdOption in merchantIdOptions"
          :key="merchantIdOption.value"
          :value="merchantIdOption.value"
          :label="merchantIdOption.label"
        />
      </el-select>
    </fg-input>
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

      <!-- Input field cho Description -->
      <fg-input :class="conlumAccount" label="Description" placeholder="Input Description" v-model="orderData.description"></fg-input>

      <!-- Các input fields cho thông tin khác -->
    </div>

  </div>
</template>

<script>
export default {
  name: "AddOrder",
  props: ['orderData', 'merchantList', 'merchantInfo'],
  computed: {
    selectedMerchantId: {
      get() {
        return this.merchantInfo;
      },
      set(value) {
        this.$emit('update:merchantInfo', value);
      }
    },
    conlumAccount() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    },
    conlumPrice() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    },
    currencyOptions() {
      // Danh sách tùy chọn cho currency
      return [
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
      ];
    },
    merchantIdOptions() {
  // Danh sách tùy chọn cho Merchant ID
  return this.merchantList.map(merchant => ({
    value: merchant.merchantId + ':' + merchant.apiKey,
    label: merchant.merchantId,
    apiKey: merchant.apiKey, // Thêm apiKey vào đây
  }));
},

  },
 
}
</script>

<style scoped>

</style>
