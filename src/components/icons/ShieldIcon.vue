<template>
    <svg :class="classes" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
</template>

<script>

    export default {

        props : {
            colors : {
                type: String,
                default : '',
            },
            sizes : {
                type: String,
                default : 'h-6 w-6',
            },
            margins : {
                type: String,
                default : ''
            },
        },

        data() {
            return {
                
            }
        },

        computed : {

            classes(){
                return this.colors + ' ' + this.sizes + ' ' + this.margins;
            }

        },

    };

</script>