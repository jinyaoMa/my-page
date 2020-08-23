<template>
  <div class="StartPage">
    <el-button type="primary" @click="start">Start from empty data</el-button>
    <el-divider>OR</el-divider>
    <el-upload
      class="upload-demo"
      drag
      action="#"
      accept="application/json"
      :auto-upload="false"
      :on-change="onDataFileChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop or
        <em>click</em>
        to import your save file here
      </div>
    </el-upload>
  </div>
</template>

<script>
import { remote } from 'electron'

let currentWindow = remote.getCurrentWindow()

export default {
  name: 'start-page',
  methods: {
    start () {
      currentWindow.setContentSize(1280, 600)
      currentWindow.center()
      currentWindow.maximize()
      this.$router.replace('/work')
    },
    onDataFileChange (file) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        try {
          window._SAVEDATA = JSON.parse(e.target.result)
        } catch (error) {
          window._SAVEDATA = {
            sections: []
          }
        }
        this.start()
      }
      reader.readAsText(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
.StartPage {
  text-align: center;
  height: 300px;
  padding: 1rem;
  margin: calc(50vh - 150px) 0;
  min-width: 400px;
}
</style>
