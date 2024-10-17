<template>
    <div class="bg-gray-100 pt-2 border-t">
    <div class="flex pb-5 px-3 mx-auto text-center pt-5 text-gray-800 text-sm flex-col
        md:flex-row max-w-6xl">
        <div class="mt-2">&copy; Copyright {{$moment().year()}}. All Rights Reserved.</div>
    </div>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        methods: {
        },
    };
</script>
