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
                    @get_favourite_data="construct_container_format('Favourite')"
                    @update_month_preview ="update_month_preview"
                    >
               </diary-component>`,
<<<<<<< HEAD
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
=======
    data() {
        return {
            dropdown_selected: 'year_2024',
            dropdown_value: 'Apr',
            default_date: 1,
            container_format_data: [],
            editor_view: false,
            month_preview: this.get_month_preview("year_2024", "Apr"),
            default_date_data: {},
            total_favourite: {},
>>>>>>> parent of ddd91e1 (for updating  before backup)
        }
    },
    created() {
        this.get_data();
        this.check_favourite();
    },
    emits: ["page_change", "change_dropdown_head", "change_dropdown_value", "change_mention", "save_content", "change_date", "add_fav", "get_favourite_data"],
    methods: {
        change_dropdown_head(data, bool) {
<<<<<<< HEAD
            this.$emit('change_dropdown_head',data,bool);
        },
        change_dropdown_value(data, bool) {
            this.$emit('change_dropdown_value',data,bool);
=======
            this.dropdown_selected = data;
            this.get_data();
        },
        change_dropdown_value(data, bool) {
            this.dropdown_value = data;
            this.get_data();
>>>>>>> parent of ddd91e1 (for updating  before backup)
        },
        page_change(date) {
            this.editor_view = !this.editor_view;
            this.default_date = date;
            this.get_data();
        },
        change_date(date) {
            this.default_date = date;
            this.get_data();
        },
        update_month_preview() {
            this.month_preview = this.get_month_preview(this.dropdown_selected, this.dropdown_value)
        },
        construct_container_format(key) {
            var data = JSON.parse(localStorage.getItem(key));
            if (data != null) {
                var keys = Object.keys(data).sort().reverse();
                var result = [];
                for (var i = 0; i < keys.length; i++) {
                    var month = Object.keys(data[keys[i]]);
                    var res = this.month_based_sort(month);
                    for (var j = 0; j < res.length; j++) {
                        var get_date = Object.keys(data[keys[i]][res[j]]).sort();
                        if (get_date.length >= 1) {
                            var s = res[j].toLocaleUpperCase() + '_' + keys[i].split('_')[1];
                            var obj = {};
                            obj[s] = get_date;
                            result.push(obj);
                        }
                    }
                }
            }
            this.container_format_data = result;
        },
        month_based_sort(array) {
            var month = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
            var index_month = [];
            var result = [...array];
            for (var i = 0; i < array.length; i++) {
                index_month.push(month[array[i]]);
            }
            for (var i = 0; i < index_month.length; i++) {
                for (var j = i + 1; j < index_month.length; j++) {
                    if (index_month[i] > index_month[j]) {
                        var temp = index_month[i];
                        index_month[i] = index_month[j];
                        index_month[j] = temp;
                        var temp1 = result[i];
                        result[i] = result[j];
                        result[j] = temp1;
                    }
                }
            }
            return result;
        },
        save_json(json, date) {
            var ref = this;
            var get_local = !localStorage.getItem("Data") ? {} : JSON.parse(localStorage.getItem("Data"));
            get_local[this.dropdown_selected] = get_local[this.dropdown_selected] || {};
            get_local[this.dropdown_selected][this.dropdown_value] = get_local[this.dropdown_selected][this.dropdown_value] || {};
            get_local[this.dropdown_selected][this.dropdown_value][date] = { ...json };
            setTimeout(() => {
                localStorage.setItem("Data", JSON.stringify(get_local));
                ref.update_month_preview()
            }, 500);
        },
        add_fav(date) {
            var check = this.check_favourite(date);
            var get_local = !localStorage.getItem("Favourite") ? {} : JSON.parse(localStorage.getItem("Favourite"));
            if (check) {
                delete get_local[this.dropdown_selected][this.dropdown_value][date];
            }
            else {
                get_local[this.$root.dropdown_selected] = get_local[this.$root.dropdown_selected] || {};
                get_local[this.$root.dropdown_selected][this.$root.dropdown_value] = get_local[this.$root.dropdown_selected][this.$root.dropdown_value] || {};
                get_local[this.dropdown_selected][this.dropdown_value][date] = true;
            }
            localStorage.setItem("Favourite", JSON.stringify(get_local));
            this.total_favourite = { ...get_local }
        },
        get_data() {
            var get_local = !localStorage.getItem("Data") ? {} : JSON.parse(localStorage.getItem("Data"));
            var condition = get_local
                && get_local[this.dropdown_selected] &&
                get_local[this.dropdown_selected][this.dropdown_value]
                && get_local[this.dropdown_selected][this.dropdown_value][this.default_date];
            this.default_date_data = condition ? condition : {};
        },
        check_favourite(date) {
            var get_local = !localStorage.getItem("Favourite") ? {} : JSON.parse(localStorage.getItem("Favourite"));
            this.total_favourite = get_local;
            var condition = get_local
                && get_local[this.dropdown_selected] &&
                get_local[this.dropdown_selected][this.dropdown_value]
                && get_local[this.dropdown_selected][this.dropdown_value][date];
            if (condition) {
                return true;
            }
            return false;
        },
        get_month_preview(year, month) {
            var get_local = !localStorage.getItem("Data") ? {} : JSON.parse(localStorage.getItem("Data"));
            var condition = get_local
                && get_local[year] &&
                get_local[year][month]
            return condition ? condition : {};
        },
        change_editor_view() {
            this.editor_view = !this.editor_view;
        }
    },
}