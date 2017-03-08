# editor-fontsize
* a new approach to set fontsize use insertHTML
* a new approach to set fontsize use document.execcommand("fontSize",false, val) and dom style operation

系统方法 document.execcommand("fontSize",false, val) val 可取 1~7，只支持7种字号 


下面两种方法可以实现设置任意大小字号

* 采用insertHTML方法实现字号的设置，需要注意的是，选区将会丢失(目前的恢复方法不能恢复所用情况)，该方法只适用于部分需求情况 demo1

* 采用原生的docuemnt.execCommand("fontsize")设置一个任意字号，再去修改selection中font标签的style="font-size: realSize" demo2