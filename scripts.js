window.addEventListener("load", function () {

		//testtowy komentarz 3			
	
 		var canvas = document.getElementById("gameView");
		var context = canvas.getContext("2d");
		
		var rad;
		
		canvas.style.cursor = "crosshair";
		
		context.canvas.height = window.innerHeight;
		context.canvas.width = window.innerWidth;
		
		var angle;
		
		var mouseX;
		var mouseY;
		
		function changeAimingPoint(e){
			mouseX = e.clientX;
			mouseY = e.clientY;
			console.log("mouse x: "+e.clientX);
			console.log("mouse y: "+e.clientY);
			var a = Math.sqrt(Math.pow(e.clientX-x,2)+Math.pow(e.clientY-y,2));
			var b = Math.sqrt(Math.pow(e.clientX-x,2)+Math.pow(0,2));
			angle = Math.atan2(( y - e.clientY ),( x - e.clientX  ) ) * 180 / Math.PI + 90;
			// angle =  Math.acos(Math.cos(b/a))*(180/Math.PI);
			console.log("x: "+x);
			console.log("y: "+y);
			console.log(angle);
		}
		
		canvas.addEventListener('mousemove', function(e){
			
			changeAimingPoint(e);

		}, false);
		
		var width = canvas.width;
		var height = canvas.height;
		var player = parseInt(canvas.width/20);
		
		var playerSpeed = 5;
		
		var upPressed = false;
		var downPressed = false;
		var leftPressed = false;
		var rightPressed = false;
		
		var x = parseInt(width/2);
		var y = parseInt(height/2);
			    

    function drawRotatedRect(x,y,width,height,degrees){
		
        // first save the untranslated/unrotated context
        context.save();

        context.beginPath();
        // move the rotation point to the center of the rect
        context.translate( x+player/10, y );
        // rotate the rect
        context.rotate(degrees*Math.PI/180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        context.rect( -width+player/10, -height, width,height);

        context.fillStyle="black";
        context.fill();

        // restore the context to its untranslated/unrotated state
        context.restore();

    }
		function drawPlayer()
		{	
			changeAimingPoint({clientY: mouseY, clientX: mouseX});
			//angle++;
			if(downPressed) y+=playerSpeed;
			if(upPressed) y-=playerSpeed;			
			if(rightPressed) x+=playerSpeed;	
			if(leftPressed) x-=playerSpeed;					
			
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawRotatedRect(x-player/10,y,player/5,-player*1.35,angle );
				
			
			context.stroke();
			context.beginPath();
			context.arc(x,y, player, 0, Math.PI*2, false);
			context.fillStyle = "black";
			context.fill();
			context.closePath();
			//context.fillRect(x-player/10,y,player/5,-player*1.35);		
		}
		setInterval(drawPlayer, 10);
		
		document.addEventListener("keydown", function (e){
			switch(e.keyCode)
			{
				case 37:
					leftPressed = true;
					break;
				case 38:
					upPressed = true;
					break;
				case 39:
					rightPressed = true;
					break;
				case 40:
					downPressed = true;
					break;
			}
			if(e.keyCode == 65) leftPressed = true;
			if(e.keyCode == 87) upPressed = true;
			if(e.keyCode == 68) rightPressed = true;
			if(e.keyCode == 83) downPressed = true;
		}, false);
		
		document.addEventListener("keyup", function (e){
			switch(e.keyCode)
			{
				case 37:
					leftPressed = false;
					break;
				case 38:
					upPressed = false;
					break;
				case 39:
					rightPressed = false;
					break;
				case 40:
					downPressed = false;
					break;
				case 65:
					leftPressed = false;
					break;
				case 87:
					upPressed = false;
					break;
				case 68:
					rightPressed = false;
					break;
				case 83:
					downPressed = false;
					break;
			}
			if(e.keyCode == 65) leftPressed = false;
			if(e.keyCode == 87) upPressed = false;
			if(e.keyCode == 68) rightPressed = false;
			if(e.keyCode == 83) downPressed = false;
		}, false);	
}, false);

