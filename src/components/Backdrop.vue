<template>
    <div class="fixed inset-0 z-40 flex bg-black/25 backdrop-blur-sm"
        :class="classes"
        @click="$emit('clickedOutside')"
    ></div>
</template>

<script>

    export default {

        props : {
            classes : {
                type: String,
                default : '',
            },
        },

        data() {
            return {
                
            }
        },

    };
</script>

