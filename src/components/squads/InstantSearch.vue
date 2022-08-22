<template>

    <AisInstantSearch 
        class="w-full"
        index-name="squads" 
        v-bind:search-client="searchClient"
    >
        <AisConfigure
            :hits-per-page.camel="6"
            :attributesToSnippet="['description:20']"
            snippetEllipsisText="..."
        />

        <div class="flex flex-col mb-12 space-y-2 pl-6 sm:pl-16 md:pl-0">
            <div class="flex flex-wrap items-center md:justify-center w-full">
                <AisSortBy 
                    :items="[
                        { value: 'squads', label: 'Latest' }, 
                        { value: 'squads_oldest', label: 'Oldest' },
                        { value: 'squads_rank_desc', label: 'Rank desc.' },
                        { value: 'squads_rank_asc', label: 'Rank asc.' },
                        { value: 'squads_active_members_desc', label: 'Active Members desc.' },
                        { value: 'squads_active_members_asc', label: 'Active Members asc.' },
                        { value: 'squads_name_desc', label: 'Name desc.' },
                        { value: 'squads_name_asc', label: 'Name asc.' },
                    ]"
                    :class-names="{
                        'ais-SortBy': 'mt-2 md:mt-0 order-3 md:order-1 w-5/6 md:w-1/2 md:mr-1 w-full  md:w-fit min-w-max',
                        'ais-SortBy-select': 'w-full pl-3 pr-8 py-1 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500',
                        'ais-SortBy-option': ''
                    }"
                />
                <AisSearchBox
                    placeholder="Search..."
                    show-loading-indicator
                    :class-names="{
                        'ais-SearchBox' : 'order-1 md:order-2 inline-block w-5/6 md:w-1/2',
                        'ais-SearchBox-form' : 'relative',
                        'ais-SearchBox-input' : 'w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200',
                        'ais-SearchBox-loadingIndicator' : 'absolute right-8 h-full',
                        'ais-SearchBox-loadingIcon' : 'w-4 h-full fill-current stroke-current',
                        'ais-SearchBox-submit' : 'hidden',
                        'ais-SearchBox-reset' : 'hidden'
                    }"   
                />

                <AisVoiceSearch
                    class="order-2 w-1/6 md:w-auto pl-2 md:order-3"
                    search-as-you-speak
                    :class-names="{
                        'ais-VoiceSearch-status': 'hidden'
                    }"
                />
            </div>
        </div>


        <Backdrop class="z-20" :visible="sidebarVisible" 
            @click="sidebarVisible = false"
        />
        <div class="fixed top-24 h-3/4 w-5/6 sm:w-96 shadow-xl left-0 z-30 px-6 py-6 bg-gradient-to-bl rounded-r-md transition-all border-2"
            :class="{
               'translate-x-0 duration-500 to-secondary-200 from-primary-200 border-primary-500' : sidebarVisible,
               '-translate-x-full ml-8 duration-300 to-primary-200 from-secondary-200 border-secondary-500' : !sidebarVisible, 
            }"
        >
            <div class="overflow-y-auto h-full"
                @click.self="sidebarVisible=true"
            >
                <div class="absolute top-0 right-0 h-full w-8"
                    :class="{
                        '' : sidebarVisible,
                        'cursor-pointer' : !sidebarVisible, 
                    }"
                    @click.self="sidebarVisible=true"
                >
                    <AdjustmentsIcon class="w-full mt-1 px-1 transition-none cursor-pointer" 
                        :class="{
                            'rotate-180' : sidebarVisible
                        }"
                        @click="sidebarVisible=!sidebarVisible"                 
                    />
                </div>
                <AisPanel>
                    <template v-slot:header="{ hasRefinements }">
                        <p>Country <span v-if="!hasRefinements">(no results)</span></p>
                    </template>
                    <AisRefinementList attribute="country"/>
                </AisPanel>
                <AisPanel>
                    <template v-slot:header="{ hasRefinements }">
                        <p>Rank <span v-if="!hasRefinements">(no results)</span></p>
                    </template>
                    <AisMenuSelect attribute="rank" />
                </AisPanel>
                <AisRangeInput attribute="active_members" :min="1" :max="30"/>
                <AisToggleRefinement attribute="requires_approval" label="Requires Approval"/>
                <AisToggleRefinement attribute="featured" label="Featured"/>
                <AisToggleRefinement attribute="verified" label="Verified"/>
                
                <AisClearRefinements />        
            </div>
        </div>

        <div>
            <AisInfiniteHits
                class="flex flex-col"
                :class-names="{
                    'ais-InfiniteHits-list' : 'flex flex-wrap',
                    'ais-InfiniteHits-item' : 'w-full px-4 mb-12 md:w-6/12 lg:w-4/12',
                }"
            >
                <template v-slot:item="{ item }" >
                    <Card 
                        v-bind="item"
                    >
                        <template #name>
                            <AisHighlight attribute="name" :hit="item" />
                        </template>
                        <template #description>
                            <AisSnippet attribute="description" :hit="item" />
                        </template>
                    </Card>
                </template>
                <template v-slot:loadMore="{ isLastPage, refineNext }">
                    <div class="flex w-full mt-6">
                        <button
                            class="mx-auto bg-transparent cursor-pointer hover:bg-secondary-500 text-secondary-700 font-semibold hover:text-white py-2 px-4 border border-secondary-500 hover:border-transparent rounded"
                            v-show="!isLastPage"
                            :disabled="isLastPage"
                            @click="refineNext"
                        >
                            Show More
                        </button>
                    </div>
                </template>
            </AisInfiniteHits>
        </div>

        <div class="mt-12 space-y-2 sm:space-y-auto px-6 flex flex-col sm:flex-row text-xs text-gray-500 justify-center items-center sm:justify-between">
            <AisStats>
                <template v-slot="{  nbHits, processingTimeMS }">
                    <span class="font-medium">{{nbHits}}</span> results found in
                    <span  class="font-medium">{{ processingTimeMS }}ms</span>
                </template>
            </AisStats>
            <AisPoweredBy/>
        </div>

    </AisInstantSearch>
</template>

<script>

    import algoliasearch from 'algoliasearch/lite';
    import { 
            AisInstantSearch, AisConfigure, AisStats, 
            AisPoweredBy, AisSearchBox, AisVoiceSearch, 
            AisInfiniteHits, AisHighlight, AisSnippet, 
            AisSortBy, AisPanel, AisRefinementList, 
            AisRangeInput, AisMenuSelect, AisToggleRefinement, 
            AisRatingMenu, AisClearRefinements
        } from 'vue-instantsearch/vue3/es';

    import { escapable } from "@utils/escapable";
    
    import Card from '@components/Card.vue';
    import AdjustmentsIcon from '@components/icons/AdjustmentsIcon.vue';
    import Backdrop from '@components/Backdrop.vue';

    export default {
        components: {
            Card,
            Backdrop,
            AdjustmentsIcon,
            AisInstantSearch,
            AisConfigure,
            AisStats,
            AisPoweredBy,
            AisSearchBox,
            AisVoiceSearch,
            AisInfiniteHits,
            AisHighlight,
            AisSnippet,
            AisSortBy,
            AisPanel,
            AisRefinementList,
            AisRangeInput,
            AisMenuSelect,
            AisToggleRefinement,
            AisRatingMenu,
            AisClearRefinements,
        },

        mixins : [escapable],

        props: ['algoliaAppId','algoliaClient'],

        data(){
            return {
                searchClient: algoliasearch(
                    this.algoliaAppId,
                    this.algoliaClient
                ),
                sidebarVisible : false,
            }
        },

        computed : {
            escapableVisible(){
                return this.sidebarVisible;
            },
        },

        methods: {
            escapeHandler() {
                this.sidebarVisible = false;
            },
        },

    };
</script>

<style scoped>

    .ais-Panel--noRefinement{
        display: none;
    }

</style>
