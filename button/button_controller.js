var button_controller = {
    template: `
        <div :class = "active === button_name ? 'active' : ' ' " :id ='id' > 
            <button-root :id ='id' :button_name="button_name" :icon_name="icon_name" @button_clicked="button_clicked" :drop_down=show_drop></button-root>
        </div>
    `,
    props: {
        button_name: {
            type: String
        },
        icon_name: {
            type: String
        }
        ,id:{
            type:String
        },
        active:{
            type:String
        }
    },
    data() {
        return {
            show_drop:this.active ===this.id
        }
    },
    emits:['change_active'],
    methods: {
        button_clicked(template,name) {
           
            this.$emit('change_active',name,template);
        }
    }
}
