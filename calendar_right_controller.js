const calendar_controller = {
    template: `<calendar-root 
    :month=month
    :year =year 
    :month_preview = month_preview
     @page_change = page_change>
    </calendar-root>`,
    props: {
        month: {
            type: String
        },
        year: {
            type: String
        },
        month_preview:{
            type:Object
        }
    },
    methods:{
        page_change(date){
            this.$emit('change_page',date);
        }
    }

}