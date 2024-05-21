const sidebar_component = {
    template: `
        <div>
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
                :icon_name="'favorite'" 
                :root_ref="root_ref"
                :active="dropdown_selected">
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