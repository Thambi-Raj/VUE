const diary_content = {
    template: `<div id="diaryContent-side-bar">
          <div id="section-head">
          <dropdown-controller :id='"month"' :first_icon ='"logout"' :title='default_month'  :default_selected='default_month' :data="month_data:"></dropdown-controller>
          </div>
          </div>`,
    props: {
        default_month: {
            type: String
        },
        default_year: {
            type: String
        },
        month_data: {

        },
        year_data: {
            
        }
    }
}