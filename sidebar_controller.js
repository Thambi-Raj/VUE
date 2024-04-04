const sidebar_controller= {
    template: `
        <div id="calendar-side-bar">
            <sidebar-root 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"  
                :month_array="month"
                @change_dropdown_head="change_dropdown_head" 
                @change_dropdown_value="change_dropdown_value"
                @change_mention="change_mention"
                >
            </sidebar-root >
        </div>
    `,
    props: {
        dropdown_selected: {type:String},
        dropdown_value: {type:String},
        month:{type:Array}
    },
    emits:["change_drop_head","change_drop_value","change_mention"],
    methods: {
        change_dropdown_head(data,button) {
            console.log(data);
           this.$emit('change_drop_head', data,button)
        },
        change_dropdown_value(data) {
            this.$emit('change_drop_value', data);
        },
        change_mention(data){
            this.$emit('change_mention',data);
        }
    },
};