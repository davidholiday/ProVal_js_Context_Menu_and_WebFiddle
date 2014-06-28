$(document).ready(function() {
    //create the canvas, called 'paper 
    var paper = new Raphael(document.getElementById('svg-map-box'), "100%", "100%");
    //and a set to hold the glow elements
    var st = paper.set();
    //let's make a new dot and try yet another method
    var greendot = paper.circle( 75, 75, 20).attr ({fill: "#7FFF00",  stroke: "#cecece", 'stroke-width': 1, cursor: "pointer", href: "http://#link#" });
    
    var greenover = function (event) { 
            st.push(     
                this.glow({opacity: 1.0, color: "#FFF", width: 25})
                );
    }                
    var greenout = function (event) {                           
        st.hide();
     };   

                  
                  
greendot.hover(greenover, greenout);
    



});     