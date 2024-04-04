const editor_component = {
    template: `<div class="editor-root">
                 <div id="editor-tool">
                   <div :class="  active.includes('bold')  ? 'button clicked' : 'button'" id="bold" @click="select('bold')">
                   <span class="material-symbols-outlined">format_bold</span>
                   </div>
                   <div :class=" active.includes('italic')  ? 'button clicked' : 'button'" id="italics" @click="select('italic')">
                   <span class="material-symbols-outlined">format_italic</span>
                   </div>
                   <div :class=" active.includes('underline')  ? 'button clicked' : 'button'" id="underline" @click="select('underline')">
                   <span class="material-symbols-outlined">format_underlined</span>
                   </div>
                   <div :class=" active.includes('quotes')  ? 'button clicked' : 'button'" id="quotes" @click="get_html('quotes')">
                   <span class="material-symbols-outlined">format_quote</span>
                   </div>
                   <div  class="file">
                   <input type="file"  id="imag">
                   <label for="imag">Upload</label>
                   <span class="material-symbols-outlined">image</span>
                   </div>
                   <div  class="file">
                   <label for="Color">Color</label>
                   <input type="color"  id="Color">
                   </div>
                   <simple-dropdown-controller width='small_width'  :data="font_size" :tag="'-'" ></simple-dropdown-controller>
                   <simple-dropdown-controller width='normal_width' :data="font_family" :tag="'-'" ></simple-dropdown-controller>
                   <simple-dropdown-controller width='normal_width' :data="heading" :tag="'-'"></simple-dropdown-controller>
                   <simple-dropdown-controller width='small_width'  :data="align" :tag="'span'"></simple-dropdown-controller>
                   <simple-dropdown-controller width='small_width'  :data="texture" :tag="'image'" @change_background="change_back"></simple-dropdown-controller>
                 </div> 
                 <div id="texture-field" ref="back_ground">
                    <div id="word-pad" contenteditable="true">
                      
                    </div>
                 </div>
             </div>`,
    props: {
        active: {
            type: Array
        }
    },
    data(){
        return{
            font_size:["5","1","2","3","4","6","7","8","9"],
            font_family:["Arial",
            "Helvetica",
            "Times New Roman",
            "Georgia",
            "Courier New",
            "Verdana",
            "Tahoma",
            "Trebuchet MS",
            "Palatino Linotype",
            "Arial Black",
            "Comic Sans MS",
            "Impact",
            "Lucida Console",
            "Garamond",
            "Century Gothic",
            "Calibri",
            "Book Antiqua",
            "Franklin Gothic Medium",
            "Cambria",
            "Rockwell"],
            heading:[
                "Normal",
                "Heading 1",
                "Heading 2",
                "Heading 3"
            ],
            align:[
                "format_align_justify",
                "format_align_left",
                "format_align_right",
            ],
            texture:[
                "texture51.jpg",
                "texture1.jpg",
                "texture6.avif",
                "texture2.jpg",
                "texture44.webp",
                "texture31.webp"
            ]
        }
    },
    inject: ['print_hello'],
    methods: {
        select(data) {
            this.$emit('change_select', data);
            document.execCommand(data, false, null);
        },
        get_html(data){
            this.$emit('change_select', data);
        },
        callPrintHello() {
            if (this.print_hello) {
                this.print_hello('year_2023');
            }
        },
        change_back(data){
          console.log(data);
          this.$refs.back_ground.style.backgroundImage = `url(${data})`
        }
    }
}
