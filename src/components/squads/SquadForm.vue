<template>
    <form id="form" class="relative z-10 flex flex-col w-full p-8 mx-auto rounded-lg shadow-md lg:ml-32 lg:w-2/3 xl:w-1/2 bg-secondary-50">
        
        <h2 class="mb-1 text-3xl font-medium text-gray-900 title-font">Submit Your Squad</h2>
        <p class="mb-5 leading-relaxed text-gray-600">Fill the form with some information about your Squad.</p>

        <div class="relative mb-4">
            <label for="email" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.email }"
            >Email</label>
            <div class="relative">
                <input type="email" class="w-full py-1 pl-8 pr-3 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                    id="email" name="email" maxlength="50" 
                    @change="delete errors.email"
                    v-model="email"
                >
                <div class="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
            </div>

            <p class="text-xs text-red-500" v-if="errors.email" v-text="errors.email[0]"></p>
            <p class="text-xs text-gray-500" v-if="!errors.email">Without a valid email you wont be able to edit your Squad later.</p>
        </div>
        
        <div class="relative mb-4">
            <label for="squad_name" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.name }"
            >Squad Name <span class="text-red-500">*</span></label>
            <input type="text" class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                id="squad_name" name="squad_name" maxlength="20" 
                @change="delete errors.name"
                v-model="name"
            >
            
            <p class="text-xs text-red-500" v-if="errors.name" v-text="errors.name[0]"></p>
        </div>

        <div class="relative mb-4">
            <label for="code" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.code }"
            >Code <span class="text-red-500">*</span></label>
            <input type="text" class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                id="code" name="code" maxlength="20" 
                @change="delete errors.code"
                v-model="code"
            >
            
            <p class="text-xs text-red-500" v-if="errors.code" v-text="errors.code[0]"></p>
        </div>

        <div class="relative sm:flex">
            <div class="w-full mb-4 sm:w-1/2">
                <label for="active_members" class="text-sm font-medium leading-7 text-gray-600"
                    :class="{ 'text-red-500' : errors.active_members }"
                >Active Members <span class="text-red-500">*</span></label>
                <input type="number" class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                    id="active_members" name="active_members" 
                    min="1" max="30"
                    @input="validateActiveMembers()"
                    @change="delete errors.active_members"
                    @blur="!active_members ? active_members=1 : null"
                    v-model="active_members"
                >
            
                <p class="text-xs text-red-500" v-if="errors.active_members" v-text="errors.active_members[0]"></p>
            </div>

            <div class="w-full py-4 my-auto sm:w-1/2 sm:text-center">
                <label for="requires_approval" class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer"
                        name="requires_approval" id="requires_approval" value="1" 
                        @change="delete errors.requires_approval"
                        v-model="requires_approval"
                    >              
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary-500"></div>
                    <span class="ml-3 text-sm leading-5 text-gray-600"
                        :class="{ 'text-red-500' : errors.requires_approval }"
                    >Requires Approval</span>
                </label>

                <p class="text-xs text-red-500" v-if="errors.requires_approval" v-text="errors.requires_approval[0]"></p>
            </div>
            
        </div>
        
        <div class="relative mb-4">
            <label for="country" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.country }"
            >Country</label>
            <select class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500"
                name="country" id="country" 
                @change="delete errors.country"
                v-model="country"
            >
                <option value="" selected="selected">-</option>
                <option v-for="( country,iso_code) in countries" v-bind:key="iso_code" :value="iso_code">
                    {{ country.name }}
                </option>
            </select>
            
            <p class="text-xs text-red-500" v-if="errors.country" v-text="errors.country[0]"></p>
        </div>
        
        <div class="relative mb-4">
            <fieldset class="">
                <legend class="text-sm font-medium leading-7 text-gray-600"
                    :class="{ 'text-red-500' : errors.rank }"
                >Avarage Rank</legend>
                <div class="grid justify-center w-full grid-cols-3 px-4 py-2 mx-auto sm:grid-cols-6 md:grid-cols-6">
                    <template v-for="rank in ranks" v-bind:key="rank">
                        <div class="relative px-1 py-1 m-4 mx-auto rounded-lg focus-within:ring-2 focus-within:ring-secondary-500"
                            :class="{ 'ring-2 ring-secondary-500' : selected_rank==rank }"
                        >
                            <label :for="rank" class="relative text-sm font-medium leading-7 text-gray-600 capitalize cursor-pointer" :title="rank>=1200 ? 'Master '+rank : (rank[0].toUpperCase() + rank.substring(1))">
                                <RankIcon sizes="w-12" :rank="rank"/>
                                <span class="absolute inline-flex items-center justify-center px-1 py-1 text-xs font-medium leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full text-primary-100 bg-primary-600 top-2 right-2"
                                    v-text="rank>=1200 ? '+'+rank : rank"
                                ></span>
                            </label>
                            <input type="radio" 
                                class="absolute w-3 h-3 focus:outline-none focus:ring-0 opacity-100 text-secondary-500 bottom-0.5 left-0.5"    
                                name="rank"     
                                :id="rank" :value="rank"
                                @change="delete errors.rank"
                                v-model="selected_rank"
                            >
                        </div>
                    </template>
                    <p class="text-xs text-red-500" v-if="errors.rank" v-text="errors.rank[0]"></p>
                </div>
            </fieldset>
        </div>

        <div class="relative mb-4">
            <label for="link" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.link }"
            >Link (Discord, Instagram, Website, ...)</label>
            <input type="url" class="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                id="link" name="link" maxlength="255" 
                @change="delete errors.link; validateLink()"
                v-model="link"
            >

            <p class="text-xs text-red-500" v-if="errors.link" v-text="errors.link[0]"></p>
        </div>
        
        <div class="relative mb-4">
            <label for="description" class="text-sm font-medium leading-7 text-gray-600"
                :class="{ 'text-red-500' : errors.description }"
            >Description
            </label>
            <div class="text-xs text-right text-gray-500"    
            >
                <span v-text="description.length" 
                    :class="{'text-red-500' : description.length>=300}"
                ></span>/300
            </div>
            <textarea class="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200"
                id="description" name="description" 
                maxlength="300" 
                @change="delete errors.description"
                v-model="description"
            ></textarea>
            
            <p class="text-xs text-red-500" v-if="errors.description" v-text="errors.description[0]"></p>
        </div>
        
        <button type="button" class="px-6 py-2 text-lg text-white border-0 rounded disabled:bg-secondary-400 bg-secondary-500 focus:outline-none hover:bg-secondary-600"
            id="submitButton"
            :disabled="submitting || ( name.length<3 || code.length<8 ) || Object.keys(errors).length>0"
            @click="submit()"
        >Submit</button>
    </form>
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

        props : {
            countries : {
                default : false,
            },
            locale : {
                default : '',
            }
        },
        
        data() {
            return {
                errors : {},
                success : null,
                submitting : false,
                ranks : [],
                email : '',
                name : '',
                code : '',
                requires_approval : false,
                active_members : 1,
                country : '',
                selected_rank : '1200',
                link : '',
                description : '',
            }
        },

        computed: {
            countryFlag() {
                return this.country ? 'https://flagcdn.com/32x24/'+this.country.toLowerCase()+'.png' : '';
            },

            rankLabel(){
                return this.rank>=1200 ? 'Master '+this.rank : (this.rank[0].toUpperCase() + this.rank.substring(1));
            },

            rankIcon(){
                return '/img/'+ (this.rank>=1200 ? 'master' : this.rank) +'_icon.png';
            },
        },

        methods: {
            
            validateActiveMembers()
            {
                if(this.active_members > 30) this.active_members = 30;
                if(this.active_members && this.active_members < 1) this.active_members = 1;
            },

            validateLink()
            {
                if(this.link){
                    prefixes =  ["https://","http://"]
                    if (
                        (this.link.toLowerCase().substr(0, prefixes[0].length) !== prefixes[0]) &&
                        (this.link.toLowerCase().substr(0, prefixes[1].length) !== prefixes[1])
                        )
                    {
                        this.link = prefixes[0] + this.link;
                    }
                }
            },

            reset(){
                this.email = '';
                this.name = '';
                this.code = '';
                this.requires_approval = '';
                this.active_members = 1;
                this.country = null;
                this.selected_rank = '1200';
                this.link = '';
                this.description = ''; 
            },

            submit(){
                this.submitting = true;
                const formData = new FormData(document.getElementById('form'));
                let bodyObject = {};
                formData.forEach(function(value, key){
                    if(key == 'squad_name') key='name';
                    bodyObject[key] = value;
                });

                const options = {
                    // headers : {
                    //     "Content-Type": "application/json",
                    //     "Accept": "application/json",
                    //     "X-Requested-With": "XMLHttpRequest"
                    // },
                    method : "POST",
                    body : JSON.stringify(bodyObject)
                };

                fetch('/squads/post', options)
                    .then( response => {
                        if(response.ok)
                        {
                            response.json().then( result => this.success = true );
                            this.reset();
                            document.notify('success','Your Squad has been listed!');
                        }
                        else
                        {
                            if(response.status == 422){
                                response.json().then( ({errors}) => {
                                    this.errors = errors;
                                } );
                                document.notify('error','Some information is not valid!');
                                window.location.href = '#form';
                            }
                            else{
                                document.notify('error','Something went wrong. Submission not sent.');
                                // send to API Log
                            }
                        }
                    })
                    .catch( error => {
                        document.notify('error','Something went wrong. Submission not sent.');
                        // send to API Log
                    });
                
                this.submitting = false;
            }
            
        },

        mounted() {
            this.ranks = [
                'elite','expert','1200','1400','1800','2000'
            ];

            this.country=this.locale;
        }

    };
    
</script>