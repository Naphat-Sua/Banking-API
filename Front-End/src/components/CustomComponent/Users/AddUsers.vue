<template>
  <div>
    <fg-input placeholder="Name" v-model="data.name" label="Name"/>
    <fg-input placeholder="Username" v-model="data.username" label="Username"/>
    <fg-input v-model="data.password">
      <div slot="label">
        Password
        <p-button @click="random" size="sm" type="default">Random</p-button>
      </div>
    </fg-input>
    <fg-input placeholder="Email" v-model="data.email" label="Email"/>
    <fg-input placeholder="Phone" v-model="data.phone" label="Phone"/>
    <p-checkbox v-model="data.ban">Ban</p-checkbox>
  </div>
</template>

<script>
export default {
  name: "AddUsers",
  props: ['data'],
  methods: {
    random() {
      this.data.password = this.$randtoken.generate(10)
    }
  }
}
</script>

<style scoped>

</style>
