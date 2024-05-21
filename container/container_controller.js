const container_controller = {
    template:   `<container-root 
                     :name = name 
                     :span=span 
                     :container_data=favourite_data 
                     :root_ref=root_ref
                     @change_left_pane="change_left_pane"
                     ></container-root>`,
    props:{
     name:{
        type:String,
     },
     span:{
        type:String
     },
     favourite_data:{
      type:Array
     },
     root_ref:{
      type:Object
     }
    },
    emits:['change_left_pane'],
    methods:{
      change_left_pane(year,month,date){
         
         this.$emit('change_left_pane',year,month,date);
      }
    },
    mounted(){
      console.log('aaa');
    }

}