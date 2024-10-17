<template>
  <nav class="flex breadcrumbs" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <Link class="text-xs md:text-sm font-normal" :defaultClass="false" :link="route('dashboard')" :text="'Home'" />
        </div>
      </li>
      <li v-for="page in pages" :key="page.name">
        <div class="flex items-center">
          <!-- <i class="h-5 w-5 fa fa-angle-right flex-shrink-0 text-gray-400" aria-hidden="true" /> -->
          <span class="breadcrumbs_arrows darkgreytext">//</span>
          <Link v-if="page.href" class="ml-2 text-xs md:text-sm font-normal text-gray-500 hover:text-gray-700"
            :defaultClass="false" :link="page.href" :text="page.name" />
          <span v-else class="ml-2 text-xs md:text-sm font-normal">{{ page.name
          }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import Link from "@/Shared/Link";
export default {
  props: {
    pages: [Object, Array]
  },
  components: {
    Link,
  },
};
</script>

<style lang="scss" scoped></style>


