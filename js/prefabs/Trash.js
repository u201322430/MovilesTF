Trash = function(game,position,trashSprite){
	Phaser.Sprite.call(this,game,position.x,position.y,trashSprite);
	this.game = game;
	this.trashSprite = trashSprite;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.reset(position.x,position.y,trashSprite);
}


Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;


Trash.prototype.reset = function(x,y,data){
	Phaser.Sprite.prototype.reset.call(this,x,y);
}