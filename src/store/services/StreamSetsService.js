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
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/error-logs?page=${page}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  fetchTelemetry (page) {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/telemetry?page=${page}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
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
  fetchQueueCounts () {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/change-count`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  startPipeline (pipeline) {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/start-pipeline?pipeline=${pipeline}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  },
  stopPipeline (pipeline) {
    return axios.get(`${process.env.VUE_APP_LAMBDA_URL}/stop-pipeline?pipeline=${pipeline}`, {
      headers: {
        'x-api-key': process.env.VUE_APP_LAMBDA_API_KEY
      }
    })
  }
}
