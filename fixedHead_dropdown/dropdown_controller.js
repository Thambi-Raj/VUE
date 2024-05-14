var dropdown_controller = {
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
        `,
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
        id:{
            type:String
        },
        active:{
            type:String
        },
        default_selected:{
            type:String
        },
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
