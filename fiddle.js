/**

-=fiddle.js=-
 @version 1.0
(c) 18APR13 @author DAVID DAEDALUS 
theVagrantPhilosopher@yahoo.com

 @description Script to handle the VALIS fiddle for the projectVALIS landing page. 
Uses raphael.js raphael.free_transform.js plugin. 
obtainable from (respectively):
 http://raphaeljs.com/
 https://github.com/ElbertF/Raphael.FreeTransform

path icon objects obtained from:
http://raphaeljs.com/icons/

and liscensed under MIT license:
http://raphaeljs.com/license.html

*/



var fiddle = {

	//Raphael canvas
	"paper" : "", 

	//array of connecting lines
	"strokeArray" : [],
	
	//index of connecting lines (ie - what's connected to what)
	//element format is: [fromIndex(in setArray), toIndex, Index in strokeArr, type]
	"strokeArrayIndex" : [],

	//array of circle elements
	"elementArray" : [],

	//array of sets of elements and path(icon) objects
	"setArray": [],
	
	//array of free_transform'd set objects
	"ftArray" : [],

	//array of animation slide indicators
	"animIndicatorArray" : [],
	
	//index of the button set that's currently being dragged
	"curSetIndex": "",
	
	//index of the current slide
	"curSlideIndex": "0",
	
	//mousedown flag for use by mouseout handler
	"mousedown": false,
	
	//lets us know we're in the middle of a drag operation
	"dragging": false,
	
	//header text Array
	"headerTextArr" : [
		"what will your contribution be?",
		"when life throws you a curveball, use our canvas to \n figure things out.",
		"VALIS will analyze your thought process and provide \n meaningful insights.",
		"utilize the feedback to revise your stream of thought.",
		"once you find an answer, make your stream a part of \n our public network of ideas.",
		"others can form new streams by incorporating your \n work into theirs.",
		"with every new addition, VALIS gets smarter and can \n provide better feedback to the next user.", 	
		],
	
	//header text
	"headerText" : "",
	
	//footer text
	"footerText" : "",
	
	//timing for the animation
	"animation_timer" : "",


	init : function () {
		//initialize canvas
		//offset canvas position to make room for header
		var element = $("#main");
		var elementOffset = element.offset();
		fiddle.paper = new Raphael(elementOffset.left, (elementOffset.top + 55), $('#main').width(), $('#main').height()); 

		//fiddle.paper.draggable.enable();

		//resize handler
		$(window).resize(function() {
			
			//resize canvas			
			fiddle.paper.setSize($('#main').width(), $('#main').height());
			
			//reposition canvas so it sticks to div #main
			$(fiddle.paper.canvas).css({left: $('#main').offset().left, top:$('#main').offset().top + 55});

				
			//resize boarder for drag plugin objects 
			for (var i = 0; i < fiddle.ftArray.length; i ++) {

				fiddle.ftArray[i].setOpts({boundary: {x: 35, y: 200, width: ($('#main').width() - 75), height: ($('#main').height() - /*275*/ 350) }}, function(ft, events) {					
					fiddle.redraw_connecting_lines(ft);
				});
				
			}			
					
			/*
			create animation slide indicators
			*/
			var xPos = ($('#main').width() / 2) - 60;
						
			for (var i = 0; i < 7; i ++) {
				fiddle.animIndicatorArray[i].attr({"cx": xPos});
				xPos = xPos + 20;
			}
			
			/*
			write footer help text
			*/
			xPos = ($('#main').width() / 2);
			fiddle.footerText.remove();
			fiddle.footerText = fiddle.paper.text(xPos, 570, "TOUCH TO PAUSE ANIMATION - CLICK TO DRAG ELEMENT").attr({fill: "#ffffff", "stroke-width": 1});			
			
		});
		

		
		//prevent text selection (mostly because of Chrome)
		document.onselectstart = function(){ return false; }
		
		
		//info element one (pink) 
		var info1 = fiddle.paper.circle(100, 450, 30).attr({"opacity":0.0});
		info1.animate({fill: "#ff6ff2", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 100, "cy": 450, "opacity": 1.0}, 200);
		info1.data("cx", 100);
		info1.data("cy", 450);
		//info1.draggable.enable();
		fiddle.elementArray.push(info1);
		
		//info element one icon
		var info1_iconPath =  "M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.982,21.375h-1.969v-1.889h1.969V21.375zM16.982,17.469v0.625h-1.969v-0.769c0-2.321,2.641-2.689,2.641-4.337c0-0.752-0.672-1.329-1.553-1.329c-0.912,0-1.713,0.672-1.713,0.672l-1.12-1.393c0,0,1.104-1.153,3.009-1.153c1.81,0,3.49,1.121,3.49,3.009C19.768,15.437,16.982,15.741,16.982,17.469z";
		
		var info1_icon = fiddle.paper.path(info1_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1.0}).transform("t85,435");
		//info1_icon.draggable.enable();	
			
		//tag elements with their position in the set Array
		info1.node.setID = "0";
		//info1_icon.node.setID = "0";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info1);
		set.push(info1_icon);
		
		info1_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();			
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		//info element two (red)
		var info2 = fiddle.paper.circle(250, 450, 30).attr({"opacity":0.0});
		info2.animate({fill: "#e00707", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 250, "cy": 450, "opacity": 1.0}, 200);
		info2.data("cx", 250);
		info2.data("cy", 450);
		//info2.draggable.enable();
		fiddle.elementArray.push(info2);
		
		//info element two icon
		var info2_iconPath =  "M7.831,29.354c0.685,0.353,1.62,1.178,2.344,0.876c0.475-0.195,0.753-1.301,1.048-1.883c2.221-4.376,4.635-9.353,6.392-13.611c0-0.19,0.101-0.337-0.049-0.595c0.983-1.6,1.65-3.358,2.724-5.138c0.34-0.566,0.686-1.351,1.163-1.577l0.881-0.368c1.12-0.288,1.938-0.278,2.719,0.473c0.396,0.383,0.578,1.015,0.961,1.395c0.259,0.26,1.246,0.899,1.613,0.8c0.285-0.077,0.52-0.364,0.72-0.728l0.696-1.286c0.195-0.366,0.306-0.718,0.215-0.999c-0.117-0.362-1.192-0.84-1.552-0.915c-0.528-0.113-1.154,0.081-1.692-0.041c-1.057-0.243-1.513-0.922-1.883-2.02c-2.608-1.533-6.119-2.53-10.207-1.244c-1.109,0.349-2.172,0.614-2.901,1.323c-0.146,0.412,0.143,0.494,0.446,0.489c-0.237,0.216-0.62,0.341-0.399,0.848c2.495-1.146,7.34-1.542,7.669,0.804c0.072,0.522-0.395,1.241-0.682,1.835c-0.905,1.874-2.011,3.394-2.813,5.091c-0.298,0.017-0.366,0.18-0.525,0.287c-2.604,3.8-5.451,8.541-7.9,12.794c-0.326,0.566-1.098,1.402-1.002,1.906C5.961,28.641,7.146,29,7.831,29.354z";
		
		var info2_icon = fiddle.paper.path(info2_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1.0}).transform("t235,435");
		//info2_icon.draggable.enable();
			
		//tag elements with their position in the set Array
		info2.node.setID = "1";
		//info2_icon.node.setID = "1";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info2);
		set.push(info2_icon);
		
		info2_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();			
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		
		//info element three (blue)
		var info3 = fiddle.paper.circle(200, 200, 30).attr({"opacity":0.0});
		info3.animate({fill: "#3790e8", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 200, "cy": 200, "opacity": 1.0}, 200);
		info3.data("cx", 200);
		info3.data("cy", 200);
		//info3.draggable.enable();
		fiddle.elementArray.push(info3);
		
		//info element two icon
		var info3_iconPath =  "M29.225,23.567l-3.778-6.542c-1.139-1.972-3.002-5.2-4.141-7.172l-3.778-6.542c-1.14-1.973-3.003-1.973-4.142,0L9.609,9.853c-1.139,1.972-3.003,5.201-4.142,7.172L1.69,23.567c-1.139,1.974-0.207,3.587,2.071,3.587h23.391C29.432,27.154,30.363,25.541,29.225,23.567zM16.536,24.58h-2.241v-2.151h2.241V24.58zM16.428,20.844h-2.023l-0.201-9.204h2.407L16.428,20.844z";
		
		var info3_icon = fiddle.paper.path(info3_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1.0}).transform("t185,185");
		//info3_icon.draggable.enable();
			
		//tag elements with their position in the set Array
		info3.node.setID = "2";
		//info3_icon.node.setID = "2";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info3);
		set.push(info3_icon);
		
		info3_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();		
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		
		
		//info element four (orange)
		var info4 = fiddle.paper.circle(350, 275, 30).attr({"opacity":0.0});
		info4.animate({fill: "#ff6600", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 350, "cy": 275, "opacity": 1.0}, 200);
		info4.data("cx", 350);
		info4.data("cy", 275);
		//info4.draggable.enable();
		fiddle.elementArray.push(info4);
		
		//info element four icon
		var info4_iconPath =  "M24.083,15.5c-0.009,4.739-3.844,8.574-8.583,8.583c-4.741-0.009-8.577-3.844-8.585-8.583c0.008-4.741,3.844-8.577,8.585-8.585c1.913,0,3.665,0.629,5.09,1.686l-1.782,1.783l8.429,2.256l-2.26-8.427l-1.89,1.89c-2.072-1.677-4.717-2.688-7.587-2.688C8.826,3.418,3.418,8.826,3.416,15.5C3.418,22.175,8.826,27.583,15.5,27.583S27.583,22.175,27.583,15.5H24.083z";
		
		var info4_icon = fiddle.paper.path(info4_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1.0}).transform("t334,260");
		//info4_icon.draggable.enable();
			
		//tag elements with their position in the set Array
		info4.node.setID = "3";
		//info4_icon.node.setID = "3";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info4);
		set.push(info4_icon);
		
		info4_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();			
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		
		
		//info element five (yellow)
		var info5 = fiddle.paper.circle(450, 275, 30).attr({"opacity":0.0});
		info5.animate({fill: "#ffcc00", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 450, "cy": 275, "opacity": 1.0}, 200);
		info5.data("cx", 450);
		info5.data("cy", 275);
		//info5.draggable.enable();
		fiddle.elementArray.push(info5);
		
		//info element five icon
		var info5_iconPath =  "M12.75,25.498h5.5v-5.164h-5.5V25.498zM15.5,28.166c1.894,0,2.483-1.027,2.667-1.666h-5.334C13.017,27.139,13.606,28.166,15.5,28.166zM15.5,2.833c-3.866,0-7,3.134-7,7c0,3.859,3.945,4.937,4.223,9.499h1.271c-0.009-0.025-0.024-0.049-0.029-0.078L11.965,8.256c-0.043-0.245,0.099-0.485,0.335-0.563c0.237-0.078,0.494,0.026,0.605,0.25l0.553,1.106l0.553-1.106c0.084-0.17,0.257-0.277,0.446-0.277c0.189,0,0.362,0.107,0.446,0.277l0.553,1.106l0.553-1.106c0.084-0.17,0.257-0.277,0.448-0.277c0.189,0,0.36,0.107,0.446,0.277l0.554,1.106l0.553-1.106c0.111-0.224,0.368-0.329,0.604-0.25s0.377,0.318,0.333,0.563l-1.999,10.998c-0.005,0.029-0.02,0.053-0.029,0.078h1.356c0.278-4.562,4.224-5.639,4.224-9.499C22.5,5.968,19.366,2.833,15.5,2.833zM17.458,10.666c-0.191,0-0.364-0.107-0.446-0.275l-0.554-1.106l-0.553,1.106c-0.086,0.168-0.257,0.275-0.446,0.275c-0.191,0-0.364-0.107-0.449-0.275l-0.553-1.106l-0.553,1.106c-0.084,0.168-0.257,0.275-0.446,0.275c-0.012,0-0.025,0-0.037-0.001l1.454,8.001h1.167l1.454-8.001C17.482,10.666,17.47,10.666,17.458,10.666z";
		
		var info5_icon = fiddle.paper.path(info5_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1.2}).transform("t435,260s1.3");
		//info5_icon.draggable.enable();
		
		//tag elements with their position in the set Array
		info5.node.setID = "4";
		//info5_icon.node.setID = "4";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info5);
		set.push(info5_icon);
		
		info5_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();			
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		
		//info element six (purple)
		var info6 = fiddle.paper.circle(550, 350, 30).attr({"opacity":0.0});
		info6.animate({fill: "#b536da", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 550, "cy": 350, "opacity": 1.0}, 200);
		info6.data("cx", 550);
		info6.data("cy", 350);
		//info6.draggable.enable();
		fiddle.elementArray.push(info6);
			
		//info element six icon
		var info6_iconPath =  "M21.066,20.667c1.227-0.682,1.068-3.311-0.354-5.874c-0.611-1.104-1.359-1.998-2.109-2.623c-0.875,0.641-1.941,1.031-3.102,1.031c-1.164,0-2.231-0.391-3.104-1.031c-0.75,0.625-1.498,1.519-2.111,2.623c-1.422,2.563-1.578,5.192-0.35,5.874c0.549,0.312,1.127,0.078,1.723-0.496c-0.105,0.582-0.166,1.213-0.166,1.873c0,2.938,1.139,5.312,2.543,5.312c0.846,0,1.265-0.865,1.466-2.188c0.2,1.314,0.62,2.188,1.461,2.188c1.396,0,2.545-2.375,2.545-5.312c0-0.66-0.062-1.291-0.168-1.873C19.939,20.745,20.516,20.983,21.066,20.667zM15.5,12.201c2.361,0,4.277-1.916,4.277-4.279S17.861,3.644,15.5,3.644c-2.363,0-4.28,1.916-4.28,4.279S13.137,12.201,15.5,12.201zM24.094,14.914c1.938,0,3.512-1.573,3.512-3.513c0-1.939-1.573-3.513-3.512-3.513c-1.94,0-3.513,1.573-3.513,3.513C20.581,13.341,22.153,14.914,24.094,14.914zM28.374,17.043c-0.502-0.907-1.116-1.641-1.732-2.154c-0.718,0.526-1.594,0.846-2.546,0.846c-0.756,0-1.459-0.207-2.076-0.55c0.496,1.093,0.803,2.2,0.861,3.19c0.093,1.516-0.381,2.641-1.329,3.165c-0.204,0.117-0.426,0.183-0.653,0.224c-0.056,0.392-0.095,0.801-0.095,1.231c0,2.412,0.935,4.361,2.088,4.361c0.694,0,1.039-0.71,1.204-1.796c0.163,1.079,0.508,1.796,1.199,1.796c1.146,0,2.09-1.95,2.09-4.361c0-0.542-0.052-1.06-0.139-1.538c0.492,0.472,0.966,0.667,1.418,0.407C29.671,21.305,29.541,19.146,28.374,17.043zM6.906,14.914c1.939,0,3.512-1.573,3.512-3.513c0-1.939-1.573-3.513-3.512-3.513c-1.94,0-3.514,1.573-3.514,3.513C3.392,13.341,4.966,14.914,6.906,14.914zM9.441,21.536c-1.593-0.885-1.739-3.524-0.457-6.354c-0.619,0.346-1.322,0.553-2.078,0.553c-0.956,0-1.832-0.321-2.549-0.846c-0.616,0.513-1.229,1.247-1.733,2.154c-1.167,2.104-1.295,4.262-0.287,4.821c0.451,0.257,0.925,0.064,1.414-0.407c-0.086,0.479-0.136,0.996-0.136,1.538c0,2.412,0.935,4.361,2.088,4.361c0.694,0,1.039-0.71,1.204-1.796c0.165,1.079,0.509,1.796,1.201,1.796c1.146,0,2.089-1.95,2.089-4.361c0-0.432-0.04-0.841-0.097-1.233C9.874,21.721,9.651,21.656,9.441,21.536z";
		
		var info6_icon = fiddle.paper.path(info6_iconPath).attr({fill: "#ffffff", stroke: "696969", "stroke-width": 1}).transform("t535,335");
		//info6_icon.draggable.enable();		
		
		//tag elements with their position in the set Array
		info6.node.setID = "5";
		//info6_icon.node.setID = "5";
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info6);
		set.push(info6_icon);
		
		info6_icon.node.setAttribute("pointer-events", "none");
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines();		
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);
		
		
		
		
		
		//info element seven (green)
		var info7 = fiddle.paper.circle(375, 485, 30).attr({"opacity":0.0});
		info7.animate({fill: "#4ac925", stroke: "#000", "stroke-width": 5, "stroke-opacity": 0.4, "cx": 375, "cy": 485, "opacity": 1.0}, 200);
		info7.data("cx", 375);
		info7.data("cy", 485);
		//info7.draggable.enable();
		fiddle.elementArray.push(info7);
		
		//info element six icon
		var info7_iconText = fiddle.paper.text(375, 485, "2+2=4").attr({fill: "#ffffff", "stroke-width": 1}).transform("s1.5");
		//info7_iconText.draggable.enable();
				
		//tag elements with their position in the set Array
		info7.node.setID = "6";
		info7_iconText.node.setAttribute("pointer-events", "none");
		
		
		//bundle element and icon into set
		var set = fiddle.paper.set();
		set.push(info7);
		set.push(info7_iconText);
		//set.draggable.enable();
		var ft = fiddle.paper.freeTransform(set, {drag:'self', scale:false, rotate:false, draw:false}, function(ft, events) {
			fiddle.redraw_connecting_lines(ft);		
		});
		
		fiddle.ftArray.push(ft);
		fiddle.setArray.push(set);	
				
		
			
			
		/*
		draw connections
		*/
		for (var i = 0; i < (fiddle.elementArray.length - 1); i ++) {
			fiddle.draw_connecting_lines(
				fiddle.elementArray[i].attr("cx"), 
				fiddle.elementArray[i].attr("cy"), 
				fiddle.elementArray[i].attr("r"), 
				fiddle.elementArray[i+1].attr("cx"), 
				fiddle.elementArray[i+1].attr("cy"), 
				fiddle.elementArray[i+1].attr("r"), "");
			
			//update strokeArrIndex so later we can drag things around
			var indexString = (i + "," + (i+1) + "," + (fiddle.strokeArray.length - 1) + ",");
			fiddle.strokeArrayIndex.push(indexString);
		
			if (i == 3) {
				fiddle.draw_connecting_lines(
					fiddle.elementArray[i].attr("cx"), 
					fiddle.elementArray[i].attr("cy"), 
					fiddle.elementArray[i].attr("r"), 
					fiddle.elementArray[1].attr("cx"), 
					fiddle.elementArray[1].attr("cy"), 
					fiddle.elementArray[1].attr("r"), "");
					
				//update strokeArrIndex so later we can drag things around
				var indexString = (i + "," + (1) + "," + (fiddle.strokeArray.length - 1) + ",");
				fiddle.strokeArrayIndex.push(indexString);		
					
			}
		
		}
			
			
		fiddle.draw_connecting_lines(
			fiddle.elementArray[6].attr("cx"), 
			fiddle.elementArray[6].attr("cy"), 
			fiddle.elementArray[6].attr("r"), 
			fiddle.elementArray[2].attr("cx"), 
			fiddle.elementArray[2].attr("cy"), 
			fiddle.elementArray[2].attr("r"), "--..");

			
		//update strokeArrIndex so later we can drag things around
		var indexString = (6 + "," + (2) + "," + (fiddle.strokeArray.length - 1) + "," + "--..");
		fiddle.strokeArrayIndex.push(indexString);	
		
		
		
		
		/*
		create animation slide indicators
		*/
		var xPos = ($('#main').width() / 2) - 60;	
		for (var i = 0; i < 7; i ++) {
			var c = fiddle.paper.circle(xPos, 545, 5).attr({"fill" : "#90989c", "stroke" : "#90989c"});
			
			if (i == 0) {
				c.attr({"fill" : "#ffffff"});
			};
			
			xPos = xPos + 20;
			c.data("id", i);
			fiddle.animIndicatorArray.push(c);
		}
		
		
		
		/*
		setup event handlers for animation slide indicators
		*/
		for (var i = 0; i < fiddle.animIndicatorArray.length; i ++) {
				fiddle.animIndicatorArray[i].mouseover(function() {
					//stop animation
					clearInterval(fiddle.animation_timer);
					$(main).css('cursor', "pointer");									
					fiddle.set_slide(this.data("id"));	
					fiddle.curSlideIndex ++;
					if (fiddle.curSlideIndex > 6) {fiddle.curSlideIndex = 0};
				});
			
				fiddle.animIndicatorArray[i].mouseout(function() {
					$(main).css('cursor', "default");
					fiddle.reset_timing();
				})
			
		}
		
		
		
		
		/*
		initialize header text
		*/
		fiddle.headerText = fiddle.paper.text(25, 125, fiddle.headerTextArr[0]).attr({
			fill: "#00EFFF",
			"font-size": 32, 
			"font-family": "Arial, Helvetica, sans-serif",
			"font-weight": "bold",
			'text-anchor': 'start'
		});
	
	
	
	
		/*
		write footer help text
		*/
		xPos = ($('#main').width() / 2);
		fiddle.footerText = fiddle.paper.text(xPos, 570, "TOUCH TO PAUSE ANIMATION - CLICK TO DRAG ELEMENT").attr({fill: "#ffffff", "stroke-width": 1});
		
		
		
		/*
		set or release pause animation flag on any mousedown
		*/
		$(document).mousedown(function(event) {
			fiddle.mousedown = true;
		});
		
		$(document).mouseup(function(event) {
			fiddle.mousedown = false;
			
			//check to see if we need to restart animation
			if (fiddle.dragging == true) {
				fiddle.dragging = false;
	
				//if the cursor isn't the normal pointer, it's over an element
				//so we don't want to restart animation
				if ($(main).css('cursor') != 'default') {return;}
				fiddle.reset_timing();
			}
			
		});
	
	
	
		/*
		go through the element set array and setup mouse events for each
		*/	
		for (var i = 0; i < fiddle.setArray.length; i ++) {
		
			fiddle.setArray[i].mouseover (function(e) {
				$(main).css('cursor', "move");	
				
				//stop animation
				clearInterval(fiddle.animation_timer);
				var setID = e.target.setID;

				//update curSlideIndex
				switch(setID) {
					case "0":
						fiddle.curSlideIndex = 1;
						break;
					case "1":
						fiddle.curSlideIndex = 2;
						break;
					case "2":
						fiddle.curSlideIndex = 3;//2
						break;
					case "3":
						fiddle.curSlideIndex = 4; //3 ...etc --\/
						break;
					case "4":
						fiddle.curSlideIndex = 5;
						break;
					case "5":
						fiddle.curSlideIndex = 6;
						break;
					case "6":
						fiddle.curSlideIndex = 6;
						break;	
	
				};
	
				fiddle.set_slide(fiddle.curSlideIndex);				
				fiddle.curSlideIndex ++;
				if (fiddle.curSlideIndex > 6) {fiddle.curSlideIndex = 0};
			});
		

			fiddle.setArray[i].mousedown (function(e) {
				//stops default drag behavior (mostly for Firefox)
				e.preventDefault();
				$(main).css('cursor', "move");
				
				//this allows raphael.draggable to figure out which element is
				//being dragged so it can also handle the connecting lines between
				//it and the rest of the fiddle elements
				fiddle.curSetIndex = e.target.setID;
				
				//set global drag flag
				fiddle.dragging = true;
				
			});
		
		
			fiddle.setArray[i].mousemove (function() {
				$(main).css('cursor', "move");
			});


			fiddle.setArray[i].mouseout(function(){
				$(main).css('cursor','default');

				//check to see if we need to restart animation
				if (fiddle.dragging == false) {
					fiddle.reset_timing();
				}				
				
				});
			
	
		}

			
			
			
		/*
		start animation 
		*/
		fiddle.animation_timer = setInterval(function() { 
			fiddle.set_slide(fiddle.curSlideIndex); 
			fiddle.curSlideIndex++;
			if (fiddle.curSlideIndex > 6) {fiddle.curSlideIndex = 0;}
		}, 10000);		
	
	
		//resize boarder for drag plugin objects 
		for (var i = 0; i < fiddle.ftArray.length; i ++) {
			fiddle.ftArray[i].setOpts({boundary: {x: 35, y: 200, width: ($('#main').width() - 75), height: ($('#main').height() - /*275*/ 350) }}, function(ft, events) {
				fiddle.redraw_connecting_lines(ft);
			});
				
		}	


	},


	
	reset_timing: function () {
		clearInterval(fiddle.animation_timer);
		
		fiddle.animation_timer = setInterval(function() { 
			fiddle.set_slide(fiddle.curSlideIndex); 
			fiddle.curSlideIndex++;
			if (fiddle.curSlideIndex > 6) {fiddle.curSlideIndex = 0;}
		}, 10000);
	},	
	
	
	
	
	set_slide: function (id) {	
		//update indicator
		for (var i = 0; i < fiddle.animIndicatorArray.length; i ++) {
			fiddle.animIndicatorArray[i].attr({"fill": "#90989c"});
		}
		
		fiddle.animIndicatorArray[id].attr({"fill": "#ffffff"});	
		
		
		//update text
		var fontSize = 24; 
		
		if (id == 0) {
			fontSize = 32;
		}	
		
		fiddle.headerText.attr({ 
			fill: "#00EFFF",
			"text": fiddle.headerTextArr[id],		
			"font-size": fontSize, 
			"font-family": "Arial, Helvetica, sans-serif",
			"font-weight": "bold", 
		});		
		
		
		switch(id) {
		
			//highlight and unhighlight appropriate elements
			case 0:				
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#e00707"});
				fiddle.elementArray[2].attr({"fill": "#3790e8"});
				fiddle.elementArray[3].attr({"fill": "#ff6600"});
				fiddle.elementArray[4].attr({"fill": "#ffcc00"});
				fiddle.elementArray[5].attr({"fill": "#b536da"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});
				fiddle.reset_stroke_color();
				break;
			case 1:
				fiddle.elementArray[0].attr({"fill": "#00EFFF"});
				fiddle.elementArray[1].attr({"fill": "#00EFFF"});
				fiddle.elementArray[2].attr({"fill": "#3790e8"});
				fiddle.elementArray[3].attr({"fill": "#ff6600"});
				fiddle.elementArray[4].attr({"fill": "#ffcc00"});
				fiddle.elementArray[5].attr({"fill": "#b536da"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});						
				fiddle.reset_stroke_color();	
				fiddle.strokeArray[0].attr({stroke: "#00EFFF"});
				break;
			case 2:
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#00EFFF"});
				fiddle.elementArray[2].attr({"fill": "#00EFFF"});
				fiddle.elementArray[3].attr({"fill": "#ff6600"});
				fiddle.elementArray[4].attr({"fill": "#ffcc00"});
				fiddle.elementArray[5].attr({"fill": "#b536da"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});
				fiddle.reset_stroke_color();
				fiddle.strokeArray[1].attr({stroke: "#00EFFF"});
				break;
			case 3:
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#00EFFF"});
				fiddle.elementArray[2].attr({"fill": "#00EFFF"});
				fiddle.elementArray[3].attr({"fill": "#00EFFF"});
				fiddle.elementArray[4].attr({"fill": "#ffcc00"});
				fiddle.elementArray[5].attr({"fill": "#b536da"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});	
				fiddle.reset_stroke_color();	
				fiddle.strokeArray[1].attr({stroke: "#00EFFF"});
				fiddle.strokeArray[2].attr({stroke: "#00EFFF"});
				fiddle.strokeArray[4].attr({stroke: "#00EFFF"});
				break;
			case 4:
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#e00707"});
				fiddle.elementArray[2].attr({"fill": "#3790e8"});
				fiddle.elementArray[3].attr({"fill": "#00EFFF"});
				fiddle.elementArray[4].attr({"fill": "#00EFFF"});
				fiddle.elementArray[5].attr({"fill": "#b536da"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});
				fiddle.reset_stroke_color();
				fiddle.strokeArray[3].attr({stroke: "#00EFFF"});
				break;
			case 5:
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#e00707"});
				fiddle.elementArray[2].attr({"fill": "#3790e8"});
				fiddle.elementArray[3].attr({"fill": "#ff6600"});
				fiddle.elementArray[4].attr({"fill": "#00EFFF"});
				fiddle.elementArray[5].attr({"fill": "#00EFFF"});
				fiddle.elementArray[6].attr({"fill": "#4ac925"});
				fiddle.reset_stroke_color();
				fiddle.strokeArray[5].attr({stroke: "#00EFFF"});
				break;	
			case 6:
				fiddle.elementArray[0].attr({"fill": "#ff6ff2"});
				fiddle.elementArray[1].attr({"fill": "#e00707"});
				fiddle.elementArray[2].attr({"fill": "#00EFFF"});
				fiddle.elementArray[3].attr({"fill": "#ff6600"});
				fiddle.elementArray[4].attr({"fill": "#ffcc00"});
				fiddle.elementArray[5].attr({"fill": "#00EFFF"});
				fiddle.elementArray[6].attr({"fill": "#00EFFF"});
				fiddle.reset_stroke_color();
				fiddle.strokeArray[6].attr({stroke: "#00EFFF"});
				fiddle.strokeArray[7].attr({stroke: "#00EFFF"});
				break;
				
		}
	
	},
	
	
	reset_stroke_color: function() {
		
		for (var i = 0; i < fiddle.strokeArray.length; i ++) {
			fiddle.strokeArray[i].attr({stroke: "#90989c"});
		}
		
	},
	
	

	
	
	redraw_connecting_lines: function () {
		//calculate xy offset
		var parentOffset = $("#main").offset(); 
	   
		//the mouse isn't always over the center of the element, and 
		//it needs to be if the lines are going to be drawn correctly
			
		//deals with the first-run error (which is a non-dragging event)
		if (fiddle.curSetIndex == "") {return;}
		var bbox = fiddle.setArray[fiddle.curSetIndex].getBBox();
		var relX = bbox.x + (bbox.width / 2);
		var relY = bbox.y + (bbox.height / 2);	
		
		//bring set to front
		fiddle.setArray[fiddle.curSetIndex].toFront();
		
		/*
		loop through strokeArrayIndex to see if we need to update any connecting strokes
		
		strokeArrayIndex element format is:
		[fromIndex(in setArray), toIndex, Index in strokeArr, type]
		*/
		for (i = 0; i < fiddle.strokeArrayIndex.length; i ++) {
			//comma indexes
			var firstCommaIndex = fiddle.strokeArrayIndex[i].indexOf(",");
			var secondCommaIndex = fiddle.strokeArrayIndex[i].indexOf(",", firstCommaIndex + 1);
			var thirdCommaIndex = fiddle.strokeArrayIndex[i].indexOf(",", secondCommaIndex + 1);
				
			//elements
			var fromIndex = fiddle.strokeArrayIndex[i].substring(0, firstCommaIndex);
			var toIndex = fiddle.strokeArrayIndex[i].substring(firstCommaIndex + 1, secondCommaIndex);
			var strokeArrIndex = fiddle.strokeArrayIndex[i].substring(secondCommaIndex + 1, thirdCommaIndex);
			var type = fiddle.strokeArrayIndex[i].substring(thirdCommaIndex + 1);

			//check if the element that's being dragged is mentioned. if so, redraw the stroke 
			if (fromIndex == fiddle.curSetIndex) {
				fiddle.draw_connecting_lines(
					relX, 
					relY, 
					fiddle.elementArray[fromIndex].attr("r"), 
					fiddle.elementArray[toIndex].data("cx"), 
					fiddle.elementArray[toIndex].data("cy"), 
					fiddle.elementArray[toIndex].attr("r"),
					type, 
					strokeArrIndex
				);	

			
			}
		
			//check if the element that's being dragged is mentioned. if so, redraw the stroke 
			if (toIndex == fiddle.curSetIndex) {
				fiddle.draw_connecting_lines(
					fiddle.elementArray[fromIndex].data("cx"), 
					fiddle.elementArray[fromIndex].data("cy"),  
					fiddle.elementArray[fromIndex].attr("r"), 
					relX, 
					relY, 
					fiddle.elementArray[toIndex].attr("r"),
					type, 
					strokeArrIndex
				);		
			
			
			}
		
		
		}
		
		fiddle.setArray[fiddle.curSetIndex].data("cx", relX);
		fiddle.setArray[fiddle.curSetIndex].data("cy", relY);
	},
	

	
	draw_connecting_lines : function(fromRx, fromRy, fromR, toRx, toRy, toR, type, redrawIndex) {
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

		
		//calculate distance between points and return if the distance between them is sufficiently small
		var distance = Math.sqrt( Math.pow( (diffX) ,2) + Math.pow((diffY) ,2) );
		
		if (distance < 65) {
			return;
		}
			
		var color = "#90989c";

		/*
		at this point, fiddle.curSlideIndex isn't set to the current slide, it's set to the next slide. 
		not sure if it's worth it to fix. it's the slide switching function that's doing it.
		*/
		if (redrawIndex != undefined) {
					
			switch((fiddle.curSlideIndex - 1)) {
			
				//highlight and unhighlight appropriate elements
				case 0:						
					break;
				case 1:
					if (redrawIndex == 0) {color = "#00EFFF";}
					break;
				case 2:
					if (redrawIndex == 1) {color = "#00EFFF";}
					break;
				case 3:
					if ((redrawIndex == 1) || (redrawIndex == 2) || (redrawIndex == 4)) {color = "#00EFFF";}
					break;
				case 4:
					if (redrawIndex == 3) {color = "#00EFFF";}
					break;
				case 5:
					if (redrawIndex == 5) {color = "#00EFFF";}
					break;	
				case -1: //see above note about fiddle.curSlideIndex
					if ((redrawIndex == 6) || (redrawIndex == 7)) {color = "#00EFFF";}	
					break;
					
			}

		}
			
		//draw a line 	
		var stroke_path_string = "M" + x_intersect_hub + " " + y_intersect_hub + "L" + x_intersect_cb + " " + y_intersect_cb;
		var stroke = fiddle.paper.path(stroke_path_string).attr({stroke: color, "stroke-width": 3, "arrow-end": "classic-wide-long", "stroke-dasharray": type});
		
		stroke.toBack();
			
		//var stroke = fiddle.paper.path(stroke_path_string);
		//var draw_stroke = Raphael.animation({path: stroke_path_string}, 200);
		//stroke.animate(draw_stroke);
		
		/*
		if we are redrawing, we need to update the element already in the strokeArray
		*/
		if (redrawIndex != undefined) {
			var oldPath = fiddle.strokeArray[redrawIndex];
			fiddle.strokeArray[redrawIndex] = stroke;
			oldPath.remove();		
		}
		else {
			fiddle.strokeArray.push(stroke);
		}

		
	},


};