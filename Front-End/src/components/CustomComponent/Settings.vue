<template>
  <div>
    <card v-if="$role === 'customer'">
      <div slot="header">
        <h4>System integration</h4>
      </div>
      <fg-input disabled :value="key_api" label="Key API"></fg-input>
      <fg-input disabled :value="secertkey" label="SecertKey API"></fg-input>
      <fg-input v-model="webhook" label="Webhook or Callback"></fg-input>
    </card>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <card>
          <div slot="header">
            <h4>Setting Profile</h4>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <fg-input v-model="form_profile.firstname" label="Firstname"></fg-input>
            </div>
            <div class="col-sm-6">
              <fg-input v-model="form_profile.lastname" label="Lastname"></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <fg-input v-model="form_profile.email" label="E-mail"></fg-input>
            </div>
            <div class="col-sm-6">
              <fg-input v-model="form_profile.phone" label="Phone"></fg-input>
            </div>
          </div>
          <p-button @click="onSubmitProfile" type="success">Submit</p-button>
          <p-button @click="onResetSetting" type="danger">Reset</p-button>
        </card>
      </div>
      <div class="col-sm-12 col-md-6">
        <card>
          <div slot="header">
            <h4>Reset Password</h4>
            <fg-input type="password" v-model="form_resetpassword.currentpassword" label="Current password"></fg-input>
            <fg-input type="password" v-model="form_resetpassword.newpassword" label="New password"></fg-input>
            <fg-input type="password" v-model="form_resetpassword.confirmnewpassword"
                      label="Confirm new password"></fg-input>
          </div>
          <p-button @click="onSubmitResetPassword" type="success">Submit</p-button>
          <p-button @click="onResetPassword" type="danger">Reset</p-button>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted() {
    this.getDataApi()
  },
  data() {
    return {
      key_api: '',
      secertkey: '',
      webhook: '',
      profile: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        webhook: ''
      },
      form_profile: {
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
      },
      form_resetpassword: {
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: ''
      }
    }
  },
  methods: {
    async onSubmitResetPassword() {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.setting.resetpassword, this.form_resetpassword))
      if (Result.data) {
        this.axios.defaults.headers.Authorization = 'Bearer ' + Result.data.accessToken
        localStorage.setItem('token', Result.data.accessToken)
        this.$notify({
          type: 'success',
          message: 'Resetpassword success'
        })
      }
    },
    async onSubmitWebhook() {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.setting.webhook, {
        webhook: this.webhook
      }))
      if (Result.data) {
        this.$notify({
          type: 'success',
          message: 'Webhook setting success'
        })
        this.getDataApi()
      }
    },
    async onSubmitProfile() {
      const Result = await this.$callapi.callAPIHandler(this.axios.patch(this.$api.setting.profile, this.form_profile))
      if (Result.data) {
        this.$notify({
          type: 'success',
          message: 'Profile setting success'
        })
        this.getDataApi()
      }
    },
    async getDataApi() {
      const Result = await this.$callapi.callAPIHandler(this.axios.get(this.$api.profile))
      if (Result.data) {
        const cutName = Result.data.name ? Result.data.name.split(' ') : ''
        this.profile = {
          firstname: cutName.length > 0 ? cutName[0] : '',
          lastname: cutName.length > 1 ? cutName[1] : '',
          email: Result.data.email,
          phone: Result.data.phone
        }
        if (this.$role === 'customer') {
          this.key_api = Result.data.authApi
          this.secertkey = Result.data.secertkey
          this.profile.webhook = Result.data.webhooks.length > 0 ? Result.data.webhooks[0].url : ''
        }
        this.onResetWebhook()
        this.onResetSetting()
      }
    },
    onResetWebhook() {
      this.webhook = this.profile.webhook
    },
    onResetPassword() {
      this.form_resetpassword = {
        currentpassword: '',
        newpassword: '',
        confirmnewpassword: ''
      }
    },
    onResetSetting() {
      this.form_profile = {
        firstname: this.profile.firstname,
        lastname: this.profile.lastname,
        email: this.profile.email,
        phone: this.profile.phone
      }
    },
  }
}
</script>

<style scoped>

</style>
