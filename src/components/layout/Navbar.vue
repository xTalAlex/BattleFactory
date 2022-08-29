<template>
    <div>
        <Backdrop 
            classes="lg:hidden"
            v-show="visible"
            @clickedOutside="hide()"
        />

        <nav class="fixed top-0 z-40 flex flex-wrap items-center justify-between w-full px-2 py-3 bg-black/40 backdrop-blur-lg md:backdrop-blur-sm">
            <div class="container flex flex-wrap items-center justify-between px-4 mx-auto">
                
                <div class="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
                    <a class="inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase outline-none focus:outline-none whitespace-nowrap text-secondary-200"
                        :href="homeUrl"
                    >Unite Agency</a>
                        
                    <button class="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
                        type="button"
                        @click="toggle()"
                    >
                        <i class="text-secondary-100 fas fa-bars"></i>
                    </button>
                </div>

                <div class="relative items-center flex-grow bg-transparent lg:visible lg:flex shadow-b-md"
                    :class="{
                        'hidden' : !visible,
                        'block' : visible
                    }"
                >

                    <ul class="flex flex-col mr-auto list-none lg:flex-row">
                        <li class="flex items-center">
                            <a class="w-full flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-secondary-200 lg:hover:text-secondary-500 text-secondary-200 lg:py-2"
                                :href="submitUrl"
                            >
                                <i class="mr-1 fa fa-arrow-alt-circle-up text-secondary-100"></i>
                                {{ submitButton }}
                            </a>
                        </li>
                    </ul>

                    <ul class="flex flex-col list-none lg:flex-row lg:ml-auto">                
                        <li class="flex items-center">
                        <a
                            class="w-full flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-secondary-200 lg:hover:text-secondary-500 text-secondary-200 lg:py-2"
                            href="https://www.twitch.tv/directory/game/Pok%C3%A9mon%20Unite"
                            target="_blank"
                            ><i
                            class="text-lg text-secondary-100 fab fa-twitch leading-lg "
                            ></i
                            ><span class="inline-block ml-2 lg:hidden">Twitch</span></a
                        >
                        </li>
                        <li class="flex items-center">
                        <a
                            class="w-full flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-secondary-200 lg:hover:text-secondary-500 text-secondary-200 lg:py-2"
                            href="https://www.youtube.com/user/PokemonUfficiale"
                            target="_blank"
                            ><i
                            class="text-lg text-secondary-100 fab fa-youtube leading-lg "
                            ></i
                            ><span class="inline-block ml-2 lg:hidden">Youtube</span></a
                        >
                        </li>
                        <li class="flex items-center mt-4 lg:mt-0">
                            <form method="GET" :action="indexUrl">
                                <button
                                class=" text-center px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase rounded shadow outline-none focus:ring-secondary-500 focus:ring-2 bg-secondary-100 text-secondary-500 active:bg-secondary-100 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0"
                                type="submit"
                                style="transition: all 0.15s ease 0s;"
                                >
                                <Database class="-mt-1 text-secondary-500 inline-block w-4 h-4" />
                                    {{ indexButton }}
                                </button>
                            </form>
                        </li>
                    </ul>

                </div>

            </div>
        </nav>   
    </div>
</template>

<script>

    import { escapable } from "@utils/escapable";

    import Backdrop from "@components/Backdrop.vue";
    import Database from "@components/icons/Database.vue";

    export default {

        name : "navbar",

        components : {
            Backdrop,
            Database,
        },

        mixins: [escapable],

        props : {
            submitButton : {
                type : String,
            },
            indexButton : {
                type : String,
            },
            homeUrl : {
                default : '/'
            },
            submitUrl : {
                default : '/squads/submit'
            },
            indexUrl : {
                default : '/squads'
            },
        },

        data() {
            return {
                visible : false,
            }
        },

        computed : {
            escapableVisible(){
                return this.visible;
            },
        },

        methods : {
            toggle(){
                this.visible = ! this.visible;
            },

            hide(){
                this.visible = false;
            },

            escapeHandler() {
                this.hide();
            },
        },
    };

</script>