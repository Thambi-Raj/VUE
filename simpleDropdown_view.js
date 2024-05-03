const simple_dropdown_component = {
    template: `<div class="drop-down-root">
                <div id="drop-down-head" @click="show_drop" :class="width" ref="dropdown">
                    <span :class="{ 'material-symbols-outlined': tag === 'span' }" v-if="tag !== 'image'" >{{selected_value}}</span>
                    <img v-else :src="selected_value" class="drop-down-image" >
                    <span class="material-symbols-outlined">arrow_drop_down</span>
                </div>
                <div id="option" v-if="dropdown_visible"  :class="width">
                    <span v-for="element in data" @click="change_drop(element,name)" :class="{ 'clicked': element === selected_value, 'material-symbols-outlined': tag === 'span' }" v-if="tag !== 'image'">
                        {{element}}
                    </span>
                    <img v-else v-for="element in data" :src="element" class="drop-down-image"  @click="change_drop(element,'back_ground')">
                </div>
            </div>`,
    props: {
        selected_value: { type:[String,Number]},
        data: { type: Array },
        width: { type: String },
        tag: { type: String },
        name:{type:String},
        default_val:{type:[String,Number]}
    },
    watch:{
        selected_value(){
            console.log(this.selected_value);
        }
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
