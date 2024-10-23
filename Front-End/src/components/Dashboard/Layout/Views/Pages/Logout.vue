<template>

</template>

<script>
  export default {
    name: "Logout",
    beforeMount() {
      this.Logout()
    },
    methods: {
      Logout() {
        localStorage.removeItem('token')
        this.$router.go('/')
      }
    }
  }
</script>

<style scoped>

</style>
