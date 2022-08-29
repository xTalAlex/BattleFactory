<template>
    <div>

        <Backdrop
            v-show="visible"
        />

        <Transition
            enter-active-class="animate__animated  animate__zoomIn animate__faster"
            leave-active-class="transition duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                @click.self="close()"
                v-if="visible"
            >
                <div class="relative w-5/6 my-6 mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2"
                    :class="maxWidth"
                >
                    <div class="relative max-h-screen overflow-y-auto flex mx-auto flex-col w-full border-0 rounded-lg shadow-lg outline-none bg-primary-50 focus:outline-none">
                        
                        <div class="flex items-start justify-between p-5 text-gray-900 border-b border-solid rounded-t border-primary-200">
                            <h3 class="text-2xl font-semibold"
                                v-text="title"
                            ></h3>
                            <button class="z-50 float-right p-1 ml-auto text-2xl font-semibold leading-none bg-transparent border-0 outline-none text-secondary-500 focus:outline-none"
                                @click="close()"
                            >
                                <span class="block w-6 h-6 text-2xl bg-transparent outline-none focus:outline-none">
                                x
                                </span>
                            </button>
                        </div>

                        <slot/>

                        <div class="flex items-center justify-end p-6 border-t border-gray-200 border-solid rounded-b"
                        >
                            <button  type="button" class="px-6 py-2 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear outline-none text-secondary-500 background-transparent focus:outline-none" 
                                v-cloak
                                @click="close()"
                                v-text="cancelButton"
                                v-show="cancelButton"
                            ></button>
                            
                            <slot name="confirmButton"/>
                        </div>
                        
                    </div>

                </div>
            </div>
        </Transition>

    </div>
</template>

<script>

    import { escapable } from "@utils/escapable";
    
    import Backdrop from "@components/Backdrop.vue";

    export default {

        name: "modal",

        components : {
            Backdrop
        },

        mixins: [escapable],

        props : {
            maxWidth : {
                type: String,
                default : 'max-w-6xl',
            },
            title : {
                type : String,
                default : '',
            },
            cancelButton : {
                type : String,
                default : 'Cancel',
            },
            visible : {
                type : Boolean,
                default : false,
            },
        },

        data() {
            return {
            }
        },

        computed : {
            escapableVisible(){
                return this.visible;
            },
        },

        methods: {
            escapeHandler() {
                this.close();
            },
            close(){
                this.$emit('close');
            },
        },

    }

</script>