<template>

    <AisInstantSearch 
        class="w-full"
        index-name="squads" 
        v-bind:search-client="searchClient"
        :routing="routing"
    >
        <AisConfigure
            :hits-per-page.camel="12"
            :attributesToSnippet="['description:20']"
            snippetEllipsisText="..."
        />

        <div class="flex flex-col mb-12 space-y-2 pl-6 sm:pl-16 md:pl-0">
            <div class="flex flex-wrap items-center md:justify-center w-full">
                <AisSortBy 
                    :items="[
                        { value: 'squads', label: indexTranslations.sortingLatest }, 
                        { value: 'squads_oldest', label: indexTranslations.sortingOldest },
                        { value: 'squads_rank_desc', label: 'Rank ↙' },
                        { value: 'squads_rank_asc', label: 'Rank ↗' },
                        { value: 'squads_active_members_desc', label: translations.members + ' ↙' },
                        { value: 'squads_active_members_asc', label: translations.members + ' ↗' },
                        { value: 'squads_name_desc', label: translations.name + ' ↙' },
                        { value: 'squads_name_asc', label: translations.name + ' ↗' },
                    ]"
                    :class-names="{
                        'ais-SortBy': 'mt-2 md:mt-0 order-3 md:order-1 w-5/6 md:w-1/2 md:mr-1 w-full  md:w-fit min-w-max',
                        'ais-SortBy-select': 'w-full pl-3 pr-8 py-1 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500',
                        'ais-SortBy-option': ''
                    }"
                />
                <AisSearchBox
                    :placeholder="indexTranslations.searchPlaceholder"
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
                    :button-title="indexTranslations.voicesearchTitle"
                    :class-names="{
                        'ais-VoiceSearch-status': 'hidden'
                    }"
                />
            </div>
        </div>


        <Backdrop class="z-20" :visible="sidebarVisible" 
            @click="sidebarVisible = false"
        />
        <div class="fixed top-24 bottom-0.5 w-5/6 sm:w-96 shadow-xl left-0 z-30 px-6 py-4 bg-gradient-to-bl rounded-r-md transition-all border-2"
            :class="{
               'translate-x-0 duration-500 to-secondary-200 from-primary-200 border-primary-500' : sidebarVisible,
               '-translate-x-full ml-8 h-0 duration-300 to-primary-200 from-secondary-200 border-secondary-500' : !sidebarVisible, 
            }"
        >
            <div class="h-full pb-6"
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
                            'rotate-180' : sidebarVisible,
                            '' : !sidebarVisible
                        }"
                        @click="sidebarVisible=!sidebarVisible"                 
                    />
                </div>

                <div class="relative py-4 mx-2 h-full overflow-y-auto space-y-3 transition-transform duration-500" 
                    v-show="sidebarVisible"
                >

                    <AisPanel>
                        <template v-slot:header>
                            <p class="font-medium leading-tight text-base mt-0 mb-2 text-secondary-500">
                                Rank
                            </p>
                        </template>
                        <AisNumericMenu 
                            attribute="rank_value"
                            :items="[
                                { label: indexTranslations.filterAll },
                                { label: ' < Master 1200', end: 2 },
                                { label: 'Master 1200-1800', start: 2, end: 5 },
                                { label: 'Master 1800+', start: 5},
                            ]"
                        >
                            <template v-slot="{ items, refine }">
                                <ul class="text-sm cursor-pointer space-y-1 ml-2">
                                    <li class="" v-for="item in items" :key="item.value"
                                        :class="{ 
                                            'text-secondary-500 font-semibold': item.isRefined,
                                            'text-gray-500' : !item.isRefined 
                                        }"
                                        @click.prevent="refine(item.value)"
                                    >
                                        {{ item.label }}
                                    </li>
                                </ul>
                            </template>
                        </AisNumericMenu>
                    </AisPanel>

                    <AisPanel>
                        <template v-slot:header>
                            <p class="font-medium leading-tight text-base mt-0 mb-2 text-secondary-500">
                                {{ translations.members }}
                            </p>
                        </template>
                        <AisRangeInput attribute="active_members" :min="1" :max="30">
                            <template v-slot="{ currentRefinement, range, refine }" >
                                <div class="w-3/4 px-4 mt-4  mb-8">
                                    <vue-slider 
                                        lazy
                                        :min="range.min" 
                                        :max="range.max"
                                        :height="6"
                                        included
                                        tooltip="none"
                                        tooltip-placement="top"
                                        :marks="[1,5,10,15,20,25,30]"
                                        :process-style="{ backgroundColor: 'rgb(192, 132, 252)' }"
                                        :dot-style="{ backgroundColor : 'rgb(192, 132, 252)', borderColor : 'rgb(233, 213, 255)' }"
                                        :step-style="{ boxShadow: '0 0 0 2px rgb(192, 132, 252)', backgroundColor : 'rgb(233, 213, 255)'}"
                                        :tooltip-stype="{ backgroundColor : 'rgb(102,132,252)'}"
                                        @change="refine({ min: $event[0], max: $event[1] })"
                                        :value="toValue(currentRefinement, range)"
                                        v-model="activeMembers"
                                    >
                                    </vue-slider>
                                </div>
                            </template>
                        </AisRangeInput>
                    </AisPanel>

                    <div class="pt-2 space-y-4">
                        <AisToggleRefinement attribute="requires_approval" label="Open to Everyone" :on="false">
                            <template v-slot="{ value, refine }">
                                <label for="requires_approval" class=" relative inline-flex items-center cursor-pointer"
                                    @click.prevent="refine(value)"
                                >
                                    <input type="checkbox" class="sr-only peer"
                                        name="requires_approval" id="requires_approval"
                                        v-model="value.isRefined"
                                    >
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary-500"></div>
                                    <span class="ml-2 text-sm leading-5"
                                        :class="{ 
                                            'text-secondary-500' : value.isRefined,
                                            'text-gray-600' : !value.isRefined
                                        }"      
                                    >{{ translations.open }}</span>
                                    <span class="inline-block px-2 leading-3 mt-1 py-1 ml-2 text-xs font-semibold uppercase rounded-full text-secondary-600 bg-secondary-200"
                                    >{{ value.onFacetValue.count ?? 0}}
                                    </span>
                                </label>
                            </template>
                        </AisToggleRefinement>

                        <AisToggleRefinement attribute="verified" label="Verified">
                            <template v-slot="{ value, refine }">
                                <label for="verified" class=" relative inline-flex items-center cursor-pointer"
                                    @click.prevent="refine(value)"
                                >
                                    <input type="checkbox" class="sr-only peer"
                                        name="verified" id="verified"
                                        v-model="value.isRefined"
                                    >
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary-500"></div>
                                    <span class="ml-2 text-sm leading-5"     
                                        :class="{ 
                                            'text-secondary-500' : value.isRefined,
                                            'text-gray-600' : !value.isRefined
                                        }"  
                                    >{{ translations.verified }}</span>
                                    <span class="inline-block px-2 leading-3 mt-1 py-1 ml-2 text-xs font-semibold uppercase rounded-full text-secondary-600 bg-secondary-200"
                                    >{{ value.onFacetValue.count ?? 0}}
                                    </span>
                                </label>
                            </template>
                        </AisToggleRefinement>

                        <AisToggleRefinement attribute="featued" label="Featured">
                            <template v-slot="{ value, refine }">
                                <label for="featured" class=" relative inline-flex items-center cursor-pointer"
                                    @click.prevent="refine(value)"
                                >
                                    <input type="checkbox" class="sr-only peer"
                                        name="featured" id="featured"
                                        v-model="value.isRefined"
                                    >
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary-500"></div>
                                    <span class="ml-2 text-sm leading-5 " 
                                        :class="{ 
                                            'text-secondary-500' : value.isRefined,
                                            'text-gray-600' : !value.isRefined
                                        }"   
                                    >{{ translations.featured }}</span>
                                    <span class="inline-block px-2 leading-3 mt-1 py-1 ml-2 text-xs font-semibold uppercase rounded-full text-secondary-600 bg-secondary-200"
                                    >{{ value.onFacetValue.count ?? 0}}
                                    </span>
                                </label>
                            </template>
                        </AisToggleRefinement>
                    </div> 

                    <AisPanel>
                        <template v-slot:header>
                            <p class="font-medium leading-tight text-base mt-0 mb-2 text-secondary-500">
                                {{ translations.country }}
                            </p>
                        </template>
                        <AisRefinementList 
                            attribute="country_name"
                            :limit="3"
                            searchable
                            :searchable-placeholder="indexTranslations.filterSearchCountryPlaceholder"
                            :class-names="{
                                'ais-SearchBox-form' : 'pr-3 sm:pr-auto',
                                'ais-SearchBox-input' : 'w-full sm:w-1/2 px-3 py-1 text-sm leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200',
                                'ais-SearchBox-loadingIndicator' : 'hidden',
                                'ais-SearchBox-submit' : 'hidden',
                                'ais-SearchBox-reset' : 'hidden',
                                'ais-RefinementList-list' : 'mt-2 text-gray-500',
                                'ais-RefinementList-item' : 'text-sm leading-3',
                                'ais-RefinementList-item--selected' : 'text-secondary-500',
                                'ais-RefinementList-labelText' : 'ml-1',
                                'ais-RefinementList-count' : 'inline-block px-2 leading-3 mt-1 py-1 ml-2 text-xs font-semibold uppercase rounded-full text-secondary-600 bg-secondary-200',
                                'ais-RefinementList-checkbox' : 'w-3 h-3 focus:outline-none -mt-1 focus:ring-0 opacity-100 text-secondary-500 rounded-full'
                            }"
                        >
                            <template v-slot:noResults="{ query }">
                                <span class="text-xs text-gray-500 ml-2">{{ indexTranslations.noResults}} <q>{{ query }}</q></span>
                            </template>
                        </AisRefinementList>
                    </AisPanel>

                </div> 

                <AisClearRefinements class="absolute bottom-2 right-4 sm:right-8"
                        v-show="sidebarVisible"
                >
                    <template v-slot="{ canRefine, refine }">
                        <button class="w-full flex items-center px-3 mb-1 text-xs font-bold uppercase lg:text-secondary-500 lg:hover:text-secondary-600 disabled:text-secondary-400 disabled:hover:text-secondary-400 text-secondary-500"
                            @click.prevent="refine(); activeMembers = [1,30]"
                            :disabled="!canRefine"
                        >
                            {{ indexTranslations.filterClear }}
                        </button>
                    </template>
                </AisClearRefinements>

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
                        :translations="translations"
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
                            {{ indexTranslations.showMore }}
                        </button>
                    </div>
                </template>
            </AisInfiniteHits>
        </div>

        <div class="mt-12 space-y-2 sm:space-y-auto px-6 flex flex-col sm:flex-row text-xs text-gray-500 justify-center items-center sm:justify-between">
            <AisStats>
                <template v-slot="{  nbHits, processingTimeMS }">
                    <span class="font-medium">{{nbHits}}</span> {{ indexTranslations.stats }}
                    <span  class="font-medium">{{ processingTimeMS }}ms</span>
                </template>
            </AisStats>
            <AisPoweredBy/>
        </div>

    </AisInstantSearch>
</template>

<script>

    import algoliasearch from 'algoliasearch/lite';
    import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
    import { singleIndex as singleIndexMapping } from 'instantsearch.js/es/lib/stateMappings';
    import { 
            AisInstantSearch, AisConfigure, AisStats, 
            AisPoweredBy, AisSearchBox, AisVoiceSearch, 
            AisInfiniteHits, AisHighlight, AisSnippet, 
            AisSortBy, AisPanel, AisRefinementList, 
            AisRangeInput, AisToggleRefinement, AisNumericMenu,
            AisRatingMenu, AisClearRefinements
        } from 'vue-instantsearch/vue3/es';

    import { escapable } from "@utils/escapable";
    
    import Card from '@components/Card.vue';
    import AdjustmentsIcon from '@components/icons/AdjustmentsIcon.vue';
    import Backdrop from '@components/Backdrop.vue';

    import VueSlider from 'vue-slider-component';

    export default {
        components: {
            Card,
            Backdrop,
            AdjustmentsIcon,
            VueSlider,
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
            AisToggleRefinement,
            AisNumericMenu,
            AisRatingMenu,
            AisClearRefinements,
        },

        mixins: [escapable],

        props: {
            algoliaAppId : {
                type : String
            },
            algoliaClient : {
                type : String
            },
            translations : {
                type : Object
            },
            indexTranslations : {
                type : Object
            }
        },

        data(){
            return {
                searchClient: algoliasearch(
                    this.algoliaAppId,
                    this.algoliaClient
                ),
                routing: {
                    router: historyRouter(),
                    stateMapping: singleIndexMapping('squads'),
                },
                sidebarVisible : false,
                activeMembers : [1,30],
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
            toValue(value, range) {
                return [
                    typeof value.min === "number" ? value.min : range.min,
                    typeof value.max === "number" ? value.max : range.max,
                ];
            },
        },

    };
</script>