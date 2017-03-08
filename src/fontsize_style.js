/**
 *  this is anonther method to set fontsize, it used document.execCommand("fontSize",false,2) to set fontsize to size=2,
 *  than apply style=realSize to the font tag in selection
 */
function setFontSize(size){
    var div = document.createElement("div");
        var oldRange = document.getSelection().getRangeAt(0);
        var content = oldRange.cloneContents();
        div.appendChild(content);
        // 处理未选中任何内容请况下修改字号
        if (!div.innerHTML) {
            div.innerHTML = '\u200B';
            applyInlineStyle(div, "fontSize", size);
            inheritStyle(div);
            document.execCommand("insertHTML", false, div.outerHTML);
            return;
        }
        // 1、调用document.execCommand(“fontsize”，1)设置字号 (任意值)
        document.execCommand("fontSize", false, 2);
        var range = document.getSelection().getRangeAt(0);
        var parent = range.commonAncestorContainer;
        if (range.startContainer.nodeType === 1) {
            var start = range.startContainer
            var end = range.endContainer
        } else {
            var start = range.startContainer.parentNode
            var end = range.endContainer.parentNode
        }
        if (!start.isSameNode(end)) {
            var fonts = parent.getElementsByTagName("font");
            for (var i = 0; i < fonts.length; i++) {
                if (start.compareDocumentPosition(fonts[i]) === 4 && end.compareDocumentPosition(fonts[i]) === 2 || end.contains(start) || end.compareDocumentPosition(fonts[i]) === 10) {
                    fonts[i].style.fontSize = size
                }
            }
        }
        findFontParent(start).style.fontSize = size;
        findFontParent(end).style.fontSize = size;
}