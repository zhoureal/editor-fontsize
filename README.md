# editor-fontsize
* a new approach to set fontsize use insertHTML
* a new approach to set fontsize use document.execcommand("fontSize",false, val) and dom style operation

系统方法 document.execcommand("fontSize",false, val) val 可取 1~7  

··· html
<font size={val}></font>
···

下面两种方法可以实现设置任意大小字号

* 采用insertHTML方法实现字号的设置，需要注意的是，选区将会丢失，该方法只适用于部分需求情况

*