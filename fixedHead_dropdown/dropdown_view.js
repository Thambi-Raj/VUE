
var dropdown_component = {
    template:`
    <div class="dropdown_root" >
        <div id="dropdown_head" @click = change_activestate :class="active == id ? 'active' : '' " ref="dropdown">
            <span :class = "first_icon ?'material-symbols-outlined':'hide'">{{first_icon}}</span>
            <span>{{name}}</span>
            <span class="material-symbols-outlined drop_down"> {{dropdown_icon}} </span>
        </div>
        <div id="dropdown_body" :class="active ? active !== id ? 'hide':'':''" ref="dropdown" v-if="show_dropdown">
            <div class="dropdown-item" v-for="value in  dropdown_data" :class="{ selected : value === default_selected}" @click="change_value(value)">{{value}}</div>
        </div>
    </div>`,
    props:{
        default_selected:{
            type: String,
        },
        dropdown_data:{
            type: Array,
        },
        name:{
            type:String,
        },
        first_icon:{
            type:String
        },
        active:{
            type:String
        },
        id:{
            type:String
        },
    },
    emits:['change_value','change_activestate'],
    data(){
        return {
            selected: this.default_selected,
            show_dropdown:true,
            dropdown_icon:this.active ==this.id ? "arrow_drop_up":'arrow_drop_down',
        }
    },
    watch:{
        active(){
            if(this.id == this.active){
                this.dropdown_icon =  "arrow_drop_up";
                this.show_dropdown = true;
            }
            else{
                this.dropdown_icon =  "arrow_drop_down";
            }
        }
    },
    methods:{
        change_value(value){
            this.selected = value;
            this.$emit('change_value',this.selected);
        },
        change_activestate(){
            this.$emit('change_activestate',this.id);
            this.show_dropdown = !this.show_dropdown;
            this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
        }
    }
}
