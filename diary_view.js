const diary_component = {
    template: `
        <div id="left-container-root">
            <sidebar-controller 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value" @change_drop_head="change_drop_head" @change_drop_value="change_drop_value" v-if="content_view">
            </sidebar-controller>
            <contentSidebar-controller v-else 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value" @back="back_page">
            </contentSidebar-controller>
        </div>
        <div id="right-container-root">
            <calendar-controller v-if="result_template === 'calendar' && content_view" 
                :month="dropdown_value"
                :year="dropdown_selected" @change_page="change_page">
            </calendar-controller>
            <container-controller v-if="result_template === 'button' && content_view"
                :name="dropdown_selected === 'Favourite' ? 'Favorite' : 'Bookmark'"
                :span="dropdown_selected === 'Favourite' ? 'favorite' : 'bookmark'"
                :data="dropdown_selected === 'Favourite' ? favourite : bookmark" >
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
        favourite: {
            type: Array
        },
        mention: {
            type: Array
        },
        bookmark: {
            type: Array
        },
        content_view: {
            type: Boolean
        }
    },
    emits: ['change_page', 'change_dropdown_value', 'change_dropdown_head'],
    created() {
        this.result_template = 'calendar';
    },
    data() {
        return {
            id_map: this.$root.$data.id_map,
            result_template: ''
        };
    },
    methods: {
        change_page() {
            this.$emit('change_page');
        },
        change_drop_value(data) {
            this.$emit('change_dropdown_value', data);
        },
        change_drop_head(data, button) {
            this.$emit('change_dropdown_head', data);
            this.result_template = button;
        },
        back_page(year,month){
          this.$emit('change_dropdown_value',month,'bool');
          this.$emit('change_dropdown_head',year,'bool');
        }
    }
};
