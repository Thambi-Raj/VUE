const calendar_controller = {
    template: `<calendar-root 
    :month=month
    :year =year 
    :root_ref="root_ref"
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
        },
        total_favourite:{
            type:Object
        },
        root_ref:{
            type:Object
        },
    },
    methods:{
        page_change(date){
            this.$emit('change_page',date);
        }
    }

}