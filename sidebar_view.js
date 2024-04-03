const sidebar_component = {
    template: `
        <div>
            <dropdown-controller 
                :id="'year_2024'" 
                :first_icon="'clinical_notes'" 
                :title="'2024'" 
                :default_selected="dropdown_value" 
                :data="['Jan','Feb','Mar','Apr','May']" 
                @change_active="change_activestate" 
                :active="dropdown_selected" 
                @change_value="change_value">
            </dropdown-controller>
            <dropdown-controller 
                :id="'year_2023'" 
                :first_icon="'clinical_notes '" 
                :title="'2023'"  
                :default_selected="dropdown_value" 
                :data="['Jan','Feb','Mar','Apr','May']" 
                @change_active="change_activestate" 
                :active="dropdown_selected" 
                @change_value="change_value">
            </dropdown-controller>

            <button-controller 
                :id="'favourite'" 
                :button_name="'Favourite'" 
                :icon_name="'favorite'" 
                @change_active="change_activestate" 
                :active="dropdown_selected">
            </button-controller>

            <search-btn-controller 
                :id="'mention'" 
                :button_name="'Mentions'" 
                :icon_name="'alternate_email'" 
                @change_active="change_activestate" 
                :active="dropdown_selected">
            </search-btn-controller>

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
        dropdown_value: String
    },
    emits:['change_dropdown_head','change_dropdown_value'],
    methods: {
        change_activestate(data,button) {
           this.$emit('change_dropdown_head', data,button);
        },
        change_value(data) {
            this.$emit('change_dropdown_value', data);
        }
    }
};