const sidebar_component = {
    template: `
        <div>
            <dropdown-controller 
                :id="'year_2024'" 
                :first_icon="'clinical_notes'" 
                :name="'2024'" 
                :default_selected="dropdown_value" 
                :dropdown_data="month_array" 
                :active="dropdown_selected" 
                @change_active="change_activestate" 
                @change_value="change_value">
            </dropdown-controller>
            <dropdown-controller 
                :id="'year_2023'" 
                :first_icon="'clinical_notes'" 
                :name="'2023'"  
                :default_selected="dropdown_value" 
                :dropdown_data="month_array" 
                :active="dropdown_selected" 
                @change_active="change_activestate" 
                @change_value="change_value">
            </dropdown-controller>
            <button-controller 
                :id="'favorite'" 
                :button_name="'Favourite'" 
                :icon_name="'favorite'" 
                @change_active="change_activestate" 
                :active="dropdown_selected">
            </button-controller>
            <button-controller 
                :id="'bookmark'" 
                :button_name="'Bookmarks'" 
                :icon_name="'bookmarks'" 
                @change_active="change_activestate" 
                :active="dropdown_selected">
            </button-controller>
        </div>
    `,
    props: {
        dropdown_selected: String,
        dropdown_value: String,
        month_array:Array,
    },
    emits:['change_dropdown_head','change_dropdown_value','change_mention'],
    methods: {
        change_activestate(data,button) {
           this.$emit('change_dropdown_head', data,button);
        },
        change_value(data) {
            this.$emit('change_dropdown_value', data);
        },
        get_mention(data){
             this.$emit('change_mention',data)
        }
    }
};