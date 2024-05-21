
var dropdown_component = {
    template:`
<<<<<<< HEAD
    <div class="dropdown_root" >
        <div id="dropdown_head" @click = change_activestate :class="active == name ? 'active' : '' " ref="dropdown">
            <span :class = "icon ?'material-symbols-outlined':'hide'">{{icon}}</span>
            <span>{{name}}</span>
            <span class="material-symbols-outlined drop_down"> {{dropdown_icon}} </span>
        </div>
        <div id="dropdown_body" :class="active ? active != name ? 'hide':'':''" ref="dropdown" v-if="show_dropdown">
            <div class="dropdown-item" v-for="value in  dropdown_data" :class="{ selected : value === default_selected}" @click="change_value(value)">{{value}}</div>
=======
    <div class="dropdown_root">
        <div id="dropdown_head" @click = change_activestate :class="active == id ? 'active' : '' ">
            <span :class = "first_icon ?'material-symbols-outlined':'hide'">{{first_icon}}</span>
            <span>{{title}}</span>
            <span class="material-symbols-outlined drop_down"> arrow_drop_down </span>
        </div>
        <div id="dropdown_body" :class="active ? active !== id ? 'hide':'':''" ref="dropdown" >
            <div class="dropdown-item" v-for="value in data" :class="{ selected : value === default_selected}" @click="change_value(value)">{{value}}</div>
>>>>>>> parent of ddd91e1 (for updating  before backup)
        </div>
    </div>`,
    props:{
        default_selected:{
            type: [Number,String]  ,
        },
        data:{
            type: Array,
        },
<<<<<<< HEAD
        name:{
            type:[Number,String],
=======
        title:{
            type:String,
>>>>>>> parent of ddd91e1 (for updating  before backup)
        },
        icon:{
            type:String
        },
        drop_down:{
            type:Boolean
        },
        active:{
            type:[String,Number]
        },
        root_ref:{
            type:Object
        }
    },
    emits:['change_value','change_activestate'],
    data(){
        return {
            selected: this.default_selected,
<<<<<<< HEAD
            show_dropdown:true,
            dropdown_icon:this.active  == this.id ? "arrow_drop_up":'arrow_drop_down',
        }
    },
    watch:{
        active(){
            if(this.name == this.active){
                this.dropdown_icon =  "arrow_drop_up";
                this.show_dropdown = true;
            }
            else{
                this.dropdown_icon =  "arrow_drop_down";
            }
=======
            show_dropdown:true
>>>>>>> parent of ddd91e1 (for updating  before backup)
        }
    },
    methods:{
        change_value(value){
            this.selected = value;
            this.root_ref.eventbus.change_value(value);
            // this.$emit('change_value',this.selected);
        },
        change_activestate(){
<<<<<<< HEAD
            // this.$emit('change_activestate',this.id);
            this.root_ref.eventbus.change_head(this.name);
            this.root_ref.eventbus.change_value(this.dropdown_data[0]);
            this.root_ref.eventbus.change_right_template('calendar');
            this.root_ref.eventbus.get_dropdown_values(this.name);
            this.show_dropdown = !this.show_dropdown;
            this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
=======
            this.$emit('change_activestate',this.id);
            this.show_dropdown = !this.show_dropdown
>>>>>>> parent of ddd91e1 (for updating  before backup)
        }
    }
}
