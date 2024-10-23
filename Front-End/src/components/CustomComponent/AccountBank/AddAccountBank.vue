<template>
  <div>
    <fg-input placeholder="0123456789" label="Account Number" v-model="value.account"></fg-input>
    <fg-input label="Type bank">
      <el-select class="select-info"
                 placeholder="Please Typebank"
                 v-model="banktype_id">
        <el-option v-for="option in select.banktype"
                   class="select-danger"
                   :value="option.value"
                   :label="option.label"
                   :key="option.value">
        </el-option>
      </el-select>
    </fg-input>
    <fg-input placeholder="Firstname LastName" label="Account Name" v-model="value.name"></fg-input>
    <fg-input placeholder="0800000000" label="Promptpay" v-model="value.promptpay"></fg-input>
    <p-checkbox v-model="value.use">Use</p-checkbox>
  </div>
</template>

<script>
  export default {
    name: "AddAccountBank",
    props: ['value', 'select'],
    data() {
      return {
        banktype_id: this.value.banktype_id,
      }
    },
    watch: {
      value(New) {
        this.banktype_id = New.banktype_id
      },
      banktype_id(New) {
        this.$emit('UpdateData', {type: 'typebank', banktype_id: New})
      },
    }
  }
</script>

<style scoped>

</style>
