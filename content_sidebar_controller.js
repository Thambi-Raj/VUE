const content_sidebar_controller ={
         template:`<contentSidebar-root  
                   :dropdown_selected="dropdown_selected" 
                   :dropdown_value="dropdown_value" :month ="month" @month_change="change_month" @back_page="back">
                   </contentSidebar-root>`,
         props:{
            dropdown_selected:{
                type:String,
            },
            dropdown_value:{
                type:String
            }
         },
         data(){
           return{
               month : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec'],
           }
         },
         created(){
            var cur = new Date().getFullYear();
            var mon=new Date().getMonth();
            this.month = cur == this.dropdown_selected.split('_')[1] ? this.month.slice(0,mon):['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec']; 
         },
         methods:{
          change_month(data){
            var cur = new Date().getFullYear();
            var mon=new Date().getMonth();
            this.month = cur == data ? this.month.slice(0,mon):['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec']; 
          },
          back(month,year){
               this.$emit('back',year,month);
          }
         }
}