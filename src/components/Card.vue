<template>
    <div class="relative flex h-64 max-w-sm mx-auto group hover:bg-[right_0] focus-within:bg-[right_0] link-card p-0.5 border-0 border-secondary-200 transition-[brackground-position] duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-lg bg-bottom bg-gradient-to-bl from-primary-500 to-secondary-500"
        style="background-size: 400%;"
    >
        <div class="flex flex-col w-full h-full px-5 py-4 leading-6 text-gray-900 rounded-md bg-primary-100 focus:outline-none opacity-80">
            
            <div class="w-full cursor-pointer flex justify-between m-0 font-bold group-hover:text-primary-500 group-focus-within:text-primary-500 text-secondary-500 transtion-colors duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
                @click="openSquadModal()"
            >
                <div class=""
                >
                    <img class="inline-block w-3 h-3 mr-1 -mt-1"
                        v-if="country"
                        :src="countryFlag"
                        :alt="country_name"
                        :title="country_name"
                    />
                    <div class="inline-flex items-center leading-6 overflow-hidden max-w-3/4 text-ellipsis " 
                        :title="name"
                    >
                        <slot name="name">{{name}}</slot>
                        <!-- Verified -->
                        <template v-if="verified">
                            <span title="Verified">  
                                <VerifiedIcon class="ml-1 h-4 w-4" />
                            </span>
                        </template>
                    </div>
                </div>

                <span class=" mr-1 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5 inline-block transition-transform duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
                    :title="code"
                >
                    <Identification />
                </span>
            </div>

            <div class="relative flex-1 px-2 py-3 mb-0 text-sm cursor-pointer "
                @click="openSquadModal()"
            >
                <p class="font-medium line-clamp-6"
                    v-show="description"
                ><slot name="description">{{description}}</slot></p>
                <img class="absolute inset-0 object-center h-full mx-auto opacity-10" src="@assets/images/emblem.png" />
            </div>

            <div class="flex items-center justify-between px-4 py-2 pt-2 text-xs transition rounded-md group-hover:bg-primary-200 bg-secondary-200"
            >
                <Tooltip client:visible
                    tooltip="Active Members"
                >
                    <div class="relative">  
                        <UsersGroupIcon/>
                        <span class="absolute w-4 h-4 font-semibold text-center text-gray-900 bg-white rounded-full cursor-default -top-1 -right-2" 
                            v-text="active_members"
                        ></span>
                    </div>
                </Tooltip>
                <Tooltip
                    :tooltip="rankLabel"
                >
                    <div class="relative">
                        <div class="relative text-sm font-medium leading-7 text-gray-600 capitalize"
                        >
                            <RankIcon :rank="rank"/>
                            <span class="absolute inline-flex items-center justify-center px-1 py-1 text-xs font-medium leading-none text-gray-900 transform translate-x-1/2 -translate-y-1/2 rounded-full cursor-default bg-white/50 top-4 right-4 "
                                v-text="rank>=1200 ? '+'+rank : rank"
                            ></span>
                        </div>
                    </div>
                </Tooltip>
                <Tooltip client:visible
                    :tooltip="requires_approval ? 'Requires Approval' : 'Open'"
                >
                    <div class="">
                        <span :class="{ 'text-success-500' : !requires_approval , 'text-warning-500' : requires_approval }">
                            <LockOpenIcon 
                                class="h-6 w-6"
                                v-if="!requires_approval"
                            />
                            <LockClosedIcon 
                                class="h-6 w-6"
                                v-else
                            />
                        </span>
                    </div>
                </Tooltip>
                <Tooltip client:visible
                    :tooltip="link? 'External Link' : ''"
                >
                    <div class="cursor-pointer" 
                        @click="askConfirmation()"
                    >
                        <span :class="{ 'text-gray-900 opacity-20 cursor-default' : !link , 'text-secondary-500' : link }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                        <form class="hidden" method="GET" :action="link" target="_blank">
                            <button type="submit" ref="action"></button>
                        </form>
                    </div>
                </Tooltip>
            </div>
            
        </div>
    </div>
</template>

<script>

    import {squad} from "@utils/squad.js";

    import Tooltip from '@components/Tooltip.vue';
    import RankIcon from '@components/icons/RankIcon.vue';
    import UsersGroupIcon from '@components/icons/UsersGroupIcon.vue';
    import Identification from '@components/icons/Identification.vue';
    import LockOpenIcon from "@components/icons/LockOpenIcon.vue";
    import LockClosedIcon from "@components/icons/LockClosedIcon.vue";
    import VerifiedIcon from "@components/icons/VerifiedIcon.vue";

    export default {

        components : {
            Tooltip,
            RankIcon,
            UsersGroupIcon,
            Identification,
            LockOpenIcon,
            LockClosedIcon,
            VerifiedIcon,
        },

        props: {
        },

        mixins : [squad],
        
        data() {
            return {
            }
        },

        computed: {
            
        },

        methods: {
            openSquadModal()
            {
                document.openSquadModal(this.$props);
            },

            askConfirmation()
            {
                if(this.link){
                    document.askConfirmation({ 
                        title : 'Want to leave?', 
                        message : 'You are being redirected to an external page.',
                        link : this.link,
                        confirmText : 'Go',
                        cancelText : 'Stay',
                        callback : () => {this.$refs.action.click()} 
                    })
                }
            }
        },

    };
    
</script>