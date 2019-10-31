<template>
  <modal :name="'detail-modal' + pipelineName"
         @opened="opened"
         :scrollable="true"
         height="auto">
    <h2>{{ pipelineName.slice(0,-36) }}</h2>
    <p>Input: {{ analyticsPayload.inputCounter }}</p>
    <p>Output: {{ analyticsPayload.outputCounter }}</p>
    <p>Error: {{ analyticsPayload.errorCounter }}</p>
    <button id="hideButton"
        type="buttton"
        v-on:click="hide">
        Close
    </button>
  </modal>
</template>

<script>
import StreamSetsService from '../store/services/StreamSetsService'

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
        errorCounter: null
      }
    }
  },
  methods: {
    hide () {
      this.$modal.hide(`detail-modal${this.pipelineName}`)
    },
    opened (event) {
      StreamSetsService.fetchMetrics(this.pipelineName).then(response => {
        this.analyticsPayload.inputCounter = response.data.counters['pipeline.batchInputRecords.counter'].count
        this.analyticsPayload.outputCounter = response.data.counters['pipeline.batchOutputRecords.counter'].count
        this.analyticsPayload.errorCounter = response.data.counters['pipeline.batchErrorRecords.counter'].count
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
</style>
