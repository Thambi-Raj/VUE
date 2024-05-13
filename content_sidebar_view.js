const content_sidebar_component = {
    template: `<div class="content-sidebar">
                    <div id="head"> 
                        <span class="material-symbols-outlined" @click="back">logout</span>
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="dropdown_value" :data="month_array" :name="'month'" :tag="'-'" @change_format="change_drop"></simple-dropdown-controller>
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="year2" :data="year" :name="'year'" :tag="'-'" @change_format="change_drop"></simple-dropdown-controller>
                    </div>
                    <div id="body" ref="scroll_container">
                        <div id="day-container" v-for="date in last_day" :key="date" :class="{ active: date === this.$root.default_date }" >
                        <preview-controller 
                            :year="dropdown_selected"
                            :month="dropdown_value"
                            :favourite_data="total_favourite"
                            :data="data[date]"
                            :date="date"
                            :show_date="true"
                            :favourite_access="true"
                            @add_to_favourite="add_fav"
                            @change_default_date="change_date">
                        </preview-controller>
                        
                        </div>
                    </div>
                </div>`
,
    props: {
        dropdown_selected: {
            type: String,
        },
        dropdown_value: {
            type: String
        },
        month_array: {
            type: Array
        },
        last_day: {
            type: Number
        },
        data:{
            type:Object
        },
        total_favourite:{
            type:Object
        }
    },
    mounted() {
        var container_Rect = this.$refs.scroll_container.children[this.$root.default_date - 1]
        var scrolltop = container_Rect.clientHeight * (this.$root.default_date - 1);
        this.$refs.scroll_container.scrollTop = scrolltop;
        this.get_favourite()
    },
    data() {
        return {
            year: [2023, 2024],
            month_drop: false,
            year_drop: false,
            year2: this.dropdown_selected.split('_')[1],
            favourite:''
        }
    },
    methods: {
        add_hover_class(e){
              e.srcElement.classList.remove('default_class');
              e.srcElement.classList.add('hover')
        },
        remove_hover_class(e){
            e.srcElement.classList.remove('hover')
            e.srcElement.classList.add('default_class');

        },
        check_data(data,date){
            if(data){
                if(this.favourite[this.dropdown_selected] &&  this.favourite[this.dropdown_selected][this.dropdown_value] &&  this.favourite[this.dropdown_selected][this.dropdown_value][date]){
                    return true
                }
            }
            return false;
        },
        get_favourite(){
           this.favourite = JSON.parse(localStorage.getItem('Favourite')) || {}
        },
        change_drop(index) {
            typeof index == "string" ? (this.month_drop = false, this.$emit('month_change', index))
                : (this.year_drop = false, this.year2 = index, this.$emit('year_change', 'year_' + this.year2));
        },
        back() {
            this.$emit('back_page', this.dropdown_value, ('year_' + this.year2), 1);
        },
        add_fav(date){
            this.$emit('add_favourite',date);
        },
        change_date(date){
            this.$emit('change_date',date)
        }
    }
}


{/* <div id="drop-down">
<div id="drop-down-head" @click="show_drop('b')">
   <span>{{year2}}</span>
   <span class="material-symbols-outlined" >arrow_drop_down</span>
</div>
<div id="option" v-show="year_drop">
   <span v-for = "yea in year" @click = "change_drop(1,yea)">
       {{yea}}
   </span>
</div>
</div> */}