
var applyInlineStyle = function (dom, name, val) {
    dom.style[name] = val;
    var elements = dom.querySelectorAll("*");
    Array.prototype.slice.call(elements).forEach(function (element) {
        element.style[name] = val;
    })
};

var getNodeNum = function (dom) {
    if (!dom) return 0;
    var ret = 0;
    for (var i = 0; i < dom.children.length; i++) {
        if (dom.children[i].tagName.toLowerCase() !== 'br') {
            ret++;
        }
    }
    return ret;
};

var inheritStyle = function (dom) {
    var styleArr = [];
    // 跨节点情况样式继承浏览器会自动处理
    if (!dom || this.getNodeNum(dom)) return;
    // 手动继承字体 颜色 背景色 斜体 粗体 下划线 删除线 样式
    dom.style.fontFamily = document.queryCommandValue("fontfamily");
    dom.style.fontWeight = document.queryCommandState("bold") ? "bold" : "normal";
    dom.style.fontStyle = document.queryCommandState("italic") ? "italic" : "normal";
    dom.style.background = document.queryCommandValue("backcolor");
    dom.style.color = document.queryCommandValue("forecolor");
    dom.style.textDecoration = document.queryCommandState("underline") ? "underline" : document.queryCommandState("strikethrough") ? "line-through" : "none";
};

var findFontParent = function (ele) {
    if (ele.nodeType == 3) {
        ele = ele.parentNode;
    }
    if (ele.tagName.toLowerCase() == 'font') {
        return ele;
    }
    while (ele.parentNode && ele.parentNode.tagName && ele.parentNode.tagName.toLowerCase() !== "document") {
        ele = ele.parentNode;
        if (ele.tagName.toLowerCase() == 'font') {
            return ele;
        }
    }
    return ele;
}