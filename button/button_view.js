var button_component = {
    template:`<div class="button-root">
                <div class="button" :class="{ active: active === button_name }" @click="button_clicked">
                    <span class="material-symbols-outlined" v-if="icon_name">{{ icon_name }}</span>
                    <span>{{ button_name }}</span>
               </div>
              </div>`,
    props:{
        button_name:{
            type : String
        },
        icon_name:{
            type:String
        },
        active:{
            type:String
        }
    },
    emits:['button_clicked'],
    methods:{
        button_clicked(){
            console.log(this.$root);
            // emitter.emit('change',this.icon_name)
            this.$emit('button_clicked','button',this.icon_name);
        }
    }
    
}
