const content_sidebar_controller = {
  template: `<contentSidebar-root  
                   :dropdown_selected="dropdown_selected" 
                   :dropdown_value="dropdown_value" 
                   :month_array ="month" 
                   :last_day="lastDay"
                   :total_favourite="total_favourite"
                   :default_date="default_date"
                   :root_ref="root_ref"
                   @year_change="change_year" 
                   @month_change="change_month"
                   @back_page="back"
                   @change_date="change_date"
                   @add_favourite="add_favourite"
                   >
                   </contentSidebar-root>`,
  props: {
    dropdown_selected: {
      type: String,
    },
    dropdown_value: {
      type: String
    },
    default_date: {
      type: Number
    },
    month: {
      type: Array
    },
    total_favourite: {
      type: Object
    },
    root_ref:{
      type:Object
  },
  },
  data() {
    return {
      lastDay: 0
    }
  },
  created() {
    var mon = 0;
    this.month.forEach((element, i) => {
      if (element.toLowerCase() == this.dropdown_value.toLowerCase()) {
        mon = i;
      }
    });
    this.lastDay = new Date(this.dropdown_selected.split('_')[1], mon + 1, 0).getDate();
  },
  updated() {
    var mon = 0;
    this.month.forEach((element, i) => {
      if (element.toLowerCase() == this.dropdown_value.toLowerCase()) {
        mon = i;
      }
    });
    this.lastDay = new Date(this.dropdown_selected.split('_')[1], mon + 1, 0).getDate();
  },
  methods: {
    change_year(data) {
      this.$emit('drop', data, 'calendar')
    },
    change_month(data) {
      this.$emit('drop1', data);
    },
    back(month, year, date) {
      this.$emit('back', year, month, date);
    },
    change_date(date) {
      this.$emit('change_default_date', date);
    },
    add_favourite(date) {
      this.$emit('add_fav', date)
    }
  },

}
