<template>
    <div class="container">
        <vue-good-table
            :columns="columns"
            :rows="rows"
            :fixed-header="true"
            :line-numbers="true"
            max-height="500px"
            :search-options="{
                enabled: true,
                skipDiacritics: true,
                placeholder: 'Search',
            }"
            :sort-options="{
                enabled: true,
                initialSortBy: {field: 'created', type: 'desc'}
            }"
            :pagination-options="{
                enabled: true,
                mode: 'pages',
                position: 'bottom',
                perPage: 50,
            }">
            <div slot="table-actions">
                    <button id="fetchMoreButton"
                            type="button"
                            v-on:click="getErrors(paginationCounter)">
                            Load More
                    </button>
                <span id="count"> {{ fetchedTelemetryLength }} records</span>
            </div>
        </vue-good-table>
        <hr>
    </div>
</template>

<script>
import StreamSetsService from '../store/services/StreamSetsService'

export default {
  name: 'Telemetry',
  data () {
    return {
      columns: [
        {
          label: 'ID',
          field: 'id',
          type: 'number'
        },
        {
          label: 'Created',
          field: 'created'
        },
        {
          label: 'Source',
          field: 'source'
        },
        {
          label: 'Operation',
          field: 'operation'
        },
        {
          label: 'Measured Value',
          field: 'measured_value'
        },
        {
          label: 'Unit of Measurement',
          field: 'unit_of_measurement'
        },
        {
          label: 'Measurement',
          field: 'measurement'
        }
      ],
      rows: [],
      paginationCounter: 1
    }
  },
  mounted () {
    this.getTelemetry(this.paginationCounter)
  },
  methods: {
    getTelemetry (page) {
      StreamSetsService.fetchTelemetry(page).then(response => {
        this.paginationCounter = this.paginationCounter + 1
        const arrConvert = JSON.parse(response.data)
        arrConvert.forEach(item => {
          this.rows.push(item)
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  computed: {
    fetchedTelemetryLength: function () {
      return this.rows.length
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 90%;
}

#fetchMoreButton {
  background-color :rgba(0, 125, 132, 0.4);;
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

#count {
  margin-right: 10px;
  color: black
}
</style>
