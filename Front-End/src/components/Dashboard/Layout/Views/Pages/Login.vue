<template>
  <div class="login-page">
    <app-navbar></app-navbar>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form @submit.prevent="login">
                <card type="login">
                  <h3 slot="header" class="header text-center">Login</h3>

                  <fg-input v-model="form.username" addon-left-icon="nc-icon nc-single-02"
                            placeholder="First Name..."></fg-input>

                  <fg-input v-model="form.password" addon-left-icon="nc-icon nc-key-25" placeholder="Password"
                            type="password"></fg-input>

                  <br>

                  <p-button native-type="submit" slot="footer" type="warning" round block class="mb-3">Login</p-button>
                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
import {Button, Card, Checkbox} from 'src/components/UIComponents';
import AppNavbar from './Layout/AppNavbar'
import AppFooter from './Layout/AppFooter'

export default {
  components: {
    Card,
    AppNavbar,
    AppFooter,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open')
    },
    closeMenu() {
      document.body.classList.remove('nav-open')
      document.body.classList.remove('off-canvas-sidebar')
    },
    async login() {
      console.log('api='+this.$api.login)
      const ResutlApi = await this.$callapi.callAPIHandler(this.axios.post(this.$api.login, this.form))
      console.log('cccccccccc'+ResutlApi.data)
      if (ResutlApi.data && ResutlApi.data.accessToken) {
        const Token = ResutlApi.data.accessToken
        console.log('token='+Token)
        this.axios.defaults.headers.Authorization = 'Bearer ' + Token
        localStorage.setItem('token', Token)
        this.$socket.emit('connection', Token)
        this.$router.push('/')
      }
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  beforeDestroy() {
    this.closeMenu()
  }
}
</script>
<style>
</style>
