<template>
    <div>
        <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
        <datetime :type="type" :input-id="id" ref="input" v-bind="$attrs" :auto="true" :max-datetime="minimumDate()" :min-datetime="startFrom()" :format="format" :value="value" :input-class="[{ error: error }, 'form-input']" @input="$emit('input', $event)" :placeholder="placeholder"></datetime>
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
            type: String,
            format: [String, Object, Array],
            label: String,
            error: String,
            value: String,
            placeholder: String,
            minimumYear: Number,
            startFromNumber: Number,
            startFromDuration: String,
        },
        methods: {
            minimumDate() {
                if (this.minimumYear) {
                    return this.$moment().subtract(this.minimumYear, 'years').toISOString()
                }
            },
            startFrom() {
                if (this.startFromNumber && this.startFromDuration) {
                    return this.$moment().add(this.startFromNumber, this.startFromDuration).toISOString()
                }
            },
            // format: function() {
            //     if ( this.type === 'datetime' ) {
            //         return { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit' };
            //     }
            //     return { year: 'numeric', month: '2-digit', day: '2-digit' };
            // }
        },
    };
</script>