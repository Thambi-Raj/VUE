const simple_dropdown_component = {
    template: `<div class="drop-down-root">
                <div id="drop-down-head" @click="show_drop" :class="width" ref="dropdown">
                    <span :class="{ 'material-symbols-outlined': tag === 'span' }" v-if="tag !== 'image'" >{{default_val}}</span>
                    <img v-else :src="selected_value" width="20px" height="20px">
                    <span class="material-symbols-outlined">arrow_drop_down</span>
                </div>
                <div id="option" v-if="dropdown_visible" @mouseleave="hide_drop()" :class="width">
                    <span v-for="element in data" @click="change_drop(element,name)" :class="{ 'clicked': element === selected_value, 'material-symbols-outlined': tag === 'span' }" v-if="tag !== 'image'">
                        {{element}}
                    </span>
                    <img v-else v-for="element in data" :src="element" width="20px" height="20px"  @click="change_drop(element,'back_ground')">
                </div>
            </div>`,
    props: {
        selected_value: { type: String },
        data: { type: Array },
        width: { type: String },
        tag: { type: String },
        name:{type:String},
        default_val:{type:String}
    },
    data() {
        return {
            dropdown_visible: false,
            align_data:
                {"format_align_justify":"JustifyCenter",
                "format_align_left":"JustifyLeft",
                "format_align_right":"JustifyRight"},
            };
    },
    methods: {
        show_drop() {
            this.dropdown_visible = true;
        },
        change_drop(data,back) {
            this.dropdown_visible = false;
            back!='align'?this.$emit('change_dropdown_value', data,back):
                          this.$emit('change_dropdown_value', this.align_data[data],data);
        },
        hide_drop() {
            this.dropdown_visible = false;
        }
    },
    mounted() {
        window.addEventListener('click', (event) =>{
            if (this.$refs.dropdown &&  !this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
            }
        });
    },
    destroyed() {
        window.removeEventListener('click', (event) =>{
            if (!this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
            }
        });
    },
};
