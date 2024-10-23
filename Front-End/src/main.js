/*!

  =========================================================
  * Vue Paper Dashboard 2 PRO - V2.3.0
  =========================================================

  * Product Page: https://www.creative-tim.com/product/vue-paper-dashboard-2-pro
  * Available with purchase of license from https://www.creative-tim.com/product/vue-paper-dashboard-2-pro
  * Copyright 2019 Creative Tim (https://www.creative-tim.com)
  * License Creative Tim (https://www.creative-tim.com/license)

  =========================================================

*/

import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import Notify from 'vue-notifyjs'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import axios from 'axios'
import VueAxios from 'vue-axios'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import * as moment from 'moment-timezone'
import VueSocketIO from 'vue-socket.io'
import * as randtoken from 'rand-token'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import App from './App.vue'
// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';
// router setup
import routes from './routes/routes'
// library imports
import ApiCall from './util/callapi'
import Api from './util/api'
import CheckRoleSubDomain from './util/checkRole'

import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './sidebarLinks'
import './registerServiceWorker'
//import { Message } from 'element-ui'; // Import Message từ Element UI
// plugin setup
Vue.prototype.$callapi = ApiCall
Vue.prototype.$api = Api

Vue.prototype.$swal = swal
Vue.prototype.$moment = moment
Vue.prototype.$role = CheckRoleSubDomain()
Vue.prototype.$randtoken = randtoken
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
//Vue.use(Message)
Vue.use(SideBar, { sidebarLinks: sidebarLinks })
locale.use(lang)
console.log('domain==='+Vue.prototype.$role);
const baseURLAPI = Vue.prototype.$role.includes('localhost')? process.env.VUE_APP_API_BASE_URL_DEV : process.env.VUE_APP_API_BASE_URL;
const env = process.env.VUE_APP_ENV || 'uni2pay'
Vue.config.productionTip = false;

axios.defaults.baseURL = baseURLAPI
Vue.prototype.$baseUrl = baseURLAPI
Vue.prototype.$env = env

Vue.use(new VueSocketIO({
  debug: true,
  connection: `${baseURLAPI}/webbackoffice`,
  options: {
    transports: ["websocket"]
  }
}))

Vue.use(Notify,
  {
    type: 'primary',
    timeout: 5000,
    horizontalAlign: 'right',
    verticalAlign: 'top'
  }
)

console.log(env)
console.log('api_url='+console.log(baseURLAPI))

console.log(CheckRoleSubDomain())

const Token = localStorage.getItem('token')
if (Token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
}

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// Sentry.init({
//   Vue,
//   dsn: process.env.VUE_APP_SENTRY_DNS,
//   integrations: [
//     new BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracingOrigins: ["*"],
//     }),
//   ],
//   tracesSampleRate: 0.2,
// });

router.beforeEach(((to, from, next) => {
  if (to.path !== '/login') {
    const token = localStorage.getItem('token');
    if (!token) {
      return next({ path: '/login' });
    } else {
      ApiCall.callAPIHandler(axios.get(Api.checkauth)).then(value => next()).catch(value => next('/login'))
    }
  }
  return next()
}))

initProgress(router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
