<template>
  <div>
    <card>
      <div slot="header">
        <h4>Type Bank</h4>
      </div>
      <div>
        <el-table stripe border v-loading="load_data" element-loading-text="Loading..."
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="data">
          <el-table-column min-width="50" prop="id" label="ID"/>
          <el-table-column min-width="50" prop="key" label="Key"/>
          <el-table-column min-width="200" prop="name" label="Name"/>
          <el-table-column min-width="120" prop="name_en" label="Name En"/>
        </el-table>
      </div>
    </card>
  </div>
</template>

<script>
  export default {
    name: "TypeBank",
    mounted() {
      this.getData()
    },
    data() {
      return {
        load_data: false,
        data: []
      }
    },
    methods: {
      async getData() {
        const Result = await this.$callapi.callAPIHandler(this.axios.get('/typebank'))
        if (Result.data) {
          this.data = Result.data
        }
      }
    },
  }
</script>

<style scoped>

</style>
