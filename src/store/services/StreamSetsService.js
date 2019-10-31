/**
 * Methods for fetching data from StreamSets
 */

import axios from 'axios'

console.log(String(process.env.VUE_APP_STREAMSETS_USERNAME))
export default {
  fetchAll () {
    return axios.get(`${process.env.VUE_APP_STREAMSETS_SERVER}/rest/v1/pipelines/status`, {
      auth: {
        username: process.env.VUE_APP_STREAMSETS_USERNAME,
        password: process.env.VUE_APP_STREAMSETS_PASSWORD
      }
    })
  },

  fetchMetrics (pipeline) {
    return axios.get(`${process.env.VUE_APP_STREAMSETS_SERVER}/rest/v1/pipeline/${pipeline}/metrics`, {
      auth: {
        username: process.env.VUE_APP_STREAMSETS_USERNAME,
        password: process.env.VUE_APP_STREAMSETS_PASSWORD
      }
    })
  }

}
