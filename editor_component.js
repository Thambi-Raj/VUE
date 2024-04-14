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
                   <input type="file" id="imag">
                   <label for="imag">Upload</label>
                   <span class="material-symbols-outlined">image</span>
                   </div>
                   <div class="file">
                   <label for="Color">Color</label>
                   <input type="color" id="Color" @change="change_text_format($event.target.value, 'forecolor', 'font')" :value="active_state.color">
                   </div>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['font-size']" :data="font_size" :name="'FontSize'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="normal_width" :default_val="active_state['font-family']" :data="font_family" :name="'FontName'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="normal_width" :default_val="active_state['formatBlock']" :data="heading" :name="'formatBlock'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['align']" :data="align" :name="'align'" :tag="'span'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['background']" :data="texture" :name="'background'" :tag="'image'" @change_background="change_back"></simple-dropdown-controller>
                 </div> 
                 <div id="texture-field" ref="back_ground">
                    <div id="word-pad" contenteditable="true" ref="content">
                        <div class="line-content">write something....</div>
                    </div>
                 </div>
             </div>`,
    data() {
        return {
            font_size: ["5", "1", "2", "3", "4", "6", "7", "8", "9"],
            font_family: ["sans-serif", "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "Palatino Linotype", "Arial Black", "Comic Sans MS", "Impact", "Lucida Console", "Garamond", "Century Gothic", "Calibri", "Book Antiqua", "Franklin Gothic Medium", "Cambria", "Rockwell"],
            heading: ["normal", "H1", "H2", "H3"],
            align: ["format_align_left", "format_align_justify", "format_align_right"],
            texture: ["texture51.jpg", "texture1.jpg", "texture6.avif", "texture2.jpg", "texture44.webp", "texture31.webp"],
            active_state: {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '5', 
                'color': '#666',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left', 
                'background': 'texture51.jpg' 
              },
            start_line: {
                'b': 'bold',
                'i': 'italic',
                'u': 'underline',
            }
        };
    },
    mounted() {
        var editor = this.$refs.content;
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
            if ((editor.innerHTML == '<div class="line-content"><br></div>') && e.key == 'Backspace') {
                e.preventDefault();
            }
        });
    },
    methods: {
        change_text_format(format, value, span) {
            if (this.$refs.content.innerHTML == '<div class="line-content">write something....</div>') {
                console.log('SS');
            }
            else {
                if (span) {
                    document.execCommand(value, false, format);
                    if (value == 'forecolor') {
                        this.fontTag_to_spanTag('color')
                    }
                    else if (value == 'FontSize') {
                        this.fontTag_to_spanTag('size');
                    }
                    else {
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
                while (h.tagName.toLowerCase() != 'div') {
                    if (h.tagName.toLowerCase() != 'span') {
                        var style_name = this.start_line[h.tagName.toLowerCase()];
                        this.active_state[style_name] = true;
                    }
                    else {
                        var style = h.style;
                        style.color ? this.active_state['color'] = style.color
                            : style.fontSize ? this.active_state['font-size'] = style.fontSize
                                : this.active_state['font-family'] = style.fontFamily;
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
            while (child && child.tagName && child.tagName.toLowerCase() != 'br') {
                if (child.tagName.toLowerCase() != 'span') {
                    var style_name = this.start_line[child.tagName.toLowerCase()];
                    this.active_state[style_name] = true;
                }
                else {
                    var style = child.style;
                    style.color ? this.active_state['color'] = style.color
                        : style.fontSize ? this.active_state['font-size'] = style.fontSize
                            : this.active_state['font-family'] = style.fontFamily;
                }
                child = child.childNodes[forward ? 0 : child.childNodes.length - 1];
            }
        },
        fontTag_to_spanTag(params) {
            document.querySelectorAll("font").forEach(function (font) {
                var span = document.createElement("span");
                var attr = font.getAttribute(params);
                if (params == 'color') {
                    span.style.color = attr;
                }
                else if (params == 'size') {
                    span.style.fontSize = attr + 'pt';
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
            this.active_state ={
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '5', 
                'color': '#666',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left', 
                'background': 'texture51.jpg' 
              }
        }
    }
};
