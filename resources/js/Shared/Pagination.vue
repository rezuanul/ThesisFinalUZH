
<template>
  <div class="mt-6 inline-flex flex-wrap">
    <template v-for="(link, key) in links">
      <div v-if="link.url === null" :key="key"
        class="cursor-pointer mr-4 text-sm text-button-color opacity-60 paginationtext flex items-center "
        :class="{ 'ml-auto': link.label === 'Next' }">{{ link.label }}</div>
      <inertia-link v-else :key="key"
        class="bg-white text-sm font-normal rounded-full mx-1  paginationtext w-8 h-8 flex items-center justify-center font-medium"
        :class="{ 'border-button-color bg-button-color text-button-font-color text-white': link.active, 'ml-auto': link.label === 'Next' }"
        :href="link.url">{{
          link.label }}</inertia-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
  },
}
</script>