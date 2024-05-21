const diary_controller = {
    template: `<diary-component 
                    :dropdown_selected="dropdown_selected" 
                    :dropdown_value = dropdown_value
                    :default_date=default_date 
                    :month_preview=month_preview  
                    :default_date_data="default_date_data"
                    :root_ref="root_ref"
                    :right_template = "right_template"
                    :dropdown_values="dropdown_values"
                    :favourite_data="favourite_data"
                    @change_page="page_change"
                    @change_dropdown_head="change_dropdown_head" 
                    @change_dropdown_value="change_dropdown_value"
                    @change_date="change_date"
                    @save_json="save_json"
                    @change_editor_view= "change_editor_view"
                    @add_fav="add_fav" 
                    @get_favourite_data="construct_container_format"
                    @update_month_preview ="update_month_preview"
                    >
               </diary-component>`,
    props:{
        dropdown_value: {
            type: String
        },
        dropdown_selected: {
            type: [String,Number]
        },
       
        default_date: {
            type:Number
        },
        default_date_data:{
            type:Object
        },
        month_preview:{
            type:Object
        },
        root_ref:{
            type:Object
        }, 
        right_template:{
            type:String
        },
        dropdown_values:{
            type:Array
        },favourite_data:{
            type:Array
        }
    },
    emits: ["page_change", "change_dropdown_head", "change_dropdown_value", "save_json", "change_date", "add_favourite","update_month_preview","construct_container_format","change_editor_view"],
    methods: {
        change_dropdown_head(data, bool) {
            this.$emit('change_dropdown_head',data,bool);
        },
        change_dropdown_value(data, bool) {
            this.$emit('change_dropdown_value',data,bool);
        },
        page_change(date) {
            this.$emit('page_change',date);
        },
        change_date(date) {
            this.$emit('change_date',date);
        },
        update_month_preview() {
            this.$emit('update_month_preview');
        },
        construct_container_format(key) {
            this.$emit('construct_container_format',key);
        },
        save_json(json, date) {
           this.$emit('save_json',json,date);
        },
        add_fav(date) {
            this.$emit('add_favourite',date);
        },
        change_editor_view() {
            this.$emit('change_editor_view');
        }
    },
}