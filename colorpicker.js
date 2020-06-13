/* Author : Ravi Kaipu
   Date   : 13th June 2020.
   Libray : ColorPicker
   Description:
   ColorPiker is a library used for selecting the suitable colors
   and font-families of the specific targeted elements, which can easy
   color picking process of html elements.

   For example, if we want to pick the suitable colors for specific div
   element in the html, we simply mention the id or class or tag name of
   targeted element and number of colors applied to that element with some
   interval and we can pick the best one.
*/

var colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e',"#8e44ad","#2c3e50","#e67e22","#e74c3c","#95a5a6","#c0392b","#d35400","#f39c12","#bdc3c7","#7f8c8d","#eb4d4b","#130f40","#30336b","#f0932b","#22a6b3","#badc58","#6ab04c","#ff6348","#1e90ff","#c7ecee","#2ed573","#f1f2f6","#ff4757","#ff6b81","#ff7f50",'#16a085','#27ae60','#2980b9',"white", "black","red", "green","yellow"]
var fontfamily = ['arial', "sans-serif", "candara", "monospace"]
var data = {"background-color": colors, "color": colors, "font-family":fontfamily}

var glob = 0
var timer;
var timer_is_on = 0;
var previous_attribute = None;
var previous_element = None;
var previous_tag = None

function makeintact() {
    /* function to make sure our color picker window
    should not be changed irrespective of target element.
    */

    var mainblock = document.getElementById("bmainblock")
    mainblock.style.background = "white"
    mainblock.style.fontFamily = "calibri";

    var header = document.getElementById("mydivheader");
    header.setAttribute("id", "mydivheader")
    header.style.background = "#2196F3";
    header.style.color = "#fff";
    header.style.fontFamily = "monospace"

    var colorbox = document.getElementById("id-name")
    colorbox.style.background = "white"
    colorbox.style.color = "indigo"
    colorbox.style.fontWeight = "bold";
    colorbox.style.fontSize = "14px"
    colorbox.style.fontFamily = "monospace"

    var colorbox1 = document.getElementById("color-display");
    colorbox1.style.background = "#f9fdfd"
    colorbox1.style.color = "black"
    colorbox1.style.fontFamily = "monospace"

    var colorbox2 = document.getElementById("background-color-display");
    colorbox2.style.background = "#f9fdfd"
    colorbox2.style.color = "black"
    colorbox2.style.fontFamily = "monospace"

    var colorbox3 = document.getElementById("font-family-display");
    colorbox3.style.background = "#f9fdfd"
    colorbox3.style.color = "black"
    colorbox3.style.fontFamily = "monospace"

    var statusbar = document.getElementById("statusbar");
    statusbar.style.background = "rgb(189, 195, 199)"
    statusbar.style.color = "rgb(52, 73, 94)"
    statusbar.style.fontFamily = "monospace"
    statusbar.style.fontSize = 13

    var tds = mainblock.getElementsByTagName("td")
    for(var i = 0; i < tds.length; i++) {
        tds[i].style.color = "black"
        tds[i].style.background = "#f9fdfd"
        tds[i].style.fontSize = 14
        tds[i].style.fontFamily = "monospace"
    }
}

function update_status(msg_type, msg) {
    /*function to show the updates on status bar*/

    var statusbar = document.getElementById("statusbar");
    statusbar.style.fontWeight = "bold"
    if (msg == "") {
        statusbar.innerHTML = ""
        statusbar.style.padding = 0;
        statusbar.style.border = 0;
        statusbar.style.background = "rgb(189, 195, 199)"
        statusbar.style.color = "rgb(52, 73, 94)"
        statusbar.style.fontFamily = "monospace"
        statusbar.style.fontSize = 13
        return
    }

    if (msg_type == "status") {
        var fmsg = "STATUS: " + msg;
        statusbar.innerHTML = fmsg;
        statusbar.style.background = "rgb(189, 195, 199)"
        statusbar.style.color = "rgb(52, 73, 94)"
        statusbar.style.fontFamily = "monospace"
        statusbar.style.fontSize = 13
        statusbar.style.padding = "5px"

    }
    else if (msg_type == "error") {
        var fmsg = "ERROR: " + msg;
        statusbar.style.padding = "5px"
        statusbar.innerHTML = fmsg;
        statusbar.style.background = "rgb(189, 195, 199)"
        statusbar.style.color = "rgb(235, 77, 75)"
        statusbar.style.fontFamily = "monospace"
        statusbar.style.fontSize = 13
    }
}

function getElement(){
    /*function to get the element of target when tagname,
    classname, id name given*/

    var given_id = document.getElementById("id-name").value
    var elem = document.getElementById("id-name");
    if ((given_id.search("Enter target element, id name, class name here") == 0) || (given_id == "")) {
        elem.style.border = "1.5px solid red";
        elem.value = ""
        update_status("error", "Enter a valid target tagname, id name, class name here")
        elem.focus();
        return None;
    }
    var elm;
    var sid = given_id
    if (given_id.startsWith("#")) {
        sid = given_id.slice(1)
        elm = [document.getElementById(sid)]
    }
    else if (given_id.startsWith(".")){
        sid = given_id.slice(1)
        elm = document.getElementsByClassName(sid)
    }
    else
        elm = document.getElementsByTagName(sid)
    if (elm.length == 0) {
        elem.style.border = "1.5px solid red";
        update_status("error", "Enter a valid target tagname, id name, class name here")
        elem.focus();
        return None
    }
    elem.style.border = 0;
    previous_element = elm[0]
    return elm
}

function operation(elm, ops, value) {
    /* function to perform styling operations on
    all targeted elements*/

    for(var i = 0; i < elm.length; i++) {
        if (ops == "color")
            elm[i].style.color = value;
        else if (ops == "background")
            elm[i].style.background = value;
        else if (ops == "fontFamily") {
            elm[i].style.fontFamily = value;
        }
    }
    makeintact();
}

function timedCount(elm, tname) {
	if (glob <data[tname].length) {
        if (tname == "color") {
            operation(elm, "color", data[tname][glob]);
        }
        else if (tname == "background-color")
            operation(elm, "background", data[tname][glob]);
        else if (tname == "font-family") {
            operation(elm, "fontFamily", data[tname][glob]);
        }
        timer = setTimeout(timedCount, 1500, elm, tname);
        glob++;
    }
    else
        update_status("status", "all "+tname+" values are executed")
}

function startCount(et, tname) {
    glob = 0
    stopCount()
    var parent = et.parentNode.parentNode.parentNode;
    var buttons = parent.getElementsByTagName("button")
    for(var i = 0; i < buttons.length; i++){
        buttons[i].style.border = "1px solid grey";
    }

	if (!timer_is_on) {
        timer_is_on = 1;
        var elm = getElement();
        if (elm) {
            previous_attribute = tname;
            previous_tag = document.getElementById("id-name").value
            et.style.border = "2px solid orange"
            update_status("status", tname + " on " + previous_tag + ", is executing")
            timedCount(elm, tname);
        }
        else
            update_status("error", "You have entered either invalid id, class, or tag")
	}
}

function stopCount() {
    if (timer)
	    clearTimeout(timer);
    timer_is_on = 0;
    if (previous_tag && previous_tag != document.getElementById('id-name').value) {
        document.getElementById("color-display").innerHTML = ""
        document.getElementById("background-color-display").innerHTML = ""
        document.getElementById("font-family-display").innerHTML = ""
        update_status("status", "All previous tag related data is cleared")
        return
    }

    if (previous_attribute) {
        var elm = previous_element;
        var value = ""
        var tname = previous_attribute;
        if (tname == "color")
            value = elm.style.color
        else if (tname == "background-color") 
            value = elm.style.background;
        else if (tname == "font-family")
            value = elm.style.fontFamily
        document.getElementById(previous_attribute + '-display').innerHTML = value
    }
}			

function stopshow(et, color_display, tname){
    stopCount();
    var parent = et.parentNode.parentNode.parentNode;
    var buttons = parent.getElementsByTagName("button")
    for(var i = 0; i < buttons.length; i++){
        buttons[i].style.border = "1px solid grey";
    }
    var elms = getElement();
    if (elms) {
        var elm = elms[0];
        var value = ""
        if (tname == "color")
            value = elm.style.color
        else if (tname == "background-color") 
            value = elm.style.background;
        else if (tname == "font-family")
            value = elm.style.fontFamily
        update_status("status", "")
        document.getElementById(color_display).innerHTML = value;
        document.getElementById(color_display).style.background = "#f9fdfd";
        document.getElementById(color_display).style.color = "black";
    }
}

function tableCreate() {
    var tbl = document.createElement('table');
    tbl.style.width = '450px';
    tbl.style.position = 'relative';
    tbl.style.float = 'right'
    tbl.setAttribute("id", "colorpickerwindow")
    tbl.setAttribute('border', '1');
    tbl.setAttribute('cellspacing', '0')
    var tbdy = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    td1.appendChild(document.createTextNode('Property'))
    td2.appendChild(document.createTextNode('Action'))
    td3.appendChild(document.createTextNode('Property Value'))

    tr1.appendChild(td1)
    tr1.appendChild(td2)
    tr1.appendChild(td3)

    tbdy.style.background = "#f9fdfd";
    tbdy.style.fontWeight = "bold"
    tbdy.style.fontFamily = "monospace"
    tr1.style.fontSize = 14

    tbdy.appendChild(tr1);
    tbl.appendChild(tbdy);
    return [tbdy, tbl];
}

function colorpicker() {
    var mainblock = document.createElement("DIV")
    mainblock.setAttribute("id", "bmainblock")
    mainblock.style.position = "absolute";
    mainblock.style.zIndex = 9;
    mainblock.style.top = 250;
    mainblock.style.left = 300;
    mainblock.style.border = "5px solid green";
    mainblock.style.background = "white"
    mainblock.style.borderRadius = "10px"
    mainblock.style.boxShadow = "0 0 10px orange"
    mainblock.style.fontFamily = "calibri";
    mainblock.style.fontSize = "16"

    var header =  document.createElement("DIV")
    header.setAttribute("id", "mydivheader")
    header.innerHTML = "Color Picker"
    header.style.padding = 10;
    header.style.cursor = "move";
    header.style.zIndex = 10;
    header.style.background = "#2196F3";
    header.style.color = "#fff";
    header.style.fontFamily = "monospace"
    mainblock.appendChild(header)

    var colorbox = document.createElement("INPUT");
    colorbox.setAttribute("id", "id-name");
    colorbox.setAttribute("type", "text")
    colorbox.value = "Enter target element, id name, class name here ..."
    colorbox.style.background = "white"
    colorbox.style.width = "100%";
    colorbox.style.color = "indigo"
    colorbox.style.fontWeight = "bold";
    colorbox.style.fontSize = "14px"
    colorbox.style.fontFamily = "monospace"
    colorbox.style.position = "relative";
    colorbox.style.padding = "6px 4px";
    colorbox.style.display = "block"

    given_id = colorbox.value;
    mainblock.appendChild(colorbox);

    var [tbdy, tbl] = tableCreate()
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.appendChild(document.createTextNode('color'))
    td1.style.padding = "4px"
    tr1.appendChild(td1)   
    td1.style.fontSize = 14
    td2.style.fontSize = 14
    td3.style.fontSize = 14

    var st_btn = document.createElement("BUTTON");
    st_btn.innerHTML = "START";
    st_btn.style.marginRight = 20;
    st_btn.style.marginLeft = 5;
    st_btn.style.cursor = "hand"
    st_btn.onclick = function() { startCount(this, "color");}

    var stop_btn = document.createElement("BUTTON");
    stop_btn.innerHTML = "STOP";
    stop_btn.onclick = function() { stopshow(this, 'color-display', 'color');}
    stop_btn.style.cursor = "hand"
    td2.appendChild(st_btn)
    td2.appendChild(stop_btn)

    var colorbox1 = document.createElement("DIV");
    colorbox1.setAttribute("id", "color-display");
    colorbox1.innerHTML = "";
    colorbox1.style.background = "#f9fdfd"
    colorbox1.style.position = "relative";
    colorbox1.style.left = 0;
    colorbox1.style.padding = "4px 4px";
    td3.appendChild(colorbox1)
    td3.style.width = 150;

    tr1.appendChild(td2)
    tr1.appendChild(td3)
    tbdy.appendChild(tr1)

    var tr2 = document.createElement('tr');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    td4.appendChild(document.createTextNode('background-color'))
    td4.style.padding = "4px"

    td4.style.fontSize = 14
    td5.style.fontSize = 14
    td6.style.fontSize = 14
    tr2.appendChild(td4)   
    
    var st_btn1 = document.createElement("BUTTON");
    st_btn1.innerHTML = "START";
    st_btn1.style.marginRight = 20;
    st_btn1.style.marginLeft = 5;
    st_btn1.style.cursor = "hand"
    st_btn1.onclick = function() { startCount(this, "background-color");}

    var stop_btn1 = document.createElement("BUTTON");
    stop_btn1.innerHTML = "STOP";
    stop_btn1.onclick = function() { stopshow(this, 'background-color-display', 'background-color');}
    stop_btn1.style.cursor = "hand"
    td5.appendChild(st_btn1)
    td5.appendChild(stop_btn1)

    var colorbox2 = document.createElement("DIV");
    colorbox2.setAttribute("id", "background-color-display");
    colorbox2.innerHTML = "";
    colorbox2.style.background = "#f9fdfd"
    colorbox2.style.position = "relative";
    colorbox2.style.left = 0;
    colorbox2.style.padding = "4px 4px";
    td6.appendChild(colorbox2)

    tr2.appendChild(td5)
    tr2.appendChild(td6)
    tbdy.appendChild(tr2)

    var tr3 = document.createElement('tr');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    var td9 = document.createElement('td');
    td7.appendChild(document.createTextNode('font-family'))
    td7.style.padding = "4px"

    td7.style.fontSize = 14
    td8.style.fontSize = 14
    td9.style.fontSize = 14

    tr3.appendChild(td7)   
    
    var st_btn2 = document.createElement("BUTTON");
    st_btn2.innerHTML = "START";
    st_btn2.style.marginRight = 20;
    st_btn2.style.marginLeft = 5;
    st_btn2.style.cursor = "hand"
    st_btn2.onclick = function() { startCount(this,  "font-family");}

    var stop_btn2 = document.createElement("BUTTON");
    stop_btn2.innerHTML = "STOP";
    stop_btn2.onclick = function() { stopshow(this, 'font-family-display', 'font-family');}
    stop_btn2.style.cursor = "hand"
    td8.appendChild(st_btn2)
    td8.appendChild(stop_btn2)

    var colorbox3 = document.createElement("DIV");
    colorbox3.setAttribute("id", "font-family-display");
    colorbox3.innerHTML = "";
    colorbox3.style.background = "#f9fdfd"
    colorbox3.style.position = "relative";
    colorbox3.style.left = 0;
    colorbox3.style.padding = "4px 4px";
    td9.appendChild(colorbox3)

    tr3.appendChild(td8)
    tr3.appendChild(td9)
    tbdy.appendChild(tr3)


    tbl.appendChild(tbdy)
    mainblock.appendChild(tbl)   

    var statusbar = document.createElement("DIV")
    statusbar.setAttribute("id", "statusbar")
    statusbar.style.background = "rgb(189, 195, 199)"
    statusbar.style.color = "rgb(52, 73, 94)"
    statusbar.style.fontFamily = "monospace"
    statusbar.style.fontSize = 13
    statusbar.style.position = "relative"
    //statusbar.style.height = 10;
    statusbar.style.bottom = 0;
    statusbar.style.marginTop= 100;
    mainblock.appendChild(statusbar)

    document.body.appendChild(mainblock)
    dragElement(document.getElementById("bmainblock"));

}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("mydivheader")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("mydivheader").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}