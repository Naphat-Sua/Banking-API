<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div>
      <a class="navbar-brand" href="/">{{ $env === 'shop2pay' ? 'Shop2pay' : $env }}</a>
    </div>

    <template slot="navbar-menu">
      <div v-if="datauser">Welcome {{datauser.name}} ({{datauser.username}})</div>
    </template>
  </navbar>
</template>
<script>
  import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },
    data() {
      return {
        activeNotifications: false,
        showNavbar: false,
        datauser:null
      }
    },
    mounted(){
      this.$callapi.callAPIHandler(this.axios.get(this.$api.profile)).then(Result=>{
        if(Result.data){
          // console.log(Result.data)
          this.datauser = Result.data
        }
      })
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown() {
        this.activeNotifications = false
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },
      toggleNavbar() {
        this.showNavbar = !this.showNavbar;
      }
    }
  }

</script>
<style>

</style>
