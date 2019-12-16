<template>
  <div class="wrapper">
    <vue-up class="notification"></vue-up>
    <button id="startButton"
            type="button"
            v-on:click="startAll()">
            Start
    </button>
    <button id="stopButton"
            type="button"
            v-on:click="stopAll()">
            Stop
    </button>
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
import axios from 'axios'
import StreamSetsService from '../store/services/StreamSetsService'
import Pipeline from '../components/Pipeline.vue'
import router from '../router'

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
    this.getUserData()
    this.fetchPipelineData(false)
    window.setInterval(() => {
      this.fetchPipelineData(true)
    }, 500000)
    window.setTimeout(() => {
      this.notify()
    }, 1000)
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
    },
    stopAll () {
      StreamSetsService.stopAll().then(response => {
        this.fetchPipelineData(true)
      })
    },
    startAll () {
      StreamSetsService.startAll().then(response => {
        this.fetchPipelineData(true)
      })
    },
    notify () {
      let brokenPipes = this.pipelineData.filter(pipe => pipe.status !== 'RUNNING')
      if (brokenPipes.length > 0) {
        this.$popup({
          message: `There are ${brokenPipes.length} pipeline(s)  not running`,
          color: 'white',
          backgroundColor: 'rgba(255, 102, 102, 0.8)',
          delay: 2,
          fontSize: 40
        })
      }
    },
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          console.log(response)
          self.$set(this, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/')
        })
    }
  }
}
</script>

<style lang="scss" scoped>

button {
    margin: 1em;
}

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
  background-color: #eee;
  color: black;
  border-radius: 5px;
  padding: 1em;
  font-size: 16px;
  line-height: 1.5em;
  overflow-wrap: break-word;
}

#refreshButton {
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
  margin-bottom: 10px;
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

// Modal things
.notification {
  width: 50%;
  height: 30%;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto
}

</style>
