<template>
  <div>
    <div class="row">
      <fg-input size="large" class="col-sm-3" label="Name"
                placeholder="Input Name" v-model="search.query.name"></fg-input>
      <fg-input size="large" class="col-sm-3" label="Email"
                placeholder="Input Email" v-model="search.query.email" type="email"></fg-input>
      <div class="col-sm-6">
        <label>Create</label><br>
          <el-date-picker v-model="search.query.create"
                          type="daterange"
                          start-placeholder="Start date"
                          end-placeholder="End date">
          </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchAgent",
    props: ['search'],
  }
</script>

<style scoped>

</style>
