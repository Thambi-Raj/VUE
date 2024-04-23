const editor_component = {
    template: `<div class="editor-root">
                 <div id="editor-tool" ref="editor_tool">
                   <div :class="{ 'button clicked': active_state.bold, 'button': !active_state.bold }" id="bold" @click="change_text_format('bold')">
                   <span class="material-symbols-outlined">format_bold</span>
                   </div>
                   <div :class="{ 'button clicked': active_state.italic, 'button': !active_state.italic }" id="italic" @click="change_text_format('italic')">
                   <span class="material-symbols-outlined">format_italic</span>
                   </div>
                   <div :class="{ 'button clicked': active_state.underline, 'button': !active_state.underline }" id="underline" @click="change_text_format('underline')">
                   <span class="material-symbols-outlined">format_underlined</span>
                   </div>
                   <div class="file">
                   <input  type="file" id="imag" accept="image/*" @change="add_photo">
                   <label for="imag">Upload</label>
                   <span class="material-symbols-outlined">image</span>
                   </div>
                   <div class="file">
                   <label for="Color">Color</label>
                   <input type="color" id="Color" @change="change_text_format($event.target.value, 'forecolor', 'font')" :value="active_state.color">
                   </div>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['font-size']" :data="font_size" :name="'FontSize'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="normal_width" :default_val="active_state['font-family']" :data="font_family" :name="'FontName'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['align']" :data="align" :name="'align'" :tag="'span'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['background']" :data="texture" :name="'background'" :tag="'image'" @change_background="change_back"></simple-dropdown-controller>
                   <button @click="save" class="button">Save</button>
                   <button @click="add_favourite" class="button" ref="fav">
                   <span class="material-symbols-outlined">star</span>
                   </button>
                   </div> 
                 <div id="texture-field" ref="back_ground">
                    <div id="word-pad" contenteditable="true" ref="content" spellcheck="false">
                        <div class="line-content">
                        </div>
                    </div>
                    <div id="imageContainer" ref="image" @mouseover="show_image_container"  @mouseleave="remove_image_container" class="image_container">
                    
                    </div>
                 </div>
             </div>`,
    data() {
        return {
            font_size: ["15", "16", "17", "18", "19", "20", "21", "22", "23"],
            font_family: ["sans-serif", "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "Palatino Linotype", "Arial Black", "Comic Sans MS", "Impact", "Lucida Console", "Garamond", "Century Gothic", "Calibri", "Book Antiqua", "Franklin Gothic Medium", "Cambria", "Rockwell"],
            heading: ["normal", "H1", "H2", "H3"],
            align: ["format_align_left", "format_align_justify", "format_align_right"],
            texture: ["texture31.webp", "texture1.jpg", "texture6.avif", "texture2.jpg", "texture44.webp", "texture51.jpg"],
            active_state: {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15',
                'color': '#666666',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left',
                'background': 'texture31.webp'
            },
            start_line: {
                'b': 'bold',
                'i': 'italic',
                'u': 'underline',
            },
            back_ground_image:"texture31.webp",
            empty_select: -1,
            default_size: 15,
            styles: {},
            close_tag: [],
            html_Array: []
        };
    },
    props: {
        default_date: {
            type: Number
        }
    },
    watch: {
        default_date() {
            var get_local = localStorage.getItem("Data") ? JSON.parse(localStorage.getItem("Data")) : undefined;
            var condition = get_local  && get_local[this.$root.dropdown_selected] && get_local[this.$root.dropdown_selected][this.$root.dropdown_value] && get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]  ;
            if (condition!=undefined) {
                var res_string = this.render_page(get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]);
                var content =get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date];
                this.$refs.content.innerHTML = res_string;
                this.$refs.back_ground.style.backgroundImage = `url(${content[content.length-1]["background"]})`;
            }
            else {
                this.$refs.content.innerHTML = '<div class="line-content"></div>';
                this.$refs.back_ground.style.backgroundImage = `url(${"texture31.webp"})`;
            }
            this.check_mark("Favourite","fav");
        }
    },
    mounted() {
        var editor = this.$refs.content;
        editor.focus();
        editor.addEventListener('click', (e) => {
            if (e.srcElement != this.$refs.content) {
                this.parent_element_style(e.srcElement, e);
            }
            else {
                var last_child = this.$refs.content.childNodes[this.$refs.content.childNodes.length - 1];
                this.traverse_element(last_child, false);
            }
        })
        editor.addEventListener('keydown', (e) => {
            if (this.$refs.content.innerText.length <= 1 && e.key == 'Backspace') {
                this.$refs.content.innerHTML = '';
                this.remove_active();
                this.$refs.content.innerHTML += '<div class="line-content"></div>';
                e.preventDefault();
            }
            else if (e.key == 'Backspace') {
                var sel = document.getSelection();
                if (sel.anchorNode.parentNode.textContent.length == 1 && sel.anchorNode.parentNode.tagName.toLowerCase() == 'span') {
                    var spanParent = sel.anchorNode.parentNode;
                    spanParent.parentNode.removeChild(spanParent);
                    e.preventDefault();
                }

            }
        });
        editor.addEventListener('keyup', (e) => {
            if (this.empty_select == 0) {
                var get_font_tag = document.querySelectorAll('font')[0];
                var attr = get_font_tag.getAttributeNames();
                var prev_span = '';
                attr.forEach((e, i) => {
                    var span = document.createElement('span');
                    if (e == 'size') {
                        span.style.fontSize = this.default_size + 'px';
                    }
                    else if (e == 'face') {
                        span.style.fontFamily = get_font_tag.getAttribute('face');
                    }
                    else {
                        span.style.color = get_font_tag.getAttribute('color');
                    }
                    if (i == attr.length - 1) {
                        span.innerText = get_font_tag.innerText;
                    }
                    i == 0 ? prev_span = span
                        : i == 1 ? (prev_span.append(span), console.log(span), console.log(prev_span))
                            : prev_span.children[0].append(span);
                })
                var gte = get_font_tag.childNodes[0];
                while (gte && gte.tagName != 'DIV') {
                    if (gte.tagName == 'B') {
                        prev_span.style.fontWeight = "bold";
                    }
                    if (gte.tagName == 'U') {
                        prev_span.style.textDecorationLine = "underline";
                    }
                    if (gte.tagName == 'I') {
                        prev_span.style.fontStyle = "italic";
                    }
                    gte = gte.childNodes[0]
                }
                get_font_tag.parentNode.insertBefore(prev_span, get_font_tag);
                get_font_tag.parentNode.removeChild(get_font_tag);
            }
            if (e.key == 'Backspace') {
                var sel = document.getSelection();
                this.remove_active();

                if (!(sel.anchorNode.parentElement.tagName.toLowerCase() == 'div')) {
                    var h = sel.anchorNode.parentElement;
                    while (h && h.tagName.toLowerCase() != 'div') {
                        if (h.tagName.toLowerCase() != 'span') {
                            var style_name = this.start_line[h.tagName.toLowerCase()];
                            this.active_state[style_name] = true;
                        }
                        var style = h.style;
                        var z = '';
                        if (style.color) {
                            console.log('aa');
                            this.active_state['color'] = this.rgbToHex(style.color);
                        }
                        if (style.fontSize) {
                            var z = style.fontSize.replace('px', '');
                            this.active_state['font-size'] = z;
                        }
                        if (style.fontFamily) {
                            this.active_state['font-family'] = style.fontFamily;
                        }
                        if (style.textDecorationLine) {
                            this.active_state['underline'] = true;
                        }
                        if (style.fontWeight) {
                            this.active_state['bold'] = true;
                        }
                        if (style.fontStyle == 'italic') {
                            this.active_state['italic'] = true;
                        }
                        h = h.parentElement;
                    }
                }
            }
            this.empty_select = -1
            this.default_size = 15
        })
        var get_local = localStorage.getItem("Data") ? JSON.parse(localStorage.getItem("Data")) : undefined;
        var condition = get_local  && get_local[this.$root.dropdown_selected] && get_local[this.$root.dropdown_selected][this.$root.dropdown_value] && get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]  ;
        if (condition!==undefined) {
            var res_string = this.render_page(get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]);
            var content =get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date];
            this.$refs.content.innerHTML = res_string;
            this.$refs.back_ground.style.backgroundImage = `url(${content[content.length-1]["background"]})`;

        } else {
            this.$refs.content.innerHTML = '<div class="line-content"></div>';
            this.$refs.back_ground.style.backgroundImage = `url(${"texture31.webp"})`;

        }
        this.$refs.content.focus();
        this.check_mark("Favourite","fav");
    },
    methods: {
        check_mark(key,element){
            var get_local = !localStorage.getItem(key) ? undefined : JSON.parse(localStorage.getItem(key));
            var condition = get_local  && get_local[this.$root.dropdown_selected] 
                            && get_local[this.$root.dropdown_selected][this.$root.dropdown_value] 
                            && get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date];
            if(condition !== undefined){
                this.$refs[element].children[0].classList.add("marked")
            }
            else {
                if( this.$refs[element].children[0].classList.contains("marked")){
                    this.$refs[element].children[0].classList.remove("marked")
                }
            }
        },
        change_text_format(format, value, span) {
            if (span) {
                document.execCommand(value, false, format);
                if (value == 'forecolor') {
                    var val = document.querySelector('.file>#Color').value
                    this.active_state['color'] = val;
                    this.fontTag_to_spanTag('color');
                }
                else if (value == 'FontSize') {
                    this.active_state['font-size'] = format;
                    this.fontTag_to_spanTag('size', format);
                }
                else {
                    this.active_state['font-family'] = format;
                    this.fontTag_to_spanTag('face');
                }
            }
            else {
                if (value == undefined) {
                    document.execCommand(format, false, null);
                    this.highlight_button(format)
                }
                else if (value.startsWith('format')) {
                    document.execCommand(format, false, null);
                }
                else {
                    document.execCommand(value, false, format)
                }
            }

            this.$refs.content.focus();
        },
        highlight_button(data) {
            this.active_state[data] = !this.active_state[data];
        },
        change_back(data) {
            this.$refs.back_ground.style.backgroundImage = `url(${data})`;
            this.back_ground_image =data;
        },
        parent_element_style(element) {
            if (!(element.getAttribute && element.getAttribute('class') == 'line-content')) {
                var h = element;
                this.remove_active();
                while (h.tagName.toLowerCase() != 'div') {
                    if (h.tagName.toLowerCase() != 'span') {
                        var style_name = this.start_line[h.tagName.toLowerCase()];
                        this.active_state[style_name] = true;
                    }
                    var style = h.style;
                    var z = '';
                    if (style.color) {
                        console.log('aa');
                        this.active_state['color'] = this.rgbToHex(style.color);
                    }
                    if (style.fontSize) {
                        var z = style.fontSize.replace('px', '');
                        this.active_state['font-size'] = z;
                    }
                    if (style.fontFamily) {
                        this.active_state['font-family'] = style.fontFamily;
                    }
                    if (style.textDecorationLine) {
                        this.active_state['underline'] = true;
                    }
                    if (style.fontWeight) {
                        this.active_state['bold'] = true;
                    }
                    if (style.fontStyle == 'italic') {
                        this.active_state['italic'] = true;
                    }
                    h = h.parentElement;
                }
            }
            else {
                var sel = document.getSelection();
                var content_length = sel.anchorOffset;
                if (content_length <= 1) {
                    this.traverse_element(element, true)
                }
                else if (sel.focusNode.parentElement == element) {
                    this.remove_active();
                }
                else {
                    this.traverse_element(element, false)
                }
            }
        },
        traverse_element(element, forward) {
            var child = element.childNodes[forward ? 0 : element.childNodes.length - 1];
            this.remove_active();
            while (child && child.tagName && child.tagName.toLowerCase() != 'br') {
                if (child.tagName.toLowerCase() != 'span') {
                    var style_name = this.start_line[child.tagName.toLowerCase()];
                    this.active_state[style_name] = true;
                }
                var style = child.style;
                var z = '';
                if (style.color) {
                    console.log('aa');
                    this.active_state['color'] = this.rgbToHex(style.color);
                }
                if (style.fontSize) {
                    var z = style.fontSize.replace('px', '');
                    this.active_state['font-size'] = z;
                }
                if (style.fontFamily) {
                    this.active_state['font-family'] = style.fontFamily;
                }
                if (style.textDecorationLine) {
                    this.active_state['underline'] = true;
                }
                if (style.fontWeight) {
                    this.active_state['bold'] = true;
                }
                if (style.fontStyle == 'italic') {
                    this.active_state['italic'] = true;
                }

                child = child.childNodes[forward ? 0 : child.childNodes.length - 1];
            }

        },
        fontTag_to_spanTag(params, value) {
            this.empty_select = document.querySelectorAll("font").length;
            params == 'size' ? this.default_size = value : '';
            document.querySelectorAll("font").forEach(function (font) {
                var span = document.createElement("span");
                var attr = font.getAttribute(params);
                if (params == 'color') {
                    console.log(document.querySelectorAll("font"));
                    span.style.color = attr;
                }
                else if (params == 'size') {
                    console.log(value);
                    span.style.fontSize = value + 'px';
                }
                else {
                    span.style.fontFamily = attr;
                }
                while (font.firstChild) {
                    span.appendChild(font.firstChild);
                }
                font.parentNode.insertBefore(span, font);
                font.parentNode.removeChild(font);
            });
        },
        remove_active() {
            this.active_state = {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15',
                'color': '#666666',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left',
                'background': 'texture31.webp'
            }
        },
        hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            const rgb = hex.match(/.{1,2}/g).map(h => parseInt(h, 16)).join(',');
            return `rgb(${rgb})`;
        },
        rgbToHex(rgb) {
            const colors = rgb.match(/\d+/g);
            return "#" + colors.map(color => {
                const hex = parseInt(color).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }).join('');
        },
        add_photo(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            var erf = this;
            reader.onload = function () {
                const imgElement = document.createElement('img');
                imgElement.src = reader.result;
                imgElement.setAttribute('class', 'image-content')
                console.log(erf.$refs);
                erf.$refs.image.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        },
        show_image_container() {
            if (this.$refs.image.children.length != 0) {
                this.$refs.image.classList.add('perfect-width');
            }
        },

        remove_image_container() {
            this.$refs.image.classList.remove('perfect-width');
        },
        save() {

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
            var child = this.$refs.content.childNodes;
            get_child(child, this.html_Array, this.styles, this.close_tag);
            this.json_format();
        },
        json_format() {
            var editor_content = [];
            var line = {};
            var styles = {}
            var cont = '';
            var content = this.html_Array;
            var close = 0;
            for (var i = 0; i < content.length; i++) {

                if (content[i].tagName && content[i].tagName.toLowerCase() == 'div') {
                    line["data"] = [];
                    if (content[i].getAttribute('style')) {
                        line["line_attributes"] = content[i].getAttribute('style');
                        close++;
                    }
                } else if (content[i].tagName) {
                   if(content[i].tagName.toLowerCase()!='br'){
                    if (content[i].tagName.toLowerCase() != 'span') {
                        styles[content[i].tagName.toLowerCase()] = true;
                        if (content[i].getAttribute('style')) {
                            this.tag_with_styles(content[i], styles);
                        }
                    }
                    else {
                        this.tag_with_styles(content[i], styles)
                    }
                }
                } else if (content[i].nodeType === 3) {
                    cont = content[i].nodeValue;
                    var obj = {};
                    obj["content"] = cont;
                    obj["styles"] = { ...styles };
                    line["data"].push(obj);
                } else if(content[i]!='</br>') {
                    if (content[i] == '</b>') {
                        delete styles['b'];
                    } else if (content[i] == '</u>') {
                        delete styles['u'];
                    } else if (content[i] == '</i>') {
                        delete styles['i']
                    } else if (content[i] == '</span>') {
                        this.delete_style(content[this.close_tag[close]], styles);
                        close++;
                    } else {
                        editor_content.push({ ...line });
                        line = {};
                    }
                }
            }

            this.$emit('save_content', editor_content);
            this.saveData_to_localStorage("Data",editor_content);
            this.html_Array = [];
            this.styles = {};
            this.close_tag = [];
        },
        saveData_to_localStorage(key,value,json_delete){
            var get_local = !localStorage.getItem(key) ? {} : JSON.parse(localStorage.getItem(key));
            get_local[this.$root.dropdown_selected] = get_local[this.$root.dropdown_selected] || {};
            get_local[this.$root.dropdown_selected][this.$root.dropdown_value] = get_local[this.$root.dropdown_selected][this.$root.dropdown_value] || {};
            !json_delete ? (get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date] = value , get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date].push({"background" : this.back_ground_image}))
                         : get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date] ?
                            delete  get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]
                            : get_local[this.$root.dropdown_selected][this.$root.dropdown_value][this.default_date]=value;
            localStorage.setItem(key, JSON.stringify(get_local));
        },
        delete_style(content, obj) {
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
        tag_with_styles(content, obj) {
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
        },
        add_favourite() {
            this.save();
            this.saveData_to_localStorage("Favourite",true,"delete");
            if(this.$refs["fav"].children[0].classList.contains("marked")){
                this.$refs["fav"].children[0].classList.remove("marked");
            }
            else{
                this.$refs["fav"].children[0].classList.add("marked");
            }   
        },
        add_mark() {

        },
        render_page(editor_content) {
            var res_string = '';
            for (var i = 0; i < editor_content.length-1; i++) {
                editor_content[i].line_attributes ? res_string += '<div class="line-content" style="' + editor_content[i].line_attributes + '">'
                    : res_string += '<div class="line-content">';
                    if(editor_content[i].data){                  
                    editor_content[i].data.forEach((element, j) => {
                        if (j != 0) {
                            res_string = this.check_previous_close_tag(editor_content[i].data[j - 1].styles, element.styles, res_string);
                        }
                        res_string = this.check_for_new_tag(editor_content[i].data[j - 1] ? editor_content[i].data[j - 1].styles : '', element.styles, res_string);
                        res_string += element.content;
                        if (j == editor_content[i].data.length - 1) {
                            res_string = this.check_previous_close_tag(element.styles, '', res_string);
                        }
                    });
                    }
                    else{
                        res_string+='&ZeroWidthSpace;'
                    }
                    res_string += '</div>';
            }
            return res_string;
        },
        check_previous_close_tag(previous_styles, current_styles, div) {
            Object.keys(previous_styles).forEach(tag => {
                if (current_styles == '' || !current_styles[tag]) {
                    if (tag == 'b') {
                        div += '</b>';
                    }
                    else if (tag == 'i') {
                        div += '</i>';
                    }
                    else if (tag == 'u') {
                        div += '</u>';
                    }
                    else {
                        div += '</span'
                    }
                }
            })
            return div;
        },
        check_for_new_tag(previous_styles, current_styles, div) {
            Object.keys(current_styles).forEach(tag => {
                if (previous_styles == '' || !previous_styles[tag]) {
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


{/* <simple-dropdown-controller width="normal_width" :default_val="active_state['formatBlock']" :data="heading" :name="'formatBlock'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller> */ }
