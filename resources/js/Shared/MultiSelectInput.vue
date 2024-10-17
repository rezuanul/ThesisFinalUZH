<template>
  <div>
    <label v-if="label" class="form-label" :for="id">{{ label }} <span v-if="required" class="text-red-700" aria-hidden="true" role="presentation">*</span> :</label>
    <multi-select v-if="type === 'multiple'" :id="id" ref="input" :options="options"
        :selected-options="selected"
        v-model="selected"
        v-bind="$attrs"
        :placeholder="label ? label : 'Select'" 
        class="form-select" :class="{ error: error }"
        @select="onSelect">
    </multi-select>
    <model-select v-if="type === 'single'" :id="id" ref="input" :options="options"
        v-model="selected"
        v-bind="$attrs"
        :placeholder="label ? label : 'Select'" 
        class="form-select notranslate" :class="{ error: error }" @input="onSelect">
    </model-select>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { ModelSelect, MultiSelect } from 'vue-search-select';
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
  inheritAttrs: false,
  components: {
    MultiSelect,
    ModelSelect,
  },
  props: {
    id: {
      type: String,
      default() {
        return `select-input-${this._uid}`
      },
    },
    value: [String, Number, Boolean, Array, Object],
    label: String,
    options: Array,
    error: String,
    type: String,
    required: {
        type: Boolean,
        default: false,
    },
  },
  data() {
    return {
      selected: this.value,
    }
  },
  watch: {
    value(value) {
      this.selected = value
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
    onSelect (items, lastSelectItem) {
        this.selected = items
        this.$emit('input', this.selected)
    },
  },
}
</script>
