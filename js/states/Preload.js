Preload = function(game){}

Preload.prototype = {
	preload : function(){
		this.load.image("actionButton","assets/images/actionButton.png");
		this.load.image("arrowButton","assets/images/arrowButton.png");
		this.load.image("barrel","assets/images/barrel.png");
		this.load.spritesheet("fire_spritesheet",
			"assets/images/fire_spritesheet.png",20,21,2,1,1);
		this.load.image("gorilla3","assets/images/gorilla3.png");
		this.load.image("ground","assets/images/ground.png");
		this.load.image('platform', 'assets/images/platform.png');
		this.load.spritesheet("player_spritesheet",
			"assets/images/player_spritesheet.png",28,30,5,1,1);
		this.load.text("level","assets/data/level.json");
	},
	create:function(){
		this.state.start("Game");
	}
}