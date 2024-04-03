const content_sidebar_component = {
    template: `<div class="content-sidebar">
                     <div id="head"> 
                         <span class="material-symbols-outlined" @click="back">logout</span>
                         <div id="drop-down" @click="show_drop('a')" @mouseleave = "hide_drop('a')">
                             <div id="drop-down-head">
                                <span>{{month1}}</span>
                                <span class="material-symbols-outlined" >arrow_drop_down</span>
                            </div>
                            <div id="option" v-if="month_drop">
                                <span v-for = "mon in month" @click = "change_drop(0,mon)">
                                    {{mon}}
                                </span>
                            </div>
                        </div>
                        <div id="drop-down" @click="show_drop('b')"  @mouseleave ="hide_drop('b')">
                             <div id="drop-down-head">
                                <span>{{year2}}</span>
                                <span class="material-symbols-outlined" >arrow_drop_down</span>
                            </div>
                            <div id="option" v-if="year_drop">
                                <span v-for = "yea in year" @click = "change_drop(1,yea)">
                                    {{yea}}
                                </span>
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
        month:{
            type:Array
        }
    },
    data() {
        return {
            year: [2023, 2024],
            month_drop:false,
            year_drop:false,
            month1: this.dropdown_value,
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
         index == 0 ? (this.month_drop = false, this.month1=name,console.log(this.month_drop ))
                    : (this.year_drop = false , this.year2=name,this.$emit('month_change',name));
       },
       back(){
           this.$emit('back_page',this.month1,('year_'+this.year2));
       }
    }
}