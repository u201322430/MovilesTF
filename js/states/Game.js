Game = function(game){}

Game.prototype = {
	init: function(level) {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.currentLevel = level || "firstLevel"
		this.worldHeight = 3000;
		//setear el tamanio del mapa
		this.game.world.setBounds(0, 0, 800, this.worldHeight);
	},
	create:function(){
		
		// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    // this.scale.pageAlignHorizontally = true;
	    // this.scale.pageAlignVertically = true;

		// /*this.levelData = JSON.parse(this.cache.getText("level"));
		// console.log(this.levelData.platformData);
		// this.platforms = this.game.add.group();
		// this.levelData.platformData.forEach(this.createPlatform,this);*/

		this.createBackground(this.worldHeight);
		this.loadLevel();
		this.createEnemies();

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
		this.game.physics.arcade.collide(this.player,this.collisionLayer);
		this.game.physics.arcade.overlap(this.player,this.trashGroup,this.pickUpTrash,null,this);
		this.game.physics.arcade.collide(this.player,this.enemies,this.checkCollision,null,this);

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
	createPlayer: function() {
		let playerPost = this.findObjectsByType("player",this.map,"objectsLayer");
		let pos = {x: playerPost[0].x, y: playerPost[0].y};
		this.player = new Player(this.game,pos,this.gravity);
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

	},
	pickUpTrash:function(player,trash){
		console.log("RECOGIO BASURA")
		trash.kill();
		this.trashRecovered+=1;
	},
	loadLevel: function() {
		this.map = this.game.add.tilemap(this.currentLevel);
		this.map.addTilesetImage("maptiles","mapTileSheet");
		this.backgroundLayer = this.map.createLayer("background");
		this.collisionLayer = this.map.createLayer("collision");
		this.map.setCollisionBetween(1,126,true,'collision');
		this.collisionLayer.resizeWorld();
	},
	createEnemies: function() {
		this.enemies = this.game.add.group();
    let enemiesPos = this.findObjectsByType('enemy',this.map,"objects");
    enemiesPos.forEach(function(element){
		console.log('enemy')
      	let enemy = new Enemy(this.game, element.x, element.y, 'fish', element.velocity, this.map);
     	this.enemies.add(enemy);
    },this);
	},
	findObjectsByType: function(targetType,tilemap,layer) {
		let result = [];
		tilemap.objects[layer].forEach(function(element) {
		  if(element.properties.type == targetType) {
			element.y -= tilemap.tileHeight;
			result.push(element);
		  }
		}, this);
		return result;
	},
	checkCollision: function(player, enemy) {
		console.log(enemy.body.touching);
		this.game.state.restart();
	}
}