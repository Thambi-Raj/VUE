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
                @back="back_page">
            </contentSidebar-controller>
        </div>
        <div id="right-container-root">
                <editor-root  
                @save_content ="save"
                ></editor-root>
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
        }
    },
    emits: ['change_page', 'change_dropdown_value', 'change_dropdown_head', "change_mention"],
    created() {
        this.result_template = 'calendar';
        var cur = new Date().getFullYear();
        var mon = new Date().getMonth();
        this.month_array = cur == this.dropdown_selected.split('_')[1] ? this.month_array.slice(0, (mon + 1)) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec'];
    },
    data() {
        return {
            id_map: this.$root.$data.id_map,
            result_template: '',
            month_array: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            active: { 'bold': false, 'italics': false, 'underline': false, 'size': 5, 'color': '#666', 'family': 'sans-serif', 'align': 'left' },
            styles :{},
            close_tag:{},
            html_Array : []
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
            var cur = new Date().getFullYear();
            var mon = new Date().getMonth();
            this.$emit('change_dropdown_head', data);
            this.result_template = button;
            button == 'calendar' ? this.month_array = cur == data.split('_')[1] ? this.month_array.slice(0, mon + 1) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec']
                : '';
            button == 'calendar' ? this.$emit('change_dropdown_value', 'Jan') : '';

        },
        back_page(year, month) {
            this.$emit('change_dropdown_value', month, 'bool');
            this.$emit('change_dropdown_head', year, 'bool');
        },
        change_active(data) {
            if (this.active.includes(data)) {
                this.active = this.active.filter(d => d !== data);
            }
            else {
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
            console.log(data);
            this.active = data;
        },
        save(html) {
        
            function get_child(child, htmlArray, closeTag) {
                for (var i = 0; i < child.length; i++) {
                    if (child[i].nodeType === 1) { 
                        if (child[i].getAttribute("style")) {
                            styles[htmlArray.length] = child[i].getAttribute("style");
                        }
                        htmlArray.push(child[i]);
                        get_child(child[i].childNodes, htmlArray, closeTag);
                        closeTag[htmlArray.length] = true;
                        htmlArray.push(child[i].tagName.toLowerCase());
                    } else if (child[i].nodeType === 3) { 
                        htmlArray.push(child[i].nodeValue); 
                    }
                }
            }   
            var child = html.childNodes;
            get_child(child, this.html_Array, this.close_tag); 
            console.log(this.html_Array);
            console.log(this.close_tag);

            
            this.render_page();
        },
        render_page() {
            var div = ''
            for (var i = 0; i < this.html_Array.length; i++) {
                if (this.close_tag[i]) {
                    div += '</' + this.html_Array[i]+ '>';
                } else if (this.html_Array[i].tagName) {
                     div+= '<' + this.html_Array[i].tagName.toLowerCase() + '>';
                } else {
                    console.log(this.html_Array[i]);
                    div += this.html_Array[i];
                }
            }
            var al = document.createElement('div');
            al.innerHTML+=div;
        }
    }
};

{/* <calendar-controller v-if="result_template === 'calendar' && content_view" 
                      :month="dropdown_value"
                      :year="dropdown_selected" @change_page="change_page">
                 </calendar-controller>
                <container-controller v-else-if="(result_template === 'button' ) && content_view"
                      :name="dropdown_selected"
                      :span="dropdown_selected"
                      :data="data">
                </container-controller>
                <container-controller v-else-if="(result_template === 'input' ) && content_view"
                      :name="dropdown_selected"
                      :span="'alternate_email'"
                      :data="data">
                </container-controller>
                                <editor-root v-else :active="active"  @change_select="change_active" @defaut_style="default_style"></editor-root>
 */
}