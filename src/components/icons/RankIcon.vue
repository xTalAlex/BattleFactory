<template>
    <img :class="sizes" :src="rankIcon" />
</template>

<script>
    export default {

        props : {
            rank : {
                type : String,
                required : true
            },
            sizes : {
                type : String,
                default : 'w-8 h-8',
            }
        },

        setup() {},

        computed : {
            rankIcon(){
                return '/img/'+ (this.rank>=1200 ? 'master' : this.rank) +'_icon.png';
            },
        },

    }
</script>
