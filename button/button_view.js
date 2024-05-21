var button_component = {
<<<<<<< HEAD
    template:`<div class="button-root">
                <div class="button" :class="{ active: active === icon_name }" @click="button_clicked">
                    <span class="material-symbols-outlined" v-if="icon_name">{{ icon_name }}</span>
                    <span>{{ button_name }}</span>
               </div>
              </div>`,
=======
    template:`<div  class="button_root" @click = button_clicked()>
    <span class="material-symbols-outlined " v-show = icon_name >{{icon_name}}</span>
    <span>{{button_name}}</span>
    </div>`,
>>>>>>> parent of ddd91e1 (for updating  before backup)
    props:{
        button_name:{
            type : String
        },
        icon_name:{
            type:String
        },
<<<<<<< HEAD
        active:{
            type:[String,Number]
        },
        root_ref:{
            type:Object
        }
=======
>>>>>>> parent of ddd91e1 (for updating  before backup)
    },
    emits:['button_clicked'],
    methods:{
        button_clicked(){
<<<<<<< HEAD
            this.root_ref.eventbus.change_right_template('container')
            this.root_ref.eventbus.change_head(this.icon_name);
=======
            this.$emit('button_clicked','button',this.button_name);
>>>>>>> parent of ddd91e1 (for updating  before backup)
        }
    }
    
}
