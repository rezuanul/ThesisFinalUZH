<template>
    <button :type="type" @click="handleClick" :class="bg"
        class="inline-flex items-center  rounded text-xs border px-3 py-2 font-normal">
        <i :class="icon ? icon_name : 'hidden'"></i>
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: String,
        bg: String,
        icon: Boolean,
        icon_name: String,
        type: String
    },

    data() {
        return {

        };
    },
    methods: {
        handleClick() {
            this.$emit('click')
        }
    },

    mounted() {

    },


};
</script>

<style lang="scss" scoped></style>