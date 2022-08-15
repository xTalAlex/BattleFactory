<template>
    <div class="w-full px-4 mb-12 md:w-6/12 lg:w-4/12">
        <div class="relative flex h-64 max-w-sm mx-auto group hover:bg-[right_0] focus-within:bg-[right_0] link-card p-0.5 border-0 border-secondary-200 transition-[brackground-position] duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)] rounded-lg bg-bottom bg-gradient-to-bl from-primary-500 to-secondary-500"
            style="background-size: 400%;"
        >
            <div class="flex flex-col w-full h-full px-5 py-4 leading-6 text-gray-900 rounded-md bg-primary-100 focus:outline-none opacity-80">
                
                <div class="w-full m-0 font-bold cursor-pointer"
                    @click="openSquadModal()"
                >
                    <img class="inline-block w-3 h-3 mr-1 -mt-4"
                        v-if="country"
                        :src="countryFlag"
                        :alt="country_name"
                        :title="country_name"
                    />
                    <div class="inline-block overflow-hidden max-w-3/4 text-ellipsis group-hover:text-primary-500 group-focus-within:text-primary-500 text-secondary-500 transtion-colors duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)]" 
                        :title="name"
                    >{{name}}</div>
                    <span class="ml-1 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5 inline-block transition-transform duration-75 ease-[cubic-bezier(0.22, 1, 0.36, 1)]"
                        :title="code"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                    </span>
                </div>

                <div class="relative flex-1 px-2 py-3 mb-0 text-sm">
                    <p class="font-medium line-clamp-6"
                        v-show="description"
                    >{{description}}</p>
                    <img class="absolute inset-0 object-center h-full mx-auto opacity-10" :src="'/img/emblem.png'" />
                </div>

                <div class="flex items-center justify-between px-4 py-2 pt-2 text-xs transition rounded-md group-hover:bg-primary-200 bg-secondary-200">
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
                        :tooltip="requires_approval ? 'Requires Approval' : 'No Approval Required'"
                    >
                        <div class="">
                            <span class="text-warning-500" v-if="requires_approval">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <span class="text-success-500" v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
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
    </div>
</template>

<script>

    import Tooltip from '@components/Tooltip.vue';
    import RankIcon from '@components/icons/RankIcon.vue';
    import UsersGroupIcon from '@components/icons/UsersGroupIcon.vue';

    export default {

        components : {
            Tooltip,
            RankIcon,
            UsersGroupIcon,
        },

        props: {
            name : {
                type: String,
                required: true
            },
            code : {
                type: String,
                required: true
            },
            rank : {
                type: String,
                required: true
            },
            active_members : {
                type: Number,
                required: true
            },
            country : {
                type: String,
                required: false
            },
            country_name : {
                type: String,
                required: false
            },
            requires_approval : {
                type: Boolean,
                required: true
            },
            link : {
                type: String,
                required: false
            },
            description : {
                type: String,
                required: false
            },
        },
        
        data() {
            return {
            }
        },

        computed: {
            countryFlag() {
                return this.country ? 'https://flagcdn.com/32x24/'+this.country.toLowerCase()+'.png' : '';
            },

            rankLabel(){
                return this.rank>=1200 ? 'Master '+this.rank : (this.rank[0].toUpperCase() + this.rank.substring(1));
            },
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