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
                   <button @click="save">Save</button>
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
            empty_select: -1,
            default_size: 15,
        };
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
    },
    methods: {
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
            this.$refs.back_ground.style.backgroundImage = `url(${data})`
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
            var ref = child;
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
            if(this.$refs.image.children.length!=0){
            this.$refs.image.classList.add('perfect-width');
            }
        },
        remove_image_container() {
            this.$refs.image.classList.remove('perfect-width');
        },
        save(){
            this.$emit('save_content',this.$refs.content);
        }
    }
};


{/* <simple-dropdown-controller width="normal_width" :default_val="active_state['formatBlock']" :data="heading" :name="'formatBlock'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller> */ }
