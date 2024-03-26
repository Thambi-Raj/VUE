const sidebar_component = {

    template: ` <dropdown-controller :id='"year_2024"' :first_icon ='"clinical_notes "' :title='"2024"' :default_selected='dropdown_value1' :data="['Jan','Feb','Mar','Apr','May']" @change_active = change_activestate :active = active></dropdown-controller>
    <dropdown-controller :id='"year_2023"' :first_icon ='"clinical_notes "' :title='"2023"'  :default_selected='dropdown_value2' :data="['Jan','Feb','Mar','Apr','May']" @change_active = change_activestate :active = active></dropdown-controller>
    <button-controller :id='"favourite"' :button_name="'Favourite'" :icon_name='"favorite"' @change_active = change_activestate :active = 'active'></button-controller>
    <search-btn-controller :id='"mention"' :button_name="'Mentions'" :icon_name='"alternate_email"' @change_active = change_activestate :active = 'active'></search-btn-controller>
    <button-controller :id='"bookmark"' :button_name="'Bookmarks'" :icon_name='"bookmarks"' @change_active = change_activestate :active = 'active'></button-controller> `,
    props: {
    },
    data() {
        return {
            active : "year_2024",
            dropdown_value1:'Apr',
            dropdown_value2:'Jan',
        }
    },
    methods: {
        change_activestate(data){
            this.active = data;

        }

    }
}