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
                <Card v-for="squad in squads" :key="squad.code"
                    v-bind="squad"
                    :country_name="countryName(squad.country)"
                />
            </div>

        </div>
    </section>
</template>

<script>

    import Card from '@components/Card.vue';
    import countriesList from 'countries-list';

    export default {

        components: {
            countriesList,
            Card
        },

        data() {
            return {
                squads: [],
                countries : countriesList.countries,
            }
        },

        methods : {
            countryName(country){
                return country ? this.countries[country].name : null;
            }
        },

        created() {
            fetch("https://battle-factory-admin.herokuapp.com/api/squads")
                .then(response => response.json())
                .then(result => this.squads = result.data);
        }

    };
    
</script>