<template>
  <div class="Section">
    <el-form :model="section" label-width="auto">
      <el-divider class="divider" content-position="left">
        <el-input placeholder="Naming" v-model="section.name" size="small">
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
        <el-input v-model="section.data.title" placeholder="Default Title"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(_, i) in section.data.paragraphs"
        :key="i"
        :label="`Paragraph ${i + 1}`"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Paragraph"
          v-model="section.data.paragraphs[i]"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="section.data.paragraphs instanceof Array && section.data.paragraphs.length"
      >
        <el-button
          type="success"
          round
          @click="addParagraph(section.data.paragraphs)"
        >Add a new paragraph</el-button>
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
}]

function getTypeData (type) {
  let result = {}
  for (let i = 0; i < types.length; i++) {
    if (types[i].value === type) {
      result = types[i].data
      break
    }
  }
  return result
}

export default {
  name: 'fragment',
  props: ['section', 'index'],
  data () {
    return {
      types
    }
  },
  methods: {
    changeSectionType (section) {
      section.data = getTypeData(section.type)
    },
    addParagraph (ps) {
      ps.push('')
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  margin: 3rem 0;
}
::v-deep .el-form-item__content {
  line-height: inherit;
}
</style>