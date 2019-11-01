<template>
  <div class="wrapper">
    <h3>{{ pipelineInstance.name.slice(0, -36) }}</h3>
    <p>Status: {{ pipelineInstance.status }}</p>
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
</style>
