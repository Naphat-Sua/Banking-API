<template>
  <div>
    <div class="row">
      <fg-input :class="conlumAccount" v-if="$role !== 'customer'" label="Customer">
        <el-select class="select-default" placeholder="Please customer"
                   v-model="search.query.customer">
          <el-option v-for="option in search.customer"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlumAccount" label="Account" v-if="$role !== 'agent' && $role !== 'customer'">
        <el-select class="select-default" placeholder="Please account"
                   v-model="search.query.account">
          <el-option v-for="option in search.account"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlumAccount" label="Agent" v-if="$role !== 'customer' && $role !== 'agent'">
        <el-select class="select-default" placeholder="Please Agent"
                   v-model="search.query.agent">
          <el-option v-for="option in search.agent"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlumAccount" label="Order ID"
                placeholder="Input OrderID" v-model="search.query.orderid"></fg-input>
      <fg-input :class="conlumAccount" label="Status">
        <el-select placeholder="Please status" class="select-default"
                   v-model="search.query.status">
          <el-option v-for="option in search.status"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlumPrice" label="Price"
                placeholder="Input Price" v-model="search.query.price" type="number"></fg-input>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <card>
          <h4 class="card-title">Create</h4>
          <div class="card-body">
            <fg-input>
              <el-date-picker v-model="search.query.create"
                              type="daterange"
                              start-placeholder="Start date"
                              end-placeholder="End date">
              </el-date-picker>
            </fg-input>
          </div>
        </card>
      </div>
      <div class="col-sm-6">
        <card>
          <h4 class="card-title">Update</h4>
          <div class="card-body">
            <fg-input>
              <el-date-picker v-model="search.query.update"
                              type="daterange"
                              start-placeholder="Start date"
                              end-placeholder="End date">
              </el-date-picker>
            </fg-input>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchDeposit",
  props: ['search'],
  computed: {
    conlumAccount() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    },
    conlumPrice() {
      return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-4' : 'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
    }
  }
}
</script>

<style scoped>

</style>
