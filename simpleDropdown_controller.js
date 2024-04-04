const simple_dropdown_controller={
    template:
    ` <simple-dropdown-root
      :selected_value ="selected_value"
      :data="data"
      :width="width"
      :tag="tag"
      @change_dropdown_value="change_drop"
      >
     </simple-dropdown-root>`,
     data(){
        return{
          selected_value:this.data[0] 
        }
     },
     props:{
        width:{
            type:String
        },
        data:{
            type:Array
        },
        tag:{
            type:String
        }
     },
     methods:{
        change_drop(data,background){
            this.selected_value = data;
            background ? this.$emit('change_background',data):'';
        }
     }
     
}