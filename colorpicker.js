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
var colors = ['#438a5e', '#bac964', '#f7fbe1', '#f6def6', '#e5cfe5', '#cfe5cf', '#cff6cf', '#6a197d', '#ffa5b0', '#e0dede', '#f5f5f5', '#204051', '#3b6978', '#84a9ac', '#e7dfd5', '#17706e', '#fb7813', '#f7f7ee', '#b6eb7a', '#900c3f', '#fc9d9d', '#ffcac2', '#ccafaf', '#f4ebc1', '#a0c1b8', '#709fb0', '#726a95', '#e8ead3', '#fbd46d', '#ff9c71', '#654062', '#222831', '#393e46', '#32e0c4', '#eeeeee', '#10375c', '#127681', '#f3c623', '#f4f6ff', '#aacdbe', '#f4f7c5', '#fbc687', '#ea907a', '#000000', '#cf7500', '#f0a500', '#f4f4f4', '#07031a', '#4f8a8b', '#b1b493', '#ffcb74', '#bbf1c8', '#80bdab', '#342b38', '#ff9595', '#0a97b0', '#4cd3c2', '#f54291', '#faeee7', '#abc2e8', '#dbc6eb', '#d1eaa3', '#efee9d', '#35d0ba', '#ffcd3c', '#ff9234', '#d92027', '#fe8a71', '#f6cd61', '#3da4ab', '#0e9aa7', '#e84a5f', '#ff847c', '#feceab', '#99b898', '#fce8d5', '#ffd3e1', '#0a97b0', '#1b6ca8', '#ee91bc', '#efb960', '#edf492', '#a8df65', '#bb596b', '#f96d80', '#ff9a76', '#ffc4a3', '#679b9b', '#aacfcf', '#d291bc', '#ffcbcb', '#e5e5e5', '#f8b24f', '#ea9a96', '#303960', '#7c3c21', '#ec823a', '#f9c49a', '#e8e4e1', '#f17808', '#e71414', '#12947f', '#2fc4b2', '#e4e4e4', '#8ccbbe', '#3797a4', '#fcf876', '#d92027', '#f37121', '#f4ea8e', '#5fdde5', '#edf4f2', '#f5a31a', '#d32626', '#79d70f', '#562349', '#ad6989', '#ffa299', '#fee2b3', '#f1ebbb', '#b5076b', '#5c2a9d', '#45046a', '#f5a7a7', '#f9d89c', '#82c4c3', '#bc658d', '#fdcb9e', '#3f3f44', '#cceabb', '#f7f7f7', '#ee8572', '#d4f3ef', '#abf0e9', '#63b7af', '#007892', '#ff427f', '#fc8210', '#ffd8a6', '#def4f0', '#74d4c0', '#d9455f', '#9a1f40', '#ffdcb4', '#c060a1', '#6a097d', '#00005c', '#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e',"#8e44ad","#2c3e50","#e67e22","#e74c3c","#95a5a6","#c0392b","#d35400","#f39c12","#bdc3c7","#7f8c8d","#eb4d4b","#130f40","#30336b","#f0932b","#22a6b3","#badc58","#6ab04c","#ff6348","#1e90ff","#c7ecee","#2ed573","#f1f2f6","#ff4757","#ff6b81","#ff7f50",'#16a085','#27ae60','#2980b9',"white", "black","red", "green","yellow", '#263646', '#eebb4d', '#d6efc7', '#96bb7c', '#184d47', '#9bdeac', '#f7f5dd', '#e2979c', '#e7305b', '#e36387', '#f2aaaa', '#a6dcef', '#ddf3f5', '#436f8a']
var fontfamily = ["Agency FB", "Albertina", "Antiqua", "Architect", "Arial", "BankFuturistic", "BankGothic", "Blackletter", "Blagovest", "Calibri", "Comic Sans MS", "Consolas", "Courier", "Cursive", "Decorative",
'arial', "sans-serif", "candara", "monospace", "times", "Fantasy", "Fraktur", "Frosty", "Garamond", "Georgia", "Helvetica", "Impact", "Minion", "Modern", "Monospace", "Open Sans", "Palatino", "Perpetua", "Roman", "Sans-serif", "Serif", "Script", "Swiss", "Tahoma", "Times", "Times New Roman", "Tw Cen MT", "Verdana"
]
var data = {"background-color": colors, "color": colors, "font-family":fontfamily}

var glob = 0
var timer;
var timer_is_on = 0;
var previous_attribute = false;
var previous_element = false;
var previous_tag = false;
var is_titlebox_opened = false;

function rgbToHex(rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
}

function fullColorHex(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    var color = red+green+blue;
    return color.toUpperCase()
}

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

    var closer = document.getElementById("mycloser")
    closer.style.position = "absolute";
    closer.style.right = 0;
    closer.style.top = 0;
    closer.style.background = 'green'
    closer.style.cursor = "pointer";
    closer.style.padding = "9px 15px"
    closer.style.border = "1px solid transparent"
    closer.style.fontWeight = "bold"

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

function append_titlebox(elems, tname) {
    for (var i = 0; i < elems.length; i++){
        var div = document.createElement("div")
        div.innerHTML = tname+i;
        div.setAttribute("class", "titlebox")
        div.style.padding = 5;
        div.style.border = "1px solid red"
        div.style.position = "relative"
        div.style.width = 100;
        div.style.background = "lightyellow"
        div.style.color = "black"
        elems[i].appendChild(div)
        var pstyle = getComputedStyle(div.parentNode)
        alert(i)
        div.style.bottom = parseInt(pstyle.height) - 20;
    }
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
            if (!is_titlebox_opened) {
                is_titlebox_opened = true;
                //append_titlebox(elm, tname)
            }
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
    is_titlebox_opened = false;
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
        if (tname == "color") {
            va = elm.style.color.match(/\d+/g)
            value = '#'+fullColorHex(va[0], va[1], va[2])
        }
        else if (tname == "background-color"){
            va = elm.style.background.match(/\d+/g)
            value = '#'+fullColorHex(va[0], va[1], va[2])
        }
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
        if (tname == "color") {
            va = elm.style.color.match(/\d+/g)
            value = '#'+fullColorHex(va[0], va[1], va[2])
        }
        else if (tname == "background-color") {
            va = elm.style.background.match(/\d+/g)
            value = '#'+fullColorHex(va[0], va[1], va[2])
        }
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

function initApplication(){
            var mainblock = document.createElement("DIV")
            mainblock.setAttribute("id", "bmainblock")
            mainblock.style.position = "absolute";
            mainblock.style.zIndex = 9;
            mainblock.style.top = 250;
            mainblock.style.left = 300;
            mainblock.style.zIndex = 101;
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

            var closer = document.createElement('div')
            closer.setAttribute("id", "mycloser")
            closer.innerHTML = "X"
            closer.style.position = "absolute";
            closer.style.right = 0;
            closer.style.top = 0;
            closer.style.background = 'green'
            closer.style.cursor = "pointer";
            closer.style.padding = "9px 15px"
            closer.style.border = "1px solid transparent"
            closer.style.fontWeight = "bold"
            closer.onclick = function () {
                mainblock.parentNode.removeChild(mainblock)
            }
            header.appendChild(closer)

            var colorbox = document.createElement("INPUT");
            colorbox.setAttribute("id", "id-name");
            colorbox.setAttribute("type", "text")
            colorbox.value = "Enter target element, id name, class name here ..."
            colorbox.value = ".specifications"
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
            st_btn.onclick = function() {
                startCount(this, "color");
            }

            var stop_btn = document.createElement("BUTTON");
            stop_btn.innerHTML = "STOP";
            stop_btn.onclick = function() {
                stopshow(this, 'color-display', 'color');
            }
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
            st_btn1.onclick = function() {
                startCount(this, "background-color");
            }

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
            st_btn2.onclick = function() {
                startCount(this,  "font-family");
            }

            var stop_btn2 = document.createElement("BUTTON");
            stop_btn2.innerHTML = "STOP";
            stop_btn2.onclick = function() {
                stopshow(this, 'font-family-display', 'font-family');
            }
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

function colorpicker() {
    if (document.readyState == "complete") {
        initApplication()
    }
    else {
        document.onreadystatechange = function() {
            if (document.readyState == "complete") {
                initApplication()
            }
        }
    }
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