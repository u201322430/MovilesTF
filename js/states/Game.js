Game = function(game){}

Game.prototype = {
	init: function(level) {
		console.log("new level");
		console.log(level)
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.currentLevel = level || "firstLevel"
		this.worldHeight = 3840-64;
		//setear el tamanio del mapa
		this.game.world.setBounds(0, 0, 896, this.worldHeight);
	},
	create:function(){
		
		this.soundtrack = this.game.add.audio("soundtrack");
		if (this.currentLevel == "firstLevel") {
			this.soundtrack.play();
		}
        
		this.createBackground(this.worldHeight);
		this.loadLevel();
		this.createEnemies();
		this.createTrash();

		this.acceleration = {x: 0, y: 0};
		this.accelerationSpeed = 8;
		this.decelerationSpeed = 4;
		this.maxAcceleration = 400;
		this.gravity = 100;
		this.score = 0

		this.position = {x: this.game.world.centerX, y: 50};
		this.jumpForce = -20;		

		this.player = new Player(this.game,this.position,this.gravity);
		this.killedFish = 0;
		this.killedFishGroup = this.game.add.group();
		this.deadFishCounter = 0;
		
		this.initKilledFish();

		this.trashRecovered = 0;
		this.trashCounter = 0;

		// this.trashGroup = this.game.add.group()

		// this.test = new Trash(this.game, {x: 400, y:700});
		// this.trashGroup.add(this.test);

		this.scoreText = this.game.add.text(0,0,'Score: 0', {font : "40px Arial",fill: '#000000'});
		this.scoreText.x = this.game.world.width - 160;
		this.scoreText.y = 40;
		this.scoreText.anchor.setTo(0.5);
		this.scoreText.fixedToCamera = true;

		let style = {font : "20px Arial",fill: '#000000'};
		this.oxigenNumberText = this.game.add.text(0,0,'100%', style);
		this.oxigenNumberText.x = this.game.world.width - 400;
		this.oxigenNumberText.y = 50;
		this.oxigenNumberText.anchor.setTo(0.5);
		this.oxigenNumberText.fixedToCamera = true;

		this.graphicsOxigenBar = this.game.add.graphics(0, 0);
		this.graphicsOxigenBarContainer = this.game.add.graphics(0, 0);

		this.graphicsOxigenBarContainer.beginFill(0x15363D, 1);
		this.graphicsOxigenBarContainer.max = 300;
    	this.graphicsOxigenBarContainer.drawRect(this.game.world.width - 550, 20, this.graphicsOxigenBarContainer.max, 55);
		this.graphicsOxigenBarContainer.endFill();
		this.graphicsOxigenBarContainer.fixedToCamera = true;

	},
	update:function(){
		this.game.physics.arcade.collide(this.player,this.collisionLayer);
		this.game.physics.arcade.overlap(this.player,this.garbages,this.pickUpTrash,null,this);

		if(this.player.isInvulnerable == false){
			this.game.physics.arcade.overlap(this.player,this.enemies,this.fishCollision,null,this);
		}		

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
		// this.garbages.length
		if(this.trashRecovered == this.garbages.length) {
			if (this.currentLevel == 'secondLevel') {
				this.game.state.start("Game",true,false,"thirdLevel");
			} else if (this.currentLevwel == 'thirdLevel') {
				this.game.state.start("YouWin", true, false, this.score)
			} else {
				this.game.state.start("Game",true,false,"secondLevel");
			}
			
		}

		this.player.breathe();
		let oxigenText = this.player.oxigenLevels + "%"
		this.oxigenNumberText.text = parseFloat(oxigenText).toFixed(2);
		this.updateOxigenBar();
	},
	createPlayer: function() {
		let playerPost = this.findObjectsByType("player",this.map,"objectsLayer");
		let pos = {x: playerPost[0].x, y: playerPost[0].y};
		this.player = new Player(this.game,pos,this.gravity);
		console.log("creating player");
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
	updateOxigenBar:function(){
		this.graphicsOxigenBar.clear();
		this.graphicsOxigenBar.beginFill(0xA8EDFA, 1);
		this.graphicsOxigenBar.max = 300;
    	this.graphicsOxigenBar.drawRect(this.game.world.width - 550, 20, Math.round(this.graphicsOxigenBarContainer.max * this.player.oxigenLevels), 65);
		this.graphicsOxigenBar.endFill();
		this.graphicsOxigenBar.fixedToCamera = true;
	},
	createBackground:function(height){

		let bottomBg = this.game.add.sprite(0,0,"bg_bottom")

		bottomBg.y = height - bottomBg.height;
		bottomBg.width = 896;

		let graphics = this.game.add.graphics(0, 0);

		//sky
		graphics.beginFill(0xc2ecf5, 1);
    	graphics.drawRect(0, 0, 896, 300);
		graphics.endFill();
		//foam
		graphics.beginFill(0xffffff, 1);
    	graphics.drawRect(0, 300, 896, 330);
		graphics.endFill();
		//water
		graphics.beginFill(0x8ed6e7, 1);
    	graphics.drawRect(0, 330, 896, height - bottomBg.height - 330);
		graphics.endFill();

	},
	pickUpTrash:function(player,trash){		
		switch(trash.key) {
			case "aereosol": {
				this.score += 200;
				break;
			}
			case "broken_cup": {
				this.score += 100;
				break;
			}
			case "can": {
				this.score += 50;
				break;
			}
			case "glass_bottle": {
				this.score += 100;
				break;
			}
			case "milk_jug": {
				this.score += 100;
				break;
			}
			case "pizza_carton": {
				this.score += 50;
				break;
			}
			case "plastic_bottle": {
				this.score += 50;
				break;
			}
		}
		console.log(this.score)
		trash.kill();
		this.trashRecovered+=1;
		console.log(this.score);
		this.scoreText.text = 'Score: ' + this.score;
	},
	loadLevel: function() {
		console.log("creating level");
		this.map = this.game.add.tilemap(this.currentLevel);
		this.map.addTilesetImage("maptiles","mapTileSheet");
		console.log(this.map);
		// this.backgroundLayer = this.map.createLayer("background");
		this.collisionLayer = this.map.createLayer("collision");
		this.map.setCollisionBetween(1,126,true,'collision');
		this.collisionLayer.resizeWorld();
		
	},
	createEnemies: function() {
		this.enemies = this.game.add.group();
		let enemiesPos = this.findObjectsByType('enemy',this.map,"objects");
		console.log("creating enemies")
		enemiesPos.forEach(function(element){
			console.log('enemy')
			let enemy = new Enemy(this.game, element.x, element.y, 'fish', element.velocity, this.map);
			this.enemies.add(enemy);
		},this);
	},
	createTrash: function() {
		this.garbages = this.game.add.group();
		let trashPos = this.findObjectsByType('trash', this.map, "objects");
		trashPos.forEach(function(element){
			console.log('trash')
			let trash = new Trash(this.game, {x: element.x, y: element.y});
			this.garbages.add(trash);
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
	fishCollision: function(player, fish) {
		this.player.initInvulnerability();
		fish.die();
		this.killedFish++;
		if(this.killedFish > 3){
			this.soundtrack.stop()
			this.state.start('GameOver', true, false, this.score)
		}
		this.updateKilledFishes();
		//this.game.state.restart();
	},
	initKilledFish: function(){
		let maxFishes = 3;
		for(let i = 0; i < maxFishes - this.killedFish; i++){
			let fishHUD = this.add.sprite(10+i*100,0,"fish");
			fishHUD.scale.setTo(1.6);
			fishHUD.fixedToCamera = true;
			this.killedFishGroup.add(fishHUD);
		}
	},
	updateKilledFishes: function(){
		this.deadFishCounter = 0;

		this.killedFishGroup.forEach(function(item){
			if(this.deadFishCounter<this.killedFish){
				item.loadTexture('dead_fish');
			}		
			console.log(this.killedFish);
			this.deadFishCounter++;
		}, this);		
	}
}