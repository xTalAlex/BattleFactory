<template>
    <Transition
        enter-active-class="transition duration-300 ease-out origin-right"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100" 
        leave-active-class="transition duration-200 ease-out origin-right"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
    <div class="fixed right-0 z-50 text-white top-1/3 md:top-1/4 min-w-fit"
        v-cloak
        v-if="visible"
    >

        <div class="absolute w-40 md:w-40 -right-12"
            v-cloak
            v-show="visible"
        >
            <img class="h-full w-full -rotate-45 cursor-[url(/img/pokeball_cursor.png),_auto] active:cursor-[url(/img/pokeball_open_cursor.png),_auto]"
                :class="{
                    'cursor-[url(/img/pokeball_open_cursor.png),_auto]' : !visible
                }"
                src="/img/hoopa.png"
                @click="visible=false"
            />
        </div>

        <div class="relative py-4 pl-12 pr-8 rounded-lg shadow-xl w-72 sm:max-w-md sm:w-full right-28 sm:right-32 sm:top-6"
            :class="{
                'bg-success-500' : type=='success',
                'bg-warning-500' : type=='warning',
                'bg-danger-500' : type=='error',
            }"
            v-cloak
            v-show="visible"
        >
            <button class="absolute top-0 text-2xl font-semibold leading-none bg-transparent outline-none cursor-pointer right-2 focus:outline-none" 
                @click="visible=false"
            >
                <span>×</span>
            </button>

            <span class="absolute top-4 left-4">
                <i class="fas fa-bell"></i>
            </span>

            <div class="max-w-full pr-3 overflow-auto max-h-72">
                <span class="mr-1 font-bold capitalize" v-text="typeLabel"></span>
                <span class="" v-text="message"></span>
            </div>

            <div class="absolute w-4 h-4 rotate-45 -right-1 top-12 sm:top-6"
                :class="{
                    'bg-success-500' : type=='success',
                    'bg-warning-500' : type=='warning',
                    'bg-red-500' : type=='error',
                }"
            ></div>
        </div>

    </div>  
    </Transition>
</template>

<script>

    export default {

        props : {
            
        },

        data() {
            return {
                type : 'error',
                message : null,
                visible : false,
            }
        },

        computed : {
            typeLabel(){
                let typeName = this.type=='error' ? 'Hoops' : this.type;
                return typeName + '!';
            }
        },

        created() {
            document.addEventListener('alert', ({detail}) => {
                this.type = detail.type;
                this.message = detail.message;
                this.visible = true;
            });
        }

    };

</script>