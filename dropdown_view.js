
var dropdown_component = {
    template:`
    <div class="dropdown_root">
        <div id="dropdown_head" @click = change_activestate :class="active == id ? 'active' : '' ">
            <span :class = "first_icon ?'material-symbols-outlined':'hide'">{{first_icon}}</span>
            <span>{{title}}</span>
            <span class="material-symbols-outlined drop_down"> arrow_drop_down </span>
        </div>
        <div id="dropdown_body" :class="active ? active !== id ? 'hide':'':''" ref="dropdown">
            <div class="dropdown-item" v-for="value in data" :class="{ selected : value === default_selected}" @click="change_value(value)">{{value}}</div>
        </div>
    </div>`,
    props:{
        default_selected:{
            type: String,
        },
        data:{
            type: Array,
        },
        title:{
            type:String,
        },
        first_icon:{
            type:String
        },
        drop_down:{
            type:Boolean
        },
        active:{
            type:String
        },
        id:{
            type:String
        }
    },
    emits:['change_value','change_activestate'],
    data(){
        return {
            selected: this.default_selected
        }
    },

    methods:{
        change_value(value){
            this.selected = value;
            this.show_drop = false; 
            this.$emit('change_value',this.selected);
        },
        change_activestate(){
            this.$emit('change_activestate',this.id);
        }
    }
}
