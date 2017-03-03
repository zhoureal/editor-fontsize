/**
 *  this ia a new approach to set fontsize in editor, it uses the execCommand("insertHTML", false, html) in the document object,
 *  so it won't break the system undo manager (you can use ctrl+v), however, the selection will lost in this method,.
 */


function setFontSize(size) {
    var randomId = new Date().getTime(),
        idFlag = true,
        bFlag = false,
        div = document.createElement("div"),
        range = document.getSelection().getRangeAt(0);
    var start = range.startOffset,
        startNode = range.startContainer,
        end = range.endOffset,
        endNode = range.endContainer;
    var content = range.cloneContents();
    div.appendChild(content);
    if (!div.innerHTML) {
        // 处理未选中任何内容请况下修改字号
        div.innerHTML = '\u200B';
    } else {
        if (/^<\/?[^>]+>/.test(div.innerHTML)) {
            idFlag = false;
            if (div.childNodes[0].tagName.toLowerCase() === "div") {
                if (div.childNodes[0].childNodes[0]) {
                    var b = document.createElement("b");
                    // 不加内容 插入位置会不对
                    b.innerHTML = '\u200B';
                    b.id = randomId;
                    div.childNodes[0].insertBefore(b, div.childNodes[0].childNodes[0]);
                    bFlag = true;
                }
            } else {
                div.childNodes[0].id = randomId;
            }
        }
    }
    if (idFlag) { div.setAttribute("id", randomId); }
    this.applyInlineStyle(div, "fontSize", sFontSize);
    this.inheritStyle(div);
    document.execCommand("insertHTML", false, div.outerHTML);
    // 尝试恢复选区  手动恢复目前不能保证完全正确 
    var newRange = document.getSelection().getRangeAt(0);
    var newStart = newRange.endOffset;
    var newStartNode = newRange.endContainer;
    var myRange = document.createRange();
    try {
        // 恢复选区的方法1
        myRange.setStart(startNode, start);
    } catch (e) {
        // 恢复选区的方法2
        myRange.setStartBefore(newStartNode);
    }
    myRange.setEnd(newStartNode, newStart);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(myRange);
    var idDom = document.getElementById(randomId);

    // 恢复选区的方法3
    if (idDom && myRange.collapsed) {
        myRange.setStartBefore(idDom);
        myRange.setEnd(newStartNode, newStart);
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(myRange);
        console.log("id type")
    }
    // 恢复选区的方法4
    if (!idDom && myRange.collapsed) {
        myRange.setStartBefore(newStartNode);
        myRange.setEndAfter(newStartNode);
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(myRange);
        console.log("node type")
    }
    if (bFlag) {
        //移除标记节点
        idDom.parentNode.removeChild(idDom);
    } else if (idDom) {
        //移除标记id
        idDom.removeAttribute("id");
    }
}

var applyInlineStyle = function (dom, name, val) {
    dom.style[name] = val;
    var elements = dom.querySelectorAll("*");
    Array.prototype.slice.call(elements).forEach(function (element) {
        element.style[name] = val;
    })
},
var getNodeNum = function (dom) {
    if (!dom) return 0;
    var ret = 0;
    for (var i = 0; i < dom.children.length; i++) {
        if (dom.children[i].tagName.toLowerCase() !== 'br') {
            ret++;
        }
    }
    return ret;
},
var inheritStyle = function (dom) {
    var styleArr = [];
    // 跨节点情况样式继承浏览器会自动处理
    if (!dom || this.getNodeNum(dom)) return;
    // 手动继承字体 颜色 背景色 斜体 粗体 下划线 删除线 样式
    dom.style.fontFamily = window.ue.queryCommandValue("fontfamily");
    dom.style.fontWeight = this._editorDoc.queryCommandState("bold") ? "bold" : "normal";
    dom.style.fontStyle = this._editorDoc.queryCommandState("italic") ? "italic" : "normal";
    dom.style.background = window.ue.queryCommandValue("backcolor");
    dom.style.color = window.ue.queryCommandValue("forecolor");
    dom.style.textDecoration = window.ue.queryCommandState("underline") ? "underline" : window.ue.queryCommandState("strikethrough") ? "line-through" : "none";
},