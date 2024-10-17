<template>
  <div class="flex items-center rounded-md overflow-auto">
    <div class="flex w-full bg-white flex-row-reverse">
      <dropdown v-if="dropdown" :auto-close="false" class="px-4 lg:px-6 rounded-md border ml-2 h-12"
        placement="top-start">
        <div class="flex items-center">
          <svg width="15" height="10" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:mr-2">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.69043 0.365767C0.69043 0.26876 0.734908 0.175725 0.814079 0.107131C0.89325 0.038536 1.00063 0 1.11259 0H10.4002C10.5122 0 10.6196 0.038536 10.6987 0.107131C10.7779 0.175725 10.8224 0.26876 10.8224 0.365767C10.8224 0.462774 10.7779 0.555809 10.6987 0.624403C10.6196 0.692998 10.5122 0.731534 10.4002 0.731534H1.11259C1.00063 0.731534 0.89325 0.692998 0.814079 0.624403C0.734908 0.555809 0.69043 0.462774 0.69043 0.365767ZM0.69043 2.92614C0.69043 2.82913 0.734908 2.73609 0.814079 2.6675C0.89325 2.59891 1.00063 2.56037 1.11259 2.56037H10.4002C10.5122 2.56037 10.6196 2.59891 10.6987 2.6675C10.7779 2.73609 10.8224 2.82913 10.8224 2.92614C10.8224 3.02314 10.7779 3.11618 10.6987 3.18477C10.6196 3.25337 10.5122 3.2919 10.4002 3.2919H1.11259C1.00063 3.2919 0.89325 3.25337 0.814079 3.18477C0.734908 3.11618 0.69043 3.02314 0.69043 2.92614ZM5.33424 5.48651C5.33424 5.3895 5.37872 5.29646 5.45789 5.22787C5.53706 5.15927 5.64444 5.12074 5.7564 5.12074H10.4002C10.5122 5.12074 10.6196 5.15927 10.6987 5.22787C10.7779 5.29646 10.8224 5.3895 10.8224 5.48651C10.8224 5.58351 10.7779 5.67655 10.6987 5.74514C10.6196 5.81374 10.5122 5.85227 10.4002 5.85227H5.7564C5.64444 5.85227 5.53706 5.81374 5.45789 5.74514C5.37872 5.67655 5.33424 5.58351 5.33424 5.48651Z"
              fill="#333E4D" />
          </svg>
          <span class="hidden md:inline filtertext">Filters</span>
        </div>
        <div slot="dropdown" class="mt-0 w-screen shadow-xl bg-white rounded dropdown_widget"
          :style="{ maxWidth: `${maxWidth}px` }">
          <slot />
        </div>
      </dropdown>
      <input
        class="block border border-gray-200 rounded-md shadow-sm py-3 p-5 pl-7 lg:pl-11 w-60 lg:w-60 input-focus sm:text-sm searchinput"
        autocomplete="off" type="text" name="search" placeholder="Search…" :value="value"
        @input="$emit('input', $event.target.value)" v-if="showSearchInput">
    </div>
    <button v-if="showResetButton"
      class="text-sm rounded py-3 px-4 lg:px-6 bg-white text-green mx-2 border border-button-color text-button-color"
      type="button" @click="$emit('reset')">Reset</button>
  </div>
</template>

<script>
import Dropdown from '@/Shared/Dropdown'

export default {
  components: {
    Dropdown,
  },
  props: {
    value: String,
    maxWidth: {
      type: Number,
      default: 300,
    },
    dropdown: {
      type: Boolean,
      default: true
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
}
</script>
