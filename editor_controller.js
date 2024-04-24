const editor_controller = {
    template:`<editor-root :data="data" :image="image" :favourite:= "favourite" @save="save_content"  @add_fav = "add_to_favourite" > 
              </editor-root>`,
    props:{
        data:{
            type:Object
        }
    },
    data(){
          return{
            element_style: {},
            closed_element_index: [],
            editor_elements: []
          }
    },
    methods:{
            DFS(html){
                function recursion(child, htmlArray, styles, close_tag) {
                    for (var i = 0; i < child.length; i++) {
                        if (child[i].nodeType === 1) {
                            if (child[i].getAttribute("style")) {
                                styles[htmlArray.length] = child[i].getAttribute("style");
                            }
                            var a = htmlArray.length;
                            htmlArray.push(child[i].cloneNode(false));
                            recursion(child[i].childNodes, htmlArray, styles, close_tag);
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
                recursion(child, this.editor_elements, this.element_style, this.closed_element_index);
            },
            format_for_json() {
                var obj = {};
                obj["contents"] = [];
                obj["global_props"] = {};
                return obj;
            },
            constructDiary_jsonFormat(content){
                var result = this.format_for_json();
                var single_line = {}
                var styles = {}
                var close = 0;
                for (var i = 0; i < content.length; i++) {
                    if (content[i].tagName && content[i].tagName.toLowerCase() == 'div') {
                        this.check_for_lineStyle(content[i], single_line);
                        if(content[i].getAttribute('style')){
                            close++;
                        }
                    }
                    else if (content[i].tagName) {
                        this.get_styles_from_tag(content[i], styles);
                    }
                    else if (content[i].nodeType === 3) {
                        var obj1 = this.set_Style_for_text(content[i].nodeValue, styles)
                        single_line["data"].push(obj1);
                    }
                    else if (content[i] != '</br>') {
                        if (content[this.close_tag[close]] && content[this.close_tag[close]].getAttribute('style')) {
                            this.delete_style_present_in_attribute(content[this.close_tag[close]], styles);
                            close++;
                        }
                        this.delete_style_present_in_tag(content[i], styles);
                        if(content[i]=='</div>')  {
                            result["contents"].push({...single_line});
                            single_line={};
                        }
                    }
                }
            },
            check_for_lineStyle(element, json) {
                json["data"] = [];
                if (element.getAttribute('style')) {
                    json["line_props"] = element.getAttribute('style');
                }
                else {
                    json["line_props"] = null;
                }
            },
            delete_style_present_in_tag(element, styles) {
                if (element == '</b>') {
                    delete styles['b'];
                } else if (element == '</u>') {
                    delete styles['u'];
                } else if (element == '</i>') {
                    delete styles['i']
                }
            },
            set_Style_for_text(text, styles) {
                var obj1 = {};
                obj1["content"] = text;
                obj1["styles"] = { ...styles};
                return obj1;
            },
            get_styles_from_tag(element, styles) {
                if (element.tagName.toLowerCase() != 'br') {
                    if (element.tagName.toLowerCase() != 'span') {
                        styles[element.tagName.toLowerCase()] = true;
                        if (element.getAttribute('style')) {
                            this.find_styles_in_tag(element, styles);
                        }
                    }
                    else {
                        this.find_styles_in_tag(element, styles)
                    }
                }
            }, 
            delete_style_present_in_attribute(content, obj) {
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
            find_styles_in_tag(content, obj) {
                var style = content.style;
                var z = '';
                if (style.color) {
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
            }, 
            
    }
}