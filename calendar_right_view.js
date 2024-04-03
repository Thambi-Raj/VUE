const calendar_component = {
    template: `
    <div class="calendar-root">
        <div id="calendar-head">
            <div class="day-container" v-for="day in weeks" :key="day"><span>{{ day }}</span></div>
        </div> 
        <div id="calendar-body">
            <div v-for="rowIndex in 6" :key="rowIndex" :class="{'calendar-body-row':true, 'hide': rowIndex == 6 && classFlag === 0  ,
             'change-height': classFlag === 1 }" >
                <div v-for="dayIndex in 7" :key="dayIndex" 
                     :class="{ 'date-container': true  , 'disable':( (rowIndex-1) * 7 + dayIndex - first_day <= 0)||  (rowIndex-1) * 7 + dayIndex - first_day > total_days}" @click="page_change">
                     <span class="date">{{ (rowIndex-1) * 7 + dayIndex - first_day }}</span>
                   
                </div>
            </div>
        </div>
    </div>
`,
    data() {
        return {
            weeks: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            first_day: 1,
            total_days: 0,
            classFlag: 0,
            id_map:this.$root.$data.id_map
        }
    },
    props: {
        year: {
            type: String
        },
        month: {
            type: String
        },
    },
    created(){
        this.set_config_data();
    },
    updated() {
        this.set_config_data();
    },
    methods: {
        set_config_data() {
            var year = this.id_map[this.year];
            var mon = this.month.toUpperCase() == 'JAN' ? [year - 1, 12] : [year,this.months.indexOf(this.month.toUpperCase())];
            var day = new Date(mon[0],mon[1], 0);  //new Date(this.year,0, 0);
            this.first_day = day.getDay() == 6 ? 0 : day.getDay() + 1;
            this.total_days = new Date(year,mon[1]+1,0).getDate();
            this.classFlag = this.first_day > 4 && this.total_days==31 ? 1 :0;
        },
        page_change(){
            this.$emit('page_change');
        }
        
    }
}
