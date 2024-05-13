const preview_component={
    template:`
    <div class="preview-root">
        <div id="content" @click="content_click($event.currentTarget, date, $event)" :class="{'full_width':!show_date}">
            <div id="first" v-if="show_date">
                <span>{{ date }}</span>
                <br>
                <span>{{ month }}</span>
            </div>
            <div id="second">
               <div id="favourite" v-if="favourite_access && data">
                 <i  
                    :class="check_data(date) ? 'fa fa-heart' : 'fa fa-heart-o'">
                </i>
                </div>
                <div id="editor" :class="{ 'hide': !data }">                             
                    <editor-controller :data="data || {}" :preview="false"></editor-controller>
                </div>
            </div>
        </div>
    </div>`
        ,
    props:{
        show_date:{
            type:Boolean,
            default:false
        },
        favourite_access:{
            type:Boolean,
            default:false
        },
        data:{
            type:[Object,Boolean],
            default:{}
        },
        favourite_data:{
            type:Object,
            default:false
        },
        date:{
            type: [Number,String],
            default:0
        },
        month:{
            type:String,
            default:'Jan'
        },
        year: {
            type: [String, Number],
            default: 2024
        }
    },
    // mounted(){
    //     console.log(this.favourite_access && this.data);
    // },
    methods:{
      check_data(){
            if(this.favourite_data[this.year] &&  this.favourite_data[this.year][this.month] &&  this.favourite_data[this.year][this.month][this.date]){
                return true
            }
        return false;
        },
       content_click(e,date,event) {
        if(event.srcElement.tagName=='I' && event.srcElement.classList.contains('fa')){
            event.srcElement.classList.contains('fa-heart') ? 
            (event.srcElement.classList.remove('fa-heart'), event.srcElement.classList.add('fa-heart-o')) :
            (event.srcElement.classList.remove('fa-heart-o'), event.srcElement.classList.add('fa-heart'));   
            this.$emit('add_fav',date);
        }
        else if(!e.classList.contains('active')){
            this.$emit('change_date', date);
        }
    },
    }
        
}