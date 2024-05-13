const editor_component = {
    template: `<div class="editor-root" ref="editor_width">
                 <div id="editor-tool" ref="editor_tool" v-if="preview">
                   <div :class="{ 'button clicked': active_state.bold, 'button': !active_state.bold }" id="bold" @click="change_text_format('bold')">
                   <span class="material-symbols-outlined">format_bold</span>
                   </div>
                   <div :class="{ 'button clicked': active_state.italic, 'button': !active_state.italic }" id="italic" @click="change_text_format('italic')">
                   <span class="material-symbols-outlined">format_italic</span>
                   </div>
                   <div :class="{ 'button clicked': active_state.underline, 'button': !active_state.underline }" id="underline" @click="change_text_format('underline')">
                   <span class="material-symbols-outlined">format_underlined</span>
                   </div>
                   <div class="file" >
                   <input  type="file" id="imag" accept="image/*" @change="insert_photo" ref="image_file" >
                   <label for="imag" id="upload">Upload&nbsp;&nbsp;<span class="material-symbols-outlined">image</span> </label>
                   
                   </div>
                   <div class="file">
                   <label for="Color">Color &nbsp;&nbsp;</label>
                   <input type="color" id="Color" @change="change_text_format($event.target.value, 'forecolor', 'font')" :value="active_state.color" ref="color_input">
                   </div>
                   <simple-dropdown-controller width="font_size_width" :default_val="active_state['font-size']" :data="font_size" :name="'FontSize'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="normal_width":default_val="active_state['font-family']" :data="font_family" :name="'FontName'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['align']" :data="align" :name="'align'" :tag="'span'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="back_ground" :data="texture" :name="'background'" :tag="'image'" @change_background="change_background"></simple-dropdown-controller>
                
                   </div> 
                 <div id="texture-field" ref="back_ground" >
                    <div id="word-pad" contenteditable="true" ref="content" spellcheck="false">
                    <div class="line-content">\u200b</div>
                    </div>
                    <div id="drag_container" ref="drag" @mousedown="start_drag_event">
                    
                    </div>
                    <div id="imageContainer" ref="image" class="image_container">
                    
                    </div>
                 </div>    
                 <div id="full_container_photo" class="hide"  @click="close_container" ref="full_container">
                      
                     <div id="image_con"  ref="show_photo">
             
                    </div>
                </div> 
             </div>`,
    data() {
        return {
            font_size: ["15px", "16px", "17px", "18px", "19px", "20px", "21px", "22px", "23px"],
            font_family: ["sans-serif", "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "Palatino Linotype", "Arial Black", "Comic Sans MS", "Impact", "Lucida Console", "Garamond", "Century Gothic", "Calibri", "Book Antiqua", "Franklin Gothic Medium", "Cambria", "Rockwell"],
            heading: ["normal", "H1", "H2", "H3"],
            align: ["format_align_left", "format_align_justify", "format_align_right"],
            texture: ["texture31.webp", "texture1.jpg", "texture6.avif", "texture2.jpg", "texture44.webp", "texture51.jpg"],
            active_state: {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15px',
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
            font_tag_length: -1,
            images_url: '',
            back_ground: '',

        };
    },
    props: {
        data: {
            type: Object
        },
        template: {
            type: String
        },
        image: {
            type: Array
        },
        global_props: {
            type: Object
        },
        preview: {
            type: Boolean
        },
        default_date: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.editor_functionality();
        this.check_for_draft();
        this.check_for_preview();
        this.convert_url_to_image(this.image);
    },
    watch: {
        data() {
            this.check_for_draft();
        },
        image() {
            this.convert_url_to_image(this.image);
        },
    },
    methods: {
        editor_functionality() {
            var editor = this.$refs.content;
            editor.focus();
            editor.addEventListener('click', (e) => {
                if (e.srcElement != this.$refs.content) {
                    this.get_current_element(e.srcElement, e);
                }
                else {
                    var last_child = this.$refs.content.childNodes[this.$refs.content.childNodes.length - 1];
                    this.traverse_element(last_child, false);
                }
            })
            editor.addEventListener('keydown', (e) => {
                if (this.$refs.content.innerText.length <= 1 && e.key == 'Backspace') {
                    this.check_content_empty();
                    e.preventDefault();
                }
                else if (e.key == 'Backspace') {
                    this.delete_empty_styles_tag(e);
                }
            })
            editor.addEventListener('keyup', (e) => {
                if (this.font_tag_length == 0) {
                    var fontTags = editor.querySelectorAll('font');
                    fontTags.forEach((element) => {
                        var attr = element.getAttributeNames();
                        var span = document.createElement('span');
                        attr.forEach((e, i) => {
                            this.set_size_in_span(e, span);
                            this.set_family_in_span(e, element.getAttribute('face'), span);
                            this.set_color_in_span(e, element.getAttribute('color'), span);
                            if (i == attr.length - 1) {
                                span.innerText = element.innerText;
                            }
                        });
                        this.check_tag_present_in_span(element, span);
                        element.parentNode.insertBefore(span, element);
                        element.parentNode.removeChild(element);
                    });
                }
                this.update_cursor_position_toolbar();
                this.font_tag_length = -1;
                var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
                if (pattern.test(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
                    this.save_content(this.default_date);
                }
            })
        },
        check_for_draft() {
            this.reset_Active();
            this.template != '' ? this.$refs.content.innerHTML = this.template : this.$refs.content.innerHTML = ' <div class="line-content">\u200b</div>'
            this.set_global_props(this.global_props);
            this.check_for_image_container(this.images_url);
            this.check_for_full_imageView();
        },
        check_for_preview() {
            if (!this.preview) {
                this.$refs.content.setAttribute('contentEditable', 'false');
                this.$refs.editor_width.classList.add('preview')
            }
        },
        convert_url_to_image(result) {
            const image_container = this.$refs.image;
            image_container.innerHTML = '';
            this.images_url = [];
            this.check_for_image_container(result)
            for (let i = 0; i < result.length; i++) {
                var div = this.construct_image_container(result[i]);
                image_container.appendChild(div);
                this.show_image_in_fullView(div, i);
                this.mousemove_event_for_image(div);
                this.mouseout_event_for_image(div);
                this.remove_event_for_image(div);
                this.images_url.push(result[i])
            }
        },
        check_content_empty() {
            this.$refs.content.innerHTML = '';
            this.$refs.content.innerHTML += '<div class="line-content">\u200b</div>';
            this.reset_Active();
        },
        delete_empty_styles_tag(event) {
            var sel = document.getSelection();
            if (sel.anchorNode.parentNode.textContent.length == 1 && sel.anchorNode.parentNode.tagName != 'DIV') {
                var spanParent = sel.anchorNode.parentNode;
                spanParent.parentNode.removeChild(spanParent);
                event.preventDefault();
            }
        },
        check_tag_present_in_span(element, prev_span) {
            var span_first_element = element.childNodes[0];
            while (span_first_element && span_first_element.tagName != 'DIV') {
                if (span_first_element.tagName == 'B') {
                    prev_span.style.fontWeight = "bold";
                }
                if (span_first_element.tagName == 'U') {
                    prev_span.style.textDecorationLine = "underline";
                }
                if (span_first_element.tagName == 'I') {
                    prev_span.style.fontStyle = "italic";
                }
                span_first_element = span_first_element.childNodes[0];
            }
        },
        update_cursor_position_toolbar() {
            var sel = document.getSelection();
            this.reset_Active();
            if (sel.anchorNode.tagName) {
                this.update_toolbar_button(sel.anchorNode);
            }
            var h = sel.anchorNode.parentElement;
            while (h && h.tagName.toLowerCase() != 'div') {
                this.update_toolbar_button(h);
                h = h.parentElement;
            }
        },
        start_drag_event(ev) {
            var prev = ev.screenX;
            const mousemoveHandler = (e) => {
                prev = this.drag_move(prev, e.clientX, e.currentTarget);
            };
            const mouseupHandler = () => {
                this.$refs.editor_width.removeEventListener('mousemove', mousemoveHandler);
                this.$refs.editor_width.removeEventListener('mouseup', mouseupHandler);
            };
            this.$refs.editor_width.addEventListener('mousemove', mousemoveHandler);
            this.$refs.editor_width.addEventListener('mouseup', mouseupHandler);
        },
        drag_move(prev, result_x, target) {
            const background = this.$refs.back_ground.getBoundingClientRect();
            if (prev > result_x) {
                result_x += (2 / 100) * background.width;
            }
            else {
                result_x -= (2 / 100) * background.width;
            }
            this.minimum_width_imageContainer(result_x, target, background);
            return result_x;
        },
        minimum_width_imageContainer(result_x, target, background) {
            var parent_width = target.clientWidth;
            const content = this.$refs.content;
            const image = this.$refs.image;
            if (result_x < parent_width) {
                image.style.width = background.width - (result_x - background.x) + "px";
                content.style.width = (result_x - background.x) + "px";
                var image_container_width = image.clientWidth;
                this.set_image_height(image_container_width);
            }
        },
        set_image_height(img_width) {
            const aspectRatio = 16 / 14;
            const height = img_width / aspectRatio;
            var img_container = this.$refs.image.children;
            for (var i = 0; i < img_container.length; i++) {
                img_container[i].style.height = height + "px";
            }
        },
        get_current_element(element) {
            if (!(element.getAttribute && element.getAttribute('class') == 'line-content')) {
                this.check_styles_in_element(element)
            }
            else {
                var sel = document.getSelection();
                var content_length = sel.anchorOffset;
                if (content_length <= 1) {
                    this.traverse_element(element, true)
                }
                else if (sel.focusNode.parentElement == element) {
                    this.reset_Active();
                }
                else {
                    this.traverse_element(element, false)
                }
            }
        },
        check_styles_in_element(element) {
            var h = element;
            this.reset_Active();
            while (h.tagName.toLowerCase() !== 'div') {
                this.update_toolbar_button(h);
                h = h.parentElement;
            }
        },
        update_toolbar_button(element) {
            var style = element.style;
            this.set_tag_based_style(element);
            this.set_color(style);
            this.set_fontsize(style);
            this.set_fontname(style);
            this.set_underline(style);
            this.set_bold(style);
            this.set_italic(style);
        },
        set_tag_based_style(h) {
            if (h.tagName.toLowerCase() !== 'span') {
                var style_name = this.start_line[h.tagName.toLowerCase()];
                this.active_state[style_name] = true;
            }
        },
        set_color(style) {
            if (style.color) {
                this.active_state['color'] = this.rgbToHex(style.color);
            }
        },
        set_fontsize(style) {
            if (style.fontSize) {
                this.active_state['font-size'] = style.fontSize;
            }
        },
        set_fontname(style) {
            if (style.fontFamily) {
                this.active_state['font-family'] = style.fontFamily;
            }
        },
        set_underline(style) {
            if (style.textDecorationLine) {
                this.active_state['underline'] = true;
            }
        },
        set_bold(style) {
            if (style.fontWeight) {
                this.active_state['bold'] = true;
            }
        },
        set_italic(style) {
            if (style.fontStyle === 'italic') {
                this.active_state['italic'] = true;
            }
        },
        traverse_element(element, forward) {
            var child = element.childNodes[forward ? 0 : element.childNodes.length - 1];
            this.reset_Active();
            while (child && child.tagName && child.tagName.toLowerCase() != 'br') {
                this.update_toolbar_button(child);
                child = child.childNodes[forward ? 0 : child.childNodes.length - 1];
            }
        },
        change_text_format(format, value, font_tag) {
            if (font_tag) {
                document.execCommand(value, false, format.replace('px', ''));
                this.fontTag_contents(format, value);
            }
            else {
                document.execCommand(format, false, null);
                if (value == undefined) {
                    this.highlight_button(format)
                }
            }
            this.save_content(this.default_date);
            this.$refs.content.focus();
        },
        fontTag_contents(format, value) {
            this.check_fontfamily_Attribute(format, value);
            this.check_fontsize_Attribute(format, value);
            this.check_forecolor_attribute(format, value);
        },
        check_forecolor_attribute(format, value) {
            if (value == 'forecolor') {
                this.active_state['color'] = this.$refs.color_input.value;
                this.fontTag_to_spanTag('color');
            }
        },
        check_fontsize_Attribute(format, value) {
            if (value == 'FontSize') {
                this.active_state['font-size'] = format;
                this.fontTag_to_spanTag('size', format);
            }
        },
        check_fontfamily_Attribute(format, value) {
            if (value == 'FontName') {
                this.active_state['font-family'] = format;
                this.fontTag_to_spanTag('face');
            }
        },
        fontTag_to_spanTag(params, value) {
            var editor = this.$refs.content;
            this.font_tag_length = editor.querySelectorAll("font").length;
            var ref = this;
            editor.querySelectorAll("font").forEach(function (font) {
                var span = document.createElement("span");
                var attr = font.getAttribute(params);
                ref.set_color_in_span(params, attr, span);
                ref.set_size_in_span(params, span);
                ref.set_family_in_span(params, attr, span);
                while (font.firstChild) {
                    span.appendChild(font.firstChild);
                }
                font.parentNode.insertBefore(span, font);
                font.parentNode.removeChild(font);
            });
        },
        set_color_in_span(params, attr, span) {
            if (params == 'color') {
                span.style.color = attr;
            }
        },
        set_size_in_span(params, span) {
            if (params == 'size') {
                span.style.fontSize = this.active_state['font-size'];
            }
        },
        set_family_in_span(params, attr, span) {
            if (params == 'face') {
                span.style.fontFamily = attr;
            }
        },
        highlight_button(data) {
            this.active_state[data] = !this.active_state[data];
        },
        rgbToHex(rgb) {
            const colors = rgb.match(/\d+/g);
            return "#" + colors.map(color => {
                const hex = parseInt(color).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }).join('');
        },
        reset_Active() {
            this.active_state = {
                'bold': false,
                'italic': false,
                'underline': false,
                'font-size': '15px',
                'color': '#666666',
                'font-family': 'sans-serif',
                'formatBlock': 'normal',
                'align': 'format_align_left',
                'background': 'texture31.webp'
            }
        },
        check_for_full_imageView() {
            !this.$refs.full_container.classList.contains('hide') ?
                this.$refs.full_container.classList.add('hide') : '';
        },
        check_for_image_container(images) {
            if (images.length == 0) {
                this.image_not_present_in_draft();
            }
            else {
                this.image_present_in_draft();
            }
        },
        image_not_present_in_draft() {
            this.$refs.image.classList.add('hide');
            this.$refs.content.classList.add('full-width');
            this.$refs.drag.classList.add('hide')
        },
        image_present_in_draft() {
            this.$refs.image.classList.contains('hide') ? (this.$refs.image.classList.remove('hide'),
                this.$refs.content.classList.remove('full-width'), this.$refs.drag.classList.remove('hide'))
                : '';
        },
        construct_image_container(result) {
            const img = document.createElement('img');
            img.setAttribute('src', result);
            var span = '<span class="material-symbols-outlined">delete</span>'
            var div = document.createElement('div');
            div.appendChild(img.cloneNode(true));
            div.innerHTML += span;
            this.set_img_height(div);
            return div;
        },
        mousemove_event_for_image(div) {
            div.addEventListener('mouseover', () => {
                div.children[1].classList.add('show');
            });
        },
        remove_event_for_image(div) {
            div.children[1].addEventListener('click', () => {
                this.remove_image(div);
            });
        },
        mouseout_event_for_image(div) {
            div.addEventListener('mouseout', () => {
                div.children[1].classList.remove('show');
            });
        },
        set_img_height(img) {
            var img_width = this.$refs.image.clientWidth;
            const aspectRatio = 16 / 14;
            const height = img_width / aspectRatio;
            img.style.height = height + "px";
        },
        show_image_in_fullView(div, index) {
            var ref = this;
            div.addEventListener('click', (e) => {
                if (e.srcElement.tagName != 'SPAN') {
                    ref.$refs.show_photo.innerHTML = '';
                    const img = document.createElement('img');
                    img.setAttribute('src', ref.images_url[index]);
                    var photo_div = ref.add_image_in_full_screen(img);
                    photo_div.innerHTML += `<span class="material-symbols-outlined">close</span>`;
                    ref.$refs.show_photo.appendChild(photo_div);
                    ref.$refs.full_container.classList.remove('hide');
                }
            })
        },
        add_image_in_full_screen(img) {
            var div = document.createElement('div');
            div.appendChild(img);
            return div;
        },
        remove_image(div) {
            var parent = div.parentElement;
            var index = Array.from(parent.children).indexOf(div);
            parent.children[index].remove();
            this.images_url.splice(index, 1);
            this.save_content(this.default_date);
            if (this.images_url.length == 0) {
                this.image_not_present_in_draft();
            }
        },
        set_global_props(props) {
            if (props["background_image"]) {
                this.set_image_for_editor(props);
            }
            else {
                this.$refs.back_ground.style.backgroundImage = `url(${"texture31.webp"})`
                this.back_ground = "texture31.webp"
            }
        },
        set_image_for_editor(props) {
            this.$refs.back_ground.style.backgroundImage = props["background_image"];
            this.back_ground = props["background_image"].replace("url(\"", "");
            this.back_ground = this.back_ground.replace("\")", "");
        },
        change_background(data) {
            this.$refs.back_ground.style.backgroundImage = `url(${data})`;
            this.background = data;
            this.save_content(this.default_date);
        },
        insert_photo(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const ref = this;
            if (this.images_url.length == 0) {
                this.$refs.image.classList.contains('hide') ? (this.$refs.image.classList.remove('hide'),
                    this.$refs.content.classList.remove('full-width'), this.$refs.drag.classList.remove('hide')) : '';
            }
            reader.onload = function () {
                const i = ref.images_url.length;
                var div = ref.construct_image_container(reader.result);
                ref.$refs.image.appendChild(div);
                ref.show_image_in_fullView(div, i);
                ref.mousemove_event_for_image(div);
                ref.mouseout_event_for_image(div);
                ref.remove_event_for_image(div);
                ref.storeDataURL(reader.result);
            };
            reader.readAsDataURL(file);
        },
        storeDataURL(dataURL) {
            this.images_url.push(dataURL);
            this.save_content(this.default_date);
        },
        save_content(date) {
            var html = this.$refs.content;
            var back_ground = this.$refs.back_ground.style.backgroundImage;
            this.$emit('save_content', html, this.images_url, back_ground, date);
        },
        add_favourite() {
            this.$emit('add_fav')
        },
        close_container(event) {
            if (event.target.tagName == 'SPAN') {
                this.$refs.full_container.classList.add('hide');
            }
        }
    }
};