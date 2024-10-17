<template>
  <div>
    <label v-if="label" class="form-label" :for="id">{{ label }} <span v-if="required" class="text-red-700" aria-hidden="true" role="presentation">*</span></label>
    <textarea :id="id" ref="input" v-bind="$attrs" class="form-textarea border-solid" :class="{ error: error }" :value="value" @input="$emit('input', $event.target.value)" />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `textarea-input-${this._uid}`
      },
    },
    value: String,
    label: String,
    error: String,
    required: {
        type: Boolean,
        default: false,
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    select() {
      this.$refs.input.select()
    },
  },
}
</script>
