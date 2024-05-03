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
                   <input type="color" id="Color" @change="change_text_format($event.target.value, 'forecolor', 'font')" :value="active_state.color">
                   </div>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['font-size']" :data="font_size" :name="'FontSize'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="normal_width":default_val="active_state['font-family']" :data="font_family" :name="'FontName'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="active_state['align']" :data="align" :name="'align'" :tag="'span'" @change_format="change_text_format"></simple-dropdown-controller>
                   <simple-dropdown-controller width="small_width" :default_val="back_ground" :data="texture" :name="'background'" :tag="'image'" @change_background="change_background"></simple-dropdown-controller>
                
                   </div> 
                 <div id="texture-field" ref="back_ground">
                    <div id="word-pad" contenteditable="true" ref="content" spellcheck="false">
                        <div class="line-content">
                        &#x200B; 
                        </div>
                    </div>
                    <div id="drag_container" ref="drag" @mousedown="add_mousemove_event">
                    
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
            images_url:'',
            back_ground:'',
            index:0,
        };
    },
    props: {
        data:{
            type:Object
        },
        template:{
            type:String
        },
        image:{
            type:Array
        },
        global_props:{
            type:Object
        },
        favourite:{
            type:Boolean,
        },
        preview:{
            type:Boolean
        },
        default_date:{
            type:Number,
            default:0
        }
    },
    mounted() {
         this.editor_functionality();
         this.check_for_draft();
         this.check_for_preview();
         this.convert_url_to_image(this.image);
    },
    watch:{
        data(current,prev){
            this.check_for_draft();
        },
         favourite(){
            // this.check_favourite(); 
         },
         image(){
            this.convert_url_to_image(this.image);
         }
    },
    methods: {

        editor_functionality(){
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
                    this.$refs.content.innerHTML += '<div class="line-content"> &#x200B;</div>';
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
                    var fontTags = document.querySelectorAll('font');
                    fontTags.forEach((get_font_tag) => {
                        var attr = get_font_tag.getAttributeNames();
                        var prev_span = document.createElement('span');
                        attr.forEach((e, i) => {
                            var span = document.createElement('span');
                            if (e == 'size') {
                                ;
                                span.style.fontSize = this.active_state['font-size'] + 'px';
                            } else if (e == 'face') {
                                span.style.fontFamily = get_font_tag.getAttribute('face');
                            } else if (e == 'color') {
                                span.style.color = get_font_tag.getAttribute('color');
                            }
                            if (i == attr.length - 1) {
                                span.innerText = get_font_tag.innerText;
                            }
                            i == 0 ? prev_span = span :
                                i == 1 ? (prev_span.append(span)) :
                                    prev_span.children[0].append(span);
                        });
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
                            gte = gte.childNodes[0];
                        }
                        get_font_tag.parentNode.insertBefore(prev_span, get_font_tag);
                        get_font_tag.parentNode.removeChild(get_font_tag);
                    });
    
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
                this.default_size = 15; 
                this.save_content(this.default_date);
            })
        },
        call_save(){
            this.save_content(this.default_date);
        },
        add_mousemove_event(ev) {
            var prev =  ev.screenX;
            const mousemoveHandler = (e) => {
               prev = this.drag_start(prev, e.clientX,e.currentTarget);
            };
            const mouseupHandler = () => {
                this.$refs.editor_width.removeEventListener('mousemove', mousemoveHandler);
                this.$refs.editor_width.removeEventListener('mouseup', mouseupHandler);
            };
            this.$refs.editor_width.addEventListener('mousemove', mousemoveHandler);
            this.$refs.editor_width.addEventListener('mouseup', mouseupHandler);
        },
        
        drag_start(prev,result_x,target) {
                const content = this.$refs.content;
                const image = this.$refs.image;
                const background = this.$refs.back_ground.getBoundingClientRect();
                if(prev>result_x){
                     result_x+=(2/100)*background.width;
                }
                else{
                    result_x-=(2/100)*background.width;
                }
                var parent_width  = target.clientWidth;
                if(result_x < parent_width){
                image.style.width = background.width - (result_x - background.x )+"px";
                content.style.width =(result_x - background.x )+"px";
                var image_container_width = image.clientWidth;
                this.set_image_height(image_container_width);
                console.log('aaa');
                }
                return result_x;
        },              
        set_image_height(img_width){
            const aspectRatio = 16 / 14 ;
            const height = img_width / aspectRatio;
            var img_container = this.$refs.image.children;
            for(var i=0;i<img_container.length;i++){
                  img_container[i].style.height = height+"px";              
            }
        },
        check_for_preview(){
            if (!this.preview) {
                this.$refs.content.setAttribute('contentEditable', 'false');
                this.$refs.editor_width.classList.add('preview')
            }
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
            this.save_content(this.default_date);
            this.$refs.content.focus();
        },
        fontTag_to_spanTag(params, value) {
            this.empty_select = document.querySelectorAll("font").length;
            var ref=this;
            document.querySelectorAll("font").forEach(function (font) {
                var span = document.createElement("span");
                var attr = font.getAttribute(params);
                if (params == 'color') {
                    span.style.color = attr;
                }
                else if (params == 'size') {
                    span.style.fontSize = ref.active_state['font-size'] + 'px';
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
        check_for_draft(){
                this.remove_active();
                this.template !='' ?   this.$refs.content.innerHTML = this.template :  this.$refs.content.innerHTML= '<div class="line-content"> &#x200B;</div>'   
                this.set_global_props(this.global_props);
                !this.$refs.full_container.classList.contains('hide')? this.$refs.full_container.classList.add('hide'):'';
                if(this.images_url.length==0){
                    this.$refs.image.classList.add('hide');
                    this.$refs.content.classList.add('full-width');
                    this.$refs.drag.classList.add('hide')
                }
                else{
                    this.$refs.image.classList.contains('hide') ?(  this.$refs.image.classList.remove('hide'),
                                                                    this.$refs.content.classList.remove('full-width'), this.$refs.drag.classList.remove('hide')):'';
                }
        },
        // check_favourite(){
        //     if(this.preview){
        //         if(this.favourite){
        //             this.$refs.icon.classList.add('clicked');
        //         }
        //         else if(this.$refs.icon.classList.contains('clicked')){
        //             this.$refs.icon.classList.remove('clicked');
        //         }
        //     }

        // },
        convert_url_to_image(result){
            const image_container = this.$refs.image;
            image_container.innerHTML='';
            this.images_url=[];
            if(result.length==0){
                this.$refs.image.classList.add('hide');
                this.$refs.content.classList.add('full-width');
                this.$refs.drag.classList.add('hide')
            }
            else{
                this.$refs.image.classList.contains('hide') ?(  this.$refs.image.classList.remove('hide'),
                        this.$refs.content.classList.remove('full-width'),this.$refs.drag.classList.remove('hide')):'';
            }
            for (let i = 0; i < result.length; i++) {
                const img = document.createElement('img');
                img.setAttribute('src', result[i]);
                var span ='<span class="material-symbols-outlined">delete</span>'
                var div = document.createElement('div');
                div.appendChild(img.cloneNode(true));
                div.innerHTML+=span;
                this.set_img_height(div);
                image_container.appendChild(div);
                this.add_event_listener(div,this.$refs.show_photo,i);
                (div => {
                    div.addEventListener('mouseover', () => {
                        div.children[1].classList.add('show');
                    });
                })(div);
                (div => {
                    div.children[1].addEventListener('click', () => {
                        this.remove_image(div);
                    });
                })(div);
                
                (div => {
                    div.addEventListener('mouseout', () => {
                        div.children[1].classList.remove('show');
                    });
                })(div);
                this.images_url.push(result[i])
            }

          
        },
        set_img_height(img){
            var img_width = this.$refs.image.clientWidth;
            const aspectRatio = 16 / 14;
            const height = img_width / aspectRatio;
            img.style.height = height+"px"; 
        },
        add_event_listener(div,parent_container,index){
            var ref= this;
            div.addEventListener('click',(e)=>{
              if(e.srcElement.tagName !='SPAN'){
                    ref.$refs.show_photo.innerHTML='';
                    const img = document.createElement('img');
                    img.setAttribute('src', ref.images_url[index]);
                    var photo_div = ref.add_image_in_full_screen(img);
                    photo_div.innerHTML+=`<span class="material-symbols-outlined">close</span>`;
                    ref.$refs.show_photo.appendChild(photo_div);
                    ref.$refs.full_container.classList.remove('hide');
              }
            })
           
        },
        add_image_in_full_screen(img){
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
            if(this.images_url.length==0){
                this.$refs.image.classList.add('hide');
                this.$refs.content.classList.add('full-width');
                this.$refs.drag.classList.add('hide');
            }
        },
        set_global_props(props){
            if(props["background_image"]){
                this.$refs.back_ground.style.backgroundImage = props["background_image"];
                this.back_ground =  props["background_image"].replace("url(\"", "");
                this.back_ground = this.back_ground.replace("\")", "");
            }
            else{
                this.$refs.back_ground.style.backgroundImage = `url(${"texture31.webp"})`
                this.back_ground = "texture31.webp" 
            }
        },
        change_background(data){
            this.$refs.back_ground.style.backgroundImage = `url(${data})`;
            this.background = data;
            this.save_content(this.default_date);
        },
        insert_photo(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const ref = this; 
            if(this.images_url.length==0){
                this.$refs.image.classList.contains('hide') ?(  this.$refs.image.classList.remove('hide'),
                this.$refs.content.classList.remove('full-width'),this.$refs.drag.classList.remove('hide')):'';
            }
            reader.onload = function () {
                const img = document.createElement('img');
                img.setAttribute('src', reader.result);
        
                const div = document.createElement('div');
        
                const deleteSpan = document.createElement('span');
                deleteSpan.className = 'material-symbols-outlined';
                deleteSpan.textContent = 'delete';
                deleteSpan.addEventListener('click', () => {
                    ref.remove_image(div);
                });
                div.appendChild(img);
                div.appendChild(deleteSpan);
                ref.set_img_height(div);
                ref.$refs.image.appendChild(div);
                div.addEventListener('mouseover', () => {
                    deleteSpan.classList.add('show');
                });
                div.addEventListener('mouseout', () => {
                    deleteSpan.classList.remove('show');
                });
                const photo_div = ref.add_image_in_full_screen(img.cloneNode(true));
                const index = ref.images_url.length;
                ref.$refs.show_photo.appendChild(photo_div);
                ref.add_event_listener(div, ref.$refs.show_photo, index);
                ref.storeDataURL(reader.result);
            };
            reader.readAsDataURL(file);
        },
        storeDataURL(dataURL) {
            this.images_url.push(dataURL);
            this.save_content(this.default_date);
        },
        save_content(date){
          var html =this.$refs.content; 
          var back_ground = this.$refs.back_ground.style.backgroundImage;
          console.log(html);
          console.log(this.images_url);
          console.log(back_ground)
          console.log(date);;
          this.$emit('save_content' , html , this.images_url,back_ground,date);
        },
        add_favourite(){
            this.$emit('add_fav','op')
        },
        close_container(event){
            if(event.target.tagName=='SPAN'){
                this.$refs.full_container.classList.add('hide');
            }
        }
    }
};


{/* <simple-dropdown-controller width="normal_width" :default_val="active_state['formatBlock']" :data="heading" :name="'formatBlock'" :tag="'-'" @change_format="change_text_format"></simple-dropdown-controller> */ }
