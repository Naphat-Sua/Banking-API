<template>
  <div>
    <modal :show.sync="log.modal" width="100%" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Log Order</h4>
      <div>
        <el-table stripe border :data="covertDataLog">
          <el-table-column min-width="100" prop="id" label="ID"/>
          <el-table-column min-width="150" prop="user.name" label="Username"/>
          <el-table-column min-width="100" prop="role" label="Role"/>
          <el-table-column min-width="100" prop="status" label="Status"/>
          <el-table-column min-width="100" prop="comment" label="Comment"/>
          <el-table-column min-width="200" prop="createdAt" label="CreateAt"/>
        </el-table>
      </div>
      <div slot="footer">
        <p-button type="info" @click.native="$emit('CloseLog')">OK</p-button>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "LogOrder",
    props: ['log'],
    computed: {
      covertDataLog() {
        const mapData = this.log.data ? this.log.data.map(value => {
          value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
          return value
        }) : []
        return mapData
      }
    }
  }
</script>

<style scoped>

</style>
