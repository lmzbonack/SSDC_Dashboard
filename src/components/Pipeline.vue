<template>
  <div class="wrapper">
    <h3><a :href=buildPipelineURL() target="_blank">{{ pipelineInstance.name.slice(0, -36) }}</a></h3>
    <!-- <h3>{{ pipelineInstance.name.slice(0, -36) }}</h3> -->
    <p><strong>Status: </strong>
      <span class="default" :class="pipelineInstance.status === 'RUNNING' ? 'working' : 'broken'">{{ pipelineInstance.status }}</span>
    </p>
    <p><strong>Last Started: </strong> {{ humanizeUptime(pipelineInstance.timeStamp) }} </p>
    <button id="detailsButton"
            type="button"
            v-on:click="openDetailsModal">
            Details
    </button>
    <PipelineDetailsModal :pipelineName="pipelineInstance.name"/>
  </div>
</template>

<script>
import PipelineDetailsModal from './PipelineDetailsModal.vue'
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
    }
  }
}
</script>

<style lang="scss" scoped>
#detailsButton {
  background-color: #4ddbff;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
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

</style>
