<template>
  <div id="app">
      <section class="main-navbar-section">
        <div class="container">
            <vue-navigation-bar
            :options="navbarOptions"
            @vnb-item-clicked="vnbItemClicked"
            >
            </vue-navigation-bar>
        </div>
    </section>
    <span>Change Queue Count: {{ queueCounts.changeQueue }}</span>
    <img alt="Vigil Logo" src="./assets/TrellisLogo2.png">
    <span>Job Queue Count: {{ queueCounts.jobQueue }}</span>
    <router-view></router-view>
  </div>
</template>

<script>
import StreamSetsService from './store/services/StreamSetsService'

export default {
  name: 'app',
  data () {
    return {
      navbarOptions: {
        elementId: 'main-navbar',
        isUsingVueRouter: true,
        menuOptionsLeft: [
          {
            type: 'link',
            text: 'Home',
            path: '/'
          },
          {
            type: 'link',
            text: 'Errors',
            path: '/errors'
          },
          {
            type: 'link',
            text: 'Telemetry',
            path: 'telemetry'
          }
        ]
      },
      queueCounts: {
        changeQueue: null,
        jobQueue: null
      }
    }
  },
  mounted () {
    this.populateQueueCounts()
    window.setInterval(() => {
      this.populateQueueCounts()
    }, 500000)
  },
  methods: {
    vnbItemClicked (text) {
      // This may actually be useful for something in the future
      // Leaving it for now
      console.log(text)
    },
    populateQueueCounts () {
      StreamSetsService.fetchQueueCounts().then(response => {
        this.queueCounts.changeQueue = response.data.counts.change_queue['COUNT(*)']
        this.queueCounts.jobQueue = response.data.counts.job_queue['COUNT(*)']
      })
    }
  }
}
</script>

<style lang="scss">
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700");
html {
  width: 100%;
  font-size: 18px;
  color: #333;
}

body {
  margin: 0;
  height: 100%;
  height: 100vh;
  width: 100%;
  font-family: "Montserrat", sans-serif;
}

#app {
  height: 100%;
  width: 100%;
  line-height: 1.5;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  height: 40%;
}

//
// vue-navigation-bar customization below
//
.main-navbar-section {
  margin-top: 0;
  background: #eee;
}

#main-navbar {
  background: #eee;
}

.vnb {
  font-family: "Montserrat", sans-serif;

  &__menu-options {
    &__option {
      &__button {
        &__icon {
          svg {
            margin-top: -3px;
          }
        }
      }
    }
  }
  &__popup {
    &__bottom {
      &__menu-options {
        &__option {
          &__link {
            &__icon {
              svg {
                margin-top: -4px;
              }
            }
          }
        }
      }
    }
  }
  .custom-section-content {
    width: 100%;
    @media (min-width: 568px) {
      width: 50%;
    }
    @media (min-width: 992px) {
      width: 15%;
    }
    @media (min-width: 1200px) {
      width: 20%;
    }
  }
}
</style>
