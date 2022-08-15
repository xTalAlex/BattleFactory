<template>
    <div :id="reference">  
        <slot></slot>
    </div>
</template>

<script>

    import tippy from 'tippy.js';

    export default {

        props : {
            tooltip : {
                type : String,
                default : '',
            }
        },
        
        data() {
            return {
                tippy : tippy,
            }
        },

        computed : {
            reference()
            {
                return 'ref' + this._.uid;
            }
        },

        mounted() {
            if(this.tooltip)
                this.tippy( '#' + this.reference , {
                    content: this.tooltip,
                });
        }
    }

</script>
