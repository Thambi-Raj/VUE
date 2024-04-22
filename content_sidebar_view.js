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
                    <div id="body" ref="scroll_container">
                        <div id = "day-container" v-for="date in last_day" :class="{ active: date === this.$root.default_date }" >
                            <div id="content" @click="change_date(date)">
                              <div id="first">
                                   <span>{{date}}</span>
                                   <br>
                                   <span>{{dropdown_value}}</span>
                              </div>
                              <div id="second">
                              <span>no-content</span> 
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
        month_array:{
            type:Array
        },
        last_day:{
            type:Number
        }
    },
    mounted(){
       var div_position = this.$refs.scroll_container.children[this.$root.default_date-1].getBoundingClientRect();
       var scroll_y = div_position.y;
       this.$refs.scroll_container.scrollTop = scroll_y - div_position.height 
    },
    data() {
        return {
            year: [2023, 2024],
            month_drop:false,
            year_drop:false,
            year2:this.dropdown_selected.split('_')[1]
        }
    },
    methods: {
       show_drop(name){
        name =='a' ? this.month_drop = !this.month_drop : this.year_drop =!this.year_drop;
       },
       hide_drop(name){
         name =='a' ? this.month_drop = false : this.year_drop =false;
       },
       change_drop(index,name){
         index == 0 ? (this.month_drop = false, this.$emit('month_change',name))
                    : (this.year_drop = false , this.year2=name,this.$emit('year_change','year_'+this.year2));
       },
       back(){
           this.$emit('back_page',this.dropdown_value,('year_'+this.year2),1);
       },
       change_date(date){
        console.log(date);
          this.$emit('change_date',date);
       }
    }
}