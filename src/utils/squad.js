export const squad = {

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
        verified : {
            type : Boolean,
            default : false,
        },
        featured : {
            type : Boolean,
            default : false,
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

}