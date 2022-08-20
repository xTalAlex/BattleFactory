/*
        computed : {
            escapableVisible(){
                //
            }
        },

        methods: {
            escapeHandler() {
                //
            },
        },
*/

export const escapable = {

    mounted() {
        const escapeHandler = (e) => {
            if (e.key === 'Escape' && this.escapableVisible) {
                this.escapeHandler();
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
    },

    unmounted() {
        document.removeEventListener('keydown', this.escapeHandler);
    },
}