var dropdown_controller = {
<<<<<<< HEAD
    template: `<div :class="active == name ? 'section clicked' : 'section' "  > 
                    <dropdown-root  
                        :icon=icon 
                        :name='name'
                        :default_selected='default_selected'
                        :dropdown_data=" dropdown_data"
                        :active ='active' 
                        :root_ref="root_ref"
                        @change_value = change_value
                        @change_activestate=change_activestate>
                    </dropdown-root>
               </div>
=======
    template: `<div :class="active == id ? 'section clicked' : 'section' " :id ='id' > 
        <dropdown-root  :first_icon='first_icon' 
        :title='title'
        :default_selected='default_selected'
        :data="data"
        :active ='active' 
        :id='id'
        @change_value = change_value
        @change_activestate=change_activestate>
        </dropdown-root>
        </div>
>>>>>>> parent of ddd91e1 (for updating  before backup)
        `,
    props:{
        default_selected:{
            type: String,
        },
        data:{
            type: Array,
        },
<<<<<<< HEAD
        name:{
            type:[String,Number],
=======
        title:{
            type:String,
>>>>>>> parent of ddd91e1 (for updating  before backup)
        },
        icon:{
            type:String
        },
<<<<<<< HEAD
=======
        id:{
            type:String
        },
>>>>>>> parent of ddd91e1 (for updating  before backup)
        active:{
            type:[String,Number]
        },
        default_selected:{
            type:String
        },
        root_ref:{
            type:Object
        }
    },
    emits:['change_value','change_active'],
    methods: {
        change_value(data){
            this.$emit('change_value',data);
        },
        change_activestate(data){
            this.$emit('change_active',data,'calendar');
        }
    }           
}
