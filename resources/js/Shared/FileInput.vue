<template>
  <div>
    <label v-if="label" class="form-label">{{ label }}:</label>
    <div class="form-input p-0" :class="{ error: error }">
      <input ref="file" type="file" :accept="accept" class="hidden" @change="change">
      <div v-if="!value || !value.name" class="p-2">
        <button type="button" class="px-4 py-1 bg-gray-500 hover:bg-gray-700 rounded-sm text-xs font-medium text-white" @click="browse">
          Browse
        </button>
      </div>
      <div v-else class="flex items-center justify-between p-2">
        <div class="flex-1 pr-1">{{ value.name }} <span class="text-gray-500 text-xs">({{ filesize(value.size) }})</span></div>
        <button type="button" class="px-4 py-1 bg-gray-500 hover:bg-gray-700 rounded-sm text-xs font-medium text-white" @click="remove">
          Remove
        </button>
      </div>
    </div>
    
    <div v-if="type === 'image' && path">
      <div class="images" v-viewer.static="{button: false, navbar: false, title: false, toolbar: false, url: 'url'}">
        <img :src="path" class="cursor-pointer" width="100" height="100" :url="original" title="Click here to view" >
      </div>
    </div>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: File,
    label: String,
    type: String,
    path: String,
    original: String,
    accept: String,
    fileError: {
        type: String,
        default: null,
    },
    size: {
        type: Number,
        default: 4096,
    }
  },
  data() {
    return {
      error: this.fileError
    }
  },
  watch: {
    value(value) {
      if (!value) {
        this.$refs.file.value = ''
      }
    },
  },
  methods: {
    filesize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024))
      return (size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    },
    browse() {
      this.$refs.file.click()
    },
    change(e) {
      this.error = ''
      const size = e.target.files[0].size
      if (Math.round((size / 1024)) <= this.size) {
        this.$emit('input', e.target.files[0])
      } else {
        this.error = 'The picture can not be greater than '+Math.round((this.size / 1024))+' mb.'
        this.$emit('input', null)
        this.$refs.file.value = ''
      }
    },
    remove() {
      this.$emit('input', null)
    },
  },
}
</script>
