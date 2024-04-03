const container_component = {
    template: `<div id="container-root"> 
                    <div id="container-head">
                           <span class="material-symbols-outlined">{{span}}</span>
                           <span id="text">{{name}}</span>
                    </div>
                    <div id="container-body">
                         <div  v-for="(item, index) in data" :key="index">
                           <div id="main_container" v-for="(value, key) in item" >
                                <div id="head">
                                 <span>{{key}}</span>
                                </div>
                                <div id="content">
                                  <div id="sub_container" v-for="val in value">
                                     <div id="first_div">
                                     <p>hello</p>
                                    
                                     </div>
                                     <div id="second_div">
                                     <span>{{val}}</span>
                                      
                                     </div>
                                  </div>
                                </div>
                           </div>
                         </div>

                    </div>
              </div>`,
    props: {
        name: {
            type: String
        },
        span: {
            type: String
        },
        data: {
            type: Array
        }
    },

}