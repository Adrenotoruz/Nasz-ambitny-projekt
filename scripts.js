window.addEventListener("load", function () {
	class KeyCode {
		constructor(){
			this.left = 37;
			this.up = 38;
			this.right = 39;
			this.down = 40;
			this.a = 65;
			this.w = 87;
			this.d = 68;
			this.s = 83;
		}
	}

	class KeyPressed {
		constructor(){
			this.up = false;
			this.left = false;
			this.right = false;
			this.down = false;
		}
	}

	class Mouse {
		constructor() {
			this.x = 0;
			this.y = 0;
		}
	}

	class Player {
		constructor(size){
			this.x = 0;
			this.y = 0;
			this.speed = 5;
			this.size = size;
		}
	}

	const keyCode = new KeyCode();
	const keyPressed = new KeyPressed();
	const mouse = new Mouse();

		//testtowy komentarz 3			
	
 		var canvas = document.getElementById("gameView");
		var context = canvas.getContext("2d");
		
		var rad;
		
		canvas.style.cursor = "crosshair";
		
		context.canvas.height = window.innerHeight;
		context.canvas.width = window.innerWidth;
		
		const player = new Player(canvas.width);

		var angle;
		
		function changeAimingPoint(e){
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			var a = Math.sqrt(Math.pow(e.clientX-x,2)+Math.pow(e.clientY-y,2));
			var b = Math.sqrt(Math.pow(e.clientX-x,2)+Math.pow(0,2));
			angle = Math.atan2(( y - e.clientY ),( x - e.clientX  ) ) * 180 / Math.PI + 90;
		}
		
		canvas.addEventListener('mousemove', function(e){
			
			changeAimingPoint(e);

		}, false);
		
		var width = canvas.width;
		var height = canvas.height;
		var player = parseInt(canvas.width/20);
		
		var playerSpeed = 5;
		
		var x = parseInt(width/2);
		var y = parseInt(height/2);
			    

    function drawRotatedRect(x,y,width,height,degrees){
		
        context.save();
        context.beginPath();
        context.translate( x+player/10, y );
        context.rotate(degrees*Math.PI/180);
        context.rect( -width+player/10, -height, width,height);
        context.fillStyle="black";
        context.fill();
        context.restore();

    }
		function drawPlayer()
		{	
			changeAimingPoint({clientY: mouse.y, clientX: mouse.x});
			if(keyPressed.down) y+=playerSpeed;
			if(keyPressed.up) y-=playerSpeed;			
			if(keyPressed.right) x+=playerSpeed;	
			if(keyPressed.left) x-=playerSpeed;

			context.clearRect(0, 0, canvas.width, canvas.height);
			drawRotatedRect(x-player/10,y,player/5,-player*1.35,angle );
						
			context.stroke();
			context.beginPath();
			context.arc(x,y, player, 0, Math.PI*2, false);
			context.fillStyle = "black";
			context.fill();
			context.closePath();		
		}
		setInterval(drawPlayer, 10);
		
		document.addEventListener("keydown", function (e){
			switch(e.keyCode)
			{
				case keyCode.left:
					leftPressed = true;
					break;
				case keyCode.up:
					upPressed = true;
					break;
				case keyCode.right:
					rightPressed = true;
					break;
				case keyCode.down:
					downPressed = true;
					break;
				case keyCode.a:
					leftPressed = true;
					break;
				case keyCode.w:
					upPressed = true;
					break;
				case keyCode.d:
					rightPressed = true;
					break;
				case keyCode.s:
					downPressed = true;
					break;
			}
		}, false);

		document.addEventListener("keyup", function (e){
			switch(e.keyCode)
			{
				case keyCode.left:
					leftPressed = false;
					break;
				case keyCode.up:
					upPressed = false;
					break;
				case keyCode.right:
					rightPressed = false;
					break;
				case keyCode.down:
					downPressed = false;
					break;
				case keyCode.a:
					leftPressed = false;
					break;
				case keyCode.w:
					upPressed = false;
					break;
				case keyCode.d:
					rightPressed = false;
					break;
				case keyCode.s:
					downPressed = false;
					break;
			}
		}, false);	
}, false);

