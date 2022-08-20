<template>
    <Modal
        maxWidth="max-w-md"
        :title="title"
        :cancelButton="cancelText"
        :visible="visible"
        @close="visible=false"
    >
        <div class="relative flex-auto p-6">
            <p class="my-4 text-lg leading-relaxed text-gray-500"
                v-text="message"
            >
            </p>
            <p class="w-2/3 overflow-hidden text-xs text-gray-500 whitespace-nowrap overflow-ellipsis"
                title="link"
                v-show="link" 
                v-text="link"
            ></p>
        </div>

        <template #confirmButton>
            <button class="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-primary-500 active:bg-primary-600 hover:shadow-lg focus:outline-none" 
                type="button" 
                @click="confirm()"
                v-text="confirmText"
            >
            </button>
        </template>
    </Modal>
</template>

<script>
    
    import Modal from "@components/modals/Modal.vue";

    export default {

        name: "squad-modal",

        components : {
            Modal,
        },

        mixins: [],

        props : {

        },

        data() {
            return {
                visible : false,
                callbalck : null,
                target: null,
                title : '',
                message: '',
                link: '',
                confirmText: 'Confirm',
                cancelText: 'Close',
            }
        },

        computed : {
            countryFlag() {
                return this.country ? 'https://flagcdn.com/32x24/'+this.country.toLowerCase()+'.png' : '';
            },

            rankLabel(){
                return this.rank>=1200 ? 'Master '+this.rank : (this.rank[0].toUpperCase() + this.rank.substring(1));
            },
        },

        methods: {
            confirm(){
                this.callback();
                this.visible = false;
            }
        },

        mounted() {
            document.askConfirmation = function askConfirmation(params){
                document.dispatchEvent( new CustomEvent('confirm',  { "detail" : params }) )
            }

            document.addEventListener('confirm', (e) => {
                this.target = e.detail.target ? e.detail.target : null;
                this.title = e.detail.title ? e.detail.title : '';
                this.message = e.detail.message;
                this.link = e.detail.link ? e.detail.link : '';
                this.confirmText = e.detail.confirmText ? e.detail.confirmText : 'Confirm';
                this.cancelText = e.detail.cancelText ? e.detail.cancelText : 'Close';
                this.callback = e.detail.callback ? e.detail.callback : null;
                this.visible = true;
            });
        }

    }

</script>