<template>
  <div>
    <fg-input v-if="$role !== 'customer'" label="Customer">
      <el-select class="select-info" placeholder="Please customer"
                 v-model="data.customerId">
        <el-option v-for="option in search.customer"
                   :value="option.value"
                   :label="option.label"
                   :key="option.value">
        </el-option>
      </el-select>
    </fg-input>
    <fg-input placeholder="Order ID" type="text" label="Order ID" v-model="data.orderid"/>
    <fg-input placeholder="Price" type="number" label="Price" v-model="data.price"/>
    <fg-input placeholder="Account" type="text" label="Account" v-model="data.account"/>
    <fg-input placeholder="Name account bank" type="text" label="Name" v-model="data.name"/>
    <fg-input label="Type bank">
      <el-select class="select-info" placeholder="Please BankType"
                 v-model="data.to_banking">
        <el-option v-for="option in search.bank"
                   :value="option.value"
                   :label="option.label"
                   :key="option.value">
        </el-option>
      </el-select>
    </fg-input>
    <fg-input v-if="canCallback" placeholder="http://callback" type="text" label="Callback URL" v-model="data.callback"/>
    <p-checkbox v-if="canCallback" v-model="data.send_callback">SendCallback</p-checkbox>
    <p-checkbox v-if="canNoMdrAndFee" v-model="data.no_mdr">No MDR</p-checkbox>
    <p-checkbox v-if="canNoMdrAndFee" v-model="data.no_fee">No Fee</p-checkbox>
  </div>
</template>

<script>
export default {
  name: "AddWithdraw",
  props: ['data', 'search'],
  computed: {
    canNoMdrAndFee() {
      return (this.$role === 'admin' || this.$role === 'manager') && this.$route.path.indexOf('settlement') >= 0
    },
    canCallback(){
      return this.$route.path.indexOf('settlement') >= 0 ? false : true
    }
  }
}
</script>

<style scoped>

</style>
