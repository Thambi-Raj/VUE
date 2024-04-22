const content_sidebar_controller = {
         template:`<contentSidebar-root  
                   :dropdown_selected="dropdown_selected" 
                   :dropdown_value="dropdown_value" :month_array ="month" 
                   :last_day="lastDay"
                   @year_change="change_year" 
                   @month_change="change_month"
                   @back_page="back"
                   @change_date="change_date"
                   >
                   </contentSidebar-root>`,
         props:{
            dropdown_selected:{
                type:String,
            },
            dropdown_value:{
                type:String
            },
            month:{
                type:Array
            }
         },
         data(){
           return{
               lastDay:0
           }
         },
          created(){
            var mon=0;
            this.month.forEach((element,i) => {
                if(element.toLowerCase() == this.dropdown_value.toLowerCase()){
                    mon =i;
                }
            });
            this.lastDay = new Date(this.dropdown_selected.split('_')[1], mon + 1, 0).getDate();
        },
        updated(){
          var mon=0;
          this.month.forEach((element,i) => {
              if(element.toLowerCase() == this.dropdown_value.toLowerCase()){
                  mon =i;
              }
          });
          this.lastDay = new Date(this.dropdown_selected.split('_')[1], mon + 1, 0).getDate();
        },
         methods:{
          change_year(data){
            this.$emit('drop',data,'calendar')
          },
          change_month(data){
            this.$emit('drop1',data);
          },
          back(month,year,date){
               this.$emit('back',year,month,date);
          },
          change_date(date){
            this.$emit('change_date',date)
          }
         }
}
 