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

      <!-- Input field cho Description -->
      <fg-input :class="conlumAccount" label="Description" placeholder="Input Description" v-model="orderData.description"></fg-input>

      <!-- Các input fields cho thông tin khác -->
    </div>

  </div>
</template>

<script>
export default {
  name: "AddOrderMastercard",
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
      return [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        // Thêm các tùy chọn currency khác tại đây
      ];
    },
  }
}
</script>

<style scoped>

</style>
