const diary_component = {
    template: `
        <div id="left-container-root">
            <sidebar-controller 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value" @change_drop_head="change_drop_head" @change_drop_value="change_drop_value" 
                :month="month_array"
                v-if="content_view"
                @change_mention="change_mention"
                >
            </sidebar-controller>
            <contentSidebar-controller v-else 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"
                :month="month_array"
                @drop ="  change_drop_head"
                @drop1="change_drop_value"
                @back="back_page"
                @change_date="change_date"
                @add_fav=ad_fav
                :data="month_preview"

                >
            </contentSidebar-controller>
        </div>
        <div id="right-container-root">
        <calendar-controller v-if="result_template === 'calendar' && content_view" 
                :month="dropdown_value"
                :year="dropdown_selected" 
                :default_date="default_date"
                :month_preview="month_preview"
                @change_page="change_page">
        </calendar-controller>
        <editor-controller v-if= "!content_view"  :data="result_data" :favourite = "favourite"
             :default_date="default_date"
             @save_content="save_json"
             @add_fav = ad_fav
             :preview="true">
        </editor-controller>
        <container-controller  v-if ="content_view && result_template== 'button' "
                :name="dropdown_selected"
                :span="dropdown_selected"
                :container_data="data">
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
        data: {
            type: Array
        },
        content_view: {
            type: Boolean
        },
        default_date: {
            type:Number
        },
        result_data:{
            type:Object
        },
        favourite:{
            type:Boolean
        },
        month_preview:{
            type:Object
        }
    },
    emits: ['change_page','page_change', 'change_dropdown_value', 'change_dropdown_head', "change_mention","save_json","change_date","add_fav"],
    created() {
        this.result_template = 'calendar';
        var cur = new Date().getFullYear();
        var mon = new Date().getMonth();
        this.month_array = cur == this.dropdown_selected.split('_')[1] ? this.month_array.slice(0, (mon + 1)) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    },
    data() {
        return {
            id_map: this.$root.$data.id_map,
            result_template: '',
            month_array: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            active: []
        };
    },
    methods: {
        change_page(date) {
            this.$emit('change_page', date);
        },
        change_drop_value(data) {
            this.$emit('change_dropdown_value', data);
        },
        change_drop_head(data) {
            var cur = new Date().getFullYear();
            var mon = new Date().getMonth();
            this.result_template = 'calendar';
            if (data.startsWith('year')) {
                this.month_array = cur == data.split('_')[1] ? this.month_array.slice(0, mon + 1) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                this.$emit('change_dropdown_value', 'Jan');
            }
            else{
                this.result_template='button'
            }
            this.$emit('change_dropdown_head', data);
        },
        back_page(year, month, date) {
            this.$emit('change_dropdown_value', month);
            this.$emit('change_dropdown_head', year);
            this.$emit('change_page', date);
        },
        change_active(data) {
            if (this.active.includes(data)) {
                this.active = this.active.filter(d => d !== data);
            } else {
                this.active.push(data);
            }
        },
        change_mention(data) {
            this.$emit('change_mention', data);
        },
        remove_active() {
            this.active = [];
        },
        reset_active(data) {
            this.active = data;
        },
        change_date(date) {
            this.$emit('change_date', date);
        },
        save_json(json,date) {
            if(json.tagName){
                // console.log('yes');
            }
            else{
                this.$emit('save_json', json,date);
            }
        },
        ad_fav(date){
            if(date){
                this.$emit('add_fav',date);
            }
        }
    }
};
