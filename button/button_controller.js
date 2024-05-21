var button_controller = {
    template: `
<<<<<<< HEAD
            <button-root 
            :button_name="button_name" 
            :icon_name="icon_name"
            @button_clicked="button_clicked" 
            :active="active"
            :root_ref="root_ref"
            :drop_down=show_drop>
            </button-root>
=======
        <div :class = "active === button_name ? 'active' : ' ' " :id ='id' > 
            <button-root :id ='id' :button_name="button_name" :icon_name="icon_name" @button_clicked="button_clicked" :drop_down=show_drop></button-root>
        </div>
>>>>>>> parent of ddd91e1 (for updating  before backup)
    `,
    props: {
        button_name: {
            type: String
        },
        icon_name: {
            type: String
        }
        ,
        active:{
            type:[String,Number]
        },
        root_ref:{
            type:Object
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
