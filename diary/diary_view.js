const diary_component = {
    template: `
        <div id="left-container-root">
            <sidebar-controller 
                v-if="right_template !== 'editor'" 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"
                :month="dropdown_values"
                :root_ref="root_ref"
                @change_drop_head="change_drop_head" 
                @change_drop_value="change_drop_value" 
                >
            </sidebar-controller>
            <contentSidebar-controller v-else 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"
                :default_date="default_date"
                :month="dropdown_values"
                :data="month_preview"
                :total_favourite="total_favourite"
                :root_ref="root_ref"
                @drop ="  change_drop_head"
                @drop1="change_drop_value"
                @back="back_page"
                @change_date="change_default_date"
                @add_fav=add_favourite
                >
            </contentSidebar-controller>
        </div>
        <div id="right-container-root">
        <calendar-controller v-if="right_template === 'calendar'" 
                :month="dropdown_value"
                :year="dropdown_selected" 
                :default_date="default_date"
                :month_preview="month_preview"
                :root_ref="root_ref"
                @change_page="change_page"
                :total_favourite="total_favourite">
        </calendar-controller>
        <editor-controller v-if= "right_template === 'editor'"  
                :data="default_date_data" 
                :date="default_date"
                @save_json_content="save_json"
                :preview="true">
        </editor-controller>
        <container-controller  v-if ="right_template === 'container'"
                :name="dropdown_selected"
                :span="dropdown_selected"
                :container_data="container_format_data"
                :total_favourite="total_favourite"
                @change_left_pane="change_left_pane">
        </container-controller>
        </div>
        `,
    props: {
        dropdown_value: {
            type: String
        },
        dropdown_selected: {
            type: String
        },
        container_format_data: {
            type: Array
        },
        editor_view: {
            type: Boolean
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
        total_favourite:{
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
        }
    },
    emits: ['change_page','page_change', 'change_dropdown_value', 'change_dropdown_head',"save_json","change_date","add_fav"," change_left_pane","change_editor_view","get_favourite_data","update_month_preview"],
    mounted() {
        this.result_template = 'calendar';
        var cur = new Date().getFullYear();
        var mon = new Date().getMonth();
        this.months = cur == this.dropdown_selected.split('_')[1] ? this.months.slice(0, (mon + 1)) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    },
    data() {
        return {
            result_template: '',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            active: [],
            favourite_template:false
        };
    },
    methods: {
        change_page(date) {
            this.$emit('change_page', date);
        },
        change_drop_value(data) {
            this.$emit('change_dropdown_value', data);
            this.$emit('update_month_preview')
        },
        change_drop_head(data) {
            var cur = new Date().getFullYear();
            var mon = new Date().getMonth();
            this.result_template = 'calendar';
            if (data.startsWith('year')) {
                this.months = cur == data.split('_')[1] ? this.months.slice(0, mon + 1) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                this.$emit('change_dropdown_value', 'Jan');
                this.favourite_template = false;
                this.$emit('change_dropdown_head', data);   
                this.$emit('update_month_preview')
            }
            else{
                this.result_template='button';
                this.$emit("get_favourite_data",data);
                this.$emit('change_dropdown_head', data);
            }
         
        },
        back_page(year, month, date) {
         if(!this.favourite_template){
            this.$emit('change_dropdown_value', month);
            this.$emit('change_dropdown_head', year);
            this.$emit('change_page', date);
         }
         else{
            this.$emit("change_editor_view");
            this.change_drop_head("favorite");
         }
        },
        change_active(data) {
            if (this.active.includes(data)) {
                this.active = this.active.filter(d => d !== data);
            } else {
                this.active.push(data);
            }
        },
        change_default_date(date) {
            this.$emit('change_date', date);
        },
        save_json(json,date) {   
         this.$emit('save_json', json,date);
        },
        add_favourite(date){
            this.$emit('add_fav',date);
        },
        change_left_pane(year,month,date){
            date = parseInt(date);
            this.$emit('change_dropdown_value', month);
            this.$emit('change_dropdown_head', year);
            this.$emit('change_page', date);
            this.$emit('update_month_preview')
            this.favourite_template=true;
        }
    }
};
