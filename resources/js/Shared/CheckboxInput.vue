<template>
    <div>
        <label class="select-none container form-label block relative cursor-pointer pl-8 pt-1">{{ label }}
            <input class="absolute opacity-0 left-0 top-0 cursor-pointer" :id="id" ref="checkbox" v-bind="$attrs" :class="{ error: error }" :type="type" @change="$emit('input', eventChecked ? $event.target.checked : $event.target)">
            <span class="h-6 w-6 checkmark absolute top-0 left-0 border"></span>
        </label>

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
                    return `text-input-${this._uid}`;
                },
            },
            type: {
                type: String,
                default: "checkbox",
            },
            eventChecked: {
                type: Boolean,
                default: true,
            },
            value: null,
            label: String,
            error: String,
        },
        methods: {
            focus() {
                this.$refs.checkbox.focus();
            },
            select() {
                this.$refs.checkbox.select();
            },
            setSelectionRange(start, end) {
                this.$refs.checkbox.setSelectionRange(start, end);
            },
        },
    };
</script>
