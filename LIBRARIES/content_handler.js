/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
CONTENT HANDLER FOR VALIS
BY DAVID HOLIDAY
THEVAGRANTPHILOSOPHER@YAHOO.COM
WWW.PROJECTVALIS.COM
LAST UPDATE: 21JUN13


-=DESCRIPTION=-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

this handles all the context bubbles, logical connectors, and connecting lines on the canvas





-=TO DO=-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

- weight of context bubble changes its size

-rename 'add_new_bubble' and 'kill_add_bubble_event' to something like 'begin' and 'end' place context bubble


*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**/	



var ContentHandler = {

	//for when the user wants to add a new context bubble to the canvas, bitch. 
	"newContextBubble": null,
	
	
	add_new_bubble : function (e) {
	
		//set flag incase user tries to activate context menu before placing the bubble
		ContextMenuFancy.placeContextBubbleInProgress = true;
		console.log( e.pageX + " " + e.pageY);
		
		$(ContextMenuFancy.paper.canvas).on("click", ContentHandler.kill_add_bubble_event);
		

	
	},
	

	kill_add_bubble_event: function () {
	
		//set flag indicating the place context bubble operation is no longer in progress
		ContextMenuFancy.placeContextBubbleInProgress = false;
		
		//kill the event bound to 'mousemove'
		$(ContextMenuFancy.paper.canvas).off("mousemove", ContentHandler.add_new_bubble);
	},


};