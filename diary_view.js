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
            close_tag:[],
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
            function get_child(child, htmlArray, styles, close_tag) {
                for (var i = 0; i < child.length; i++) {
                    if (child[i].nodeType === 1) { 
                        if (child[i].getAttribute("style")) {
                            styles[htmlArray.length] = child[i].getAttribute("style");
                        }
                        var a = htmlArray.length;
                        htmlArray.push(child[i].cloneNode(false));
                        get_child(child[i].childNodes, htmlArray, styles, close_tag);
                        if (styles[a]) {
                            close_tag.push(a);
                        }
                        htmlArray.push('</' + child[i].tagName.toLowerCase() + '>');
                    } else if (child[i].nodeType === 3) { 
                        htmlArray.push(child[i]);
                    }
                }
            }
        
            var child = html.childNodes;
                 get_child(child, this.html_Array,this.styles,this.close_tag); 
                 console.log(this.html_Array);
                 this.json_format();
             },
             json_format() {
                console.log(this.close_tag);
                console.log('comes');
                var editor_content = [];
                var line = {};
                var styles={}
                var cont='';
                var content = this.html_Array;
                var close = 0;
                for (var i = 0; i < content.length; i++) {
                    if (content[i].tagName && content[i].tagName.toLowerCase() == 'div') {
                        line["data"]=[];
                        if (content[i].getAttribute('style')) {
                            line["line_attributes"] = content[i].getAttribute('style');
                            close++;
                        }
                    } else if (content[i].tagName) {
                        if (content[i].tagName.toLowerCase() != 'span') {
                        styles[content[i].tagName.toLowerCase()]=true;
                        if(content[i].getAttribute('style')){
                            this.tag_with_styles(content[i],styles);
                        }
                    }
                        else{
                            this.tag_with_styles(content[i],styles)
                        }
                        
                    } else if (content[i].nodeType === 3) {
                        cont=content[i].nodeValue;
                        var obj ={};
                        obj["content"]=cont;
                        obj["styles"]={...styles};
                        line["data"].push(obj);
                    } else {
                        if (content[i] == '</b>') {
                               delete styles['b'];
                           } else if (content[i] == '</u>') {
                               delete styles['u'];
                           } else if (content[i] == '</i>') {
                               delete styles['i']
                           } else if (content[i] == '</span>') {
                               this.delete_style( content[this.close_tag[close]],styles);
                               close++;
                           } else {
                              editor_content.push({...line});
                               line = {};
                           }
                    }
                }
            this.render_page(editor_content);
            },
            delete_style(content, obj){
                var style = content.style;
                if (style.color) {
                    console.log('aa');
                    delete obj['color']
                }
                if (style.fontSize) {
                    delete obj['font-size']
                }
                if (style.fontFamily) {
                    delete obj['font-family']
                }
                if (style.textDecorationLine) {
                    delete obj['underline']
                }
                if (style.fontWeight) {
                    delete obj['b']
                }
                if (style.fontStyle == 'italic') {
                    delete obj['i']
                }
            },
            tag_with_styles(content,obj){
                var style = content.style;
                var z = '';
                if (style.color) {
                    console.log('aa');
                    obj['color'] = style.color;
                }
                if (style.fontSize) {
                    var z = style.fontSize.replace('px', '');
                    obj['font-size'] = z;
                }
                if (style.fontFamily) {
                    obj['font-family'] = style.fontFamily;
                }
                if (style.textDecorationLine) {
                    obj['underline'] = true;
                }
                if (style.fontWeight) {
                    obj['b'] = true;
                }
                if (style.fontStyle == 'italic') {
                    obj['i'] = true;
                }
                console.log(obj);
            },
        render_page(editor_content) {
             var div =document.createElement('div');
             var res_string='';
             for(var i=0;i<editor_content.length;i++){
                res_string+='<div>';
                  editor_content[i].data.forEach((element,j) => {
                     if(j!=0){
                     res_string = this.check_previous_close_tag(editor_content[i].data[j-1].styles, element.styles,res_string);
                     }
                     res_string = this.check_for_new_tag(editor_content[i].data[j-1] ? editor_content[i].data[j-1].styles:'', element.styles,res_string);
                     res_string += element.content;
                     if(j==editor_content[i].data.length-1){
                       res_string = this.check_previous_close_tag(element.styles,'',res_string);
                     }
                  });
                  res_string+='</div>';
                }
                div.innerHTML=res_string;
                console.log(div);
        },
        check_previous_close_tag(previous_styles,current_styles,div){
            Object.keys(previous_styles).forEach(tag=>{
                if(current_styles == '' || !current_styles[tag]){
                            if(tag=='b'){
                                div+='</b>';
                            }
                            else if(tag=='i'){
                                div+='</i>';
                            }
                            else if(tag=='u'){
                                div+='</u>';
                            }
                            else{
                                div+='</span'
                         }
                }
            })
            return div;
        },
        check_for_new_tag(previous_styles, current_styles, div) {
            Object.keys(current_styles).forEach(tag => {
                if (previous_styles == '' ||  !previous_styles[tag]) {
                    if (tag === 'b' || tag === 'i' || tag === 'u') {
                        div += `<${tag}>`;
                    } else if (tag === 'color') {
                        div += `<span style="color:${current_styles[tag]};">`;
                    } else if (tag === 'font-size') {
                        div += `<span style="font-size:${current_styles[tag]}px;">`;
                    } else if (tag === 'font-family') {
                        div += `<span style="font-family:${current_styles[tag]};">`;
                    }
                }
            });
            return div;
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