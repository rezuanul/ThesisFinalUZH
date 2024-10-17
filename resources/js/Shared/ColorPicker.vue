<template>
    <div class="flex flex-col mb-4 color-picker" ref="colorpicker">
        <label v-if="label" class="form-label" :for="id">{{ label }}:</label>

        <div class="relative">
            <div class="absolute flex border border-transparent left-0 top-0 w-10">
                <div class="flex current-color-container items-center justify-center rounded-tl rounded-bl">
                    <span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker()"></span>
                </div>
            </div>

            <input
                v-model="colorValue"
                @focus="showPicker()"
                @input="updateFromInput"
                :id="id"
                ref="input"
                v-bind="$attrs"
                class="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 pr-2 pl-12"
                :class="{ error: error }"
                :type="type"
                :value="value"
                :placeholder="placeholder"
            />

            <div v-if="error" class="form-error">{{ error }}</div>

            <span class="absolute flex input-group-addon color-picker-container">
                <chrome-picker class="form-input" value="colors" @input="updateFromPicker" v-if="displayPicker" />
            </span>
        </div>
    </div>
</template>

<script>
    import { Photoshop, Chrome } from "vue-color";

    export default {
        inheritAttrs: false,
        components: {
            "photoshop-picker": Photoshop,
            "chrome-picker": Chrome,
        },
        data() {
            return {
                colors: {
                    hex: "",
                },
                colorValue: "",
                displayPicker: false,
            };
        },
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
            value: String,
            label: String,
            error: String,
            placeholder: String,
        },
        mounted() {
            this.setColor(this.value || "");
        },
        methods: {
            setColor(color) {
                this.updateColors(color);
                this.colorValue = color;
            },
            updateColors(color) {
                if (color.slice(0, 1) == "#") {
                    this.colors = {
                        hex: color,
                    };
                } else if (color.slice(0, 4) == "rgba") {
                    var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
                        hex = "#" + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                    this.colors = {
                        hex: hex,
                        a: rgba[3],
                    };
                }
            },
            showPicker() {
                document.addEventListener("click", this.documentClick);
                this.displayPicker = true;
            },
            hidePicker() {
                document.removeEventListener("click", this.documentClick);
                this.displayPicker = false;
            },
            togglePicker() {
                this.displayPicker ? this.hidePicker() : this.showPicker();
            },
            updateFromInput() {
                this.updateColors(this.colorValue);
            },
            updateFromPicker(color) {
                this.colors = color;
                if (color.rgba.a == 1) {
                    this.colorValue = color.hex;
                } else {
                    this.colorValue = "rgba(" + color.rgba.r + ", " + color.rgba.g + ", " + color.rgba.b + ", " + color.rgba.a + ")";
                }
            },
            documentClick(e) {
                var el = this.$refs.colorpicker,
                    target = e.target;
                if (el !== target && !el.contains(target)) {
                    this.hidePicker();
                }
            },
        },
        watch: {
            colorValue(val) {
                if (val) {
                    this.updateColors(val);
                    this.$emit("input", val);
                    //document.body.style.background = val;
                }
            },
        },
    };
</script>

<style scoped>
    .current-color-container {
        z-index: 1;
    }

    .current-color {
        display: inline-block;
        width: 38px;
        height: 38px;
        background-color: #000;
        cursor: pointer;
        border: 1px solid #e2e8f0;
    }

    .vc-chrome {
        position: absolute;
        z-index: 9;
    }
</style>