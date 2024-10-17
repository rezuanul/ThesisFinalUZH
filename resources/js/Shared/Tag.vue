<template>
    <a href="javascript:;" @click="handleClick"
        :class="[`text-xs font-normal py-1 rounded whitespace-nowrap  ${bg} ${color}`]">
        {{ title }}
    </a>
</template>

<script>
export default {
    name: 'VueTwoTag',
    props: {
        title: String,
        bg: String,
        color: String
    },

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        handleClick() {
            this.$emit('click')
        }
    },
};
</script>

<style lang="scss" scoped></style>