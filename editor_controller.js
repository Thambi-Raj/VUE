// const editor_component = {
//     template: `<div class="editor-root">
//                  <div id="editor-tool" ref="editor_tool">
//                    <div :class="  active_state.bold  ? 'button clicked' : 'button'" id="bold" @click="select('bold')">
//                    <span class="material-symbols-outlined">format_bold</span>
//                    </div>
//                    <div :class=" active_state.italics  ? 'button clicked' : 'button'" id="italics" @click="select('italic')">
//                    <span class="material-symbols-outlined">format_italic</span>
//                    </div>
//                    <div :class=" active_state.underline  ? 'button clicked' : 'button'" id="underline" @click="select('underline')">
//                    <span class="material-symbols-outlined">format_underlined</span>
//                    </div>
//                    <div  class="file">
//                    <input type="file"  id="imag">
//                    <label for="imag">Upload</label>
//                    <span class="material-symbols-outlined">image</span>
//                    </div>
//                    <div  class="file">
//                    <label for="Color">Color</label>
//                    <input type="color"  id="Color" @change="select( $event.target.value,'forecolor','font')" >
//                    </div>
//                    <simple-dropdown-controller width='small_width'  :data="font_size" :name= "'FontSize'" :tag="'-'" @change_format="select"></simple-dropdown-controller>
//                    <simple-dropdown-controller width='normal_width' :data="font_family" :name= "'FontName'" :tag="'-'" @change_format="select"></simple-dropdown-controller>
//                    <simple-dropdown-controller width='normal_width' :data="heading" :name="'formatBlock'" :tag="'-'" @change_format="select" ></simple-dropdown-controller>
//                    <simple-dropdown-controller width='small_width'  :data="align"  :name="'align'" :tag="'span'" @change_format="select" ></simple-dropdown-controller>
//                    <simple-dropdown-controller width='small_width'  :data="texture" :tag="'image'" @change_background="change_back"></simple-dropdown-controller>
//                  </div> 
//                  <div id="texture-field" >
//                     <div id="word-pad" contenteditable="true" ref="content">
//                         <div class="line-content"> write something....</div>
//                     </div>
//                  </div>
//              </div>`,
//     data() {
//         return {
//             font_size: ["5", "1", "2", "3", "4", "6", "7", "8", "9"],
//             font_family: ["Arial",
//                 "Helvetica",
//                 "Times New Roman",
//                 "Georgia",
//                 "Courier New",
//                 "Verdana",
//                 "Tahoma",
//                 "Trebuchet MS",
//                 "Palatino Linotype",
//                 "Arial Black",
//                 "Comic Sans MS",
//                 "Impact",
//                 "Lucida Console",
//                 "Garamond",
//                 "Century Gothic",
//                 "Calibri",
//                 "Book Antiqua",
//                 "Franklin Gothic Medium",
//                 "Cambria",
//                 "Rockwell"],
//             heading: [
//                 "normal",
//                 "H1",
//                 "H2",
//                 "H3"
//             ],
//             align: [
//                 "format_align_justify",
//                 "format_align_left",
//                 "format_align_right",
//             ],
//             texture: [
//                 "texture51.jpg",
//                 "texture1.jpg",
//                 "texture6.avif",
//                 "texture2.jpg",
//                 "texture44.webp",
//                 "texture31.webp"
//             ],
//             default_state:{'bold':false,'italics':false,'underline':false,'size':5,'color':'#666','family':'sans-serif','align':'left'},
//             active_state:this.default_state,
//             start_line: {
//                 'b': 'bold',
//                 'i': 'italic',
//                 'u': 'underline',
//             }

//         }
//     },
//     mounted() {
//         console.log(this.active_state);
//         var editor = this.$refs.content;
//         editor.addEventListener('click', (e) => {
//             if (e.srcElement != this.$refs.content) {
//                 this.parent_element_style(e.srcElement, e);
//             }
//             else {
//                 var last_child = this.$refs.content.childNodes[this.$refs.content.childNodes.length - 1];
//                 this.traverse_element(last_child, false)
//             }
//         })
//         editor.addEventListener('keydown', (e) => {
//             if ((editor.innerHTML == '<div class="line-content"><br></div>') && e.key == 'Backspace') {
//                 e.preventDefault();
//             }
//         });
//     },
//     inject: ['print_hello'],
//     methods: {
//         select(data, value, font) {
//             if (this.$refs.content.innerHTML == '<div class="line-content"> write something....</div>') {

//             }
//             else {
//                 this.$emit('change_select', data);
//                 if (font) {
//                     document.execCommand(value, false, data);
//                     if (value == 'forecolor') {
//                         this.fontTag_to_spanTag('color')
//                     }
//                     else if (value == 'FontSize') {
//                         this.fontTag_to_spanTag('size');
//                     }
//                     else {
//                         this.fontTag_to_spanTag('face');
//                     }
//                 }
//                 else {
//                     value == undefined || value.startsWith('format') ? (document.execCommand(data, false, null),this.change_active[data]=!this.change_active[data],console.log('op')):
//                         (document.execCommand(value, false, data), console.log('yes'))
//                 }
//             }
           
//             this.$refs.content.focus();
//         },
//         get_html(data) {
//             this.$emit('change_select', data);
//         },
//         change_back(data) {
//             this.$refs.back_ground.style.backgroundImage = `url(${data})`
//         },
//         parent_element_style(element) {
//             if (!(element.getAttribute && element.getAttribute('class') == 'line-content')) {
//                 var h = element;
//                 var res = [];
//                 while (h.tagName.toLowerCase() != 'div') {
//                     if (h.tagName.toLowerCase() != 'span') {
//                         var style_name = this.start_line[h.tagName.toLowerCase()];
//                         this.change_active[style_name] = true;
//                     }
//                     else {

//                     }
//                     h = h.parentElement;
//                 }
//                 this.$emit('reset_active',this.change_active );
//             }
//             else {
//                 var sel = document.getSelection();
//                 var content_length = sel.anchorOffset;
//                 if (content_length <= 1) {
//                     this.traverse_element(element, true)
//                 }
//                 else if (sel.focusNode.parentElement == element) {
//                     this.remove_active();
//                 }
//                 else {
//                     this.traverse_element(element, false)
//                 }
//             }
//             console.log(this.change_active);
//         },
//         remove_active() {
//             this.$emit('remove_active', { 'bold': false, 'italics': false, 'underline': false, 'size': 5, 'color': '#666', 'family': 'sans-serif', 'align': 'left' });
//         },
//         traverse_element(element, forward) {
//             var child = element.childNodes[forward ? 0 : element.childNodes.length - 1];
//             while (child && child.tagName && child.tagName.toLowerCase() != 'br') {
//                 if (child.tagName.toLowerCase() != 'span') {
//                     var style_name = this.start_line[child.tagName.toLowerCase()];
//                     this.change_active[style_name] = true;
//                 }
//                 else {

//                 }
//                 child = child.childNodes[forward ? 0 : child.childNodes.length - 1];
//             }
//             this.$emit('reset_active',   this.change_active);
//         },
//         fontTag_to_spanTag(params) {
//             document.querySelectorAll("font").forEach(function (font) {
//                 var span = document.createElement("span");
//                 var attr = font.getAttribute(params);
//                 if (params == 'color') {
//                     span.style.color = attr;
//                 }
//                 else if (params == 'size') {
//                     span.style.fontSize = attr + 'pt';
//                 }
//                 else {
//                     span.style.fontFamily = attr;
//                 }
//                 while (font.firstChild) {
//                     span.appendChild(font.firstChild);
//                 }
//                 font.parentNode.insertBefore(span, font);
//                 font.parentNode.removeChild(font);
//             });
//         }
//     }
// }

// {/* <div :class=" active_state.includes('quotes')  ? 'button clicked' : 'button'" id="quotes" @click="get_html('quotes')">
// <span class="material-symbols-outlined">format_quote</span>
// </div> */}