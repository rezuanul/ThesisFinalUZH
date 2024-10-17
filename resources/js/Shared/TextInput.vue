<template>
    <div>
        <label v-if="label" class="form-label" :for="id">{{ label }} <span v-if="required" class="text-red-700" aria-hidden="true" role="presentation">*</span></label>
        <input :id="id" ref="input" v-bind="$attrs" class="form-input border-solid" :class="{ error: error }" :type="type" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" />
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
                default: "text",
            },
            value: [String, Number],
            label: String,
            error: String,
            placeholder: String,
            required: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            focus() {
                this.$refs.input.focus();
            },
            select() {
                this.$refs.input.select();
            },
            setSelectionRange(start, end) {
                this.$refs.input.setSelectionRange(start, end);
            },
        },
    };
</script>