Trash = function(game,position,fishSprite){
	Phaser.Sprite.call(this,game,position.x,position.y,fishSprite.asset);
	this.game = game;
	this.fishSprite = fishSprite;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.reset(position.x,position.y,fishSprite);
}


Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;


Trash.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y);
}