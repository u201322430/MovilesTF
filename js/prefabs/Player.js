Player = function(game,position,gravity){
	Phaser.Sprite.call(this,game,position.x,position.y,'player');
	this.game = game;
	this.gravity = gravity;
	this.anchor.setTo(0.5);	
	this.game.physics.arcade.enable(this);
	this.reset(position.x,position.y);
	this.animations.add("swim",[0,1,2,3,4,5,6,7,8,9,10],11,false);
	this.body.gravity.y = this.gravity;
	this.frame = 1;
	this.game.add.existing(this);
	//this.keys = this.input.keyboard.createCursorKeys();	//crea solo teclas direc
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	//this.loadTexture(data.asset);
	
}

Player.prototype.update = function(){
	//console.log(this.body.velocity.y)
	if(this.body.velocity.y > 100){
		this.frame = 10;
	}else{
		this.animations.play("swim");
	}
}