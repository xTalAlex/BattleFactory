<template>
    <Transition
            enter-active-class="transition duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
        <div class="fixed inset-x-0 top-0 -bottom-32 z-40 flex bg-black/25 backdrop-blur-sm"
            :class="classes"
            @click="$emit('clickedOutside')"
            v-show="visible"
        ></div>
    </Transition>
</template>

<script>

    export default {

        props : {
            classes : {
                type: String,
                default : '',
            },
            visible : {
                type : Boolean,
                defualt : true,
            },
        },

        data() {
            return {
                
            }
        },

    };
</script>

