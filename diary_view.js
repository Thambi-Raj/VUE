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
                @change_date="change_date">
            </contentSidebar-controller>
        </div>
        <div id="right-container-root">
            <calendar-controller v-if="result_template === 'calendar' && content_view" 
                :month="dropdown_value"
                :year="dropdown_selected" 
                :default_date="default_date"
                @change_page="change_page">
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
            <editor-root v-else  @save_content ="save" :default_date="default_date" ></editor-root>
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
        }
    },
    emits: ['change_page', 'change_dropdown_value', 'change_dropdown_head', "change_mention","save_content","change_date"],
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
            active: { 'bold': false, 'italics': false, 'underline': false, 'size': 5, 'color': '#666', 'family': 'sans-serif', 'align': 'left' },
        };
    },
    methods: {
        change_page(date) {
            this.$emit('change_page',date);
        },
        change_drop_value(data) {
            this.$emit('change_dropdown_value', data);
        },
        change_drop_head(data, button) {
            var cur = new Date().getFullYear();
            var mon = new Date().getMonth();
            this.$emit('change_dropdown_head', data);
            this.result_template = button;
            button == 'calendar' ? this.month_array = cur == data.split('_')[1] ? this.month_array.slice(0, mon + 1) : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                : '';
            button == 'calendar' ? this.$emit('change_dropdown_value', 'Jan') : '';

        },
        back_page(year, month,date) {
            this.$emit('change_dropdown_value', month, 'bool');
            this.$emit('change_dropdown_head', year, 'bool');
            this.$emit('change_date',date);
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
            this.active = data;
        },
        save(editor_content){
            this.$emit('save_content',editor_content);
        },
        change_date(date){
            this.$emit('change_date',date);
        },
      
        
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

// save(html) {
//     var writter_obj =[
       
//     ]
//      function get_child(child, htmlArray, closeTag,styles) {
//          for (var i = 0; i < child.length; i++) {
//              if (child[i].nodeType === 1) { 
//                  if (child[i].getAttribute("style")) {
//                      console.log('pp');
//                      styles[htmlArray.length] = child[i].getAttribute("style");
//                  }
//                  htmlArray.push(child[i]);
//                  get_child(child[i].childNodes, htmlArray, closeTag,styles);
//                  closeTag[htmlArray.length] = true;
//                  htmlArray.push('</'+child[i].tagName.toLowerCase()+'>');
//              } else if (child[i].nodeType === 3) { 
//                  htmlArray.push(child[i].nodeValue); 
//              }
//          }
//      }   
//      var child = html.childNodes;
//      get_child(child, this.html_Array, this.close_tag,this.styles); 
//      this.render_page();
//  },

// if(tag=='b'){
//     div.innerHTML+='<b>';
//  }
//  else if(tag=='i'){
//     div.innerHTML+='<i>';
//  }
//  else if(tag=='u'){
//     div.innerHTML+='<u>';
//  }
//  else if(tag=='color'){
//     div.innerHTML+='<span style ="color :'+ styles[tag] +'">'
//  }
//  else if(tag == 'font-size'){
//     div.innerHTML+='<span style ="font-size: '+ styles[tag] +'px;">'
//  }
//  else{
//     div.innerHTML+='<span style=""fontFamily:'+styles[tag]+'">';
//  }

// if(editor_content[i].data[j-1]){
//     this.check_previous_close_tag(editor_content[i].data[j-1].styles, element.styles,div);
// }
// this.check_for_new_tag(editor_content[i].data[j-1] ? editor_content[i].data[j-1].styles:'', element.styles,div);

// div.innerHTML+=editor_content[i].data[j].content;
// console.log(div.innerHTML);