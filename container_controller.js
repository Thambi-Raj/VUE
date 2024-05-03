const container_controller = {
    template:   `<container-root :name = name :span=span :container_data=container_data></container-root>`,
    props:{
     name:{
        type:String,
     },
     span:{
        type:String
     },
     container_data:{
        type:Array
     },
    },
    emits:[],
    methods:{

    },
    mounted(){
      console.log('aaa');
    }
}