<template>
	<section class="pt-20 pb-16 mx-auto sm:pb-40 md:max-w-5xl">
        <div class="container px-4 mx-auto">

            <div class="flex flex-wrap justify-center mb-16 text-center">
                <div class="w-full px-4 lg:w-6/12">
                    <h2 class="text-4xl font-semibold">Here are our Squads</h2>
                    <p class="m-4 text-lg leading-relaxed text-gray-600">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap justify-center">
                <div class="w-full px-4 mb-12 md:w-6/12 lg:w-4/12" v-for="squad in squads" :key="squad.code">
                    <Card 
                        v-bind="squad"
                        :rank="squad.rank || ranks[0]"
                        :country_name="countryName(squad.country)"
                    />
                </div>
            </div>

        </div>
    </section>
</template>

<script>

    import {RANKS} from '@utils/constants';
    import Card from '@components/Card.vue';
    import countriesList from 'countries-list';

    export default {

        components: {
            Card
        },

        data() {
            return {
                squads: [],
                countries : countriesList.countries,
                ranks : RANKS,
            }
        },

        methods : {
            countryName(code){
                let country = null;
                if(code) country = this.countries[code.toUpperCase()];
                return country ? country.name : null;
            }
        },

        created() {
            fetch("https://battlefactory-admin.herokuapp.com/api/squads")
                .then(response => response.json())
                .then(result => this.squads = result.data);
        }

    };
    
</script>