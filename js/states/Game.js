<<<<<<< b6d5a3748305782dc7738e5309b1f6fd876e48aa
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

		this.graphicsOxigenBarContainer = this.game.add.graphics(0, 0);
		this.graphicsOxigenBar = this.game.add.graphics(0, 0);
		this.graphicsOxigenBar.fixedToCamera = true;

		this.graphicsOxigenBarContainer.beginFill(0x15363D, 1);
		this.graphicsOxigenBarContainer.max = 300;
    	this.graphicsOxigenBarContainer.drawRect(this.game.world.width - 550, 20, this.graphicsOxigenBarContainer.max, 55);
		this.graphicsOxigenBarContainer.endFill();
		this.graphicsOxigenBarContainer.fixedToCamera = true;		

		let style = {font : "20px Arial",fill: '#000000'};
		this.oxigenNumberText = this.game.add.text(0,0,'100%', style);
		this.oxigenNumberText.x = this.game.world.width - 400;
		this.oxigenNumberText.y = 50;
		this.oxigenNumberText.anchor.setTo(0.5);
		this.oxigenNumberText.fixedToCamera = true;

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

		this.player.breathe(this.score);
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
    	this.graphicsOxigenBar.drawRect(this.game.world.width - 550, 20, Math.round((this.graphicsOxigenBarContainer.max * this.player.oxigenLevels)/100), 55);
		this.graphicsOxigenBar.endFill();
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
=======
Game = function(game){}

Game.prototype = {
	create:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//escala a la pantalla que tengas
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		/*this.levelData = JSON.parse(this.cache.getText("level"));
		console.log(this.levelData.platformData);
		this.platforms = this.game.add.group();
		this.levelData.platformData.forEach(this.createPlatform,this);*/

						//===== BACKGROUND =====
		this.background = this.game.add.tileSprite(0,0,this.game.width,
													this.game.height,'bg_main');
		this.background.autoScroll(/*-10*/0,0);

		this.gravity = 100;
		this.position = {x:this.game.world.centerX, y:50}
		//this.jumpForce = -150;
		this.maxVelFall = 200;	//Máxima Velocidad de Caída
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//===== Creación del personaje =====
		this.player = new Player(this.game,this.position,this.gravity);
		//Teclas para mover al personaje
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		//===== Creación del grupo Peces Enemigos =====
		this.enemies = this.game.add.group();
		this.enemies.enableBody = true;

		this.enemyFrequency = 3 * 1000;
		this.enemySpeed = 100;
		this.elapsedTimeEnemy = 0;
		//=FIN= Creación del grupo Peces Enemigos =====

		this.lives = 5;
		this.maxSegRes = 30;		//Maximo segundos de respiración
		this.maxOxygen = this.maxSegRes * 1000;		//5s de prueba
		this.elapsedTimeOxygen = this.maxOxygen;
		//=FIN= Creación del personaje =====

		//===== Barras del Oxygen =====
		this.BO = {	x:750,
					y:10,
					w:20,
					h:this.elapsedTimeOxygen / (this.maxSegRes),
					r:10}
		this.contorn = this.game.add.graphics(0,0);
		this.oxygenBar = this.game.add.graphics(0,0);
		//=FIN= Barras del Oxygen =====

	    //===== Creación del grupo Trash =====
		this.trashes = this.game.add.group();
		this.trashes.enableBody = true;
		for(let i = 0;i < 5;i++){
			let position = {x:this.game.rnd.integerInRange(20, 780),
							y:this.game.rnd.integerInRange(200, 1200)};
			console.log("x:"+position.x+" y:"+position.y);
			let index = this.game.rnd.integerInRange(1, 7);
			let trashSprite;
			switch (index) {
				case 1:
					trashSprite = "aereosol";			break;
				case 2:
					trashSprite = "broken_cup";			break;
				case 3:
					trashSprite = "can";				break;
				case 4:
					trashSprite = "glass_bottle";		break;
				case 5:
					trashSprite = "milk_jug";			break;
				case 6:
					trashSprite = "pizza_carton";		break;
				default:
					trashSprite = "plastic_bottle";
			}
			let trash = new Trash(this.game,position,trashSprite);
			this.trashes.add(trash);
		}
		//=FIN= Creación del grupo Trash =====

		//Info de la cantidad de Oxygen
		this.oxygenText = this.game.add.text(0,0,'Oxygen :'+this.elapsedTimeOxygen + '/' + this.maxOxygen);
		this.oxygenText.fill = "#FFFFFF";
	},
	update:function(){
		//===== Colisiones =====
		this.physics.arcade.overlap(this.player,this.enemies,null,this.collisionFish,this);
		this.physics.arcade.overlap(this.player,this.trashes,null,this.collisionTrash,this);

		//=FIN= Colisiones =====

		//===== MOVIMIENTO PLAYER =====
		//Press Button
		if (this.upKey.isDown){
	        this.player.body.velocity.y = -150;
	    }
	    //Mov horizontal = 0, si no se presionan los botones
		this.player.body.velocity.x = 0;
	    if (this.leftKey.isDown){
	        this.player.body.velocity.x = -150;
	    }else if (this.rightKey.isDown){
	        this.player.body.velocity.x = 150;
	    }
	    //Máxima Velocidad de Caída
	    if (this.player.body.velocity.y > this.maxVelFall){
	    	this.player.body.velocity.y = this.maxVelFall;
	    }
	    //=FIN= MOVIMIENTO PLAYER =====
	    
	    //===== Aparición de Enemies =====
	    this.elapsedTimeEnemy += this.time.elapsed;
		if(this.elapsedTimeEnemy >= this.enemyFrequency){
			this.elapsedTimeEnemy = 0;
			this.createEnemy();
		}
		//=FIN= Aparición de Peces =====

		//===== Oxygen ===== this.elapsedTimeOxygen
		//console.log(this.elapsedTimeOxygen);	//te dice que tanto oxygen tienes
		//te baja el oxygen si estás debajo del agua
		if(this.player.y > 0){
			this.elapsedTimeOxygen -= this.time.elapsed;
			if(this.elapsedTimeOxygen <= 0){
				this.elapsedTimeOxygen = 0;		//si baja a 0
				this.player.kill();				//te mueres
				console.log("Moriste. Te sofocaste.");
			}
		}else{	//sino recuperas oxygen
			this.elapsedTimeOxygen += (this.time.elapsed * 10);
			if(this.elapsedTimeOxygen >= this.maxOxygen){
				this.elapsedTimeOxygen = this.maxOxygen;	//recuperas max Oxygen
				console.log("Máximo de Oxygen");
			}
		}
		this.drawOxygenBar();
		//=FIN= Oxygen =====

	},
	drawOxygenBar:function(){
		/*
	    this.contorn.beginFill(0xff5500);
	    this.contorn.drawRoundedRect(this.BO.x-5,this.BO.y-5,this.BO.w+10,1010,this.BO.r); // coordenada X, coordenada Y, ancho, alto y radio
	    this.contorn.endFill();

	    this.oxygenBar.beginFill(0xf0f0f0);
	    this.oxygenBar.drawRoundedRect(this.BO.x,this.BO.y,this.BO.w,this.BO.h,this.BO.r); // coordenada X, coordenada Y, ancho, alto y radio
	    this.oxygenBar.endFill();
		*/

		this.oxygenText.text = 'Oxygen :'+this.elapsedTimeOxygen + '/' + this.maxOxygen;

	},

	collisionFish:function(sprite1,sprite2){
		this.lives--;
		console.log("vidas restantes: ", this.lives);
		sprite2.kill();
		if (this.lives <= 0){
			sprite1.kill();
			console.log("Has muerto.");
		}
	},
	collisionTrash:function(sprite1,sprite2){
		console.log("+100 puntos");
		sprite2.kill();
	},
	createEnemy:function(){

		let enemy = this.enemies.getFirstDead();
		if(!enemy){
			//enemy = this.game.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'barrel');
			enemy = new Enemy(this.game,this.enemySpeed);
			this.enemies.add(enemy);
		}else{
			//console.log("pez revive");
			let x = 0;
			let y = this.game.rnd.integerInRange(200, 1200);
			enemy.reset(x,y);
		}
		enemy.body.velocity.x = this.enemySpeed;
		enemy.body.collideWorldBounds = false;

	},
	createPlatform:function(element){
		//primera forma
		//let platform = this.game.add.sprite(element.x,element.y,"platform");
		//this.platforms.add(platform);
		
		//segunda forma
		//this.platforms.create(element.x,element.y,"platform");

		//tercera forma
		//let platform = new Phaser.Sprite(this,element.x,element.y,"platform");
		//this.platforms.add(platform);
	},

>>>>>>> Player, Life, Overlap and Oxygen
}