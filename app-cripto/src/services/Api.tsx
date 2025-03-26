import axios from 'axios'

export const Axios = (offeset: number) => {
  const url = `https://api.coincap.io/v2/assets?limit=${offeset}&offset=0`

  const api = axios.create({
    baseURL: url,
  })

  return api
}

export const AxiosDetail = (cripto: string) => {
  const url = `https://api.coincap.io/v2/assets/${cripto}`

  const api = axios.create({
    baseURL: url,
  })

  return api
}
