<template>
    <div v-if="options">
        <label class="form-control">{{ label }}
        </label>
        <div class="flex flex-wrap mt-4">
            <div class="items-center mr-4 mb-4" v-for="(option, key) in options" :key="key" @change="$emit('input', $event.target.value)">
                <input :id="id + key" v-model="selected" :class="{ error: error }" :value="option[0]" :type="type" @change="$emit('change', $event.target)" v-bind="$attrs" :name="name" />
                <label :for="id + key" class="items-center cursor-pointer ml-2">
                 {{ option[0] }}
                </label>
            </div>
        </div>

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
                    return `radio-input-${this._uid}`;
                },
            },
            type: {
                type: String,
                default: "radio",
            },
            options: null,
            value: [Array, String, null],
            label: String,
            error: String,
            name: {
                type: String,
                default() {
                    return `radio`;
                },
            },
        },
        data() {
            return {
                selected: this.value,
            }
        },
        watch : {
            value : function (val) {
                this.selected = val
            }
        },
        methods: {
            focus() {
                this.$refs.radio.focus();
            },
        },
    };
</script>
