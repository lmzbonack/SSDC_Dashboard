<template>
  <div class="wrapper">
    <h1>How 'dem pipelines looking</h1>
    <button id="refreshButton"
            type="button"
            v-on:click="fetchPipelineData(true)">
            Refresh
    </button>
    <div class="card-wrap">
      <div class="card" v-for="pipe in pipelineData" :key="pipe.name">
        <Pipeline :pipelineInstance="pipe" />
      </div>
    </div>
  </div>
</template>

<script>
import StreamSetsService from '../store/services/StreamSetsService'
import Pipeline from './Pipeline.vue'

export default {
  name: 'PipelineWrapper',
  components: {
    Pipeline
  },
  data () {
    return {
      pipelineData: [],
      trackedPipelineNames: [
        'oribuspscdcv03',
        'oribuserrorsv01',
        'lmzbonackdevoribuschangesjobsv03',
        'sadevsfdevextractsbiodemoStudentSOAP',
        'sadevsfdevextractsenrollmentSOAP',
        'sadevsfdevextractspopulationSOAP',
        'devoribusjobsextractscleanup',
        'sadevsfdevextractsbiodemoStudent',
        'sadevsfdevextractsenrollment',
        'sadevsfdevextractsstudentGroupMembership',
        'sadevsfdevextractsstudentGroupMembershipSOAP',
        'sadevsfdevextractspopulation',
        'sadevsfdevextractsplanLookup',
        'sadevsfdevextractssubplanLookup',
        'sadevsfdevextractsprogLookup',
        'sadevsfdevextractsstudentGroupLookup',
        'sadevsfdevextractstermLookup'
      ]
    }
  },
  mounted () {
    this.fetchPipelineData(false)
    window.setInterval(() => {
      this.fetchPipelineData(true)
    }, 500000)
  },
  methods: {
    fetchPipelineData (reset) {
      if (reset) this.resetPipelineData()
      StreamSetsService.fetchAll().then(response => {
        const arrConvert = Object.values(response.data)
        arrConvert.forEach(pipe => {
          if (this.trackedPipelineNames.indexOf(pipe.name.slice(0, -36)) > -1) {
            this.pipelineData.push(pipe)
          }
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    resetPipelineData () {
      this.pipelineData = []
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  width: 70%;
  margin: auto;
}

.card-wrap {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1em;
  background-color: #fff;
  color: #444;
}

.card {
  background-color: lightgrey;
  color: black;
  border-radius: 5px;
  padding: 1em;
  font-size: 125%;
  overflow-wrap: break-word;
}

#refreshButton {
  background-color: #4ddbff; /* Green */
  border: none;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
}

</style>
