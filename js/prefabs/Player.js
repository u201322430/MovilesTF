Player = function(game,position,gravity){
	Phaser.Sprite.call(this,game,position.x,position.y,'player');
	this.game = game;
	this.gravity = gravity;
	this.anchor.setTo(0.5);	
	this.game.physics.arcade.enable(this);	
	this.reset(position.x,position.y);
	this.animations.add("idle",[0],10,true);
	this.animations.add("swim",[2,3,4,5,6,7,8,9,10],10,true);	
	this.body.gravity.y = this.gravity;
	this.game.camera.follow(this);
	this.body.collideWorldBounds = true
	this.frame = 1;
	this.game.add.existing(this);
	this.invulnerableTime = 3;
	this.isInvulnerable = false;
	this.oxigenLevels = 100;
	//this.keys = this.input.keyboard.createCursorKeys();	//crea solo teclas direc
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.pickUpTrash = function(trash){
		
}

Player.prototype.breathe = function(score){

	if(this.oxigenLevels <= 0){
		this.game.state.start('GameOver', true, false, score)
	}

	if(this.y < 330){
		if(this.oxigenLevels < 100){
			this.oxigenLevels += 0.1;
			console.log("CACA")
		}		
	}else{
		this.oxigenLevels-=0.02;
	}
}

Player.prototype.initInvulnerability = function(){
	this.isInvulnerable = true;
	let tween = this.game.add.tween(this).to( { alpha: 0 }, 250, "Linear", true, 0, -1);
	tween.yoyo(true,0);
	this.game.time.events.add(Phaser.Timer.SECOND * this.invulnerableTime, function(){
		this.isInvulnerable = false;
		this.alpha = 1; //mejor seguro, que no seguro.
		tween.stop();
	}, this);
}

Player.prototype.changeVelocity = function(force){

	if(force.x > 0){
		this.scale.x = -1;
		this.animations.play("swim")
	}else if(force.x < 0){
		this.scale.x = 1;
		this.animations.play("swim")
	}else if(force.y < 0){
		this.animations.play("swim")
	}
	else if(force.x == 0){
		this.animations.play("idle")
	}

	this.body.velocity.y += force.y;
	this.body.velocity.x = force.x;

}