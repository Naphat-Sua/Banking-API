<template>
  <div>
    <fg-input v-if="$role !== 'customer'" label="Customer">
      <el-select
        placeholder="Customer Select"
        class="select-default"
        v-model="data.customer_id">
        <el-option v-for="option in selects.customer"
                   class="select-default"
                   :value="option.value"
                   :label="option.label"
                   :key="option.label">
        </el-option>
      </el-select>
    </fg-input>
    <fg-input placeholder="Order ID" type="text" label="Order ID" v-model="data.orderid"></fg-input>
    <fg-input placeholder="Price" type="number" label="Price" v-model="data.price"></fg-input>
    <div v-if="!data.qrcode">
      <fg-input placeholder="Account" type="text" label="From account" v-model="data.from_account"></fg-input>
      <fg-input label="Bank type">
        <el-select
          placeholder="Bank type Select"
          class="select-default"
          v-model="data.from_bank">
          <el-option v-for="option in selects.banktype_string"
                     class="select-default"
                     :value="option.value"
                     :label="option.label"
                     :key="option.label">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input placeholder="Name account bank" type="text" label="From name" v-model="data.from_name"></fg-input>
    </div>
    <fg-input placeholder="http://callback/" type="text" label="Url Callback" v-model="data.callback"></fg-input>
    <p-checkbox v-model="data.send_callback">Send callback</p-checkbox>
    <p-checkbox v-model="data.qrcode">QRcode</p-checkbox>
  </div>
</template>

<script>
export default {
  name: "AddDeposit",
  props: ['data', 'selects'],
}
</script>

<style scoped>

</style>

