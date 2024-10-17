<template>
  <button :disabled="loading" class="items-center" v-bind="$attrs" @click="$emit('click', $event.target)">
    <div v-if="loading" class="inline-block btn-spinner mr-2" />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
}
</script>
