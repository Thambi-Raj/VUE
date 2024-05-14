var button_component = {
    template:`<div  class="button_root" @click = button_clicked()>
    <span class="material-symbols-outlined " v-show = icon_name >{{icon_name}}</span>
    <span>{{button_name}}</span>
    </div>`,
    props:{
        button_name:{
            type : String
        },
        icon_name:{
            type:String
        },
    },
    emits:['button_clicked'],
    methods:{
        button_clicked(){
            this.$emit('button_clicked','button',this.button_name);
        }
    }
    
}