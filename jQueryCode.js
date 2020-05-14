/*eslint-env jquery*/
/* eslint-env es6 */
/* eslint-disable */
$(function(){
    
    $("#triangle").hover(function(){
        $("#equi").show();
        $("#right").show();
        $("#triangle").hide();
    });
    
    
    
    
    
   /*
   This logic is to illustrate the line single line drawnig feature in canvas
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    
    //draw a line
    //decalare new path
    context.beginPath();
    
    //set line width
    context.lineWidth=20;
    
    //to set color of line
    context.strokeStyle='#42e565';
    
    //To set the cap of the line(cap means shape of end of the line) (round,butt,square)
    context.lineCap="square";
    
    //Setting line join style (round,bevel,miter)
    context.lineJoin = "miter";
    
    //to set the starting point
    context.moveTo(30,30);
    
    //to draw the end point and draw a straight line
    context.lineTo(100,100);
    
    //Taking line to another point
    context.lineTo(200,30);
    
    //making line visible
    context.stroke();
    */
    
    //Declare variables
        //Painting/erasing or not
        //Painting or erasing
        //Get the canvas and context
        //get the canvas container
        //mouse position
    
    var paintingerasing = false;
    var erasing = false;
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    var canvascontainer = $("#screen");
    var mousecordinates = {x:0 , y:0};
    var rtriangle = false;
    var etriangle = false;
    var square = false;
    var circle = false;
    var line = false;
    var startmouse = {x:0 , y:0};
    
    
    //onload load saved work from localstorage
    if(localStorage.getItem("imgCanvas")!=null)//if local storage has some value
    {
        var img = new Image();//make a variable of type image.
        img.onload = function(){ 
            //when image is fully loaded.
            context.drawImage(img,0,0);//Draw the fetched image in paint screen
        }
        img.src = localStorage.getItem("imgCanvas"); //To get item form local storage
    }
    
    
    
    //set drawing parameters (linwidth, linejoin, linecap)
    $("#slider").slider({
        slide:function(event,ui)
        {
            $("#slidercircle").css("width",ui.value);
            $("#slidercircle").css("height",ui.value);
            context.lineWidth = ui.value;
        },
        min:10,
        max:40
    });
    context.lineCap = "round";
    context.lineJoin = "round";
    $("#choosecolor").change(function(){
        $("#slidercircle").css("background-color", $(this).val());
        context.strokeStyle = $(this).val();
    });
    
    
    
    //click inside container
    canvascontainer.mousedown(function(e){
        paintingerasing = true;
        mousecordinates.x = e.pageX - this.offsetLeft;
        mousecordinates.y = e.pageY - this.offsetTop;
        startmouse.x = mousecordinates.x;
        startmouse.y = mousecordinates.y;
        context.beginPath(); // Declaring new path
        context.moveTo(mousecordinates.x,mousecordinates.y); //to set the starting point
    });
    
    
    //move the mouse while holding mouse key
    canvascontainer.mousemove(function(e){
        mousecordinates.x = e.pageX - this.offsetLeft;
        mousecordinates.y = e.pageY - this.offsetTop;
        if(paintingerasing==true)
        {
            if(erasing==true)
            {
                context.strokeStyle = "white";
                context.lineTo(mousecordinates.x,mousecordinates.y);
                context.stroke();
            }
            else
            {
                if(rtriangle==true)
                {
                    context.strokeStyle = $("#choosecolor").val();
                }
                else
                {
                    if(square==true)
                    {
                        
                        context.fillStyle=$("#choosecolor").val();
                        
                    }
                    else
                    {
                        if(circle==true)
                        {
                            context.strokeStyle = $("#choosecolor").val();
                        }
                        else
                        {
                            if(line==true)
                            {
                                context.strokeStyle = $("#choosecolor").val();
                                context.stroke();
                                
                            }
                            else
                            {
                                if(etriangle==true)
                                {
                                    context.strokeStyle = $("#choosecolor").val();
                                }
                                else
                                {
                                    context.strokeStyle = $("#choosecolor").val();
                                    context.lineTo(mousecordinates.x,mousecordinates.y);
                                    context.stroke();
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    
    
    //move-up we are not painting/erasing anymore
    canvascontainer.mouseup(function(e){
        mousecordinates.x = e.pageX - this.offsetLeft;
        mousecordinates.y = e.pageY - this.offsetTop;
        if(line==true)
        {
            context.lineTo(mousecordinates.x,mousecordinates.y);
            context.stroke();
        }
        else
        {
            if(square==true)
            {
                context.rect(startmouse.x,startmouse.y,mousecordinates.x-startmouse.x,mousecordinates.y-startmouse.y);
                context.stroke();
            }
            else
            {
                if(rtriangle==true)
                {
                    context.lineTo(startmouse.x,mousecordinates.y);
                    context.lineTo(mousecordinates.x,mousecordinates.y);
                    context.closePath();
                    context.stroke();
                }
                else
                {
                    if(etriangle==true)
                    {
                        context.lineTo(mousecordinates.x - 2*(mousecordinates.x-startmouse.x)    ,mousecordinates.y);
                        context.lineTo(mousecordinates.x,mousecordinates.y);
                        context.closePath();
                        context.stroke();
                    }
                    else
                    {
                        if(circle==true)
                        {
                            var radius = Math.sqrt(Math.pow(startmouse.x-mousecordinates.x,2)+Math.pow(startmouse.y-mousecordinates.y,2));
                            context.arc(startmouse.x, startmouse.y, radius, 0, 2 * Math.PI);
                            
                            context.stroke();
                        }
                    }
                }
            }
        }
        
        paintingerasing = false;
    });
    
    canvascontainer.mouseleave(function(){
        paintingerasing=false; 
    });
    
    
    
    //click on reset button
    $("#reset").click(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        erasing = false;
    });
    
    //click on save button
    $("#save").click(function(){
         if(typeof(localStorage)!=null){
             localStorage.setItem("imgCanvas",canvas.toDataURL());
             window.alert("Your Design is saved Successfully");
         }
    });
  
    //Click on erase button
    $("#erase").click(function(){
        erasing=true;
    });
    
    //Click on draw button
    $("#draw").click(function(){
        erasing=false;
        context.strokeStyle = $("#choosecolor").val();
    });
    
    $(window).resize(function(){
        var width = $(window).width();
        if(width<720)
        {
            $("#paint").attr({"width":"450px","height":"450px"});
        }
        else
        {
            $("#paint").attr({"width":"572px","height":"500px"});
        }
    });
    
    $("#line").click(function(){
        if(line==false)
        {
            line=true;
            rtriangle = false;
            etriangle = false;
            square = false;
            circle = false;
            $("#circle").removeClass("activebutton");
            $("#square").removeClass("activebutton");
            $("#equi").removeClass("activebutton");
            $("#right").removeClass("activebutton");
        }
        else
        {
            line=false;
        }
        $("#line").toggleClass("activebutton");
    }); 
    $("#circle").click(function(){
        if(circle==false)
        {
            circle=true;
            line=false;
            rtriangle = false;
            etriangle = false;
            square = false;
            $("#square").removeClass("activebutton");
            $("#equi").removeClass("activebutton");
            $("#right").removeClass("activebutton");
            $("#line").removeClass("activebutton");
        }
        else
        {
            circle=false;
        }
        $("#circle").toggleClass("activebutton");
    }); 
    $("#square").click(function(){
        if(square==false)
        {
            square=true;
            line=false;
            rtriangle = false;
            etriangle = false;
            circle = false;
            $("#circle").removeClass("activebutton");
            $("#equi").removeClass("activebutton");
            $("#right").removeClass("activebutton");
            $("#line").removeClass("activebutton");
        }
        else
        {
            square=false;
        }
        $("#square").toggleClass("activebutton");
    });
    $("#equi").click(function(){
        if(etriangle==false)
        {
            etriangle=true;
            line=false;
            rtriangle = false;
            square = false;
            circle = false;
            $("#circle").removeClass("activebutton");
            $("#square").removeClass("activebutton");
            $("#right").removeClass("activebutton");
            $("#line").removeClass("activebutton");
        }
        else
        {
            etriangle=false;
        }
        $("#equi").toggleClass("activebutton");
    });
    $("#right").click(function(){
        if(rtriangle==false)
        {
            rtriangle=true;
            line=false;
            etriangle = false;
            square = false;
            circle = false;
            $("#circle").removeClass("activebutton");
            $("#square").removeClass("activebutton");
            $("#equi").removeClass("activebutton");
            $("#line").removeClass("activebutton");
        }
        else
        {
            rtriangle=false;
        }
        $("#right").toggleClass("activebutton");
    });
    
    
    
    
});