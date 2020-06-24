Game = function(game){}

Game.prototype = {
	init: function(level) {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.currentLevel = level || "firstLevel"
		this.worldHeight = 3000;
		this.game.world.setBounds(0, 0, 800, this.worldHeight);
	},
	create:function(){
		this.loadLevel();
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		/*this.levelData = JSON.parse(this.cache.getText("level"));
		console.log(this.levelData.platformData);
		this.platforms = this.game.add.group();
		this.levelData.platformData.forEach(this.createPlatform,this);*/

		this.createBackground(this.worldHeight);

		this.acceleration = {x: 0, y: 0};
		this.accelerationSpeed = 8;
		this.decelerationSpeed = 4;
		this.maxAcceleration = 400;
		this.gravity = 100;

		this.position = {x: this.game.world.centerX, y: 50};
		this.jumpForce = -20;		

		this.player = new Player(this.game,this.position,this.gravity);

		this.trashRecovered = 0;

		this.trashGroup = this.game.add.group()

		this.test = new Trash(this.game, {x: 400, y:700});
		this.trashGroup.add(this.test);

	},
	update:function(){

		this.game.physics.arcade.overlap(this.player,this.trashGroup,this.pickUpTrash,null,this);

		this.decelerate();
		
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)){			
			this.acceleration.x -= this.accelerationSpeed
			if(this.acceleration.x <= -1 * this.maxAcceleration){
				this.acceleration.x = -1* this.maxAcceleration;
			}						
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
        	this.acceleration.x += this.accelerationSpeed
			if(this.acceleration.x >= this.maxAcceleration){
				this.acceleration.x = this.maxAcceleration;
			}	
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)){			
			this.acceleration.y -= this.accelerationSpeed
			if(this.acceleration.y <= -1 * this.maxAcceleration){
				this.acceleration.y = -1* this.maxAcceleration;
			}						
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
        	this.acceleration.y += this.accelerationSpeed
			if(this.acceleration.y >= this.maxAcceleration){
				this.acceleration.y = this.maxAcceleration;
			}	
		}

		this.player.changeVelocity(this.acceleration)
		
	},
	decelerate:function(){
		if(this.acceleration.x > 0){
			this.acceleration.x -= this.decelerationSpeed;
		}
		if(this.acceleration.x < 0){
			this.acceleration.x += this.decelerationSpeed;
		}
		this.acceleration.y = 0;
	},
	createBackground:function(height){

		let bottomBg = this.game.add.sprite(0,0,"bg_bottom")

		bottomBg.y = height - bottomBg.height;

		let graphics = this.game.add.graphics(0, 0);

		//sky
		graphics.beginFill(0xc2ecf5, 1);
    	graphics.drawRect(0, 0, 800, 300);
		graphics.endFill();
		//foam
		graphics.beginFill(0xffffff, 1);
    	graphics.drawRect(0, 300, 800, 330);
		graphics.endFill();
		//water
		graphics.beginFill(0x8ed6e7, 1);
    	graphics.drawRect(0, 330, 800, height - bottomBg.height - 330);
		graphics.endFill();

		//this.map = this.game.add.tilemap(this.currentLevel);
   		//this.map.addTilesetImage("tiles_spritesheet","gameTiles");
    	//this.backgroundLayer = this.map.createLayer("bg_main");
    	//this.collisionLayer = this.map.createLayer("collisionLayer");
    	//this.map.setCollisionBetween(1,160,true,'collisionLayer');
    	//this.collisionLayer.resizeWorld();

	},
	pickUpTrash:function(player,trash){
		console.log("RECOGIO BASURA")
		trash.kill();
		this.trashRecovered+=1;
	},
	loadLevel: function() {
		this.map = this.game.add.tilemap(this.currentLevel)
		this.map.addTilesetImage("mapTileSheet","mapTileSheet")
		this.backgroundLayer = this.map.createLayer("fondo")
		this.collisionLayer = this.map.createLayer("plataformas")
	}
}