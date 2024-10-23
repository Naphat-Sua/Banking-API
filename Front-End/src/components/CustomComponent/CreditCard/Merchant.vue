<template>
  <div class="row">
    <div class="col-sm-12">
      <el-table stripe border v-loading="load_data"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="convertData">
        <el-table-column min-width="80" prop="id" label="id"/>
        <el-table-column min-width="180" prop="merchantName" label="Merchant Name"/>
        <el-table-column min-width="180" prop="merchantId" label="Merchant ID"/>
        <!-- <el-table-column min-width="150" prop="apiKey" label="API Key"/> -->
        <el-table-column min-width="150" prop="email" label="Email"/>
        <el-table-column min-width="150" prop="lineId" label="Line ID"/>
        <el-table-column min-width="150" prop="telegramId" label="Telegram ID"/>
        <!-- <el-table-column min-width="180" v-if="$role !== 'customer'" label="Use in customer">
          <div slot-scope="props">
            <p-button @click.native="show_modal_customer(props.row.id)">Manage customer</p-button>
          </div>
        </el-table-column> -->

        <!-- <el-table-column min-width="150" label="Status">
          <div slot-scope="props">
            <p-switch v-model="props.row.use" @input="update_ban(props.row)"></p-switch>
          </div>
        </el-table-column>
        <el-table-column min-width="150" v-if="$role === 'admin' || $role === 'manager'">
          <div slot-scope="props">
            <p-button type="warning" @click="$emit('update',{type: 'edit', data: props.row})" icon><i
              class="nc-icon nc-settings-gear-65"></i></p-button>
            <p-button type="danger" @click="$emit('update',{type: 'delete', data: props.row})" icon><i
              class="nc-icon nc-simple-remove"></i></p-button>
          </div>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Merchant",
  computed: {
    convertData() {
      const mapData = this.data.map(value => {
        //value.use = value.use ? true : false
        value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return value
      })
      return mapData
    },
  },
  methods: {
    show_modal_customer(data) {
      this.$emit('manage', data)
    },
    update_ban(data) {
      this.$emit('updateban', data)
    }
  },
  props: ['data', 'load_data']
}
</script>

<style scoped>

</style>
