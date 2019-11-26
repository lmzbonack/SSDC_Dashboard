<template>
  <div class="wrapper">
    <h3><a :href=buildPipelineURL() target="_blank">{{ pipelineInstance.name.slice(0, -36) }}</a></h3>
    <p><strong>Status: </strong>
      <span class="default" :class="pipelineInstance.status === 'RUNNING' ? 'working' : 'broken'">{{ pipelineInstance.status }}</span>
    </p>
    <p><strong>Last Started: </strong> {{ humanizeUptime(pipelineInstance.timeStamp) }} </p>
    <button v-if="pipelineInstance.status != 'RUNNING'"
            id="startButton"
            type="button"
            v-on:click="startPipeline(pipelineInstance.name)">
            Start
    </button>
    <button v-if="pipelineInstance.status != 'STOPPED'"
            id="stopButton"
            type="button"
            v-on:click="stopPipeline(pipelineInstance.name)">
            Stop
    </button>
    <button id="detailsButton"
            type="button"
            v-on:click="openDetailsModal">
            Details
    </button>
    <PipelineDetailsModal :pipelineName="pipelineInstance.name"/>
  </div>
</template>

<script>
import PipelineDetailsModal from './PipelineDetailsModal'
import StreamSetsService from '../store/services/StreamSetsService'
let moment = require('moment')

export default {
  name: 'Pipeline',
  components: {
    PipelineDetailsModal
  },
  props: {
    pipelineInstance: {
      type: Object,
      required: true
    }
  },
  methods: {
    openDetailsModal () {
      this.$modal.show(`detail-modal${this.pipelineInstance.name}`)
    },
    humanizeUptime (val) {
      return moment(val).startOf('minute').fromNow()
    },
    buildPipelineURL () {
      return `${process.env.VUE_APP_STREAMSETS_SERVER}/collector/pipeline/${this.pipelineInstance.pipelineId}`
    },
    startPipeline (pipeline) {
      StreamSetsService.startPipeline(pipeline).then(response => {
        console.log(response)
      })
    },
    stopPipeline (pipeline) {
      StreamSetsService.stopPipeline(pipeline).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#detailsButton {
  background-color: rgba(0, 125, 132, 0.4);
  border: none;
  border-radius: 5px;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  line-height: 1.5em;
  margin-left: 20px;
}

#startButton {
  background-color: rgba(87, 230, 21, 0.926);
  border: none;
  border-radius: 5px;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  line-height: 1.5em;
  margin-bottom: 10px;
}

#stopButton {
  background-color: rgba(240, 21, 13, 0.801);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  line-height: 1.5em;
  margin-bottom: 10px;
}

.default {
  color: black
}

.working {
  color: green
}

.broken {
  color: red
}

h3 {
  font-size: 24px;
  line-height: 1.5em;
}

</style>
