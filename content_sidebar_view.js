const content_sidebar_component = {
    template: `<div class="content-sidebar">
                     <div id="head"> 
                         <span class="material-symbols-outlined" @click="back">logout</span>
                         <div id="drop-down" >
                             <div id="drop-down-head" @click="show_drop('a')">
                                <span>{{dropdown_value}}</span>
                                <span class="material-symbols-outlined" >arrow_drop_down</span>
                            </div>
                            <div id="option" v-if="month_drop"  @mouseout = "hide_drop('a')">
                                <span v-for = "mon in month_array" @click = "change_drop(0,mon)">
                                    {{mon}}
                                </span>
                            </div>
                        </div>
                        <div id="drop-down">
                             <div id="drop-down-head" @click="show_drop('b')">
                                <span>{{year2}}</span>
                                <span class="material-symbols-outlined" >arrow_drop_down</span>
                            </div>
                            <div id="option" v-show="year_drop">
                                <span v-for = "yea in year" @click = "change_drop(1,yea)">
                                    {{yea}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="body" ref="scroll_container" >
                        <div id = "day-container" v-for="date in last_day" :class="{ active: date === this.$root.default_date }" >
                            <div id="content" @click="change_date(date)" >
                              <div id="first">
                                   <span>{{date}}</span>
                                   <br>
                                   <span>{{dropdown_value}}</span>
                              </div>
                              <div id="second" >
                              <editor-root  :default_date="date" ></editor-root>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    props: {
        dropdown_selected: {
            type: String,
        },
        dropdown_value: {
            type: String
        },
        month_array: {
            type: Array
        },
        last_day: {
            type: Number
        }
    },
    mounted() {
        var div_position = this.$refs.scroll_container.children[this.$root.default_date - 1].getBoundingClientRect();
        var scroll_y = div_position.y;
        this.$refs.scroll_container.scrollTop = scroll_y - div_position.height;
        this.show_preview();
    },
    data() {
        return {
            year: [2023, 2024],
            month_drop: false,
            year_drop: false,
            year2: this.dropdown_selected.split('_')[1]
        }
    },
    methods: {
        show_drop(name) {
            name == 'a' ? this.month_drop = !this.month_drop : this.year_drop = !this.year_drop;
        },
        hide_drop(name) {
            name == 'a' ? this.month_drop = false : this.year_drop = false;
        },
        change_drop(index, name) {
            index == 0 ? (this.month_drop = false, this.$emit('month_change', name))
                : (this.year_drop = false, this.year2 = name, this.$emit('year_change', 'year_' + this.year2));
        },
        back() {
            this.$emit('back_page', this.dropdown_value, ('year_' + this.year2), 1);
        },
        change_date(date) {
            this.$emit('change_date', date);
        },
        show_preview() {
            var preview_container = this.$refs.scroll_container;
            var editor_tools = preview_container.querySelectorAll('#day-container>#content>#second>.editor-root>#editor-tool');
            editor_tools.forEach(element => {
                element.remove();
            });        
            var texture_fields = preview_container.querySelectorAll('#day-container>#content>#second>.editor-root>#texture-field');
            texture_fields.forEach(element => {
                element.classList.add('preview');
                var note_pad = element.querySelector('#word-pad')
                note_pad.contentEditable = false;
                 if(note_pad.innerHTML=='<div class="line-content"></div>' && element.querySelector('#imageContainer').innerHTML ==''){
                    element.parentElement.classList.add('hide');
                    element.parentElement.parentElement.innerHTML =  'no-content'
                 }
                 element.querySelector('#imageContainer').classList.add('hide')
            });

        }
    }
}