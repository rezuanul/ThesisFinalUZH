<template>
    <inertia-link v-if="asType && method" :data="data ? data : {}" :href="link" :as="asType" :method="method"
        :title="title ? title : ''" v-html="text"
        :class="[bg, defaultClass ? 'text-white border-button-color bg-button-color text-button-font-color rounded-md inline-flex items-center rounded-sm text-xs border border-transparent lg:px-6 px-6 py-2 md:text-sm font-normal leading-4 focus:ring-2 focus:ring-offset-2 font-semibold' : '']">
    </inertia-link>
    <inertia-link v-else :href="link" :data="data ? data : {}" :title="title ? title : ''"
        v-html="text"
        :class="[bg, defaultClass ? 'text-white border-button-color bg-button-color text-button-font-color inline-flex items-center text-xs border border-transparent lg:px-6 px-6 py-2 md:text-sm font-normal leading-4 focus:ring-2 focus:ring-offset-2 font-semibold' : '']">
    </inertia-link>
</template>

<script>
export default {
    props: {
        text: [String, Number, null],
        bg: [String, null],
        link: String,
        title: [String, null],
        method: [String, null],
        data: [Object, Array, String, null],
        asType: [String, null],
        defaultClass: {
            type: Boolean,
            default: true
        }
    },
};
</script>

<style lang="scss" scoped></style>