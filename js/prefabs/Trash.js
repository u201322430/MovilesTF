Trash = function(game,position){
    this.trashKeyList = ["aereosol","broken_cup","can","glass_bottle","milk_jug","pizza_carton","plastic_bottle"]
    this.key = this.trashKeyList[game.rnd.integerInRange(0, this.trashKeyList.length-1)]
    console.log(this.key)
    Phaser.Sprite.call(this,game,position.x,position.y,this.key);
    this.game.physics.arcade.enable(this);	
    this.scale.setTo(0.4);
	this.game = game;
    this.anchor.setTo(0.5);	
    this.game.add.existing(this);
}

Trash.prototype = Object.create(Phaser.Sprite.prototype);
Trash.prototype.constructor = Trash;


