<template>
  <div class="StartPage">
    <el-button type="primary" @click="start">Start from empty data</el-button>
    <el-divider>OR</el-divider>
    <el-upload class="upload-demo" drag action="#" accept="application/json" :auto-upload="false">
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
      currentWindow.maximize()
      this.$router.replace('/work')
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
