import axios from 'axios'

const url = 'https://api.coincap.io/v2/assets?limit=10&offset=0'

const api = axios.create({
  baseURL: url,
})

export default api
