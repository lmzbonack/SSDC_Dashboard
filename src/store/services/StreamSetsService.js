/**
 * Methods for fetching data from StreamSets
 */

import axios from 'axios'

export default {
  fetchAll () {
    return axios.get(`${process.env.VUE_APP_STREAMSETS_SERVER}/rest/v1/pipelines/status`, {
      auth: {
        username: process.env.VUE_APP_STREAMSETS_USERNAME,
        password: process.env.VUE_APP_STREAMSETS_PASSWORD
      }
    })
  },
  stopAll () {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/stop-oribus`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  startAll () {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/start-oribus`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
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
