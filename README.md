# editor-fontsize
a new approach to set fontsize use insertHTML

## 采用document.execcommand("insertHTML")方法实现字号的设置，需要注意的是，选区将会丢失，该方法只适用于部分需求情况