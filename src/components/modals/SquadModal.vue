<template>
    <Modal
        :title="title"
        cancelButton=""
        :visible="visible"
        @close="visible=false"
    >
        <div class="relative flex flex-col p-6">
            <!-- Code -->
            <div class="flex flex-row items-center justify-start w-full h-8 mb-2">
                <h2 class="text-lg font-semibold uppercase "
                v-text="code"></h2>

                <!-- Verified -->
                <template v-if="verified">
                    <span title="Verified">  
                        <VerifiedIcon class="ml-1 h-4 w-4" />
                    </span>
                </template>
            </div>

            <!-- Subheader -->
            <div class="flex flex-row my-2 space-x-2 text-xs text-gray-500">

                <!-- Badge Location -->
                <template v-if="country">
                    <div class="flex flex-row items-center space-x-1">
                        <LocationMarker/>
        
                        <template v-if="country">
                            <img class="inline-block w-3 h-3 mt-0.5"
                                :src="countryFlag"
                                :alt="country"
                                :title="countryName"
                            />
                        </template>
        
                        <div class="" v-text="countryName"></div>
                    </div>
                </template>

                <!-- Badge Link-->
                <template v-if="link">
                    <div class="flex flex-row items-center space-x-1">
                        <LinkIcon/>

                        <a class="font-semibold text-gray-900 hover:text-gray-600"
                            target="_blank"
                            :href="link"
                        >{{ translations.link }}</a>
                    </div>
                </template>
            </div>

            <p class="px-4 py-2 my-4 text-sm font-medium text-gray-500 rounded bg-secondary-50"
                v-text="description"
                v-show="description"
            ></p>

            <!-- Mini Cards -->
            <div class="flex flex-row items-center justify-center mt-2 space-x-5 text-gray-900 cursor-default">
                <!-- Active Members -->
                <div class="flex flex-col items-center justify-center w-40 h-20 transition-colors duration-100 ease-in-out border rounded-md border-secondary-200 hover:border-secondary-400">
                    <div class="flex flex-row items-center justify-center">
                        <UsersGroupIcon margins="mr-3"/>
            
                        <span class="font-bold"
                            v-text="active_members"
                        ></span>
                    </div>
        
                    <div class="mt-2 text-xs text-gray-500 text-center">{{ translations.members }}</div>
                </div>

                <!-- Ranks -->
                <div class="flex flex-col items-center justify-center w-40 py-4 transition-colors duration-100 ease-in-out border rounded-md border-secondary-200 hover:border-secondary-400">
                    <div class="flex flex-row items-center justify-center">
                        <RankIcon 
                            :rank="rank"
                            sizes="h-12"
                        />
                    </div>
        
                    <div class="mt-2 text-xs text-gray-500 text-center"
                        v-text="rankLabel"
                    ></div>
                </div>

                <!-- Approval -->
                <div class="flex flex-col items-center justify-center w-40 h-20 transition-colors duration-100 ease-in-out border rounded-md border-secondary-200 hover:border-secondary-400">
                    <div class="flex flex-row items-center justify-center"
                        :class="{ 'text-success-500' : !requires_approval , 'text-warning-500' : requires_approval }"
                    >
                        <LockOpenIcon 
                            class="h-6 w-6"
                            v-if="!requires_approval"
                        />
                        <LockClosedIcon 
                            class="h-6 w-6"
                            v-else
                        />
                    </div>
        
                    <div class="mt-2 text-xs text-gray-500 text-center"
                        v-text="requires_approval ? translations.requiresApproval : translations.open"
                    ></div>
                </div>
            </div>

        </div>

        <template #confirmButton>
            <button type="button" class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-primary-500 active:bg-primary-600 hover:shadow-lg focus:outline-none" 
                @click="visible=false"
            >
                Ok
            </button>
        </template>
    </Modal>
</template>

<script>

    import {squad} from "@utils/squad.js";
    import countriesList from 'countries-list';
    
    import Modal from "@components/modals/Modal.vue";
    import LocationMarker from "@components/icons/LocationMarker.vue";
    import LinkIcon from "@components/icons/LinkIcon.vue";
    import RankIcon from "@components/icons/RankIcon.vue";
    import VerifiedIcon from "@components/icons/VerifiedIcon.vue";
    import UsersGroupIcon from "@components/icons/UsersGroupIcon.vue";
    import LockOpenIcon from "@components/icons/LockOpenIcon.vue";
    import LockClosedIcon from "@components/icons/LockClosedIcon.vue";

    export default {

        name: "squad-modal",

        components : {
            Modal,
            LocationMarker,
            LinkIcon,
            RankIcon,
            VerifiedIcon,
            UsersGroupIcon,
            LockOpenIcon,
            LockClosedIcon,
        },

        mixins: [],

        props : {
            translations : {
                type : Object
            }
        },

        data() {
            return {
                title : "Info",
                visible : false,
                countries : countriesList.countries,
                name : '',
                code : '',
                description : null,
                verified : false,
                country : '',
                link: '',
                active_members : 1,
                rank : '',
                requires_approval : false,
                verified : false,
                featured : false,
            }
        },

        computed : {
            countryName(){
                let country = null;
                if(this.country) country = this.countries[this.country.toUpperCase()];
                return country ? country.name : null;
            },

            countryFlag() {
                return this.country ? 'https://flagcdn.com/32x24/'+this.country.toLowerCase()+'.png' : '';
            },

            rankLabel(){
                return this.rank>=1200 ? 'Master '+this.rank : (this.rank[0].toUpperCase() + this.rank.substring(1));
            },
        },

        methods: {
        },

        mounted() {
            document.openSquadModal = function openSquadModal(params){
                document.dispatchEvent( new CustomEvent('openSquadModal',  { "detail" : params }) );
            };

            document.addEventListener('openSquadModal', (e) => {
                this.name = e.detail.name;
                this.code = e.detail.code;
                this.description = e.detail.description;
                this.country = e.detail.country ? e.detail.country.toLowerCase() : '';
                this.link = e.detail.link ? e.detail.link : '';
                this.active_members = e.detail.active_members;
                this.rank = e.detail.rank;
                this.requires_approval = e.detail.requires_approval;
                this.verified = e.detail.verified ? true : false;
                this.featured = e.detail.featured ? true : false;

                this.title = this.name;
                this.visible = true;
            });
        }

    }

</script>