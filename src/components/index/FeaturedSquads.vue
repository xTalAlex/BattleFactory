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

            <div class="flex flex-wrap justify-center">
                <div v-if="squads.length">
                    <div class="w-full px-4 mb-12 md:w-6/12 lg:w-4/12" v-for="squad in squads" :key="squad.code">
                        <Card 
                            v-bind="squad"
                            :rank="squad.rank || ranks[0]"
                            :translations="translations"
                        />
                    </div>
                </div>
                <div v-else>
                    <div>
                        <svg class="animate-spin h-12 w-12 text-secondary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25 stroke-secondary-500" cx="12" cy="12" r="10" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>

    import {RANKS} from '@utils/constants';
    import Card from '@components/Card.vue';

    export default {

        components: {
            Card
        },

        props : {
            title : {
                type: String
            },
            translations : {
                type: Object
            }
        },

        data() {
            return {
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