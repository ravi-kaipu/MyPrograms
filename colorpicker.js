var colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e',"#8e44ad","#2c3e50","#e67e22","#e74c3c","#95a5a6","#c0392b","#d35400","#f39c12","#bdc3c7","#7f8c8d","#eb4d4b","#130f40","#30336b","#f0932b","#22a6b3","#badc58","#6ab04c","#ff6348","#1e90ff","#c7ecee","#2ed573","#f1f2f6","#ff4757","#ff6b81","#ff7f50",'#16a085','#27ae60','#2980b9',"white", "black","red", "green","yellow"]
var fontfamily = ['arial', "sans-serif", "candara", "monospace"]

var data = {"background-color": colors, "color": colors, "font-family":fontfamily}
var glob = 0
var c = 0;
var t;
var timer_is_on = 0;
var target_id = None;

function timedCount(given_id, tname) {
	if (glob <data[tname].length) {
        if (tname == "color") {
            document.getElementById(given_id).style.color = data[tname][glob];
        }
        else if (tname == "background-color")
            document.getElementById(given_id).style.background = data[tname][glob];
        else
            document.getElementById(given_id).style.fontFamily = data[tname][glob];
        document.getElementById("value-display").innerHTML = data[tname][glob];
		t = setTimeout(timedCount, 1000, given_id, tname);
		glob++;
	}
}

function startCount(et, given_id, tname) {
    glob = 0
    stopCount()
    target_id = given_id;
    var parent = et.parentNode.parentNode.parentNode;
    var buttons = parent.getElementsByTagName("button")
    for(var i = 0; i < buttons.length; i++){
        buttons[i].style.border = "1px solid grey";
    }

    et.style.border = "2px solid orange"

	if (!timer_is_on) {
		timer_is_on = 1;
		timedCount(given_id, tname);
	}
}

function stopCount() {
    if (t)
	    clearTimeout(t);
	timer_is_on = 0;
}			

function stopshow(et, color_display, tname){
    stopCount();
    var parent = et.parentNode.parentNode.parentNode;
    var buttons = parent.getElementsByTagName("button")
    for(var i = 0; i < buttons.length; i++){
        buttons[i].style.border = "1px solid grey";
    }
    var value = ""
    if (tname == "color")
        value = document.getElementById(target_id).style.color
    else if (tname == "background-color") 
        value = document.getElementById(target_id).style.background;
    else if (tname == "font-family")
        value = document.getElementById(target_id).style.fontFamily
    document.getElementById(color_display).innerHTML = value;
}
function resumecounter(){
	startCount();
}

function tableCreate() {
    var tbl = document.createElement('table');
    tbl.style.width = '400px';
    tbl.style.position = 'relative';
    tbl.style.float = 'right'
    tbl.setAttribute('border', '1');
    tbl.setAttribute('cellspacing', '0')
    var tbdy = document.createElement('tbody');
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    td1.appendChild(document.createTextNode('Atributes'))
    td2.appendChild(document.createTextNode('Action'))
    td3.appendChild(document.createTextNode('Value'))

    tr1.appendChild(td1)
    tr1.appendChild(td2)
    tr1.appendChild(td3)

    tbdy.style.background = "#f9fdfd";
    tr1.style.fontWeight = "bold"
    tbdy.appendChild(tr1);
    tbl.appendChild(tbdy);
    return [tbdy, tbl];
}

function sideview(given_id) {
    var mainblock = document.createElement("DIV")
    mainblock.setAttribute("id", "bmainblock")
    mainblock.style.position = "absolute";
    mainblock.style.zIndex = 9;
    mainblock.style.top = 250;
    mainblock.style.left = 300;
    mainblock.style.border = "5px solid purple";
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
    mainblock.appendChild(header)

    var colorbox = document.createElement("DIV");
    colorbox.setAttribute("id", "value-display");
    colorbox.innerHTML = "Desired value"
    colorbox.style.background = "white"
    colorbox.style.width = 290;
    colorbox.style.color = "indigo"
    colorbox.style.fontWeight = "bold";
    colorbox.style.fontSize = "16px"
    colorbox.style.fontFamily = "calibri"
    colorbox.style.position = "relative";
    colorbox.style.left = 0;
    colorbox.style.padding = "6px 4px";
    mainblock.appendChild(colorbox);

    var [tbdy, tbl] = tableCreate()
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.appendChild(document.createTextNode('color'))
    td1.style.padding = "4px"
    tr1.appendChild(td1)   
    
    var st_btn = document.createElement("BUTTON");
    st_btn.innerHTML = "START";
    st_btn.style.marginRight = 20;
    st_btn.onclick = function() { startCount(this, given_id, "color");}

    var stop_btn = document.createElement("BUTTON");
    stop_btn.innerHTML = "STOP";
    stop_btn.onclick = function() { stopshow(this, 'color-display', 'color');}
    
    td2.appendChild(st_btn)
    td2.appendChild(stop_btn)

    var colorbox1 = document.createElement("DIV");
    colorbox1.setAttribute("id", "color-display");
    colorbox1.innerHTML = document.getElementById(given_id).style.color;
    colorbox1.style.background = "white"
    colorbox1.style.width = 120;
    colorbox1.style.position = "relative";
    colorbox1.style.left = 0;
    colorbox1.style.padding = "4px 4px";
    td3.appendChild(colorbox1)

    tr1.appendChild(td2)
    tr1.appendChild(td3)
    tbdy.appendChild(tr1)

    var tr2 = document.createElement('tr');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    td4.appendChild(document.createTextNode('background-color'))
    td4.style.padding = "4px"

    tr2.appendChild(td4)   
    
    var st_btn1 = document.createElement("BUTTON");
    st_btn1.innerHTML = "START";
    st_btn1.style.marginRight = 20;
    st_btn1.onclick = function() { startCount(this, given_id, "background-color");}

    var stop_btn1 = document.createElement("BUTTON");
    stop_btn1.innerHTML = "STOP";
    stop_btn1.onclick = function() { stopshow(this, 'backgroundcolor-display', 'background-color');}
    
    td5.appendChild(st_btn1)
    td5.appendChild(stop_btn1)

    var colorbox2 = document.createElement("DIV");
    colorbox2.setAttribute("id", "backgroundcolor-display");
    colorbox2.innerHTML = document.getElementById(given_id).style.background;
    colorbox2.style.background = "white"
    colorbox2.style.width = 120;
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

    tr3.appendChild(td7)   
    
    var st_btn2 = document.createElement("BUTTON");
    st_btn2.innerHTML = "START";
    st_btn2.style.marginRight = 20;
    st_btn2.onclick = function() { startCount(this, given_id, "font-family");}

    var stop_btn2 = document.createElement("BUTTON");
    stop_btn2.innerHTML = "STOP";
    stop_btn2.onclick = function() { stopshow(this, 'fontfamily-display', 'font-family');}
    
    td8.appendChild(st_btn2)
    td8.appendChild(stop_btn2)

    var colorbox3 = document.createElement("DIV");
    colorbox3.setAttribute("id", "fontfamily-display");
    colorbox3.innerHTML = document.getElementById(given_id).style.fontFamily;
    colorbox3.style.background = "white"
    colorbox3.style.width = 120;
    colorbox3.style.position = "relative";
    colorbox3.style.left = 0;
    colorbox3.style.padding = "4px 4px";
    td9.appendChild(colorbox3)

    tr3.appendChild(td8)
    tr3.appendChild(td9)
    tbdy.appendChild(tr3)


    tbl.appendChild(tbdy)
    mainblock.appendChild(tbl)   
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