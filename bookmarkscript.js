var bod = document.getElementsByTagName("body");
var list = document.createElement("ol").text("Yo");
var list1 = document.createElement("li").text("Sweet");
var list2 = document.createElement("li").text("Hax");
var list3 = document.createElement("li").text("Yup");
bod.appendChild(list);
list.appendChild(list1);
list.appendChild(list2);
list.appendChild(list3);
