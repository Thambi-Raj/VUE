const container_component = {
    template: `<div id="container-root" v-if="preview"> 
                    <div id="container-head">
                           <span class="material-symbols-outlined">{{span}}</span>
                           <span id="text">{{name}}</span>
                    </div>
                    <div id="container-body">
                         <div  v-for="(item, index) in container_data" :key="index">
                           <div id="main_container" v-for="(value, key) in item" :key="key">
                                <div id="head">
                                 <span>{{key}}</span>
                                </div>
                                <div id="content">
                                  <div id="sub_container" v-for="val in value" :key="val" @click="get_key_for_data(key, val,'click')">
                                     <div id="first_div">
                                     <editor-controller  :data="get_key_for_data(key, val)" 
                                     :preview="false">
                                     </editor-controller>
                                     <span id="date">{{val}}</span>
                                     </div>
                                  </div>
                                </div>
                           </div>
                         </div>
                    </div>
              </div>`
        ,
    props: {
        name: {
            type: String
        },
        span: {
            type: String
        },
        container_data: {
            type: Array
        },
    },
    data() {
        return {
            content: {},
            preview:true
        }
    },
    created() {
        this.content = JSON.parse(localStorage.getItem('Data')) || {};
    },
    methods: {
        get_key_for_data(key, date,click) {
            var year = "year_" + key.split('_')[1];
            var month = key.split('_')[0].toLowerCase();
            month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
            click ?(this.$emit('change_left_pane',year,month,date)):'';
            return this.content[year][month][date];
        }
    }
}
