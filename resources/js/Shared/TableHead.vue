<template>
  <div
    class="sm:flex sm:items-center whitespace-nowrap flex-wrap gap-4 flex items-center justify-between px-4 py-6 pb-3 overflow-auto">
    <h1 class="text-black "><span class="opacity-70 nunitofont font-bold">{{ name }}</span>
      <span v-if="total" class="bggreen textgreen py-1 px-3 rounded text-xs font-bold ml-2">{{ total
      }}</span>
      <Tag v-if="warning" :title="warning" color="ml" class="ml-2 bggreen-300 undefined ml text-green px-4" />
    </h1>
    <div class="flex gap-x-2">
      <search-filter v-model="form.search" class="w-full mr-0" @reset="reset" :dropdown="showFilters"
        :showResetButton="showResetButton" :showSearchInput="showSearchInput">
        <select v-model="form.trashed" class="w-full form-select input-focus">
          <option :value="null">Select option</option>
          <option value="with">Include Deactivated</option>
          <option value="only">Only Deactivated</option>
        </select>
      </search-filter>
      <Link v-if="canAdd && add.link" class="text-white border-button-color bg-button-color text-button-font-color
 rounded" :link="add.link" :title="add.title" :text="add.text" />
      <Link v-if="view.link" class="text-white border-button-color bg-button-color text-button-font-color
 rounded" :link="view.link" :title="view.title" :text="view.text" />
    </div>
  </div>
</template>

<script>

import Link from "@/Shared/Link";
import Tag from "@/Shared/Tag";
import throttle from "lodash/throttle";
import SearchFilter from "@/Shared/SearchFilter";
import mapValues from "lodash/mapValues";

export default {
  components: {
    Link,
    Tag,
    SearchFilter
  },
  data() {
    return {
      form: {
        search: this.filters.search,
        role: this.filters.role,
        trashed: this.filters.trashed,
      },
    };
  },
  props: {
    name: {
      type: String,
      default: null
    },
    total: {
      type: [Number, String],
      default: null
    },
    warning: {
      type: [Number, String],
      default: null
    },
    canAdd: {
      type: Boolean,
      default: false
    },
    add: {
      type: Object,
      default() {
        return {}
      }
    },
    filters: {
      type: Object,
      default() {
        return {}
      }
    },
    view: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    showResetButton: {
      default: true,
      type: Boolean,
    },
    showSearchInput: {
      default: true,
      type: Boolean,
    }
  },
  watch: {
    form: {
      handler: throttle(function () {
        this.$emit('formHandler', this.form);
      }, 150),
      deep: true,
    },
  },
  methods: {
    reset() {
      this.form = mapValues(this.form, () => null);
    },
  },
};
</script>
