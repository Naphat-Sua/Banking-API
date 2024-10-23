import axios from 'axios'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  callAPIHandler: async (promise) => {
    const response = {data: null, error: null}
    try {
      response.data = (await promise).data
      } catch (error) {
      if (error.response && error.response.status == 401) {
        if (window.location.pathname != '/login') {
          localStorage.removeItem('token')
          delete axios.defaults.headers.Authorization
          window.location.href = "/login"
        }
      }
      if (error.response) {
        const title = 'Error status ' + error.response.status
        console.log(error.response)
        const message = error.response.data && error.response.data.message ? error.response.data.message && Array.isArray(error.response.data.message) ? error.response.data.message.reduce((a, b) => (a ? `- ${a}<br/>` : '') + (b ? `- ${b}<br/>` : '')) : error.response.data.message : error.response.data && error.response.data.error ? error.response.data.error : ''
        swal.fire(title, message, 'error')
      }
      response.error = error.response
    }
    return response
  }
}
