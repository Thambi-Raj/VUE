const preview_controller = {
    template: `<preview-root
                    :show_date="show_date"
                    :favourite_access="favourite_access"
                    :data="check_available_data()"
                    :favourite_data="favourite_data"
                    :date="date"
                    :month="month"
                    :year="year"
                    @add_fav="add_fav"
                    @change_date="change_date"
                ></preview-root>`,
    props: {
        show_date: {
            type: Boolean,
            default: false
        },
        favourite_access: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        favourite_data: {
            type: Object,
            default: {}
        },
        date: {
            type: [Number,String],
            default: 0
        },
        month: {
            type: String,
            default: 'Jan'
        },
        year: {
            type: [String, Number],
            default: 2024
        }
    },
    methods: {
        check_available_data() {
            if (Object.keys(this.data).length === 0) {
                return false;
            }
            return this.data;
        },
        add_fav(date){
            this.$emit('add_to_favourite',date);
        },
        change_date(date){
            this.$emit('change_default_date',date);
        }
    }
};
