<template>
	<section class="pt-20 pb-16 mx-auto sm:pb-40 md:max-w-5xl">
        <div class="container px-4 mx-auto">

            <div class="flex flex-wrap justify-center mb-16 text-center">
                <div class="w-full px-4 lg:w-6/12">
                    <h2 class="text-4xl font-semibold">{{ title }}</h2>
                    <div class="m-4 text-lg leading-relaxed text-gray-600">
                        <slot />
                    </div>
                </div>
            </div>


            <AisInstantSearch
                class="w-full"
                index-name="squads" 
                v-bind:search-client="searchClient"
            >
                <!-- <AisConfigure
                    :hits-per-page.camel="6"
                    filters="featured:true"
                /> -->
                <AisConfigure
                    :hits-per-page.camel="6"
                />
                <AisHits class="flex flex-wrap justify-center">
                    <template v-slot="{ items }" >
                        <div class="w-full px-4 mb-12 md:w-6/12 lg:w-4/12" v-for="item in items" :key="item.code">
                            <Card 
                                v-bind="item"
                                :translations="translations"
                            ></Card>
                        </div>
                    </template>
                </AisHits>
            </AisInstantSearch>

        </div>
    </section>
</template>

<script>
    import algoliasearch from 'algoliasearch/lite';
    import {AisInstantSearch, AisConfigure, AisHits} from 'vue-instantsearch/vue3/es/index.js';

    import {RANKS} from '@utils/constants';
    import Card from '@components/Card.vue';

    export default {

        components: {
            Card,
            AisInstantSearch,
            AisConfigure,
            AisHits,
        },

        props : {
            algoliaAppId : {
                type : String
            },
            algoliaClient : {
                type : String
            },
            title : {
                type: String
            },
            translations : {
                type: Object
            }
        },

        data() {
            return {
                searchClient: algoliasearch(
                    this.algoliaAppId,
                    this.algoliaClient
                ),
                squads: [],
                ranks : RANKS,
            }
        },

        methods : {

        },

        created() {
            // fetch("https://uniteagency-admin.herokuapp.com/api/squads")
            //     .then(response => response.json())
            //     .then(result => this.squads = result.data.slice(0, 9))
            //     .catch( error => this.squads = [] );
        },

    };
    
</script>