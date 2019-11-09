<template>
  <modal :name="'detail-modal' + pipelineName"
         @opened="opened"
         :scrollable="true"
         height="auto"
         width="60%"
         :adaptive="true">
    <div class="content-wrap">
      <h2>{{ pipelineName.slice(0,-36) }}</h2>
        <p><strong>Last record recieved: </strong> {{ humanizeStreamSetsTime(analyticsPayload.lastRecordTime) }}</p>
        <p><strong>Input: </strong> {{ analyticsPayload.inputCounter }}</p>
        <p><strong>Output: </strong> {{ analyticsPayload.outputCounter }}</p>
        <p><strong>Error: </strong> {{ analyticsPayload.errorCounter }}</p>
      <button id="hideButton"
              type="buttton"
              v-on:click="hide">
              Close
      </button>
    </div>
  </modal>
</template>

<script>
import StreamSetsService from '../store/services/StreamSetsService'
let moment = require('moment')

export default {
  name: 'PipelineDetailsModal',
  props: {
    pipelineName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      analyticsPayload: {
        inputCounter: null,
        outputCounter: null,
        errorCounter: null,
        lastRecordTime: null
      }
    }
  },
  methods: {
    hide () {
      this.$modal.hide(`detail-modal${this.pipelineName}`)
    },
    humanizeStreamSetsTime (val) {
      return moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    opened (event) {
      StreamSetsService.fetchMetrics(this.pipelineName).then(response => {
        this.analyticsPayload.inputCounter = response.data.counters['pipeline.batchInputRecords.counter'].count
        this.analyticsPayload.outputCounter = response.data.counters['pipeline.batchOutputRecords.counter'].count
        this.analyticsPayload.errorCounter = response.data.counters['pipeline.batchErrorRecords.counter'].count
        this.analyticsPayload.lastRecordTime = response.data.gauges['RuntimeStatsGauge.gauge'].value.timeOfLastReceivedRecord
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.v--modal-overlay[data-modal="detail-modal"] {
  background: transparent;
}

#hideButton {
  background-color: rgba(0, 125, 132, 0.4);
  border: none;
  border-radius: 5px;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.content-wrap{
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
