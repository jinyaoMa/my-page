<template>
  <div class="Section">
    <el-form :model="section" label-width="auto">
      <el-divider class="divider" content-position="left">
        <el-input placeholder="e.g. sn-01" v-model="section.name" size="small">
          <template slot="prepend">Section</template>
        </el-input>
      </el-divider>
      <el-form-item label="Section Type">
        <el-select v-model="section.type" @change="changeSectionType(section)">
          <el-option v-for="(t, i) in types" :key="i" :label="t.label" :value="t.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Text Color">
        <el-color-picker v-model="section.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="Background Color">
        <el-color-picker v-model="section.bgColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="Title" v-if="typeof section.data.title !== 'undefined'">
        <el-input v-model="section.data.title" placeholder="e.g. Project"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(_, i) in section.data.paragraphs"
        :key="i"
        :label="`Paragraph ${i + 1}`"
      >
        <el-input
          type="textarea"
          :rows="5"
          placeholder="e.g. Occaecat laboris et enim ut aute nostrud aliqua veniam ex cillum duis pariatur incididunt magna. Elit dolor voluptate et magna qui deserunt ad. Laborum dolore magna nostrud velit sint. Commodo minim fugiat elit excepteur ex ex id sunt nisi commodo. Qui consectetur voluptate nostrud ut Lorem aliqua est commodo mollit elit proident consectetur. Minim magna amet irure ipsum exercitation adipisicing ut commodo nulla anim cillum. Deserunt excepteur mollit non irure pariatur non tempor ut occaecat."
          v-model="section.data.paragraphs[i]"
        ></el-input>
      </el-form-item>
      <el-form-item label="Avatar" v-if="typeof section.data.avatar === 'string'">
        <el-upload
          action="#"
          accept="image/png, image/jpeg"
          :auto-upload="false"
          :show-file-list="false"
          class="avatar-uploader"
          :on-change="onAvatarChange"
        >
          <img v-if="section.data.avatar" :src="section.data.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Name" v-if="typeof section.data.name === 'string'">
        <el-input v-model="section.data.name" placeholder="e.g. Jinyao Ma"></el-input>
      </el-form-item>
      <el-form-item
        label="Word Cloud"
        v-if="section.data.wordcloud instanceof Array && section.data.wordcloud.length >= 0"
      >
        <el-tag
          v-for="(word, i) in section.data.wordcloud"
          :key="i"
          closable
          effect="plain"
          :disable-transitions="false"
          @close="closeWord(word)"
        >{{word}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputWordcloudVisible"
          v-model="inputWordcloudValue"
          ref="saveWordInput"
          size="small"
          @keyup.enter.native="wordcloudConfirm"
          @blur="wordcloudConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showWordcloudInput">+ New Word</el-button>
      </el-form-item>
      <el-form-item label="Heading" v-if="typeof section.data.heading === 'string'">
        <el-input v-model="section.data.heading" placeholder="e.g. Project One"></el-input>
      </el-form-item>
      <el-form-item v-for="(_, i) in section.data.list" :key="i" :label="`List Item ${i + 1}`">
        <el-input placeholder="e.g. a line written on the list" v-model="section.data.list[i]"></el-input>
      </el-form-item>
      <el-form-item label="Screenshot" v-if="typeof section.data.screenshot === 'string'">
        <el-upload
          action="#"
          accept="image/png, image/jpeg"
          :auto-upload="false"
          :show-file-list="false"
          class="avatar-uploader"
          :on-change="onScreenshotChange"
        >
          <img v-if="section.data.screenshot" :src="section.data.screenshot" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item v-for="(_, i) in section.data.rates" :key="i" :label="`Rate Item ${i + 1}`">
        <el-input placeholder="e.g. HTML/CSS" v-model="section.data.rates[i].name">
          <template slot="append">
            <el-rate
              slot="suffix"
              v-model="section.data.rates[i].value"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            ></el-rate>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-for="(_, i) in section.data.grids" :key="i" :label="`Grid Item ${i + 1}`">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input placeholder="e.g. Email" v-model="section.data.grids[i].name"></el-input>
            <el-input placeholder="e.g. mailto://jinyao.ma@outlook.com" v-model="section.data.grids[i].link"></el-input>
          </el-col>
          <el-col :span="4">
            <el-upload
              action="#"
              accept="image/png, image/jpeg"
              :auto-upload="false"
              :show-file-list="false"
              class="icon-uploader"
              :on-change="onGridIconChange(i)"
            >
              <img v-if="section.data.grids[i].icon" :src="section.data.grids[i].icon" class="icon" />
              <i v-else class="el-icon-plus icon-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Author" v-if="typeof section.data.author === 'string'">
        <el-input v-model="section.data.author" placeholder="e.g. jinyaoMa"></el-input>
      </el-form-item>
      <!-- Buttons -->
      <el-form-item
        v-if="section.data.paragraphs instanceof Array && section.data.paragraphs.length"
      >
        <el-button-group class="flex">
          <el-button
            type="success"
            round
            @click="addParagraph(section.data.paragraphs)"
          >Add a new paragraph</el-button>
          <el-button
            v-if="section.data.paragraphs.length > 1"
            type="warning"
            round
            @click="removeLastParagraph(section.data.paragraphs)"
          >Remove last paragraph</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item v-if="section.data.list instanceof Array && section.data.list.length">
        <el-button-group class="flex">
          <el-button
            type="success"
            round
            @click="addListItem(section.data.list)"
          >Add a new list item</el-button>
          <el-button
            v-if="section.data.list.length > 1"
            type="warning"
            round
            @click="removeListItem(section.data.list)"
          >Remove last list item</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item v-if="section.data.rates instanceof Array && section.data.rates.length">
        <el-button-group class="flex">
          <el-button
            type="success"
            round
            @click="addRateItem(section.data.rates)"
          >Add a new rate item</el-button>
          <el-button
            v-if="section.data.rates.length > 1"
            type="warning"
            round
            @click="removeRateItem(section.data.rates)"
          >Remove last rate item</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item v-if="section.data.grids instanceof Array && section.data.grids.length">
        <el-button-group class="flex">
          <el-button
            type="success"
            round
            @click="addGridItem(section.data.grids)"
          >Add a new rate item</el-button>
          <el-button
            v-if="section.data.grids.length > 1"
            type="warning"
            round
            @click="removeGridItem(section.data.grids)"
          >Remove last rate item</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          round
          @click="$parent.deleteSection(index)"
        >Delete this section ({{section.name}})</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const types = [{
  value: 'default',
  label: 'Default',
  data: {
    title: ''
  }
}, {
  value: 'paragraph',
  label: 'Paragraph',
  data: {
    paragraphs: ['']
  }
}, {
  value: 'avatar',
  label: 'Avatar',
  data: {
    avatar: '',
    name: ''
  }
}, {
  value: 'wordcloud',
  label: 'Word Cloud',
  data: {
    wordcloud: []
  }
}, {
  value: 'heading',
  label: 'Heading',
  data: {
    heading: ''
  }
}, {
  value: 'listoftexts',
  label: 'List of Texts',
  data: {
    list: ['']
  }
}, {
  value: 'screenshot',
  label: 'Screenshot',
  data: {
    screenshot: ''
  }
}, {
  value: 'rating',
  label: 'Rating',
  data: {
    rates: [getRateStruct()]
  }
}, {
  value: 'tiling',
  label: 'Tiling',
  data: {
    grids: [getGridStruct()]
  }
}, {
  value: 'copyright',
  label: 'Copyright',
  data: {
    author: ''
  }
}]

function getTypeData (type) {
  let result = {}
  for (let i = 0; i < types.length; i++) {
    if (types[i].value === type) {
      result = JSON.parse(JSON.stringify(types[i].data))
      break
    }
  }
  return result
}

function getRateStruct () {
  return {
    name: '',
    value: 0
  }
}

function getGridStruct () {
  return {
    name: '',
    link: '',
    icon: ''
  }
}

export default {
  name: 'fragment',
  props: ['section', 'index'],
  data () {
    return {
      types,
      inputWordcloudVisible: false,
      inputWordcloudValue: ''
    }
  },
  methods: {
    changeSectionType (section) {
      section.data = getTypeData(section.type)
    },
    addParagraph (ps) {
      ps.push('')
    },
    removeLastParagraph (ps) {
      if (ps.length > 1) ps.pop()
    },
    addListItem (ls) {
      ls.push('')
    },
    removeListItem (ls) {
      if (ls.length > 1) ls.pop()
    },
    addRateItem (rs) {
      rs.push(getRateStruct())
    },
    removeRateItem (rs) {
      if (rs.length > 1) rs.pop()
    },
    addGridItem (gs) {
      gs.push(getGridStruct())
    },
    removeGridItem (gs) {
      if (gs.length > 1) gs.pop()
    },
    onAvatarChange (file) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        this.section.data.avatar = e.target.result
      }
      reader.readAsDataURL(file.raw)
    },
    onScreenshotChange (file) {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        this.section.data.screenshot = e.target.result
      }
      reader.readAsDataURL(file.raw)
    },
    onGridIconChange (index) {
      const that = this
      return function (file) {
        const reader = new FileReader()
        reader.onloadend = (e) => {
          that.section.data.grids[index].icon = e.target.result
        }
        reader.readAsDataURL(file.raw)
      }
    },
    closeWord (word) {
      this.section.data.wordcloud.splice(this.section.data.wordcloud.indexOf(word), 1)
    },
    wordcloudConfirm () {
      let inputValue = this.inputWordcloudValue
      if (inputValue) {
        this.section.data.wordcloud.push(inputValue)
      }
      this.inputWordcloudVisible = false
      this.inputWordcloudValue = ''
    },
    showWordcloudInput () {
      this.inputWordcloudVisible = true
      this.$nextTick(_ => {
        this.$refs.saveWordInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  margin: 3rem 0;
}
.flex {
  display: flex;
}
::v-deep .el-form-item__content {
  line-height: inherit;
}
::v-deep .avatar-uploader {
  white-space: nowrap;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    min-width: 178px;
    max-width: 100%;
    min-height: 178px;
    display: block;
  }
}
::v-deep .icon-uploader {
  white-space: nowrap;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .icon-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .icon {
    width: 78px;
    height: 78px;
    display: block;
  }
}
::v-deep .el-tag {
  margin-bottom: 10px;
  + .el-tag {
    margin-left: 10px;
  }
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>