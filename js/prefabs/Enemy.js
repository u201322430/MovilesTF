Enemy = function(game,enemySpeed){
	let x = 0;
	let y = game.rnd.integerInRange(200, 1200);
	Phaser.Sprite.call(this,game,x,y,"red_dead_fish");
	this.x = x;
	this.y = y;
	this.enemySpeed = enemySpeed;
	this.game = game;
	this.anchor.setTo(0.5);
	this.game.physics.arcade.enable(this);
	this.reset(this.x,this.y);
}


Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.reset = function(x,y){
	Phaser.Sprite.prototype.reset.call(this,x,y);
	/*this.loadTexture(data.asset);
	this.animationName = null;
	if(data.hasOwnProperty("animationFrames")){
		this.animationName = data.asset+ "Anim";
		this.animations.add(this.animationName,data.animationFrames,4,true);
		this.animations.play(this.animationName);
	}*/
}

Enemy.prototype.damage = function(){
	//TO-DO damage
}