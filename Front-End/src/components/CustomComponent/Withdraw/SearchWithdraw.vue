<template>
  <div>
    <div class="row">
      <fg-input :class="conlum" v-if="$role !== 'customer'" label="Customer">
        <el-select class="select-default" placeholder="Please customer"
                   v-model="search.query.customer">
          <el-option v-for="option in search.customer"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlum" label="Order ID"
                placeholder="Input OrderID" v-model="search.query.orderid"></fg-input>
      <fg-input :class="conlum" label="Status">
        <el-select class="select-default" placeholder="Please status"
                   v-model="search.query.status">
          <el-option v-for="option in search.status"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlum" label="Agent" v-if="$role !== 'customer' && $role !== 'agent'">
        <el-select class="select-default" placeholder="Please Agent"
                   v-model="search.query.agent">
          <el-option v-for="option in search.agent"
                     :value="option.value"
                     :label="option.label"
                     :key="option.value">
          </el-option>
        </el-select>
      </fg-input>
      <fg-input :class="conlum" label="Price"
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
    name: "SearchWithdraw",
    props: ['search'],
    computed: {
      conlum(){
        return this.$role !== 'customer' ? this.$role == 'agent' ? 'col-sm-12 col-md-6 col-lg-3':'col-sm-12 col-md-6 col-lg-2' : 'col-sm-12 col-md-6 col-lg-4'
      }
    }
  }
</script>

<style scoped>

</style>
