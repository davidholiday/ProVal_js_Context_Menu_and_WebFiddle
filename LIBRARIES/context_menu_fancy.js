/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
CONTEXT MENU DRIVER FOR VALIS
BY DAVID HOLIDAY
THEVAGRANTPHILOSOPHER@YAHOO.COM
WWW.PROJECTVALIS.COM
LAST UPDATE: 21JUN13


-=DESCRIPTION=-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

this is the main GUI driver for VALIS. it sets up the raphael canvas and handles user interface stuff. 

	
-=FUNCTIONS=-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

init : function() 
	PARAMETERS: 
		none
		
	DESCRIPTION: 
		bootstraps the system. creates the canvas and sets up mouse event handlers for the VALIS interface. 
	


	
draw_menu : function(xVal, yVal, hubID)	
	PARAMETERS: 
		xVal: x-axis value draw_menu will use to place the menu hub
		
		yVal: y-axis value draw_menu will use to place the menu hub
		
		hubID: string containing the name of the menu hub draw_menu will draw	
		
	DESCRIPTION: 
		based on the xy parameters and the name of the menu hub passed to it, draw_menu first directs draw_menu_item to
		draw the appropriate menu hub. it then reads CONTEXT_MENU_DATA.JSON and directs draw_menu_item to draw every 
		button listed as a child of the hub specified by hubID.  
		
		

		
draw_menu_item : function (itemObj, xVal, yVal, hubIconPos, isHub, otherHub)
	PARAMETERS: 
		itemObj: the spahQL object (created by draw_menu when it reads CONTEXT_MENU_DATA.JSON) representing the button 
			to be drawn.
		
		xVal: x-axis location at which to place itemObj
		
		yVal: y-axis location at which to place itemObj
		
		hubIconPos: raphael transform string representing the location of the menu hub's icon 
		
		isHub: boolean indicating whether or not itemObj should be drawn as the menu hub or not
		
		otherHub: spahQL object (created by draw_menu when it reads CONTEXT_MENU_DATA.JSON) representing the hub to 
			which itemObj should be attached. normally, draw_menu_item is called with itemObj == otherHub, which tells 
			draw_menu_item to attach itemObj to the menu hub. if itemObj != otherHub, draw_menu_item will attach 
			itemObj to otherHub instead. 

	DESCRIPTION: 
		draw_menu_item is the function that actually draws menu items on the screen. it is called by draw_menu and fed 
		all the data it needs to put the button on the screen. it also calls draw_connecting_lines to cause the spokes 
		connecting the menu hub with the child buttons to be drawn. 
		
		


undraw_element: function (id)		
	PARAMETERS: 
		id: string representing the name of the menu button to be undrawn. 
		
	DESCRIPTION: 
		undraws a menu button. also handles undrawing of the spoke connecting the menu item to the rest of the menu



	
undraw_menu : function (newHub)	
	PARAMETERS: 
		newHub: string representing the id of the new menu hub. this string can also equal 'transition'. it's a 
			holdover method of handling cases where we don't want to undraw the entire menu at once. it may be worth 
			refactoring the code to get rid of this as staged undrawing of menu items is handled quite nicely by 
			pushing and popping the removeOrderArray.
		
	DESCRIPTION: 
		facilitates undrawing the menu.
		
		
		
		
remove_elements : function()		
	PARAMETERS: 
		none
	
	DESCRIPTION: 
		goes through the removeArray (an array of menu items populated by undraw_menu) and kills off the 
		corrosponding menu items in the menu set. this is different than simply undrawing the element (which just 
		makes the item invisible to the user). here we actually kill off the raphael object representing the menu item. 


	
	
check_event_handlers : function(e, elementID)
	PARAMETERS:
		e: raphael element representing a menu button that has been clicked on
		elementID: string containing the name of the element that got clicked
		
	DESCRIPTION: 
		called by init() when the event handlers are setup. it tells VALIS what to do when a menu item gets clicked
	
	
	
	
draw_connecting_lines : function(fromRx, fromRy, fromR, toRx, toRy, toR, toID)
	PARAMETERS: 
		fromRx: xValue of the center of the button that serves as the starting point of the line
		fromRy: yValue of the center of the button that serves as the starting point of the line
		fromR: radius of the button that serves as the origin on the line
		toRx: xValue of the center of the button that serves as the end point of the line
		toRy: yValue of the center of the button that serves as the end point of the line
		toR: radius of the button that serves as the end point of the line
		toID: string containing the name of the button to which the line is being drawn
		
	DESCRIPTION: 
		draws the lines between the menu hub and the child menu elements. lines are drawn and undrawn *mostly* 
		correctly. fortunately it happens fast enough to where the naked eye cannot detect the lines that don't quite 
		draw correctly. works by creating a unit vector then scaling the vector to whatever size is needed. 


		
		

_stopEvent, _addEvent, _removeEvent
	DESCRIPTION: 
		event handlers used to capture the right click mouse event and override the default browser context menu. 
		these functions were downloaded from http://www.openjs.com/scripts/ui/context_menu/



		
hide: function(redraw)
	PARAMETERS: 
		redraw: boolean that indicates whether or not we are redrawing the context menu at a different location 
		
	DESCRIPTION: 
		kills off all the menu items (kills the raphael objects, doesn't just hide them) and, if appropriate, gets 
		rid of the canvas overlay effect.



		
-=TO DO=-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

- TOOLTIPS

- relase license 

- not all of the icons are the ones you want to use! 

- folder icon stroke width 2 -- add icon stroke width to json - HUB STROKE WIDTH

- change name from ContextMenuFancy to something like VALIS-GUI

- make it so the user can move any menu item anywhere they want

- add SC2 menu sounds (user can turn them off)

- add HUBID >  [menu that's hovered over] text somewhere below the menu (user can turn on/off)

- get mouse position stuff and mouse event stuff need to be changed so it's your code and not something you downloaded 
from the internets. jQuery seems to do a good job of handling both. Try using that instead. ($.on())

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**/	




var ContextMenuFancy = {
	//raphael canvas 
	"paper": "",
	
	//when the menu is drawn, this is where all the elements of the menu are stored
	"menu_set": "",
	
	//set containing the mouse hover effect elements (the glow behind the button when the user hovers over it)
	"hover_set": "",
	
	//boolean indicating whether or not the browser window is being resized
	"resize": "",
	
	//DEPRECATED 
	//"cover_box": null,
	
	//variable indicating which mouse button was pressed
	"mButton": null,
	
	//position and name of currently drawn hub
	"curX": null,
	"curY": null,
	"curHub": "home",
	
	//hover effect variables
	"over": null,
	"out" : null,
	
	//because we can't remove elements from within undraw menu without screwing up the 
	//animation, we populate an array of this name with the indexes of the elements to 
	//be removed, and remove them in a separate function.
	"removeArray": null,
	
	//because we sometimes have several tiers of menu items, we need a way to keep track 
	//of the order in which elements should be removed. THIS is that way! 
	"removeOrderArray": new Array(),
		
	//context menu SpahQL object
	"cm_db": null,
	
	//flag which is used by the context menu event handler to determine whether or not it needs to stop the place 
	//context bubble event (incase the user right clicks whilst it is in progress)
	"placeContextBubbleInProgress" : false,
	
	init : function() {
		//tells us whether or not this fucntion was called as the result of a window resize event
		ContextMenuFancy.resize = false;
	
		if (ContextMenuFancy.paper == "") {
			//initialize canvas
			ContextMenuFancy.paper = new Raphael(0, 0, window.innerWidth, window.innerHeight); 				
		}
		else {
			//hide context menu
			var canvas_opacity = $("#canvas_container").css("opacity");		
			ContextMenuFancy.hide(/*!ContextMenuFancy.cover_box*/ !canvas_opacity=="1");
		
			//resize canvas
			ContextMenuFancy.paper.setSize(window.innerWidth, window.innerHeight);
			
			//set resize variable so we don't have issues with elements already on the canvas
			ContextMenuFancy.resize = true;
			
		}
		
		//create Raphael set for context menu elements
		ContextMenuFancy.menu_set = ContextMenuFancy.paper.set();
		
		//create Raphael set for hover effect elements
		ContextMenuFancy.hover_set = ContextMenuFancy.paper.set();
		
		//no need to do this if the window is being resized because all this stuff
		//has already been taken care of 
		if (ContextMenuFancy.resize == false) {
		
			//reinitialize canvas if the user resizes the browser
			ContextMenuFancy._addEvent(window,"resize",ContextMenuFancy.init);

			//setup event handler for mouse clicking 
			ContextMenuFancy._addEvent(document, "click", function(e) {
				//check to make sure no element is under the mouse
				isFocus = false;
				
				/*
				get mouse position stuff from 
				http://www.quirksmode.org/js/events_properties.html
				*/
				var posx = 0;
				var posy = 0;
				if (!e) var e = window.event;
					
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}	
				/*
				*/

				//check to see if button was pressed
				bbox = ContextMenuFancy.menu_set.getBBox();

				if (Raphael.isPointInsideBBox(bbox, posx, posy) == true) {
					isFocus = true;
					ContextMenuFancy.mButton = e.button;	

					ContextMenuFancy.menu_set.forEach(function(e) {
	
						if (e == undefined) {return;};
	
						if (e.node != null && e.node.id != "") {
							bboxTemp = e.getBBox();
							
							if (Raphael.isPointInsideBBox(bboxTemp, posx, posy)) {
								ContextMenuFancy.check_event_handlers(e, e.node.id, posx, posy);
							}
						
						}
				
					});
				
				}
				
				//if the user didn't right click somewhere else AND if the click wasn't within the 
				//boundary of the context menu, hide the context menu
				if (e.button != 2 && isFocus == false) {
					//ContextMenuFancy.hide(false);
					ContextMenuFancy.undraw_menu();
					ContextMenuFancy.hide(false);
				}
		
			});	
			
			//setup event handler for the context menu 
			ContextMenuFancy._addEvent(document, "contextmenu", function(e) {
			
				//check to see if user is trying to open the menu whilst a place context bubble operation is in progress
				if (ContextMenuFancy.placeContextBubbleInProgress == true) {ContentHandler.kill_add_bubble_event()};	

				//disable browser context menu
				ContextMenuFancy._stopEvent(e); 
			
				/*
				get mouse position stuff from 
				http://www.quirksmode.org/js/events_properties.html
				*/
				var posx = 0;
				var posy = 0;
				if (!e) var e = window.event;
					
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}	
				/*
				*/
				
				//setup removeArray, which we'll need later to undraw the menu
				ContextMenuFancy.removeArray = new Array();
				
				
				//draw the context menu at mouse pointer location
				ContextMenuFancy.draw_menu(posx, posy, ContextMenuFancy.curHub);			
			});
			
		}
		
	},

	
	draw_menu : function(xVal, yVal, hubID) {
		//flag to see if we are redrawing the menu
		var redraw = false;
		
		//flag to see if we're transitioning to a new hub
		var newHub = false;
		
		//flag to see if the hub has been drawn
		var hubDrawn = false;
		
		//flag to see if the home button has been drawn incase it isn't the hub
		var homeDrawn = false; 
		
		//check to see if the screen has already been darkened. if so, we know this is a redraw event
		//and we 1) don't redarken the screen  2) remove the old menu so we can redraw it at the new xy pos
		var canvas_opacity = $("#canvas_container").css("opacity");
		
		if (canvas_opacity != "1") {
			redraw = true
	
			//if the hubID doesn't match the global hubID, then we're not
			//repositioning the menu, we're here to transition to a new hub
			if (ContextMenuFancy.curHub == hubID) {
				ContextMenuFancy.hide(redraw);
			}
			else {
				newHub = true;
			}
			
		}
		else {
			//this overlays the entire screen
			//ContextMenuFancy.cover_box = ContextMenuFancy.paper.rect(0, 0, window.innerWidth, window.innerHeight).attr({opacity: .8, color: "#ff9900", fill: /*"#ff9900"*/ "#aaa"});
			
			//this changes the opacity of the canvas box
			document.getElementById("canvas_container").style.opacity = ".3";
			
			//set homeDrawn flag because it's going to be the hub
			homeDrawn = true;
		};	

		
		//check to see if we need to transition to a new hub. 
		if (newHub == true) {
		
			//collapse new hub into old hub and 'enhance' 
			ContextMenuFancy.undraw_menu('transition');

			if (hubID == 'home') {homeDrawn = true};
			
			//remove any elements from the menu set that no longer belong
			//setTimeout(function() {ContextMenuFancy.remove_elements();}, 100);
			ContextMenuFancy.remove_elements();  
					


			/*
			14JUN13 - this is going to have to be addressed at some point. the transition between old hub and new hub is handled by
			killing off the element that is going to be the new hub and redrawing it. Ideally that element won't be killed off, but
			kept and designated as the new hub. the issues are 1) remove_elements has a hard time figuring out what needs to be removed
			and what needs to be kept because there's a lot of duplicate stuff in the menu_set - button objects and sets containing the
			button objects. also, the mouse hover handler needs to be moved. finally, sending the string 'transition' to undraw_menu is
			causing problems, because the intent of that variable is to tell undraw_menu what the new hub is going to be. the best fix
			is probably to add a boolean called 'transition' to accomplish the effect. 
			
			once you've got this fixed, un-comment the hubDrawn statement 
			*/
					
			//indicate that the hub has been drawn
			//hubDrawn = true;
		}
	
		//update global current hub variable
		ContextMenuFancy.curHub = hubID;
		
		
		//check x, y position and modify if necessary to prevent offscreen drawing
		//first figure out the ratio of context menu size to screen size
		var xRatio = (190 / window.innerWidth); 
		var yRatio = (190 / window.innerHeight);
				
		var xMax = window.innerWidth * (1 - xRatio);
		var xMin = window.innerWidth * xRatio;
		var yMax = window.innerHeight * (1 - yRatio);
		var yMin = window.innerHeight * yRatio;

		if (xVal > xMax) {xVal = xMax};
		if (xVal < xMin) {xVal = xMin};
		if (yVal > yMax) {yVal = yMax};
		if (yVal < yMin) {yVal = yMin};
		
		//populate global x/y vars
		ContextMenuFancy.curX = xVal;
		ContextMenuFancy.curY = yVal;		
			
		//populate hub icon position variable
		var hubIconPos = "t" + (xVal - 15) + "," + (yVal - 15);		
		
		//setup the glow functions
		ContextMenuFancy.over = function (event) { 
            ContextMenuFancy.hover_set.push(this.glow({opacity: 1, color: /*this.attr("fill")*/ "#90989c", width: 7}));
		}    
	
		ContextMenuFancy.out = function (event) {                           
			ContextMenuFancy.hover_set.remove();
		};   
		
		
		/*
		read the JSON data and draw the menu
		*/		
		$.getJSON("LIBRARIES/context_menu_data.json", function(data) {
			//take JSON data and plop it into a SpahQL database
			ContextMenuFancy.cm_db = SpahQL.db(data);
			
			
			//this selects only entries where 'hub' == 'settings'	
				//var hubs = cm_db.select("/data/*/[/hub == 'settings']");
				
			//this spits out the value of the 'id' field of the previously filtered list	
				//console.log(hubs.select("/id").value());
		

			
			//if necessary, find the hub and draw it
			if (hubDrawn == false) {
				var hub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + hubID + "']");
				ContextMenuFancy.draw_menu_item(hub, xVal, yVal, hubIconPos, true, hub);
				if (hubID == 'home') {homeDrawn = true};
			}
			
			//find all children of the current hub and draw them
			var children = ContextMenuFancy.cm_db.select("/data/*/[/hub == " + "'" + hubID + "']"); 
			ContextMenuFancy.draw_menu_item(children, xVal, yVal, hubIconPos, false, children);
			
			//if we are in a submenu, we need to draw the chain of menus until we draw the home button
			var hubID_temp = hubID;
			var adOrderArray = new Array(); //[child1][hub1][child2][hub2]...
			
			//populate adOrderArray so when we have a multi-tiered menu we stagger the animation correctly
			while (homeDrawn == false) {		
				var hub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + hubID_temp + "']");
				var prevHubID = hub.select("/hub").value();	
				var prevHub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + prevHubID + "']");
				adOrderArray.push(prevHub);
				adOrderArray.push(hub);
				hubID_temp = prevHubID;
				if (prevHub.select("/id").value() == 'home') {homeDrawn = true};	
			}
		
			//draw items in adOrderArray
			var multiplier = 0;
			
			for (var i = 0; i < adOrderArray.length; (i = i + 2)) {
				setTimeout(function() {ContextMenuFancy.draw_menu_item(adOrderArray.shift(), xVal, yVal, hubIconPos, false, adOrderArray.shift());}, ((multiplier) * 200));	
				multiplier++;
			}
			
			
		});	
		
	},

	
	draw_menu_item : function (itemObj, xVal, yVal, hubIconPos, isHub, otherHub) {

		for (var i = 0; i < itemObj.length; i ++) {
			//create set for button + icon
			var button_set = ContextMenuFancy.paper.set();
			
			//set hubRadius for when we have to draw spokes
			var hubRadius = 30;

			//get button data
			var id = itemObj.item(i).select("/id").value();
			var color = itemObj.item(i).select("/color").value();
			var icon_path = itemObj.item(i).select("/icon_path").value();
			var icon_color = color;
			var icon_stroke_color = "#ffffff";
			
			//if itemObj (what we're drawing) doesn't equal otherHub, we know we are connecting itemObj to something other
			//than the the current menu hub
			if (itemObj == otherHub) {
				var buttonX_offset = itemObj.item(i).select("/position_offsets/buttonX").value();
				var buttonY_offset = itemObj.item(i).select("/position_offsets/buttonY").value();
				var iconX_offset = itemObj.item(i).select("/position_offsets/iconX").value();
				var iconY_offset = itemObj.item(i).select("/position_offsets/iconY").value();
			}
			else {
				var buttonX_offset = otherHub.item(i).select("/position_offsets/buttonX").value();
				var buttonY_offset = otherHub.item(i).select("/position_offsets/buttonY").value();
				var iconX_offset = otherHub.item(i).select("/position_offsets/iconX").value();
				var iconY_offset = otherHub.item(i).select("/position_offsets/iconY").value();
			}
			
			
			var buttonSize = 23;
			
			//if hub is true, we're drawing the hub and need to change the variables a bit
			if (isHub == true) {
				buttonSize = 30;
				icon_color = "#000"
				icon_stroke_color = "#000";
				buttonX_offset = 0;
				buttonY_offset = 0;
			}
			
			//draw button and populate hub variable. if otherhub is present, populate that instead
			var button = ContextMenuFancy.paper.circle(xVal, yVal, buttonSize).attr({"opacity":0.0});
			if (isHub == true) {hubElement = button};
			var hubElementPosX = hubElement.attr('cx');
			var hubElementPosY = hubElement.attr('cy');
			
			//populate button position variables
			var buttonX = xVal + buttonX_offset;
			var buttonY = yVal + buttonY_offset;
			
			//setup variable containing the hubID of the current actual hub
			var actualCurrentHub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + ContextMenuFancy.curHub + "']");
			var hubIDofActualCurrentHub = actualCurrentHub.select('/hub').value()
			
			//we have to use the offsets because when you transform an object (ie, move it), its XY pos. isn't updated 
			//the second condition ensures we don't update the XY values in the case that we're hooking up to the current hub
			//
			//also update button position variables to reflect newhub position. we need to figure out where curHub was drawn
			//in the menu that's one level closer to the home menu than what's currently displayed. therefore, we need to 
			//find out where the current hub WAS drawn in the previous menu.
			//
			//also, we need to update the home position of the button and icon so it animates properly 
			//
			if ((itemObj != otherHub) && (otherHub.select("/id").value() != ContextMenuFancy.curHub)) {
				
				//find position of current hub 
				var curHub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + ContextMenuFancy.curHub + "']");
				hubElementPosX = hubElement.attr('cx') + curHub.select("/position_offsets/buttonX").value();
				hubElementPosY = hubElement.attr('cy') + curHub.select("/position_offsets/buttonY").value();
				
				//if curHub's HUB value doesn't equal the otherHub's HUB value, keep looking and adding to the offset variables until we found the 
				//correct hub. this way we can find the current position of otherHub (the button to which we are trying to connect)
				while (curHub.select('/hub').value() != otherHub.select('/id').value()) {
					curHub = ContextMenuFancy.cm_db.select("/data/*/[/id == " + "'" + curHub.select('/hub') + "']");
					hubElementPosX = hubElementPosX + (curHub.select("/position_offsets/buttonX").value() / 1.4);
					hubElementPosY = hubElementPosY + (curHub.select("/position_offsets/buttonY").value() / 1.4);
					
					//add elements to the removeOrder array so undraw_menu knows what order to remove elements 
					//so long as curHub isn't currently in the first tier of menu items
					if (curHub.select('/id').value() != hubIDofActualCurrentHub) {
					
						//make sure the array doesn't already have this element
						var inArray = false;
						
						for (var i = 0; i < ContextMenuFancy.removeOrderArray.length; i ++) {
							if (ContextMenuFancy.removeOrderArray[i] == curHub.select('/id').value()) {inArray = true;}
						}
						
						if (inArray == false) {
						ContextMenuFancy.removeOrderArray.push(curHub.select('/id').value());
						}
	
					}
					
				}
				
				//add otherHub and itemObj to the remove order list	
				//so long as curHub isn't currently in the first tier of menu items
				if (otherHub.select('/id').value() != hubIDofActualCurrentHub) {
				
					//make sure the array doesn't already have this element
					var inArray = false;
						
					for (var i = 0; i < ContextMenuFancy.removeOrderArray.length; i ++) {
						if (ContextMenuFancy.removeOrderArray[i] == otherHub.select('/id').value()) {inArray = true;}
					}
				
					if (inArray == false) {
						ContextMenuFancy.removeOrderArray.push(otherHub.select('/id').value());
					}
					
				}
	
				//add itemObj to the remove order list
				//make sure the array doesn't already have this element
				var inArray = false;
						
				for (var i = 0; i < ContextMenuFancy.removeOrderArray.length; i ++) {
					if (ContextMenuFancy.removeOrderArray[i] == itemObj.select('/id').value()) {inArray = true;}
				}
				
				if (inArray == false) {
					ContextMenuFancy.removeOrderArray.push(itemObj.select('/id').value());
				}
				
				//reduce the scale of the offsets so the menu doesn't get large and wonky
				buttonX_offset = buttonX_offset / 1.4;
				buttonY_offset = buttonY_offset / 1.4;
				
				//set position of the button
				buttonX = hubElementPosX + buttonX_offset;
				buttonY = hubElementPosY + buttonY_offset;
				
				//update button and setup button variables
				button = ContextMenuFancy.paper.circle(hubElementPosX, hubElementPosY, buttonSize).attr({"opacity":0.0});
				hubIconPos = "t" + (hubElementPosX - 15) + "," + (hubElementPosY - 15);		
				hubRadius = 23;
			}
			
			//animate the button
			button.animate({fill: color, stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": buttonX, "cy": buttonY, "opacity": 1.0}, 200);
			
			//set button id and save hubposition so we can undo the animation later
			button.node.id = id;
			button.node.hubElementPosX = hubElementPosX;
			button.node.hubElementPosY = hubElementPosY;
			
			//set mouse hover function
			button.hover(ContextMenuFancy.over, ContextMenuFancy.out);
			
			//add button to context menu set
			ContextMenuFancy.menu_set.push(button);	
			
			//add button to set with icon
			button_set.push(button);
			
			//draw icon
			var icon = ContextMenuFancy.paper.path(icon_path).attr({fill: icon_color, stroke: icon_stroke_color, "stroke-width": 1.3}).transform(hubIconPos);
			var icon_position = "t" + (buttonX + iconX_offset) + "," + (buttonY + iconY_offset);
			var icon_animate = Raphael.animation({transform: icon_position}, 200);
			icon.animate(icon_animate);
			
			//save some data so we can undo the animation later 
			icon.node.xOff = (buttonX + iconX_offset);
			icon.node.yOff = (buttonY + iconY_offset);
			icon.node.hubIconPos = hubIconPos;
			
			//make sure icon doesn't interfere with mouse events  
			icon.node.setAttribute("pointer-events", "none");

			//add button icon to context menu set
			//ContextMenuFancy.menu_set.push(icon);
			
			//add icon to set with button
			button_set.push(icon);
			
			//draw line between hub and add context bubble node
			//don't do this for the hub
			if (isHub == false) {
				ContextMenuFancy.draw_connecting_lines(hubElementPosX, hubElementPosY, hubRadius, buttonX, buttonY, button.attr('r'), id);			
			}
			
			//add spoke to button set
			//button_set.push(spoke);
			
			//add button set to menu set
			ContextMenuFancy.menu_set.push(button_set);
		}
		
	},
	
	
	undraw_element: function (id) {
		var undrawIt = false;
		var id = ContextMenuFancy.removeOrderArray.pop();
		
		//go through menu_set, find that element, and undraw it
		ContextMenuFancy.menu_set.forEach(function(e, index) {
		
			if (e.constructor.prototype == Raphael.st) {

				e.forEach(function(e) {

					if (e.node.id == id) {
						undrawIt = true;
					}
						
				});
									
				if (undrawIt == true) {
		
					//add to the remove list 
					ContextMenuFancy.removeArray.push(index);
					
					//get rid of the hover handler incase the mouse is over a button
					ContextMenuFancy.hover_set.remove();
						
					e.forEach(function(e) {
						e.unhover(ContextMenuFancy.over, ContextMenuFancy.out);
					});
				
					//because Raphael is stupid and doesn't let you reposition a path object in the same way as you 
					//can circles and squares and stuff, we have to do this the hard way to ensure the icon is nicely 
					//animated allong with the underlying button					
					e.forEach(function(e) {

						//if true we're dealing with the button and not the icon
						if (e.node.id != "") {
							e.unhover(ContextMenuFancy.over, ContextMenuFancy.out);								
							e.animate({"cx": e.node.hubElementPosX, "cy": e.node.hubElementPosY, "opacity": 0}, 200);
						}
						else {
							var icon_position = ("t" + e.node.xOff + "," + e.node.yOff);
							var icon = e.transform(icon_position);	
							var icon_animate = Raphael.animation({opacity: 0, transform: e.node.hubIconPos}, 200);							
							icon.animate(icon_animate);			
						}	
						
					});	
				
				}
				
			}
			//undraw spokes
			else if (isNaN(e.id)) {
			
				//ensures we don't undraw the spoke between the newHub and the old one
				//if (e.id != (newHub + " spoke")) {
				if (e.id == (id + " spoke")) {
					//add to the remove list
					ContextMenuFancy.removeArray.push(index);	
						
					//pull out x and y pairs
					var path = e.attr("path").toString();
					var mCommaPos1 = path.indexOf(",");
					var mCommaPos2 = path.indexOf(",", (mCommaPos1 + 1));
					var lPos = path.indexOf("L");
					var curIndex = 0;
					var xFrom = path.substring(1, mCommaPos1);
					var yFrom = path.substring((mCommaPos1 + 1), lPos);
					var xTo = path.substring((lPos + 1), mCommaPos2);
					var yTo = path.substring((mCommaPos2 + 1));
													
					//calculate slope, y intercept with axis, and distance
					var deltaX = xTo - xFrom;
					var deltaY = yTo - yFrom;
					var slope = deltaY / deltaX;
					var b = yFrom - (slope * xFrom);
					var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
					
					//figure out if which way to go on the x-axis
					var xMod = -1;
					if (xTo < ContextMenuFancy.curX) {xMod = 1;}
					
					//setup new x y variables
					var xFromNew = xTo;
					var yFromNew = yTo;
					var xToNew = xFrom;
					var yToNew = yFrom;
					
					//loop until line has been undrawn
					//populate lastDistance with a value impossibly high so we are
					//assured it will be repleaced in the first iteration
					var lastDistance = 1000;
					var newPath = e.attr("path").toString();
					
					/*INCASE I FORGET LATER - we're doing this the hard way because when you simply reverse the 
					'M' and 'L' variables in the path string and animate it, the effect isn't wonky and not what
					you're looking for. 					
					*/
					while (distance > 1) {
				
						//this checks for instances in which deltaX or deltaY are zero
						if (slope != "Infinity") {

							//get new x y values and update the spoke's path string
							xFromNew = (xFromNew * 1) + xMod;
							yFromNew = (slope * xFromNew) + b;
							
							//recalculate distance
							deltaX = xToNew - xFromNew;
							deltaY = yToNew - yFromNew;
							distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
							
							//ensures we don't overshoot the mark
							if (distance < lastDistance) {
								lastDistance = distance;
								//e.attr("path", ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew));
								newPath = ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew);
							}
							else {
								distance = 0;
							}

						}
						else {				
					
							//figure out which is zero
							if (deltaX == 0) {
								yFromNew --;
								distance = Math.abs(yToNew - yFromNew);							
							}
							else {
								xFromNew --;
								distance = Math.abs(xToNew - xFromNew);
							}
							
							//ensures we don't overshoot the mark
							if (distance < lastDistance) {
								lastDistance = distance;
								newPath = ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew);
								//e.attr("path", ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew));
							}
							else {
								distance = 0;
							}
												
						

						}		
						
					}	
					//value was 127
					e.animate({"path": newPath, "opacity": 0}, 117);
			
				}
			
			}
		
		});
		

	},
	
	
	undraw_menu : function (newHub) {	
		//first get rid of the hover handler incase the mouse is over a button
		ContextMenuFancy.hover_set.remove();
			
		//collapse other buttons
		ContextMenuFancy.menu_set.forEach(function(e, index) {
			var keeper = false; 
	
			/* cycle through menu_set looking for the button/icon/spoke subsets created by draw_menu(). 
				if it's not the button that was just clicked, collapse it into the hub				
			*/
			
			//make sure we aren't about to disappear the hub or what's going to 
			//become the hub
			if (e.constructor.prototype == Raphael.st) {
						
				e.forEach(function(e) {

					if (e.node.id == newHub || e.node.id == ContextMenuFancy.curHub) {
						keeper = true;
					}
						
				});
				
				if (!keeper) {
					
					//add to the remove list 
					ContextMenuFancy.removeArray.push(index);
				
					//get rid of the hover handler incase the mouse is over a button
					ContextMenuFancy.hover_set.remove();
					
					e.forEach(function(e) {
						e.unhover(ContextMenuFancy.over, ContextMenuFancy.out);
					});
					
					//because Raphael is stupid and doesn't let you reposition a path object in the same way as you 
					//can circles and squares and stuff, we have to do this the hard way to ensure the icon is nicely 
					//animated allong with the underlying button	
					e.forEach(function(e) {
					
						/*
						this function gets called twice when we are transitioning from one menu to another. 
						if that's the case, the first time though will get rid of all the menu elements but
						the new hub. the second time through draw_menu() is the caller and this routine will
						facilitate the transition in the case that var newHub == 'transition'. meow. 	
						*/
						if (newHub != 'transition') {

							//if true we're dealing with the button and not the icon
							if (e.node.id != "") {
								e.unhover(ContextMenuFancy.over, ContextMenuFancy.out);
								e.animate({"cx": e.node.hubElementPosX, "cy": e.node.hubElementPosY, "opacity": 0}, 200);
							}
							else {
								var icon_position = ("t" + e.node.xOff + "," + e.node.yOff);
								var icon = e.transform(icon_position);							
								var icon_animate = Raphael.animation({opacity: 0, transform: e.node.hubIconPos}, 200);
								icon.animate(icon_animate);
							}
							
						}
						//move the new hub into position 
						else if ((newHub == 'transition') && (e.node.id != ContextMenuFancy.curHub)) {	

							//if true we're dealing with the button and not the icon
							if (e.node.id != "") {
								e.animate({"cx": ContextMenuFancy.curX, "cy": ContextMenuFancy.curY, "r": 30}, 200);
							}
							else {
								var icon_position = ("t" + e.node.xOff + "," + e.node.yOff);
								var icon = e.transform(icon_position);							
								var icon_animate = Raphael.animation({transform: e.node.hubIconPos, fill: "#000000", stroke: "#000000"}, 200);
								icon.animate(icon_animate);
							}
							
						}

					});					
					
				}
				
			}
			//undraw spokes
			else if (isNaN(e.id)) {
			
				//ensures we don't undraw the spoke between the newHub and the old one
				if (e.id != (newHub + " spoke")) {

					//add to the remove list
					ContextMenuFancy.removeArray.push(index);	
						
					//pull out x and y pairs
					var path = e.attr("path").toString();
					var mCommaPos1 = path.indexOf(",");
					var mCommaPos2 = path.indexOf(",", (mCommaPos1 + 1));
					var lPos = path.indexOf("L");
					var curIndex = 0;
					var xFrom = path.substring(1, mCommaPos1);
					var yFrom = path.substring((mCommaPos1 + 1), lPos);
					var xTo = path.substring((lPos + 1), mCommaPos2);
					var yTo = path.substring((mCommaPos2 + 1));
													
					//calculate slope, y intercept with axis, and distance
					var deltaX = xTo - xFrom;
					var deltaY = yTo - yFrom;
					var slope = deltaY / deltaX;
					var b = yFrom - (slope * xFrom);
					var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
					
					//figure out if which way to go on the x-axis
					var xMod = -1;
					if (xTo < ContextMenuFancy.curX) {xMod = 1;}
					
					//setup new x y variables
					var xFromNew = xTo;
					var yFromNew = yTo;
					var xToNew = xFrom;
					var yToNew = yFrom;
					
					//loop until line has been undrawn
					//populate lastDistance with a value impossibly high so we are
					//assured it will be repleaced in the first iteration
					var lastDistance = 1000;
					var newPath = e.attr("path").toString();
					
					/*INCASE I FORGET LATER - we're doing this the hard way because when you simply reverse the 
					'M' and 'L' variables in the path string and animate it, the effect isn't wonky and not what
					you're looking for. 					
					*/
					while (distance > 1) {
				
						//this checks for instances in which deltaX or deltaY are zero
						if (slope != "Infinity") {

							//get new x y values and update the spoke's path string
							xFromNew = (xFromNew * 1) + xMod;
							yFromNew = (slope * xFromNew) + b;
							
							//recalculate distance
							deltaX = xToNew - xFromNew;
							deltaY = yToNew - yFromNew;
							distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
							
							//ensures we don't overshoot the mark
							if (distance < lastDistance) {
								lastDistance = distance;
								//e.attr("path", ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew));
								newPath = ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew);
							}
							else {
								distance = 0;
							}

						}
						else {				
					
							//figure out which is zero
							if (deltaX == 0) {
								yFromNew --;
								distance = Math.abs(yToNew - yFromNew);							
							}
							else {
								xFromNew --;
								distance = Math.abs(xToNew - xFromNew);
							}
							
							//ensures we don't overshoot the mark
							if (distance < lastDistance) {
								lastDistance = distance;
								newPath = ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew);
								//e.attr("path", ("M" + xFromNew + "," + yFromNew + "L" + xToNew + "," + yToNew));
							}
							else {
								distance = 0;
							}
						
						
						

						}		
						
					}	
					//value was 127
					e.animate({"path": newPath, "opacity": 0}, 117);
			
				}
			
			}
				
		});
		
		//if we aren't transitioning to a new menu, kill all the elements
		if (newHub == null) {
			ContextMenuFancy.menu_set.forEach(function(e) {
				
				
				//the only set should be the hub button set
				if (e.constructor.prototype == Raphael.st) {
				
					//first get rid of the hover handler incase the mouse is over a button
					ContextMenuFancy.hover_set.remove();
					
					e.forEach(function(e) {
						e.unhover(ContextMenuFancy.over, ContextMenuFancy.out);
					});
					
					//make the hub dissapear 
					e.animate({"opacity": 0}, 4200, function() {/*ContextMenuFancy.hide(false);*/});
				}
				
			});

		}

		
	},
	

	
	
	//go through the remove array and kill off the appropriate elements 
	//var index is to account for the shift in indexing as we remove stuff	
	remove_elements : function() {

		for (var i = 0; i < ContextMenuFancy.removeArray.length; i++) {
			var index = ContextMenuFancy.removeArray[i] - i;
			var foo = ContextMenuFancy.menu_set.splice(index, 1);	
			foo.remove();
		}	
		
	},
	
	
	check_event_handlers : function(e, elementID) {
				
		//setup a variable so we don't needlessly cycle through the remaining elements in the set
		//var done = false;

		ContextMenuFancy.menu_set.forEach(function(e) {	

			if (e == undefined) {
				return;
			}
	
			if (e.constructor.prototype == Raphael.st) {
				return;
			}		

			if (e.node == null) {
				return;
			}

			if (e.node.id == elementID) {

				switch(e.node.id) {
				
					//home button
					case 'home':

					if ((ContextMenuFancy.mButton < 2) && (ContextMenuFancy.curHub == 'home')) {
						ContextMenuFancy.undraw_menu();
						setTimeout(function() {ContextMenuFancy.hide(false);}, 100);					
					}
					else {
						/*
						ContextMenuFancy.undraw_menu(e.node.id);					
						//ContextMenuFancy.remove_elements();
						ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);
						*/
						
						var stop = ContextMenuFancy.removeOrderArray.length;
						
						//go through removeOrderList and undraw those elements first
						for (var count = 0; count < stop; count ++) {
							setTimeout(function() {ContextMenuFancy.undraw_element();}, (count * 250));
						}

						setTimeout(function() {ContextMenuFancy.undraw_menu();}, (stop * 250));
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, ((stop * 250) + 100));	//4100	
						
					}

					break;
					
					
					//add context bubble button
					case 'add_context_bubble':

					if (ContextMenuFancy.mButton < 2) {
						ContextMenuFancy.undraw_menu();
						setTimeout(function() {ContextMenuFancy.hide(false);}, 100);	
						$(ContextMenuFancy.paper.canvas).on("mousemove", ContentHandler.add_new_bubble);

					}

					break;
					
					
					//settings button
					case 'settings':

					if (ContextMenuFancy.mButton < 2) {	
						/*
						ContextMenuFancy.undraw_menu(e.node.id);
						//ContextMenuFancy.remove_elements();
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, 4100);	
						*/
						
						var stop = ContextMenuFancy.removeOrderArray.length;
						
						//go through removeOrderList and undraw those elements first
						for (var count = 0; count < stop; count ++) {
							setTimeout(function() {ContextMenuFancy.undraw_element();}, (count * 250));
						}

						setTimeout(function() {ContextMenuFancy.undraw_menu();}, (stop * 250));
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, ((stop * 250) + 100));	//4100	
						
					}

					break;
					
					
					//pointer button
					case 'pointer_tool':

					if (ContextMenuFancy.mButton < 2) {					
						document.body.style.cursor = "default";
						e.click(ContextMenuFancy.undraw_menu());
						setTimeout(function() {ContextMenuFancy.hide(false);}, 100);
					}

					break;
					
					
					//eye button
					case 'eye':

					if (ContextMenuFancy.mButton < 2) {	
						/*
						ContextMenuFancy.undraw_menu(e.node.id);
						//ContextMenuFancy.remove_elements();
						//ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, 4100);
						*/
						
						var stop = ContextMenuFancy.removeOrderArray.length;
						
						//go through removeOrderList and undraw those elements first
						for (var count = 0; count < stop; count ++) {
							setTimeout(function() {ContextMenuFancy.undraw_element();}, (count * 250));
						}

						setTimeout(function() {ContextMenuFancy.undraw_menu();}, (stop * 250));
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, ((stop * 250) + 100));	//4100							
						
					}

					break;
					
					
					//eye5 button
					case 'eye5':

					if (ContextMenuFancy.mButton < 2) {	
						var stop = ContextMenuFancy.removeOrderArray.length;
						
						//go through removeOrderList and undraw those elements first
						for (var count = 0; count < stop; count ++) {
							setTimeout(function() {ContextMenuFancy.undraw_element();}, (count * 250));
						}

						setTimeout(function() {ContextMenuFancy.undraw_menu();}, (stop * 250));
						setTimeout(function() {ContextMenuFancy.draw_menu(ContextMenuFancy.curX, ContextMenuFancy.curY, e.node.id);}, ((stop * 250) + 100));	//4100				
					}

					break;
					
				}
				
								
			}

		
		});

	
	},
	
	
	draw_connecting_lines : function(fromRx, fromRy, fromR, toRx, toRy, toR, toID) {
		//calculate radius offsets -- don't forget we're in quadrent IV!
		
		//change the radius variable to account for glow effect
		fromR = fromR + 1.5;
		
		//from 
		var diffY = (toRy * (-1)) - (fromRy * (-1));			
		var diffYMagOffset = 0; 
		
		//true means bubble is at least 30 units above hub
		if (diffY > 0 && Math.abs(diffY) > 30) {
			diffYMagOffset = (-3); 
		}
		else if (Math.abs(diffY) > 30) {
			diffYMagOffset = 3; 
		}	
		
		var diffX = toRx - fromRx;
		var diffXMagOffset = 0; 
		
		//true means bubble is at least 30 units left of hub
		if (diffX > 0 && Math.abs(diffX) > 30) {
			diffXMagOffset = (-3);
		}
		else if (Math.abs(diffX) > 30) {
			diffXMagOffset = 3;
		}
		
		var vMag = Math.sqrt( (diffX * diffX) + (diffY * diffY) );
		var diffXMag = diffX / vMag;
		var diffYMag = diffY / vMag;
		var x_intersect_hub = fromRx + fromR * diffXMag;
		var y_intersect_hub = ((fromRy * (-1)) + fromR * diffYMag) * (-1);

		//to
		diffY = (fromRy * (-1)) - (toRy * (-1));
		diffX = fromRx - toRx;
		vMag = Math.sqrt( (diffX * diffX) + (diffY * diffY) );
		diffXMag = diffX / vMag;
		diffYMag = diffY / vMag;
		var x_intersect_cb = toRx + toR * diffXMag + diffXMagOffset;
		var y_intersect_cb = ((toRy * (-1)) + toR * diffYMag + diffYMagOffset) * (-1);

		//draw a line 	
		var add_cb_spoke = ContextMenuFancy.paper.path("M" + x_intersect_hub + " " + y_intersect_hub).attr({stroke: "#90989c", "stroke-width": 3, "arrow-end": "oval-narrow-short"});
		var cb_spoke_path_string = "M" + x_intersect_hub + " " + y_intersect_hub + "L" + x_intersect_cb + " " + y_intersect_cb;
		//animation speed : animation delay = 950/540
		//node animation speed : spoke animation speed = 1500/950
		var draw_cb_spoke = Raphael.animation({path: cb_spoke_path_string}, 117); //117
		add_cb_spoke.animate(draw_cb_spoke.delay(60));
		add_cb_spoke.id = (toID + " spoke");
		ContextMenuFancy.menu_set.push(add_cb_spoke);
	},
	

	

	
	/*
	* ContextMenu *LIBRARY*
	* Version: 1.00.A
	* 
	* FROM URL: http://www.openjs.com/scripts/ui/context_menu/
	* used with permission from author
	*/
	/////////////////////////////// Library Functions ///////////////////////////////
	_stopEvent: function(e) {
		e=e||window.event;
		e.cancelBubble = true;
		e.returnValue = false;
		if(e.stopPropagation) e.stopPropagation();
		if(e.preventDefault) e.preventDefault();
		return false;
	},
	
	_addEvent :function(ele,type,func,capture) {
		if(typeof ele == "string") ele = document.getElementById(ele);
		
		if(ele.attachEvent) return ele.attachEvent('on' + type, func);
		else if(ele.addEventListener) ele.addEventListener(type, func, false);
		else ele['on' + type] = func;
	},
	
	_removeEvent: function(ele, type, func) {
		if(typeof ele == "string") ele = document.getElementById(ele);
		
		if(ele.removeEventListener) ele.removeEventListener(type, func, false);
		else if(ele.detachEvent) ele.detachEvent('on' + type, func);
		else if(ele['on' + type]) delete ele['on' + type];
	},
	/*
	*/
	
	
	hide: function(redraw) {		
		//unless we are redrawing the context menu, remove opaque layer covering canvas
		if (redraw == false) {
			//ContextMenuFancy.cover_box.remove();
			//ContextMenuFancy.cover_box = null;
			
			//get rid of overlay effect
			document.getElementById("canvas_container").style.opacity = ("1");
			
			//reset current hub variable to default
			ContextMenuFancy.curHub = 'home';
		}
	
		//remove set of context menu hover effects 
		//ContextMenuFancy.hover_set.remove();
		
		//remove set of context menu elements and reset Raphael set
		ContextMenuFancy.menu_set.remove();
		ContextMenuFancy.menu_set = ContextMenuFancy.paper.set();
		
		if (ContextMenuFancy.removeArray != null ) {ContextMenuFancy.removeArray.clear;}
		ContextMenuFancy._removeEvent(document,"click");
	},
	

	
	
	
};













