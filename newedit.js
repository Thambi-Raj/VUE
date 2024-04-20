check_for_new_tag(previous_styles, current_styles, div){
    Object.keys(current_styles).forEach(tag => {
        if (!previous_styles[tag]) {
            if (tag == 'b') {
                div.innerHTML += '<b>';
            }
            else if (tag == 'i') {
                div.innerHTML += '<i>';
            }
            else if (tag == 'u') {
                div.innerHTML += '<u>';
            }
            else if (tag == 'color') {
                div.innerHTML += '<span style ="color :' + styles[tag] + '">'
            }
            else if (tag == 'font-size') {
                div.innerHTML += '<span style ="font-size: ' + styles[tag] + 'px;">'
            }
            else {
                div.innerHTML += '<span style=""fontFamily:' + styles[tag] + '">';
            }
        }
    })
}