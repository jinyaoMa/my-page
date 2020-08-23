<template>
  <div class="WorkPage">
    <div class="lw">
      <iframe class="top-iframe" :srcdoc="html"></iframe>
      <iframe class="bot-iframe" :srcdoc="preview"></iframe>
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
      savedata: (typeof window !== 'undefined' && window._SAVEDATA) || {
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
      return `<pre>${JSON.stringify(this.savedata, null, '  ')}</pre>`
    },
    preview () {
      return `<pre>${JSON.stringify(this.savedata, null, '  ')}</pre>`
    }
  }
}
</script>

<style lang="scss" scoped>
.WorkPage {
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 1024px) {
    grid-template-columns: 512px 512px;
  }
}

.lw,
.rw {
  height: 100vh;
  overflow-x: hidden;
}

.lw {
  padding: 1rem;
  overflow-y: hidden;
}

.rw {
  padding: 1rem 1rem 1rem 0.5rem;
  overflow-y: auto;
}

iframe {
  width: 100%;
  border-style: dashed;
  border-color: #dddddd;
  overflow: hidden;
  display: block;
}

.top-iframe {
  margin-bottom: 1rem;
  height: calc(50% - 1rem);
}

.bot-iframe {
  margin-top: 1rem;
  height: 50%;
}
</style>
