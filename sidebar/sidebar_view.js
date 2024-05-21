const sidebar_component = {
    template: `
        <div>
<<<<<<< HEAD
            <dropdown-controller
                v-for="(name, index) in  dropDown_head"
                :icon="'clinical_notes'"
                :name="name"
                :default_selected="dropdown_value"
                :dropdown_data="month_array"
                :active="dropdown_selected"
                :root_ref="root_ref"
                @change_active="change_activestate"
                @change_value="change_value"
             ></dropdown-controller>
            <button-controller 
                :button_name="'Favourite'" 
=======
            <dropdown-controller 
                :id="'year_2024'" 
                :first_icon="'clinical_notes'" 
                :title="'2024'" 
                :default_selected="dropdown_value" 
                :data="month_array" 
                :active="dropdown_selected" 
                @change_active="change_activestate" 
                @change_value="change_value">
            </dropdown-controller>
            <dropdown-controller 
                :id="'year_2023'" 
                :first_icon="'clinical_notes'" 
                :title="'2023'"  
                :default_selected="dropdown_value" 
                :data="month_array" 
                :active="dropdown_selected" 
                @change_active="change_activestate" 
                @change_value="change_value">
            </dropdown-controller>
            <button-controller 
                :id="'favorite'" 
                :button_name="'favorite'" 
>>>>>>> parent of ddd91e1 (for updating  before backup)
                :icon_name="'favorite'" 
                :root_ref="root_ref"
                :active="dropdown_selected">
<<<<<<< HEAD
=======
            </button-controller>
            <button-controller 
                :id="'bookmark'" 
                :button_name="'bookmarks'" 
                :icon_name="'bookmarks'" 
>>>>>>> parent of ddd91e1 (for updating  before backup)
                @change_active="change_activestate" 
            </button-controller>
        </div>
    `,
    props: {
        dropdown_selected: [String,Number],
        dropdown_value: String,
        month_array:Array,
        root_ref:{
            type:Object
        }
    },
    data(){
        return{
            dropDown_head:[2024,2023]
        }
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
{/* <button-controller 
                :button_name="'Bookmarks'" 
                :icon_name="'bookmarks'" 
                :root_ref="root_ref"
                :active="dropdown_selected">
                @change_active="change_activestate" 
            </button-controller> */}