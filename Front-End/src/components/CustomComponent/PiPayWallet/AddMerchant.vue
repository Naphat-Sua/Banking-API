<template>
  <div>
    <fg-input placeholder="0123456789" label="Merchant ID" v-model="value.merchantId"></fg-input>
    <fg-input placeholder="" label="Store ID" v-model="value.storeId"></fg-input>
    <fg-input placeholder="" label="Device ID" v-model="value.deviceId"></fg-input>
    <fg-input v-model="value.password">
      <div slot="label">
        Password
        <p-button @click="random" size="sm" type="default">Random</p-button>
      </div>
    </fg-input>
    <fg-input placeholder="Notify to Email" label="Email" v-model="value.email"></fg-input>
    <fg-input placeholder="" label="Merchant URL" v-model="value.merchantUrl"></fg-input>
    <fg-input placeholder="Notify to Line" label="Line ID" v-model="value.lineId"></fg-input>
    <fg-input placeholder="Notify to Telegram" label="Telegram ChatID" v-model="value.telegramId"></fg-input>
    <!-- <p-checkbox v-model="value.use">Use</p-checkbox> -->
  </div>
</template>

<script>
  export default {
    name: "AddMerchantPiPay",
    props: ['value'],
    methods: {
    random() {
      this.value.password = this.$randtoken.generate(10)
    }
  }
  }
</script>

<style scoped>

</style>
