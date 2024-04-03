const sidebar_controller= {
    template: `
        <div id="calendar-side-bar">
            <sidebar-root 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"  
                @change_dropdown_head="change_dropdown_head" 
                @change_dropdown_value="change_dropdown_value">
            </sidebar-root >
        </div>
    `,
    props: {
        dropdown_selected: {type:String},
        dropdown_value: {type:String}
    },
    emits:["change_drop_head","change_drop_value"],
    methods: {
        change_dropdown_head(data,button) {
           this.$emit('change_drop_head', data,button)
        },
        change_dropdown_value(data) {
            this.$emit('change_drop_value', data);
        }
    },
};