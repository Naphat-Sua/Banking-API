<template>
  <div>
    <div class="card-body row">
      <div class="col-sm-12">
        <el-table stripe border
                  v-loading="load_data"
                  element-loading-text="Loading..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="convertData">
          <el-table-column min-width="100" prop="id" label="ID"/>
          <el-table-column min-width="150" prop="merchantId" label="MerchantID"/>
          <el-table-column min-width="150" prop="type" label="Type"/>
          <el-table-column min-width="150" prop="orderId" label="OrderID"/>
          <el-table-column min-width="150" label="Amount">
            <template slot-scope="scope">
              {{ scope.row.status === 'success' ? scope.row.approveAmount : scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column min-width="75" prop="currency" label="Currency"/>
          <el-table-column min-width="75" label="Status">
            <div slot-scope="props">
              <badge v-if="props.row.status === 'success'" type="success">
                Success
              </badge>
              <badge v-if="props.row.status === 'cancel' || props.row.status === 'refund'" type="danger">
                {{ props.row.status }}
              </badge>
              <badge v-if="props.row.status === 'waiting' || props.row.status === 'edit'" type="warning">
                {{ props.row.status }}
              </badge>
            </div>
            </el-table-column>
          <el-table-column min-width="100" label="Date">
            <div slot-scope="props">
              <span>Create:</span><br/>
              <span>{{ props.row.createAt }}</span><br/>
              <span>Update:</span><br/>
              <span>{{ props.row.updateAt }}</span><br/>
            </div>
            </el-table-column>
          
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Orders",
    props: ['data', 'load_data'],
    computed: {
      convertData() {
        return this.data;
      //   return this.data.map(value => {
      //     value.createAt = this.$moment(value.createAt).format('YYYY-MM-DD HH:mm:ss'),
      //     value.updateAt = this.$moment(value.updateAt).format('YYYY-MM-DD HH:mm:ss')
      //     return value
      //   })
       }
    },
   
  }
</script>

<style scoped>

</style>
