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
          <el-table-column min-width="150" prop="username" label="Username"/>
          <el-table-column min-width="150" prop="name" label="Name"/>
          <el-table-column min-width="150" prop="email" label="Email"/>
          <el-table-column min-width="150" prop="phone" label="Phone"/>
          <el-table-column label="Ban">
            <div slot-scope="props">
              <p-switch v-model="props.row.ban" @input="update_ban(props.row)"></p-switch>
            </div>
          </el-table-column>
          <el-table-column min-width="100" prop="createdAt" label="CreatedAt"/>
          <el-table-column min-width="150">
            <div slot-scope="props">
              <p-button type="warning" @click="$emit('update',{type: 'edit', data: props.row})" icon><i
                class="nc-icon nc-settings-gear-65"></i></p-button>
              <p-button type="danger" @click="$emit('delete', props.row.id )" icon><i
                class="nc-icon nc-simple-remove"></i></p-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Users",
    props: ['data', 'load_data'],
    computed: {
      convertData() {
        return this.data.map(value => {
          value.ban = value.ban ? true : false
          value.createdAt = this.$moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
          return value
        })
      }
    },
    methods: {
      update_ban(data){
        this.$emit('updateban', {id: data.id, ban: data.ban})
      }
    }
  }
</script>

<style scoped>

</style>
