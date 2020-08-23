<template>
  <div class="WorkPage">
    <div class="lw">
      <iframe :srcdoc="html"></iframe>
    </div>
    <div class="rw">
      <Panel :savedata="savedata" />
    </div>
  </div>
</template>

<script>
import Panel from './partial/Panel'

export default {
  name: 'work-page',
  data () {
    return {
      savedata: {
        sections: []
      }
    }
  },
  components: {
    Panel
  },
  methods: {
    updateSavedata (newSavedata) {
      this.savedata = newSavedata
    }
  },
  computed: {
    html () {
      return `<html><body><pre>${JSON.stringify(this.savedata, null, '  ')}</pre></body></html>`
    }
  }
}
</script>

<style lang="scss" scoped>
.WorkPage {
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 1366px) {
    grid-template-columns: 683px 683px;
  }
}

.lw,
.rw {
  height: 100vh;
  overflow-x: hidden;
}

.lw {
  padding: 1rem 0.5rem 1rem 1rem;
  overflow-y: hidden;
}

.rw {
  padding: 1rem;
  overflow-y: auto;
}

iframe {
  width: 100%;
  height: 100%;
  border-style: dashed;
  border-color: #dddddd;
  overflow: hidden;
}
</style>
