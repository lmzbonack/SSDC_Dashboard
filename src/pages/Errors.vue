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
                    <button class="table-button"
                            type="button"
                            v-on:click="getErrors(paginationCounter)">
                            Load More
                    </button>
                    <button class="table-button"
                            type="button"
                            v-on:click="refresh">
                            Refresh
                    </button>
                <span id="count"> {{ fetchedErrorsLength }} records</span>
            </div>
        </vue-good-table>
        <hr>
    </div>
</template>
<script>
import StreamSetsService from '../store/services/StreamSetsService'

export default {
  name: 'Errors',
  data () {
    return {
      columns: [
        {
          label: 'ID',
          field: 'id',
          type: 'number'
        },
        {
          label: 'Error Source Name',
          field: 'error_source_name'
        },
        {
          label: 'Error Source ID',
          field: 'error_source_id',
          type: 'number'
        },
        {
          label: 'Error Code',
          field: 'error_code'
        },
        {
          label: 'Error Source',
          field: 'error_source'
        },
        {
          label: 'Created',
          field: 'created'
        }
      ],
      rows: [],
      paginationCounter: 1
    }
  },
  mounted () {
    this.getErrors(this.paginationCounter)
  },
  methods: {
    getErrors (page) {
      StreamSetsService.fetchErrors(page).then(response => {
        this.paginationCounter = this.paginationCounter + 1
        const arrConvert = JSON.parse(response.data)
        arrConvert.forEach(item => {
          this.rows.push(item)
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    refresh () {
      this.rows = []
      this.paginationCounter = 1
      this.getErrors(this.paginationCounter)
    }
  },
  computed: {
    fetchedErrorsLength: function () {
      return this.rows.length
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
    width: 90%;
}

.table-button {
  background-color :rgba(0, 125, 132, 0.4);;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  line-height: 1.5em;
  margin-bottom: 10px;
  margin-left: 10px;
}

#count {
  margin-right: 10px;
  color: black
}
</style>
