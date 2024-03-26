var json = {
    "ref": document.querySelector('#app'),
    "features": ["Bold", "Italics", "Highlight", "font-family", "font-size", "underline", "strikethrough", "alignment", "color", "bgcolor", "heading", "quotes"]
}
class Editor {

    constructor(parent, format) {
        this.parent = parent;
        this.format = format;
        this.dropdown = ["alignment", "heading", "font-family"];
        this.create_Editor_tool();
        this.create_text_field();
    }

    create_Editor_tool() {
        var edit_container = this.create_DOM_elements('div','','editor');
        this.format.forEach(element => {
            if (!this.dropdown.includes(element)) {
                this.create_tool_icon(element, edit_container);
            }
            else {
                this.create_tool_dropdown(element, edit_container);
            }
        });
        this.parent.appendChild(edit_container);
    }

    create_tool_icon(element, parent) {
        var div = this.create_DOM_elements('div', 'edit-button', element, '',[],element.charAt(0));
        parent.appendChild(div);
    }

    create_tool_dropdown(element, parent) {
        var drop_json = {
            "font-family": [
                "Arial",
                "Helvetica",
                "Times New Roman",
                "Georgia",
                "Courier New",
                "Verdana",
                "Tahoma",
                "Trebuchet MS",
                "Palatino Linotype",
                "Arial Black",
                "Comic Sans MS",
                "Impact",
                "Lucida Console",
                "Garamond",
                "Century Gothic",
                "Calibri",
                "Book Antiqua",
                "Franklin Gothic Medium",
                "Cambria",
                "Rockwell"
            ],
            "heading":["H1","H2","H3","H4","H5","H6"],
            "alignment":["justifyCenter","jsutifyLeft","justifyRight"],
        }
    
        var select  = document.createElement('select','change','','font-family');
        for(var i=0;i<drop_json[element].length;i++){
        select.append(this.create_DOM_elements('option','','',drop_json[element][i],'',drop_json[element][i]));
        }
      parent.append(select);
    }

    create_text_field(){
        var div  =document.createElement('div','','text-field');
        div.designMode = 'on';
        this.parent.append(div);
    }
    create_DOM_elements(type, className, id, value, children, innerText, color) {
        var element = document.createElement(type);
        className ? element.setAttribute('class', className) : '';
        id ? element.setAttribute('id', id) : '';
        innerText ? (element.innerHTML = innerText) : '';
        value  ?element.value =value:'';
        color ? element.style.color = color : '';
        children ? children.forEach(child => {
            element.appendChild(child);
        }) : '';
        return element;
    }

}
var ed = new Editor(json.ref, json.features);