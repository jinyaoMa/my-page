<template>
  <div class="Panel">
    <el-row type="flex" class="top">
      <el-button type="success" @click="addSection">Add a new Section</el-button>
      <el-button type="warning" @click="resetCounter">Refresh counter (sn-{{counter}})</el-button>
      <el-button type="primary" @click="exportData">Export data file</el-button>
      <el-button type="primary" @click="exportData">Generate HTML</el-button>
    </el-row>
    <Section v-for="(section, i) in savedata.sections" :key="i" :section="section" :index="i" />
  </div>
</template>

<script>
import Section from './Section'

export default {
  name: 'panel',
  props: ['savedata'],
  components: {
    Section
  },
  data () {
    return {
      counter: this.savedata.sections.length
    }
  },
  methods: {
    resetCounter () {
      this.counter = this.savedata.sections.length
    },
    addSection () {
      this.savedata.sections.push({
        name: `sn-${this.counter}`,
        color: '#000000',
        bgColor: '#ffffff',
        type: 'default',
        data: {
          title: ''
        }
      })
      this.counter++
    },
    deleteSection (i) {
      if (i >= 0 && i < this.savedata.sections.length) {
        this.savedata.sections = this.savedata.sections.slice(0, i).concat(this.savedata.sections.slice(i + 1))
      }
    },
    exportData () {
      const a = document.createElement('a')
      const blob = new Blob([JSON.stringify(this.savedata, null, '  ')])
      a.download = 'savedata.json'
      a.href = URL.createObjectURL(blob)
      a.click()
    }
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 3rem;
  padding-right: 2rem;
}
</style>