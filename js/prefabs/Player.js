Player = function(game,position,gravity){
	Phaser.Sprite.call(this,game,position.x,position.y);
	this.game = game;
	this.gravity = gravity;
	this.anchor.setTo(0.5);	
	this.game.physics.arcade.enable(this);
	this.reset(position.x,position.y);
	this.animations.add("swim",[0,1,2],10,true);
	this.body.gravity.y = this.gravity;
	this.frame = 1;
	this.game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	//this.loadTexture(data.asset);
	
}

Player.prototype.damage = function(){
	//TO-DO damage
}