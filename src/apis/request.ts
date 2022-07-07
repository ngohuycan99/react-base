import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const request = axios.create({
  baseURL: BASE_URL,
})

axios.interceptors.request.use(
  async config => {
    const accessToken = 'Bearer abcd'
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      config.params = {
        ...config.params,
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
