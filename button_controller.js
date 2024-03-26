var button_controller = {
    template: `
        <div :class="active===id ? 'section clicked' : 'section' " :id ='id' > 
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
    methods: {
        button_clicked(name) {
            this.$emit('change_active',this.id);
        }
    }
}
