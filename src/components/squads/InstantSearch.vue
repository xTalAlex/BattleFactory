<template>

    <AisInstantSearch 
        class="w-full"
        index-name="squads" 
        v-bind:search-client="searchClient"
    >
        <AisConfigure
            :hits-per-page.camel="6"
        />

        <div class="flex mb-12 items-center justify-center">
            <AisSearchBox
                placeholder="Search..."
                show-loading-indicator
                :class-names="{
                    'ais-SearchBox' : 'w-full sm:w-3/4 md:w-1/2',
                    'ais-SearchBox-form' : 'relative',
                    'ais-SearchBox-input' : 'w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200',
                    'ais-SearchBox-loadingIndicator' : 'absolute right-8 h-full',
                    'ais-SearchBox-loadingIcon' : 'w-4 h-full fill-current stroke-current',
                    'ais-SearchBox-submit' : 'hidden',
                    'ais-SearchBox-reset' : 'hidden'
                }"   
            />

            <AisVoiceSearch
                class="ml-2"
                search-as-you-speak
                :class-names="{
                    'ais-VoiceSearch-status': 'hidden'
                }"
            />
        </div>

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
                        <AisHighlight attribute="description" :hit="item" />
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

    </AisInstantSearch>
</template>

<script>

    import algoliasearch from 'algoliasearch/lite';
    import { AisInstantSearch, AisConfigure, AisSearchBox, AisVoiceSearch, AisInfiniteHits, AisHighlight } from 'vue-instantsearch/vue3/es';
    import Card from '@components/Card.vue';

    export default {
        components: {
            AisInstantSearch,
            AisConfigure,
            AisSearchBox,
            AisVoiceSearch,
            AisInfiniteHits,
            AisHighlight,
            Card
        },

        props: ['algoliaAppId','algoliaClient'],

        data(){
            return {
                searchClient: algoliasearch(
                    this.algoliaAppId,
                    this.algoliaClient
                ),
            }
        },

    };
</script>
