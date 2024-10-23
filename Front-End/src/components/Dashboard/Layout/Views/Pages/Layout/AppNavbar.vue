<template>
  <navbar navbar-menu-classes="navbar-right" v-model="showMenu">
    <div class="navbar-wrapper">
      <a class="navbar-brand" href="/login">{{ $env === 'shop2pay' ? 'Shop2pay' : $env }}</a>
    </div>
    <template slot="navbar-menu">

    </template>
  </navbar>
</template>

<script>
  import {Navbar} from 'src/components/UIComponents'
  export default {
    name: 'main-navbar',
    components: {
      Navbar
    },
    data() {
      return {
        showMenu: false
      }
    }
  }
</script>

<style scoped>

</style>
