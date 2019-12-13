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
  fetchMetrics (pipeline) {
    return axios.get(`${process.env.VUE_APP_STREAMSETS_SERVER}/rest/v1/pipeline/${pipeline}/metrics`, {
      auth: {
        username: process.env.VUE_APP_STREAMSETS_USERNAME,
        password: process.env.VUE_APP_STREAMSETS_PASSWORD
      }
    })
  },
  fetchErrors (page) {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/read/errors/${page}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  fetchTelemetry (page) {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/read/telemetry/${page}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  fetchQueueCounts () {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/read/queues`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  stopAll () {
    return axios.post(`${process.env.VUE_APP_LAMBDA_URL}/run/stop-oribus`, {}, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  startAll () {
    return axios.post(`${process.env.VUE_APP_LAMBDA_URL}/run/start-oribus`, {}, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  startPipeline (pipeline) {
    return axios.post(`${process.env.VUE_APP_LAMBDA_URL}/run/start-pipeline/${pipeline}`, {}, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  stopPipeline (pipeline) {
    return axios.post(`${process.env.VUE_APP_LAMBDA_URL}/run/stop-pipeline/${pipeline}`, {}, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  }
}
