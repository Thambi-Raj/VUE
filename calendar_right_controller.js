const calendar_controller = {
    template: `<calendar-root 
    :month=month
    :year =year  @page_change = page_change>
    </calendar-root>`,
    props: {
        month: {
            type: String
        },
        year: {
            type: String
        }
    },
    methods:{
        page_change(date){
            this.$emit('change_page',date);
        }
    }

}