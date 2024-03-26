const diary_component = {
    template: `
        <div id="left-container-root">
            <sidebar-controller 
                :dropdown_selected=dropdown_selected 
                :dropdown_value=dropdown_value>
            </sidebar-controller>
        </div>
        <div id="right-container-root">
            <calendar-root 
                :month=dropdown_value
                :year =dropdown_selected >
            </calendar-root>
        </div>
    `,
    props:{
        dropdown_value:{
            type:String
        },
        dropdown_selected :{
            type:String
        }
    },
    data() {
        return {
            id_map:this.$root.$data.id_map
       }
    },
    mounted(){
        this.$root.$on('op',()=>{
            console.log('opopop');
        })
    }


}
