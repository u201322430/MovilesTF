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

}