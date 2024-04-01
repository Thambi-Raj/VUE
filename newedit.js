if (clone[i] != draggedElement) {
    if (match_content.includes(i)) {
        flex_child.append(clone[i].cloneNode(true));
    }
    else if (ind == i) {
        var child = clone[i].children[0];
        for (var j = 0; j < child.children.length; j++) {
            var str_chk = i + "-" + j;
            if (match_content.includes(str_chk)) {
                flex_child.append(child.children[j].cloneNode(true));
            }
            else {
                flex_child.innerHTML != '' ?
                    (flex_div.appendChild(flex_child.cloneNode(true)), flex_div.appendChild(draggedElement), result.push(flex_div)) : '';
                flex_child.innerHTML = '';
                result.push(child.children[j].cloneNode(true));
            }
        }
    }
    else {
        var temp = clone[i].cloneNode(true);
        flex_child.innerHTML != '' ?
        (flex_div.append(flex_child.cloneNode(true)), flex_div.appendChild(draggedElement), result.push(flex_div.cloneNode(true))) : '';
        flex_child.innerHTML = '';

        result.push(temp);
    }