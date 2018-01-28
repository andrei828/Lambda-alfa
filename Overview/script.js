var Months = [ ["January", 31], ["February", 29], ["March", 31],
				 ["April", 30], ["May", 31], ["June", 30], 
		  		 ["July", 31], ["August", 31], ["September", 30], 
		  		 ["October", 31], ["November", 30], ["December", 31] ];

function Event() {
	this.title;
	this.hour;
	this.minute;
	this.place;
	this.date;
	this.tag;
}

var copy_replace;
var copy_initial_children;

window.onload = function()
{
	Update_Block();
	var note = document.getElementsByClassName("col-sm-4")[0];
	writeNote(note, "first_note", "Eneter txt eerherh");

}

function GetEventList()
{
	// get from database
	
	var EventList = [];
	
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+1) + " " + date.getFullYear();
	
	// dummy data 
	var ev_1 = new Event();
	ev_1.title = "Meeting at lorem ipsum";
	ev_1.tag = "event_blue";
	ev_1.date = "28 1 2018";
	
	var ev_2 = new Event();
	ev_2.title = "Lunch afer sample text";
	ev_2.tag = "event_yellow";
	ev_2.date = "28 1 2018";
	
	var ev_3 = new Event();
	ev_3.title = "Meeting  tsgewg ir text data";
	ev_3.tag = "event_red";
	ev_3.date = "28 1 2018";
	
	var ev_4 = new Event();
	ev_4.title = "Lunch afer wertg";
	ev_4.tag = "event_yellow";
	ev_4.date = "11 8 2018";
	
	var ev_5 = new Event();
	ev_5.title = "Meeting sample text universal";
	ev_5.tag = "event_red";
	ev_5.date = "11 8 2018";
	
	var ev_6 = new Event();
	ev_6.title = "Lunch afer lorem";
	ev_6.tag = "event_yellow";
	ev_6.date = "20 9 2018";
	
	var ev_7 = new Event();
	ev_7.title = "Meeting ana are mere";
	ev_7.tag = "event_blue";
	ev_7.date = "20 9 2018";
	
	EventList.push(ev_1);
	EventList.push(ev_2);
	EventList.push(ev_3);
	EventList.push(ev_4);
	EventList.push(ev_5);
	EventList.push(ev_6);
	EventList.push(ev_7);
	// end dummy data
	
	return EventList;
}





function Create_Block()
{
	var block = document.createElement("div");
	block.id = "event_list";
	block.classList.add("list_event_block");
	
	var div_children = document.createElement("div");
	div_children.id = "children";
// Add title ****************************
	var title = document.createElement("div");
	title.id = "event_title_div";
	title.classList.add("mdl-layout__header-row");
	
	var text_span = document.createElement("span");
	text_span.classList.add("mdl-layout-title");
	text_span.id = "event_list_title";
	text_span.innerHTML = "Events";
	
	title.appendChild(text_span);
	div_children.appendChild(title);
// end title *****************************
	
// Add the + button **************************
	var add_button = document.createElement("button");
	add_button.classList.add("mdl-button");
	add_button.classList.add("mdl-js-button"); 
	add_button.classList.add("mdl-button--fab");
	add_button.classList.add("mdl-js-ripple-effect");
	add_button.classList.add("mdl-button--colored");
	add_button.id = "add_event";
	add_button.onclick = Plus_Add_Event_Button();
	
	var i = document.createElement("i");
	i.classList.add("material-icons");
	i.innerHTML = "add";
	
	add_button.appendChild(i);
	div_children.appendChild(add_button);
// end + button ********************************
	
// Add Today label ****************************
	var title_today = document.createElement("div");
	title_today.id = "event_date";
	title_today.innerHTML = GetDateToday();
	
	div_children.appendChild(title_today);
// end add today label **************************
	
// Add events for today*******************************
	var events_today = Add_Event_Today(GetEventList());
	
	div_children.appendChild(events_today);
// end add events *******************************
	
// Add break **********************
	br = document.createElement("br");
	
	div_children.appendChild(br);
// end add break **************************
	
// Add upcoming label ***************************
	var upcoming_label = document.createElement("div");
	upcoming_label.id = "up_ev_title";
	upcoming_label.innerHTML = "Upcoming Events";
	
	div_children.appendChild(upcoming_label);
// end add upcoming label ***********************
	
// Add upcoming dates ***************************
	
	var event_list = GetEventList();
	var date_list = new Set();
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+2) + " " + date.getFullYear();
	
	for (event of event_list)
	{
		if (evnt.date === string_date)
			continue;
		
		date_list.add(evnt.date);
	}
	for (date of date_list)
	{
		var event_up = Add_Upcoming_Events(date);
		
		div_children.appendChild(event_up);
	}
// end add upcoming dates ***********************
	block.appendChild(div_children);
	return block;
}



function Create_Block_Full()
{
	document.body.appendChild(Create_Block());
}

function X_Cancel_Event_Button()
{
	var block = document.getElementById("event_list");
	var replace = document.getElementsByClassName("replace")[0];
	//repl.style.display = "inline";
	block.removeChild(copy_replace);
	block.appendChild(copy_initial_children);
}

function Add_event_database()
{
	var tmp = new Event()
	tmp.title = document.getElementById("new_event_name").value;
	tmp.place = document.getElementById("new_event_place").value;
	tmp.hour = document.getElementById("event_hour_add").value;
	tmp.tag = "event_" + document.getElementById("event_tag_add").value;
	tmp.date = document.getElementById("event_day_add").value + ' ' + document.getElementById("event_month_add").selectedIndex + ' ' + document.getElementById("event_year_add").value;
	
	//add event to database
	
	console.log(tmp);
	X_Cancel_Event_Button();
}



function GetDateToday()
{	
	var date = new Date();
	return "Today, " + date.getDate() + ' ' + Months[date.getMonth()][0];
}


function Add_Event_Today_Tag(tag_color)
{
	var tag = document.createElement("div");
	tag.id = "event_color";
	tag.classList.add(tag_color);

	return tag;
}


function Add_Event_Today_Title(content)
{
	var title = document.createElement("div");
	title.id = "event_title";
	title.innerHTML = content;

	return title;
}



function Add_Event_Today(event_list)
{
	var event = document.createElement("div");
	event.id = "event";
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+1) + " " + date.getFullYear();
	
	for (evnt of event_list)
	{
		if (evnt.date === string_date) {
			var tag_div = Add_Event_Today_Tag(evnt.tag);
			var title_div = Add_Event_Today_Title(evnt.title);
			var br = document.createElement("br");
			event.appendChild(tag_div);
			event.appendChild(title_div);
			event.appendChild(br);
		}
	}
	return event;
}





function Add_Event()
{
	var event = document.createElement("div");
	event.id = "event";
	
// Add tag **************************
	var tag = document.createElement("div");
	tag.id = "event_color";
	tag.classList.add("event_blue");
	
	event.appendChild(tag);
// end add tag ***********************

// Add tag **************************
	var title = document.createElement("div");
	title.id = "event_title";
	title.innerHTML = "Meeting at lorem upsum";
	
	event.appendChild(title);
// end add tag **********************	

	return event;
}


function Add_Upcoming_Events(date) 
{
	if (date.size === 10)
	{
		var string_date = date.substring(0,2) + ", " + Months[parseInt(date.substring(3,4))][0];
	}
	else
	{
		var string_date = date.substring(0,2) + ", " + Months[parseInt(date[3])][0];
	}
	var event_upcom = document.createElement("div");
	event_upcom.id = "event_up";
	
	var event_up_date = document.createElement("div");
	event_up_date.id = "event_up_date";
	event_up_date.innerHTML = string_date;
	
	event_upcom.appendChild(event_up_date);
	
	var event_list = GetEventList();
	for (event of event_list)
	{
		if (date === event.date)
		{
			var tag_div = Add_Event_Today_Tag(event.tag);
			var title_div = Add_Event_Today_Title(event.title);
			var br = document.createElement("br");
			event_upcom.appendChild(tag_div);
			event_upcom.appendChild(title_div);
			event_upcom.appendChild(br);
		}
	}
	
	return event_upcom;
}

function Plus_Add_Event_Button()
{
	var block = document.getElementById("event_list");
	var replace = document.getElementsByClassName("replace")[0];
	
	block_initial_children = document.getElementById("children");
	
	copy_replace = replace.cloneNode(true);
	copy_replace.style.display = "block";
	copy_initial_children = block_initial_children.cloneNode(true);
	
	block.removeChild(block_initial_children);
	
	block.appendChild(copy_replace);
}


function Update_Block()
{	
// Add Today label ****************************
	var title_today = document.getElementById("event_date");
	title_today.innerHTML = GetDateToday();

// end add today label **************************
	
// Add events for today*******************************
	var event_list_today = document.getElementById("event");
	var events_today = Add_Event_Today(GetEventList());
	
	event_list_today.appendChild(events_today);
// end add events *******************************
	
// Add upcoming dates ***************************
	var upcoming_events = document.getElementById("upcoming_events");
	var event_list = GetEventList();
	var date_list = new Set();
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+2) + " " + date.getFullYear();
	
	for (event of event_list)
	{
		if (evnt.date === string_date)
			continue;
		
		date_list.add(evnt.date);
	}
	for (date of date_list)
	{
		var event_up = Add_Upcoming_Events(date);
		
		upcoming_events.appendChild(event_up);
	}
// end add upcoming dates ***********************
}






























function writeNote(dest, title, content) {

  center = document.createElement("center")
  note = document.createElement("div")
  note.classList.add("note")

  notetitle = document.createElement('span')
  notetitle.classList.add("note_title")
  notetitle.innerHTML = title
  note.appendChild(notetitle)

  form = document.createElement('form')
  form.action = '#'
  note.appendChild(form)

  textfield = document.createElement('div')
  textfield.classList.add('mdl-textfield')
  textfield.classList.add('mdl-js-textfield')
  textfield.classList.add('lmb-textfield')
  form.appendChild(textfield);
  
  noteContent = document.createElement('div')
  noteContent.classList.add('mdl-textfield__input')
  noteContent.classList.add('note_content')
  noteContent.contentEditable = 'true'
  noteContent.style.backgroundColor = "lemonchiffon";
  noteContent.type = 'text'
  noteContent.rows = '3'
  noteContent.innerHTML = content
  textfield.appendChild(noteContent);

  boldButton = document.createElement('button')
  boldButton.classList.add("mdl-button")
  boldButton.classList.add("mdl-js-button")
  boldButton.classList.add("mdl-button--raised")
  boldButton.classList.add("lmb-button")
  boldButton.style.backgroundColor = "white";
  boldButton.onclick = function() {
    document.execCommand('bold',false,null)
  }
  boldButton.innerHTML = "<strong>B</strong>"
  note.appendChild(boldButton)

  italicButton = document.createElement('button')
  italicButton.classList.add('mdl-button')
  italicButton.classList.add('mdl-js-button')
  italicButton.classList.add('mdl-button--raised')
  italicButton.classList.add('lmd-button')
  italicButton.style.backgroundColor = "white";
  italicButton.onclick = function () {
    document.execCommand('italic', false, null);
  }
  italicButton.innerHTML = "<italic>I</italic>"
  note.appendChild(italicButton)


  underlineButton = document.createElement('button')
  underlineButton.classList.add('mdl-button')
  underlineButton.classList.add('mdl-js-button')
  underlineButton.classList.add('mdl-button--raised')
  underlineButton.classList.add('lmd-button')
  
  underlineButton.onclick = function () {
    document.execCommand('underline', false, null);
  }

  underlineButton.innerHTML = "<u>U</u>"
  //underline.style.backgroundColor = "white"
  note.appendChild(underlineButton)
  center.appendChild(note);
/*
  savebutton.onclick = function () {
    var title = notetitle.innerHTML
    var content = noteContent.innerHTML
  }
*/

  dest.appendChild(center)
}

























