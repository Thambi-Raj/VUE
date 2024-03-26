const app = Vue.createApp({
    data(){
        return {
            'selected':'pppp'
        }
    }
});
app.component('dropdown-root',dropdown_component);
app.component('dropdown-controller',dropdown_controller);
app.component('button-root',button_component);
app.component('button-controller',button_controller);
app.component('search-btn-root',search_button_component);
app.component('search-btn-controller',search_button_controller);
app.component('calendar-sidebar-root',calendar_sidebar_component);
app.component('calendar-sidebar-controller',calendar_sidebar_controller);
app.mount('#content');