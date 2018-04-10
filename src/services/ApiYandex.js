import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://translate.yandex.net/api/v1.5/tr.json/`
  })
}
