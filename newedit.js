if (style.color) {
    this.active_state['color'] = style.color;
} 
if (style.fontSize) {
    var z = style.fontSize.replace('px', '');
    this.active_state['font-size'] = z;
} 
if (style.fontFamily) {
    this.active_state['font-family'] = style.fontFamily;
} 
if (style.textDecorationLine) {
    this.active_state['underline'] = true;
} 
if (style.fontWeight) {
    this.active_state['bold'] = true;
} 
if (style.fontStyle == 'italic') {
    this.active_state['italic'] = true;
}